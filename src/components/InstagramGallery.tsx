import { useState, useRef, useEffect } from 'react';
import { GALLERY_ITEMS, GALLERY_CATEGORIES, INSTAGRAM_PROFILE, GalleryItem } from '../data/galleryData';
import GalleryLightbox from './GalleryLightbox';

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setInView(true);
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

interface InstagramGalleryProps {
  onOpenFullGallery?: () => void;
}

export default function InstagramGallery({ onOpenFullGallery }: InstagramGalleryProps) {
  const { ref, inView } = useInView();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

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
    <section
      id="gallery"
      ref={ref as any}
      style={{
        padding: '100px 0',
        background: 'linear-gradient(180deg, #ffffff 0%, #f0f9ff 50%, #ffffff 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 44,
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateY(30px)',
            transition: 'all 0.7s ease',
          }}
        >
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            <span>📸</span>
            <span>Instagram Gallery</span>
          </div>

          <h2 className="section-title">
            Follow Our <span>Smile Journey</span>
          </h2>
          <div className="divider divider-center" />

          <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            Real moments, real smiles, and behind-the-scenes glimpses from Pearl Dental Clinic Guwahati.
            Connect with us on Instagram to see daily transformations!
          </p>

          {/* Instagram Follow Us Header Banner */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              background: 'white',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 100,
              padding: '8px 20px',
              marginTop: 20,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '0.95rem',
                }}
              >
                📸
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a', lineHeight: 1.2 }}>
                  @{INSTAGRAM_PROFILE.username}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                  {INSTAGRAM_PROFILE.followers} followers · {INSTAGRAM_PROFILE.postsCount}+ posts
                </div>
              </div>
            </div>

            <a
              href={INSTAGRAM_PROFILE.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                color: 'white',
                borderRadius: 100,
                padding: '6px 16px',
                fontSize: '0.8rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s',
                boxShadow: '0 2px 10px rgba(220, 39, 67, 0.3)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
              }}
            >
              Follow on Instagram →
            </a>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 8,
            flexWrap: 'wrap',
            marginBottom: 36,
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateY(20px)',
            transition: 'all 0.7s ease 0.15s',
          }}
        >
          {GALLERY_CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 100,
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  fontFamily: 'Inter, sans-serif',
                  border: isActive ? '1.5px solid #0ea5e9' : '1px solid #e2e8f0',
                  background: isActive ? '#0ea5e9' : 'white',
                  color: isActive ? 'white' : '#475569',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isActive ? '0 4px 15px rgba(14, 165, 233, 0.25)' : 'none',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = '#0ea5e9';
                    e.currentTarget.style.color = '#0ea5e9';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.color = '#475569';
                  }
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Responsive Gallery Grid */}
        <div
          className="instagram-gallery-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 20,
            marginBottom: 44,
          }}
        >
          {filteredItems.map((item, index) => (
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
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(30px)',
                transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s`,
              }}
            >
              {/* Photo */}
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

              {/* Instagram Corner Badge */}
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
                  transition: 'opacity 0.2s',
                }}
                className="insta-corner-badge"
              >
                📸
              </div>

              {/* Desktop Hover Overlay / Mobile Tap Info */}
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
                      backdropFilter: 'blur(4px)',
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
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        ❤️ {item.likes}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        💬 {item.comments}
                      </span>
                    </div>

                    <span style={{ color: '#7dd3fc', fontSize: '0.72rem', textDecoration: 'underline' }}>
                      Expand 🔍
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Actions: View Full Gallery & Follow Button */}
        <div
          style={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          {onOpenFullGallery && (
            <button
              onClick={onOpenFullGallery}
              className="btn btn-primary"
              style={{
                fontSize: '0.9rem',
                padding: '12px 28px',
                cursor: 'pointer',
              }}
            >
              🖼️ View Full Gallery ({GALLERY_ITEMS.length} Photos)
            </button>
          )}

          <a
            href={INSTAGRAM_PROFILE.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{
              fontSize: '0.9rem',
              padding: '12px 28px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span>📸</span>
            <span>Follow @{INSTAGRAM_PROFILE.username}</span>
          </a>
        </div>
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

      {/* Responsive Styles */}
      <style>{`
        .gallery-card:hover .gallery-img {
          transform: scale(1.08);
        }
        .gallery-card:hover .gallery-overlay {
          opacity: 1;
        }
        .gallery-card:hover .insta-corner-badge {
          opacity: 0;
        }

        /* Responsive Grid Breakpoints */
        @media (max-width: 1024px) {
          .instagram-gallery-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 768px) {
          .instagram-gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
          #gallery {
            padding: 70px 0 !important;
          }
        }
        @media (max-width: 360px) {
          .instagram-gallery-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
