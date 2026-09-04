"use client";

import { EmiPlan } from "@/types/product";

interface ProceedButtonProps {
  selectedPlan: EmiPlan | null;
}

export default function ProceedButton({ selectedPlan }: ProceedButtonProps) {
  if (!selectedPlan) {
    return (
      <button 
        disabled
        className="w-full py-3 rounded bg-gray-200 text-gray-500 font-bold text-base cursor-not-allowed"
      >
        Select an EMI Plan
      </button>
    );
  }

  return (
    <button
      className="w-full py-3 rounded-md bg-[#ff6b00] hover:bg-[#e66000] text-white font-bold text-base transition-colors flex flex-col items-center justify-center shadow-[0_4px_14px_0_rgba(255,107,0,0.39)]"
    >
      <span>Buy on {selectedPlan.tenure} months EMI</span>
      <span className="text-[10px] font-medium text-orange-100/90 mt-0.5">
        Earn ₹{selectedPlan.cashback || 949} cashback on this order
      </span>
    </button>
  );
}
