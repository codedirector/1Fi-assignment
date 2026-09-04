"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProductType, Variant, EmiPlan } from "@/types/product";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import VariantSelector from "@/components/product/VariantSelector";
import EmiPlans from "@/components/product/EmiPlans";
import ProceedButton from "@/components/product/ProceedButton";
import SellerModal from "@/components/product/SellerModal";

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAllDetails, setShowAllDetails] = useState(false);
  const [showSellerModal, setShowSellerModal] = useState(false);
  
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<EmiPlan | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${params.slug}`);
        if (!res.ok) throw new Error("Failed to fetch");
        
        const data: ProductType = await res.json();
        setProduct(data);
        if (data.variants?.length > 0) {
          setSelectedVariant(data.variants[0]);
        }
        if (data.emiPlans?.length > 0) {
          setSelectedPlan(data.emiPlans[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    if (params.slug) fetchProduct();
  }, [params.slug]);

  if (loading || !product || !selectedVariant) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff6b00]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto bg-white pt-2 pb-24 lg:pb-2">
      {/* Breadcrumbs */}
      <div className="hidden md:flex items-center gap-2 text-[13px] text-gray-500 mb-6 font-medium overflow-x-auto whitespace-nowrap">
        <span className="cursor-pointer hover:text-gray-800">Shop on EMI</span>
        <span>›</span>
        <span className="cursor-pointer hover:text-gray-800">Smart Phones</span>
        <span>›</span>
        <span className="cursor-pointer hover:text-gray-800">{product.name.split(' ')[0]}</span>
        <span>›</span>
        <span className="text-gray-900 font-semibold">{product.name} ({selectedVariant.name}, {selectedVariant.storage})</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Fixed/Sticky Gallery & Variant Selection */}
        <div className="lg:sticky lg:top-24 flex flex-col gap-6">
          <ProductGallery 
            imageUrl={selectedVariant.image} 
            altText={`${product.name} - ${selectedVariant.name}`}
            thumbnails={selectedVariant.thumbnails || []}
          />
          <VariantSelector 
            variants={product.variants}
            selectedVariant={selectedVariant}
            onSelectVariant={setSelectedVariant}
          />
        </div>

        {/* Right Column: Scrollable Details */}
        <div className="flex flex-col">
          <ProductInfo 
            name={`${product.name} (${selectedVariant.name}, 12GB RAM, ${selectedVariant.storage})`}
            subtitle={`(Ram: 12 GB, Storage: ${selectedVariant.storage}, Color: ${selectedVariant.name})`}
            mrp={product.mrp}
            price={product.price}
          />

          <EmiPlans 
            plans={product.emiPlans}
            selectedPlan={selectedPlan}
            onSelectPlan={setSelectedPlan}
          />

          {/* Desktop proceed button */}
          <div className="hidden lg:block pt-3">
            <p className="text-[10px] text-gray-500 mb-2">
              *Total extra payment per month/order value
            </p>
            <ProceedButton selectedPlan={selectedPlan} />
          </div>

          <hr className="my-6 border-gray-100" />

          {/* Seller & Shipping */}
          <div className="space-y-6">
            <div className="text-sm">
              <span className="font-bold text-gray-900">Sold By : </span>
              <button 
                onClick={() => setShowSellerModal(true)}
                className="text-orange-500 hover:underline cursor-pointer"
              >
                Balaji Infocom ›
              </button>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">Shipping Details:</h4>
              <p className="text-xs text-gray-600">Dispatch in less than 48 hours and delivery in 3-7 working days after dispatch</p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-3">Shop with Confidence</h4>
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs text-blue-700 font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-400">⟲</span> 2 Days Service Centre Replacement
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-400">✓</span> 1 Year Warranty
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-400">⭐</span> Top Brand
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-400">🚚</span> Free Delivery
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-2">Product Details</h4>
              <ul className="list-disc pl-5 text-sm text-gray-800 space-y-1">
                <li><span className="font-medium text-gray-600">RAM:</span> 12 GB</li>
                <li><span className="font-medium text-gray-600">Storage:</span> {selectedVariant.storage}</li>
                <li><span className="font-medium text-gray-600">Color:</span> {selectedVariant.name}</li>
                <li><span className="font-medium text-gray-600">Front Camera:</span> 12 MP</li>
                {showAllDetails && (
                  <>
                    <li><span className="font-medium text-gray-600">Front Camera Features:</span> 18MP front cam with autofocus, Center Stage, Night mode, HD 5, portraits, Animoji, 4K stabilized video, spatial audio, and dual capture features.</li>
                    <li><span className="font-medium text-gray-600">Rear Camera:</span> 48 MP + 48 MP + 48 MP</li>
                    <li><span className="font-medium text-gray-600">Rear Camera Features:</span> 48MP Fusion system with 4 lenses, 8x zoom, up to 40x digital, ProRAW, Night mode, Smart HDR 5, macro, spatial photos, and advanced stabilization.</li>
                    <li><span className="font-medium text-gray-600">Battery:</span> 5000 mAh</li>
                    <li><span className="font-medium text-gray-600">Screen Size:</span> 6.3 inch</li>
                    <li><span className="font-medium text-gray-600">Screen Resolution:</span> 2622 × 1206 Pixels</li>
                  </>
                )}
              </ul>
              <button 
                onClick={() => setShowAllDetails(!showAllDetails)}
                className="text-orange-500 text-xs font-bold mt-2 hover:underline"
              >
                {showAllDetails ? "View less ⌃" : "View all ⌄"}
              </button>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">Review & Rating</h4>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-xl font-bold text-gray-900">4.84</span>
                <span className="text-yellow-400 text-lg leading-none">★</span>
                <span className="text-orange-500 text-xs font-bold bg-orange-50 px-1.5 rounded">Excellent</span>
              </div>
              
              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-4">
                  <div className="font-bold text-gray-900 text-sm mb-1">Top Reviews</div>
                  <div className="text-yellow-400 text-sm mb-1">★★★★★ <span className="text-gray-900 font-bold ml-1">5</span></div>
                  <p className="text-[10px] text-gray-500 mb-1">Review for: Ram: 12 GB, Storage: {selectedVariant.storage}, Color: {selectedVariant.name}</p>
                  <p className="text-xs text-gray-800 mb-2">I recently purchased this phone and the entire experience was top-notch. Amazing performance and camera quality.</p>
                  <p className="text-xs font-bold text-gray-800">Parvati Devi, Ahmedabad</p>
                  <p className="text-[10px] text-gray-500">✓ Verified buyer · 7 months ago</p>
                </div>

                <div className="border-b border-gray-100 pb-4">
                  <div className="text-yellow-400 text-sm mb-1">★★★★☆ <span className="text-gray-900 font-bold ml-1">4</span></div>
                  <p className="text-[10px] text-gray-500 mb-1">Review for: Ram: 12 GB, Storage: {selectedVariant.storage}, Color: {selectedVariant.name}</p>
                  <p className="text-xs text-gray-800 mb-2">I am satisfied and till now, no issues. I hope it will remain so and the relationship we have built will grow stronger and stronger in times to come.</p>
                  <p className="text-xs font-bold text-gray-800">Jemni Tali, EAST SIANG</p>
                  <p className="text-[10px] text-gray-500">✓ Verified buyer · 1 month ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Buy Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 lg:hidden z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <ProceedButton selectedPlan={selectedPlan} />
      </div>

      {/* Seller Modal */}
      <SellerModal isOpen={showSellerModal} onClose={() => setShowSellerModal(false)} />
    </div>
  );
}
