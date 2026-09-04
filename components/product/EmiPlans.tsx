"use client";

import { EmiPlan } from "@/types/product";
import { useEffect, useState } from "react";

interface EmiPlansProps {
  plans: EmiPlan[];
  selectedPlan: EmiPlan | null;
  onSelectPlan: (plan: EmiPlan) => void;
}

export default function EmiPlans({ plans, selectedPlan, onSelectPlan }: EmiPlansProps) {
  const initialPayment = selectedPlan ? Math.round(selectedPlan.monthlyPayment * 0.5) : 0; // Fake logic for "Pay only X now"

  // Calculate next month's date dynamically with ordinal suffix
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    
    const month = nextMonth.toLocaleDateString('en-GB', { month: 'short' });
    
    setFormattedDate(`4th ${month}`);
  }, []);

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-orange-500 bg-orange-50 px-1 rounded border border-orange-200 text-xs font-bold leading-none py-0.5 flex items-center justify-center">
          ₹
        </div>
        <h3 className="font-bold text-gray-900">
          Pay only ₹{initialPayment || 14250} now
        </h3>
      </div>
      
      <div className="flex justify-between items-end mb-4 border-b border-gray-100 pb-2">
        <h4 className="text-sm font-bold text-gray-900">Choose EMI Tenure</h4>
        <span className="text-xs text-blue-500 font-medium">EMIs starting {formattedDate}</span>
      </div>
      
      <div className="flex flex-col">
        {plans.map((plan, idx) => {
          const isSelected = selectedPlan?.tenure === plan.tenure;
          
          return (
            <label
              key={idx}
              className="flex items-center justify-between py-3 cursor-pointer group border-b border-gray-100 last:border-0"
              onClick={() => onSelectPlan(plan)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-orange-500' : 'border-gray-300'}`}>
                  {isSelected && <div className="w-2 h-2 bg-orange-500 rounded-full" />}
                </div>
                <div className="text-sm">
                  <span className="font-bold text-gray-900">₹{plan.monthlyPayment.toLocaleString('en-IN')}</span>
                  <span className="text-gray-500 text-xs ml-1">x {plan.tenure} months</span>
                </div>
              </div>
              
              <div className="flex items-center">
                <span className="text-xs font-bold text-white bg-orange-500 px-2 py-0.5 rounded">
                  {plan.interestRate === 0 ? "0% EMI" : `${plan.interestRate}% EMI`}
                </span>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
