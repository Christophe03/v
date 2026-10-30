import React, { useState } from 'react';
import { Product } from '../types';
import { Plus, Minus, Check, Star, MapPin } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  onAddToCart: (product: Product, quantity?: number) => void;
  onUpdateQuantity: (product: Product, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantityInCart,
  onAddToCart,
  onUpdateQuantity,
  onSelectProduct
}) => {
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateQuantity(product, quantityInCart + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateQuantity(product, Math.max(0, quantityInCart - 1));
  };

  return (
    <article
      onClick={() => onSelectProduct(product)}
      className="group flex flex-col bg-white rounded-xl border border-[#e7e8e9] overflow-hidden hover:border-[#bfcaba] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
    >
      {/* Visual Slot: Product Image taking ~68% of visual impact */}
      <div className="relative aspect-[4/3] bg-[#f3f4f5] overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-300 ease-out"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80';
          }}
        />

        {/* Quiet Harvest Tag if available (single subtle tag, not pill spam) */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-[#0d631b] text-[11px] font-semibold px-2 py-0.5 rounded-sm shadow-xs border border-[#e7e8e9]">
            {product.badge}
          </div>
        )}

        {/* Rating overlay */}
        <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-sm flex items-center gap-1">
          <Star className="w-3 h-3 text-[#fcab28] fill-[#fcab28]" />
          <span className="tabular-nums">{product.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Quiet Unboxed Metadata: Producer & Distance */}
          <div className="flex items-center gap-1.5 text-xs text-[#707a6c] mb-1">
            <span className="truncate font-medium text-[#40493d]">{product.producerName}</span>
            <span aria-hidden="true">·</span>
            <span className="shrink-0">{product.producerDistance}</span>
          </div>

          {/* Product Title */}
          <h3 className="text-sm sm:text-base font-semibold text-[#191c1d] group-hover:text-[#0d631b] transition-colors leading-snug line-clamp-2">
            {product.name}
          </h3>

          {/* Dietary Attributes (Clean unboxed inline text) */}
          <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-[#707a6c] flex-wrap">
            {product.dietary.map((tag, idx) => (
              <React.Fragment key={tag}>
                {idx > 0 && <span aria-hidden="true">·</span>}
                <span className="text-[#0d631b] font-medium">{tag}</span>
              </React.Fragment>
            ))}
            <span aria-hidden="true">·</span>
            <span>{product.weightLabel}</span>
          </div>
        </div>

        {/* Bottom Price & Purchase Action Row */}
        <div className="mt-4 pt-3 border-t border-[#f3f4f5] flex items-center justify-between gap-2">
          
          {/* Price & Unit */}
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-base sm:text-lg font-bold text-[#191c1d] tabular-nums">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs text-[#707a6c]">
                {product.unit}
              </span>
            </div>
            <span className="text-[10px] text-[#707a6c] block">
              {product.harvestDate.includes('today') ? 'Harvested today' : 'Fresh reserve'}
            </span>
          </div>

          {/* Action: Stepper if in cart, or Quick Add button */}
          <div onClick={(e) => e.stopPropagation()}>
            {quantityInCart > 0 ? (
              <div className="flex items-center bg-[#edeeef] rounded-lg p-0.5 border border-[#d9dadb]">
                <button
                  onClick={handleDecrement}
                  aria-label="Decrease quantity"
                  className="w-7 h-7 flex items-center justify-center rounded-md text-[#191c1d] hover:bg-white active:bg-[#d9dadb] transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-7 text-center text-xs font-bold text-[#191c1d] tabular-nums">
                  {quantityInCart}
                </span>
                <button
                  onClick={handleIncrement}
                  aria-label="Increase quantity"
                  className="w-7 h-7 flex items-center justify-center rounded-md text-[#191c1d] hover:bg-white active:bg-[#d9dadb] transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleQuickAdd}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  justAdded
                    ? 'bg-[#cbffc2] text-[#002204]'
                    : 'bg-[#f3f4f5] hover:bg-[#0d631b] text-[#191c1d] hover:text-white border border-[#d9dadb] hover:border-transparent'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#0d631b]" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </>
                )}
              </button>
            )}
          </div>

        </div>

      </div>
    </article>
  );
};
