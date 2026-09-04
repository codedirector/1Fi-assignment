"use client";

import { Variant } from "@/types/product";

interface VariantSelectorProps {
  variants: Variant[];
  selectedVariant: Variant;
  onSelectVariant: (variant: Variant) => void;
}

export default function VariantSelector({ variants, selectedVariant, onSelectVariant }: VariantSelectorProps) {
  // Extract unique colors and unique storages
  const uniqueColors = Array.from(new Set(variants.map(v => v.name)));
  const uniqueStorages = Array.from(new Set(variants.map(v => v.storage)));

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Try to find a variant with the new color and the currently selected storage
    let newVariant = variants.find(v => v.name === e.target.value && v.storage === selectedVariant.storage);
    // If not found, just pick the first variant with that color
    if (!newVariant) {
      newVariant = variants.find(v => v.name === e.target.value);
    }
    if (newVariant) onSelectVariant(newVariant);
  };

  const handleStorageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStorage = e.target.value;
    // Try to find a variant with the currently selected color and the new storage
    let newVariant = variants.find(v => v.storage === selectedStorage && v.name === selectedVariant.name);
    // If not found, pick the first variant with that storage
    if (!newVariant) {
      newVariant = variants.find(v => v.storage === selectedStorage);
    }
    if (newVariant) onSelectVariant(newVariant);
  };

  return (
    <div className="flex gap-4 mt-6">
      <div className="flex-1 relative">
        <label className="block text-sm font-semibold text-gray-800 mb-2">Color</label>
        <div className="relative">
          <select 
            value={selectedVariant.name}
            onChange={handleColorChange}
            className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm font-medium cursor-pointer"
          >
            {uniqueColors.map((color) => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>

      <div className="flex-1 relative">
        <label className="block text-sm font-semibold text-gray-800 mb-2">Variant</label>
        <div className="relative">
          <select 
            value={selectedVariant.storage}
            onChange={handleStorageChange}
            className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm font-medium cursor-pointer"
          >
            {uniqueStorages.map((storage) => (
              <option key={storage} value={storage}>Storage: {storage}, RAM: 12 GB</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
}
