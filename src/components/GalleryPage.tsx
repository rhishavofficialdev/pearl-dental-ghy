import { useState } from 'react';
import { GALLERY_ITEMS, GALLERY_CATEGORIES, INSTAGRAM_PROFILE, GalleryItem } from '../data/galleryData';
import GalleryLightbox from './GalleryLightbox';

interface GalleryPageProps {
  onBackToHome: () => void;
}

export default function GalleryPage({ onBackToHome }: GalleryPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const filteredItems = GALLERY_ITEMS.filter(item => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const currentIndex = activeLightboxItem
    ? filteredItems.findIndex(i => i.id === activeLightboxItem.id)
    : -1;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActiveLightboxItem(filteredItems[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredItems.length - 1) {
      setActiveLightboxItem(filteredItems[currentIndex + 1]);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fafbfc', paddingTop: 100, paddingBottom: 80 }}>
      <div className="container">
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: 28 }}>
          <button
            onClick={onBackToHome}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: 100,
              padding: '8px 18px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#0f172a',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#0ea5e9';
              e.currentTarget.style.color = '#0ea5e9';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.color = '#0f172a';
            }}
          >
            <span>←</span>
            <span>Back to Home</span>
          </button>
        </div>

        {/* Instagram Profile Hero Header Card */}
        <div
          style={{
            background: 'white',
            borderRadius: 24,
            padding: '32px',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.04)',
            marginBottom: 36,
          }}
          className="gallery-hero-card"
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 24,
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              {/* Instagram Story Gradient Ring */}
              <div
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                  padding: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                  }}
                >
                  🦷
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <h1
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '1.4rem',
                      fontWeight: 800,
                      color: '#0f172a',
                      margin: 0,
                    }}
                  >
                    @{INSTAGRAM_PROFILE.username}
                  </h1>
                  <span
                    style={{
                      background: '#e0f2fe',
                      color: '#0284c7',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 100,
                    }}
                  >
                    Verified Clinic
                  </span>
                </div>

                <div style={{ color: '#475569', fontSize: '0.88rem', marginTop: 4, fontWeight: 500 }}>
                  {INSTAGRAM_PROFILE.displayName} · {INSTAGRAM_PROFILE.location}
                </div>

                {/* Stats */}
                <div style={{ display: 'flex', gap: 18, marginTop: 8, fontSize: '0.82rem', color: '#64748b' }}>
                  <span><strong style={{ color: '#0f172a' }}>{INSTAGRAM_PROFILE.postsCount}+</strong> posts</span>
                  <span><strong style={{ color: '#0f172a' }}>{INSTAGRAM_PROFILE.followers}</strong> followers</span>
                  <span><strong style={{ color: '#0f172a' }}>5.0★</strong> patient rating</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href={INSTAGRAM_PROFILE.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                  color: 'white',
                  textDecoration: 'none',
                  padding: '10px 22px',
                  borderRadius: 12,
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  boxShadow: '0 4px 15px rgba(220, 39, 67, 0.25)',
                }}
              >
                <span>📸</span>
                <span>Follow on Instagram</span>
              </a>

              <button
                onClick={() => {
                  onBackToHome();
                  setTimeout(() => {
                    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="btn btn-primary"
                style={{ fontSize: '0.88rem', padding: '10px 22px', borderRadius: 12 }}
              >
                📅 Book Appointment
              </button>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
            marginBottom: 28,
          }}
        >
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {GALLERY_CATEGORIES.map(cat => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 100,
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    fontFamily: 'Inter, sans-serif',
                    border: isActive ? '1.5px solid #0ea5e9' : '1px solid #e2e8f0',
                    background: isActive ? '#0ea5e9' : 'white',
                    color: isActive ? 'white' : '#475569',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: isActive ? '0 4px 12px rgba(14, 165, 233, 0.2)' : 'none',
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div style={{ minWidth: 240, flex: '1 1 240px', maxWidth: 360 }}>
            <input
              type="text"
              placeholder="Search by keyword, procedure or tag..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 16px',
                borderRadius: 100,
                border: '1px solid #e2e8f0',
                fontSize: '0.85rem',
                outline: 'none',
                background: 'white',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: 18 }}>
          Showing {filteredItems.length} of {GALLERY_ITEMS.length} photos
          {searchQuery && ` matching "${searchQuery}"`}
        </div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div
            style={{
              background: 'white',
              borderRadius: 20,
              padding: '60px 20px',
              textAlign: 'center',
              border: '1px solid #e2e8f0',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🔍</div>
            <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: 8 }}>No photos found</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: 16 }}>
              Try searching for different terms or clear the filter.
            </p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="btn btn-secondary"
              style={{ fontSize: '0.85rem', padding: '8px 18px' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            className="instagram-gallery-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 20,
            }}
          >
            {filteredItems.map(item => (
              <div
                key={item.id}
                onClick={() => setActiveLightboxItem(item)}
                className="gallery-card group"
                style={{
                  position: 'relative',
                  borderRadius: 20,
                  overflow: 'hidden',
                  aspectRatio: '1 / 1',
                  background: '#f1f5f9',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(226, 232, 240, 0.8)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  className="gallery-img"
                />

                <div
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.45)',
                    backdropFilter: 'blur(6px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '0.75rem',
                    zIndex: 2,
                  }}
                  className="insta-corner-badge"
                >
                  📸
                </div>

                <div
                  className="gallery-overlay"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.4) 60%, rgba(15, 23, 42, 0.2) 100%)',
                    backdropFilter: 'blur(3px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '16px',
                    opacity: 0,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    zIndex: 3,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <span
                      style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        padding: '3px 10px',
                        borderRadius: 100,
                      }}
                    >
                      {item.date}
                    </span>
                  </div>

                  <div>
                    <h4
                      style={{
                        color: 'white',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        lineHeight: 1.3,
                        marginBottom: 8,
                        fontFamily: 'Inter, sans-serif',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {item.title}
                    </h4>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}
                    >
                      <div style={{ display: 'flex', gap: 12 }}>
                        <span>❤️ {item.likes}</span>
                        <span>💬 {item.comments}</span>
                      </div>
                      <span style={{ color: '#7dd3fc', fontSize: '0.72rem', textDecoration: 'underline' }}>
                        View Post 🔍
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <GalleryLightbox
        item={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={currentIndex > 0}
        hasNext={currentIndex < filteredItems.length - 1}
        currentIndex={currentIndex}
        totalCount={filteredItems.length}
      />

      <style>{`
        .gallery-card:hover .gallery-img { transform: scale(1.08); }
        .gallery-card:hover .gallery-overlay { opacity: 1; }
        .gallery-card:hover .insta-corner-badge { opacity: 0; }

        @media (max-width: 1024px) {
          .instagram-gallery-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 16px !important; }
        }
        @media (max-width: 768px) {
          .instagram-gallery-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
          .gallery-hero-card { padding: 20px 16px !important; }
        }
        @media (max-width: 360px) {
          .instagram-gallery-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
        }
      `}</style>
    </div>
  );
}
