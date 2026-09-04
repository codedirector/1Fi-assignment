"use client";

interface ProductInfoProps {
  name: string;
  subtitle: string;
  mrp: number;
  price: number;
}

export default function ProductInfo({ name, subtitle, mrp, price }: ProductInfoProps) {
  const discount = Math.round(((mrp - price) / mrp) * 100);

  return (
    <div className="flex flex-col mb-6">
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 leading-tight">
        {name}
      </h1>
      
      <p className="text-xs md:text-sm text-gray-500 mb-3">
        {subtitle}
      </p>

      <div className="flex items-center gap-1 text-xs font-semibold text-orange-600 mb-4">
        <span className="text-orange-500">🔥</span> 70+ sold
      </div>
      
      <div className="flex items-baseline gap-2 mb-6">
        <span className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
          ₹{price.toLocaleString('en-IN')}
        </span>
        {mrp > price && (
          <>
            <span className="text-sm md:text-base text-gray-400 font-medium line-through">
              ₹{mrp.toLocaleString('en-IN')}
            </span>
            <span className="text-sm md:text-base font-semibold text-gray-500">
              {discount}% off
            </span>
          </>
        )}
      </div>

      {/* Snapmint App Banner */}
      <div className="flex items-center justify-between border border-gray-200 rounded-lg p-3">
        <div>
          <p className="text-sm font-bold text-gray-900">Higher Credit Instantly</p>
          <p className="text-xs text-gray-500">Download Snapmint App</p>
        </div>
        <div className="flex gap-2">
          <a href="https://apps.apple.com/in/app/snapmint-buy-now-pay-in-emis/id6450001111" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-7 md:h-8" />
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.snapmint.customerapp&referrer=utm_source%3Dsnapmintweb%26utm_medium%3Dpdpdisplay%26utm_campaign%3Dgoogleuitest" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-7 md:h-8" />
          </a>
        </div>
      </div>
    </div>
  );
}
