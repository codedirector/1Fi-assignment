"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductGalleryProps {
  imageUrl: string;
  altText: string;
  thumbnails: string[];
}

export default function ProductGallery({ imageUrl, altText, thumbnails }: ProductGalleryProps) {
  const allImages = Array.from(new Set([imageUrl, ...thumbnails]));
  const [activeImage, setActiveImage] = useState(allImages[0]);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(imageUrl);
  const discount = 27;

  // Sync activeImage when variant changes
  useEffect(() => {
    setActiveImage(imageUrl);
  }, [imageUrl]);

  const maxVisible = 6;
  const visibleImages = allImages.slice(0, maxVisible);
  const remaining = allImages.length - maxVisible;

  const openLightbox = (img?: string) => {
    setLightboxImage(img || activeImage);
    setShowLightbox(true);
  };

  return (
    <>
      <div className="flex gap-3">
        {/* Thumbnails Sidebar — hidden on mobile */}
        <div className="hidden md:flex flex-col gap-2.5 w-16 shrink-0">
          {visibleImages.map((thumb, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(thumb)}
              className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center cursor-pointer transition-colors bg-white overflow-hidden
                ${activeImage === thumb ? 'border-orange-500' : 'border-gray-200 hover:border-gray-300'}
              `}
            >
              <img src={thumb} alt={`thumbnail ${idx + 1}`} className="w-12 h-12 object-contain" />
            </button>
          ))}
          {remaining > 0 && (
            <button 
              onClick={() => openLightbox()}
              className="w-16 h-16 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 font-medium text-sm bg-white hover:border-orange-300 hover:text-orange-500 transition-colors cursor-pointer"
            >
              +{remaining}
            </button>
          )}
        </div>

        {/* Main Image */}
        <div 
          className="flex-1 bg-white relative flex items-center justify-center min-h-[300px] md:min-h-[500px] cursor-pointer"
          onClick={() => openLightbox()}
        >
          {/* Badges */}
          <div className="absolute bottom-4 left-4 z-20 flex flex-col items-start gap-1" onClick={(e) => e.stopPropagation()}>
            <div className="bg-[#0ea5e9] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm shadow-sm">
              1% Cashback
            </div>
            <div className="bg-[#ec4899] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm shadow-sm">
              {discount}% OFF
            </div>
          </div>
          
          {/* Rating */}
          <div className="absolute bottom-4 right-4 z-20 bg-white border border-gray-100 shadow-sm text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-1 text-gray-700">
            4.8 <span className="text-yellow-400">★</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.img
              key={activeImage}
              src={activeImage}
              alt={altText}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.25 }}
              className="w-full max-h-[450px] object-contain relative z-10"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset }) => {
                const threshold = 50;
                if (offset.x < -threshold) {
                  const currentIndex = allImages.indexOf(activeImage);
                  setActiveImage(allImages[(currentIndex + 1) % allImages.length]);
                } else if (offset.x > threshold) {
                  const currentIndex = allImages.indexOf(activeImage);
                  setActiveImage(allImages[(currentIndex - 1 + allImages.length) % allImages.length]);
                }
              }}
            />
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile: Horizontal scrollable thumbnails */}
      <div className="flex md:hidden gap-2 overflow-x-auto py-2 -mx-1 px-1 scrollbar-hide">
        {allImages.map((thumb, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(thumb)}
            className={`w-14 h-14 shrink-0 rounded-lg border-2 flex items-center justify-center bg-white overflow-hidden
              ${activeImage === thumb ? 'border-orange-500' : 'border-gray-200'}
            `}
          >
            <img src={thumb} alt={`thumbnail ${idx + 1}`} className="w-10 h-10 object-contain" />
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowLightbox(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-3xl w-full h-[80vh] flex flex-col overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <div className="flex justify-end p-4 pb-0">
                <button 
                  onClick={() => setShowLightbox(false)} 
                  className="text-gray-400 hover:text-gray-700 transition-colors text-2xl leading-none w-8 h-8 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              {/* Main lightbox image */}
              <div className="flex-1 flex items-center justify-center px-8 py-4 min-h-[300px]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={lightboxImage}
                    src={lightboxImage}
                    alt={altText}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="max-w-full h-full object-contain"
                  />
                </AnimatePresence>
              </div>

              {/* Thumbnail strip at bottom */}
              <div className="flex gap-2 overflow-x-auto px-6 py-4 border-t border-gray-100 bg-gray-50 justify-center">
                {allImages.map((thumb, idx) => (
                  <button
                    key={idx}
                    onClick={() => setLightboxImage(thumb)}
                    className={`w-14 h-14 shrink-0 rounded-lg border-2 flex items-center justify-center bg-white overflow-hidden transition-colors
                      ${lightboxImage === thumb ? 'border-orange-500' : 'border-gray-200 hover:border-gray-300'}
                    `}
                  >
                    <img src={thumb} alt={`thumb ${idx + 1}`} className="w-10 h-10 object-contain" />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
