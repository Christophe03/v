import React from 'react';
import { ArrowRight, ShieldCheck, Clock, Sprout, Truck } from 'lucide-react';

interface HeroBannerProps {
  onExploreBaskets: () => void;
  onExploreMarket: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreBaskets,
  onExploreMarket
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f3f4f5] to-[#f8f9fa] border-b border-[#e7e8e9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand Story & Call to Action */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Editorial kicker (Clean unboxed metadata) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-[#835400]">
              <span>Autumn Harvest 2026</span>
              <span aria-hidden="true">·</span>
              <span>Regional Growers Network</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#0d631b]">Val de Saône & Monts</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#191c1d] leading-[1.15] text-balance font-heading">
              Artisanal food and living produce, delivered from farm to table in 24 hours.
            </h1>

            {/* Body Description */}
            <p className="text-base sm:text-lg text-[#40493d] max-w-xl leading-relaxed">
              Skip supermarket storage and industrial supply chains. Every loaf is baked at dawn, every vegetable hand-harvested at sunrise, and every wheel of cheese crafted by independent regional masters.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreMarket}
                className="px-6 py-3 bg-[#0d631b] hover:bg-[#2e7d32] active:bg-[#005312] text-white text-sm font-semibold rounded-lg transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span>Browse Daily Harvest</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreBaskets}
                className="px-6 py-3 bg-white hover:bg-[#edeeef] border border-[#d9dadb] text-[#191c1d] text-sm font-semibold rounded-lg transition-all cursor-pointer"
              >
                <span>Explore Curated Boxes</span>
              </button>
            </div>

            {/* Trust Markers Bar (Clean unboxed text & subtle icons) */}
            <div className="pt-6 border-t border-[#e7e8e9] grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-[#40493d]">
              <div className="flex items-center gap-2">
                <Sprout className="w-4 h-4 text-[#0d631b] shrink-0" />
                <span>Zero Pesticide & Biodynamic</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#0d631b] shrink-0" />
                <span>Sub-35km Average Radius</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Clock className="w-4 h-4 text-[#835400] shrink-0" />
                <span>Packed Same Morning</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg bg-white border border-[#e7e8e9] group">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80"
                alt="Autumn farm fresh vegetables and artisan bread"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-102 transition-transform duration-500 ease-out"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1506484381205-f7945653044d?auto=format&fit=crop&w=1000&q=80';
                }}
              />
              
              {/* Subtle Warm Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating Highlight Card on Image */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-sm border border-white/60">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-[#835400] uppercase tracking-wider block">
                      Grower of the Morning
                    </span>
                    <h3 className="text-sm font-bold text-[#191c1d]">
                      Ferme des Trois Chênes
                    </h3>
                    <p className="text-xs text-[#40493d] mt-0.5">
                      Heritage heirloom crops harvested 14 km away at 06:15 AM
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#cbffc2] flex items-center justify-center shrink-0 text-[#002204]">
                    <ShieldCheck className="w-5 h-5 text-[#0d631b]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
