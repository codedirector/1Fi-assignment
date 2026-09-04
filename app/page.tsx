"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ProductType } from "@/types/product";
import { motion } from "framer-motion";

export default function HomePage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff6b00]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 md:py-12">
      <div className="mb-10 md:mb-12 text-center space-y-3">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          Shop Latest Tech on <span className="text-[#ff6b00]">EMI</span>
        </h1>
        <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto">
          Get the gadgets you want instantly with mutual fund-backed EMI plans. No credit checks, pure flexibility.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {products.map((product, i) => (
          <Link href={`/products/${product.slug}`} key={product.slug}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-orange-300 transition-all duration-300 h-full flex flex-col"
            >
              <div className="p-8 bg-gray-50 flex items-center justify-center min-h-[250px] md:min-h-[300px] relative overflow-hidden">
                <img 
                  src={product.variants[0]?.image}
                  alt={product.name}
                  className="max-h-[200px] md:max-h-[250px] object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 md:p-6 flex-1 flex flex-col justify-between border-t border-gray-100">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#ff6b00] transition-colors">
                    {product.name}
                  </h2>
                  <div className="flex gap-2 items-center text-xs font-medium text-gray-500">
                    {product.variants.length} variants available
                  </div>
                </div>
                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium mb-1 uppercase tracking-wider">Starting from</p>
                    <p className="text-xl font-bold text-gray-900">
                      ₹{product.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="bg-[#ff6b00] text-white w-9 h-9 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    →
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
