import React, { useState } from 'react';
import { HarvestBasket } from '../types';
import { Check, ShoppingBag, ArrowRight, Sparkles, Box, RefreshCw } from 'lucide-react';

interface HarvestBasketsViewProps {
  baskets: HarvestBasket[];
  onAddBasketToCart: (basket: HarvestBasket) => void;
}

export const HarvestBasketsView: React.FC<HarvestBasketsViewProps> = ({
  baskets,
  onAddBasketToCart
}) => {
  const [addedBasketId, setAddedBasketId] = useState<string | null>(null);

  const handleAdd = (basket: HarvestBasket) => {
    onAddBasketToCart(basket);
    setAddedBasketId(basket.id);
    setTimeout(() => setAddedBasketId(null), 1500);
  };

  return (
    <div className="space-y-10 py-6">
      {/* Intro Header */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#835400] mb-2">
          <span>Weekly Curations</span>
          <span aria-hidden="true">·</span>
          <span>Zero-Waste Wooden Crates</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#0d631b]">15% Average Bundle Savings</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#191c1d] font-heading tracking-tight">
          Curated Seasonal Harvest Boxes
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[#40493d] leading-relaxed">
          Pre-assembled by our head agriculturist based on what is peaking in sugar, texture, and fragrance this exact morning across our network of regional farms.
        </p>
      </div>

      {/* Baskets Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {baskets.map((basket) => {
          const isAdded = addedBasketId === basket.id;

          return (
            <div
              key={basket.id}
              className="bg-white rounded-2xl border border-[#e7e8e9] overflow-hidden hover:border-[#bfcaba] hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Visual */}
                <div className="relative aspect-[16/10] bg-[#f3f4f5] overflow-hidden">
                  <img
                    src={basket.imageUrl}
                    alt={basket.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#0d631b] text-white text-xs font-bold px-2.5 py-1 rounded shadow-xs">
                    {basket.servings}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-[#835400] text-xs font-bold px-2 py-0.5 rounded shadow-xs">
                    {basket.itemsCount} Farm Staples
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-xs font-medium text-[#707a6c] block">{basket.tagline}</span>
                    <h3 className="text-xl font-bold text-[#191c1d] mt-1 font-heading">
                      {basket.name}
                    </h3>
                  </div>

                  <p className="text-xs text-[#40493d] leading-relaxed">
                    {basket.description}
                  </p>

                  {/* Items list */}
                  <div className="bg-[#f8f9fa] rounded-xl p-4 border border-[#e7e8e9] space-y-2.5">
                    <span className="text-xs font-bold text-[#191c1d] block">What's in this crate:</span>
                    <ul className="space-y-2">
                      {basket.contents.map((item, i) => (
                        <li key={i} className="text-xs text-[#40493d] flex items-start justify-between gap-2">
                          <div className="flex items-start gap-1.5 min-w-0">
                            <span className="text-[#0d631b] font-bold">·</span>
                            <div className="truncate">
                              <span className="font-medium text-[#191c1d]">{item.name}</span>
                              <span className="text-[10px] text-[#707a6c] block truncate">By {item.producer}</span>
                            </div>
                          </div>
                          <span className="text-[11px] font-semibold text-[#835400] shrink-0">{item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-[11px] text-[#0d631b] italic bg-[#cbffc2]/30 p-2.5 rounded-lg border border-[#88d982]/40">
                    💡 {basket.seasonalNote}
                  </p>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="p-6 pt-0 border-t border-[#f3f4f5] mt-4">
                <div className="flex items-baseline justify-between mb-4 pt-4">
                  <div>
                    <span className="text-2xl font-black text-[#191c1d] tabular-nums font-heading">
                      ${basket.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-[#707a6c] line-through ml-2 tabular-nums">
                      ${basket.originalPrice.toFixed(2)}
                    </span>
                  </div>
                  <span className="text-xs text-[#0d631b] font-bold">
                    Save ${(basket.originalPrice - basket.price).toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => handleAdd(basket)}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                    isAdded
                      ? 'bg-[#cbffc2] text-[#002204]'
                      : 'bg-[#0d631b] hover:bg-[#2e7d32] text-white active:bg-[#005312]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-[#0d631b]" />
                      <span>Added Harvest Crate to Basket!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add Box to Basket (${basket.price.toFixed(2)})</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
