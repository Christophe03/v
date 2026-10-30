import React from 'react';
import { SEASONAL_CALENDAR } from '../data/mockData';
import { Calendar, Leaf, Sparkles, ArrowRight, Sun, Snowflake } from 'lucide-react';
import { Product } from '../types';

interface SeasonalCalendarViewProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SeasonalCalendarView: React.FC<SeasonalCalendarViewProps> = ({
  products,
  onSelectProduct
}) => {
  const seasonalHighlights = products.filter(p => p.isSeasonalHighlight);

  return (
    <div className="space-y-10 py-6">
      {/* Intro Header */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#835400] mb-2">
          <span>Agrarian Almanac</span>
          <span aria-hidden="true">·</span>
          <span>True Seasonality</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#0d631b]">Unheated Greenhouses Only</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#191c1d] font-heading tracking-tight">
          What the Earth is Giving Right Now
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[#40493d] leading-relaxed">
          Industrial agriculture forces strawberries in December. Terroir & Table follows natural sun and soil calendars, guaranteeing nutrient density, peak essential sugars, and zero heated-greenhouse carbon waste.
        </p>
      </div>

      {/* Current Peak Harvest Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SEASONAL_CALENDAR.map((period, index) => (
          <div
            key={period.month}
            className={`p-6 rounded-2xl border ${
              index === 0
                ? 'bg-white border-[#0d631b]/30 shadow-md ring-1 ring-[#0d631b]/20'
                : 'bg-[#f8f9fa] border-[#e7e8e9]'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {index === 0 ? (
                  <Sun className="w-5 h-5 text-[#835400]" />
                ) : (
                  <Snowflake className="w-5 h-5 text-[#707a6c]" />
                )}
                <h3 className="text-lg font-bold text-[#191c1d] font-heading">
                  {period.month}
                </h3>
              </div>
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  index === 0
                    ? 'bg-[#cbffc2] text-[#002204]'
                    : 'bg-[#edeeef] text-[#40493d]'
                }`}
              >
                {period.status}
              </span>
            </div>

            <p className="text-xs text-[#40493d] leading-relaxed mb-6">
              {period.description}
            </p>

            <div className="grid grid-cols-2 gap-3">
              {period.items.map((item) => (
                <div
                  key={item.name}
                  className="p-3 bg-white rounded-xl border border-[#e7e8e9] space-y-1"
                >
                  <span className="text-[10px] text-[#835400] font-semibold uppercase tracking-wider block">
                    {item.tag}
                  </span>
                  <span className="text-xs font-bold text-[#191c1d] block">
                    {item.name}
                  </span>
                  <span className="text-[11px] text-[#0d631b] font-medium block">
                    {item.peak}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Featured in-season products from our catalog */}
      <div className="pt-6 border-t border-[#e7e8e9]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-[#191c1d] font-heading">
              Available to Order for Tomorrow's Delivery
            </h3>
            <p className="text-xs text-[#707a6c]">
              Directly harvested from local soil this morning
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {seasonalHighlights.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="bg-white rounded-xl border border-[#e7e8e9] overflow-hidden hover:border-[#0d631b] transition-all cursor-pointer group"
            >
              <div className="relative aspect-[4/3] bg-[#f3f4f5]">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 bg-[#0d631b] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  Peak Today
                </div>
              </div>
              <div className="p-3.5 space-y-1">
                <span className="text-[10px] text-[#707a6c] block truncate">
                  {product.producerName}
                </span>
                <h4 className="text-xs font-bold text-[#191c1d] group-hover:text-[#0d631b] transition-colors truncate">
                  {product.name}
                </h4>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-bold text-[#191c1d] tabular-nums">
                    ${product.price.toFixed(2)} <span className="text-[10px] font-normal text-[#707a6c]">{product.unit}</span>
                  </span>
                  <span className="text-[11px] text-[#0d631b] font-semibold flex items-center gap-0.5">
                    View <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
