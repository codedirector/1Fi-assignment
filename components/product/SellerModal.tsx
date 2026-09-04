"use client";

import { motion, AnimatePresence } from "framer-motion";

interface SellerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SellerModal({ isOpen, onClose }: SellerModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <div className="flex justify-end p-4 pb-0">
              <button 
                onClick={onClose} 
                className="text-gray-400 hover:text-gray-700 transition-colors text-xl leading-none w-8 h-8 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Seller info */}
            <div className="px-6 pb-6">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-[#ff6b00] flex items-center justify-center text-white text-2xl shrink-0">
                  🏪
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Balaji Infocom</h3>
                  <p className="text-sm text-gray-500">3 Years and 10 Months in Snapmint</p>
                  <p className="text-sm text-orange-500 font-medium">Contact Seller</p>
                </div>
              </div>

              <hr className="border-gray-100 mb-4" />

              {/* Products Sold */}
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold text-gray-900">Products Sold</h4>
                <span className="font-bold text-gray-900">3.06L+</span>
              </div>

              {/* About Seller */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-2">About Seller</h4>
                <p className="text-sm text-gray-600">Balaji Infocom is committed to providing each customer with the highest standard of customer service.</p>
              </div>

              {/* Overall Ratings */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3">Overall Ratings</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center gap-1">Product Quality <span className="text-gray-400 text-xs">ⓘ</span></span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-sm">★★★★★</span>
                      <span className="font-bold text-gray-900 text-sm">5.0</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center gap-1">Service Quality <span className="text-gray-400 text-xs">ⓘ</span></span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-sm">★★★★½</span>
                      <span className="font-bold text-gray-900 text-sm">4.4</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visit Store Button */}
              <a 
                href="https://snapmint.com/merchant/balaji-infocom-shopping-on-emi?merchant_slug=balaji-infocom-shopping-on-emi&source_click=visit_store"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 rounded-lg bg-[#ff6b00] hover:bg-[#e66000] text-white font-bold text-base text-center transition-colors shadow-lg shadow-orange-500/20"
              >
                Visit Store
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
