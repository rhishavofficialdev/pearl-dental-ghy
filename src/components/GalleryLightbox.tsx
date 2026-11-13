import { useEffect } from 'react';
import { GalleryItem, INSTAGRAM_PROFILE } from '../data/galleryData';

interface GalleryLightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  currentIndex: number;
  totalCount: number;
}

export default function GalleryLightbox({
  item,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  currentIndex,
  totalCount,
}: GalleryLightboxProps) {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      else if (e.key === 'ArrowRight' && hasNext) onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent background scrolling while modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [item, hasPrev, hasNext, onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'rgba(15, 23, 42, 0.88)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.25s ease-out',
      }}
    >
      {/* Lightbox Container */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: 24,
          maxWidth: 960,
          width: '100%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.5)',
          position: 'relative',
        }}
        className="lightbox-modal"
      >
        {/* Top bar on mobile / desktop */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 18px',
            borderBottom: '1px solid #f1f5f9',
            background: '#ffffff',
          }}
        >
          {/* Instagram Account info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                padding: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
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
                  fontSize: '1rem',
                }}
              >
                🦷
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a', lineHeight: 1.2 }}>
                {INSTAGRAM_PROFILE.username}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                {INSTAGRAM_PROFILE.location} · {item.date}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>
              {currentIndex + 1} / {totalCount}
            </span>
            <button
              onClick={onClose}
              aria-label="Close image preview"
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: 'none',
                background: '#f1f5f9',
                color: '#475569',
                fontSize: '1.2rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#e2e8f0';
                e.currentTarget.style.color = '#0f172a';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#f1f5f9';
                e.currentTarget.style.color = '#475569';
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content Body: Image + Details */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            minHeight: 0,
            overflow: 'hidden',
          }}
          className="lightbox-body"
        >
          {/* Main Image Stage */}
          <div
            style={{
              flex: '1 1 60%',
              background: '#090d16',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              minHeight: 280,
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                maxWidth: '100%',
                maxHeight: '62vh',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
            />

            {/* Prev Navigation Button */}
            {hasPrev && (
              <button
                onClick={e => { e.stopPropagation(); onPrev(); }}
                aria-label="Previous photo"
                style={{
                  position: 'absolute',
                  left: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  color: '#0f172a',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
              >
                ‹
              </button>
            )}

            {/* Next Navigation Button */}
            {hasNext && (
              <button
                onClick={e => { e.stopPropagation(); onNext(); }}
                aria-label="Next photo"
                style={{
                  position: 'absolute',
                  right: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  color: '#0f172a',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
              >
                ›
              </button>
            )}
          </div>

          {/* Details Sidebar */}
          <div
            style={{
              flex: '1 1 40%',
              display: 'flex',
              flexDirection: 'column',
              background: '#ffffff',
              padding: '24px 20px',
              overflowY: 'auto',
              minWidth: 280,
            }}
            className="lightbox-details"
          >
            {/* Title */}
            <h4
              style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#0f172a',
                marginBottom: 10,
                fontFamily: 'Inter, sans-serif',
                lineHeight: 1.3,
              }}
            >
              {item.title}
            </h4>

            {/* Caption */}
            <p
              style={{
                color: '#475569',
                fontSize: '0.88rem',
                lineHeight: 1.7,
                marginBottom: 16,
                flex: 1,
              }}
            >
              {item.caption}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
              {item.tags.map(t => (
                <span
                  key={t}
                  style={{
                    fontSize: '0.75rem',
                    color: '#0284c7',
                    background: '#f0f9ff',
                    padding: '3px 8px',
                    borderRadius: 6,
                    fontWeight: 500,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Engagement metrics */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '12px 0',
                borderTop: '1px solid #f1f5f9',
                borderBottom: '1px solid #f1f5f9',
                marginBottom: 16,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#e11d48', fontWeight: 600, fontSize: '0.85rem' }}>
                <span>❤️</span>
                <span>{item.likes.toLocaleString()} likes</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#64748b', fontWeight: 600, fontSize: '0.85rem' }}>
                <span>💬</span>
                <span>{item.comments} comments</span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a
                href={item.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                  color: 'white',
                  textDecoration: 'none',
                  padding: '12px 20px',
                  borderRadius: 12,
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  transition: 'opacity 0.2s',
                  boxShadow: '0 4px 15px rgba(220, 39, 67, 0.3)',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.92'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <span>📸</span>
                <span>View on Instagram</span>
              </a>

              <button
                onClick={() => {
                  onClose();
                  document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-secondary"
                style={{
                  justifyContent: 'center',
                  padding: '10px 16px',
                  fontSize: '0.85rem',
                  borderRadius: 12,
                }}
              >
                📅 Book Appointment for this Treatment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive adjustments for lightbox */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (max-width: 768px) {
          .lightbox-modal {
            max-height: 94vh !important;
            border-radius: 18px !important;
          }
          .lightbox-body {
            flex-direction: column !important;
            overflow-y: auto !important;
          }
          .lightbox-details {
            padding: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
