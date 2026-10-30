import React, { useState } from 'react';
import { Product } from '../types';
import { X, Plus, Minus, Star, MapPin, ShieldCheck, Sprout, Clock, Check, Heart, Share2 } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  currentQuantityInCart: number;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  currentQuantityInCart
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Backdrop Click Dismiss */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-[#e7e8e9] overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto">
        
        {/* Header Bar with Close Button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e7e8e9] bg-[#f8f9fa] shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#707a6c]">
            <span className="font-semibold text-[#0d631b] uppercase tracking-wider">{product.category}</span>
            <span aria-hidden="true">/</span>
            <span className="truncate">{product.name}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              aria-label="Add to favorites"
              className="p-2 rounded-lg text-[#707a6c] hover:text-[#ac0c18] hover:bg-[#edeeef] transition-colors cursor-pointer"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#ac0c18] text-[#ac0c18]' : ''}`} />
            </button>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 rounded-lg text-[#707a6c] hover:text-[#191c1d] hover:bg-[#edeeef] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Visual Gallery */}
            <div className="md:col-span-6 space-y-4">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#f3f4f5] border border-[#e7e8e9]">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#0d631b] text-xs font-semibold px-2.5 py-1 rounded shadow-xs border border-[#e7e8e9]">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Producer Micro-Banner */}
              <div className="p-4 rounded-xl bg-[#f8f9fa] border border-[#e7e8e9] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#cbffc2] text-[#002204] flex items-center justify-center font-bold text-sm shrink-0">
                    {product.producerName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#191c1d] leading-snug">
                      {product.producerName}
                    </h4>
                    <p className="text-[11px] text-[#707a6c] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#0d631b]" />
                      <span>{product.producerRegion} ({product.producerDistance})</span>
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-[#0d631b] bg-[#cbffc2] px-2 py-0.5 rounded font-semibold block">
                    Direct Partner
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Contiguous Purchase Module */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                {/* Clean Unboxed Metadata */}
                <div className="flex items-center gap-2 text-xs text-[#707a6c] flex-wrap">
                  <div className="flex items-center gap-1 text-[#835400] font-semibold">
                    <Star className="w-3.5 h-3.5 fill-[#fcab28] text-[#fcab28]" />
                    <span className="tabular-nums">{product.rating.toFixed(2)}</span>
                    <span className="text-[#707a6c]">({product.reviewCount} verified reviews)</span>
                  </div>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#0d631b] font-medium">{product.harvestDate}</span>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-[#191c1d] font-heading leading-tight">
                  {product.name}
                </h2>

                {/* Pricing Block */}
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-[#191c1d] tabular-nums font-heading">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm font-medium text-[#707a6c]">
                    {product.unit} ({product.weightLabel})
                  </span>
                </div>

                {/* Dietary Tags (Clean unboxed inline list) */}
                <div className="flex items-center gap-2 text-xs font-medium text-[#0d631b] pt-1">
                  <span>Certified:</span>
                  {product.dietary.map((tag, idx) => (
                    <React.Fragment key={tag}>
                      {idx > 0 && <span className="text-[#d9dadb]" aria-hidden="true">·</span>}
                      <span className="bg-[#f3f4f5] px-2 py-0.5 rounded text-[#191c1d]">{tag}</span>
                    </React.Fragment>
                  ))}
                </div>

                {/* Description */}
                <div className="pt-2 text-sm text-[#40493d] leading-relaxed">
                  <p>{product.description}</p>
                </div>

                {/* Origin Story */}
                <div className="p-3.5 rounded-lg bg-[#f8f9fa] border border-[#e7e8e9] text-xs text-[#40493d] space-y-1">
                  <span className="font-semibold text-[#191c1d] block">Farm Origin & Terroir:</span>
                  <p className="leading-normal">{product.originStory}</p>
                </div>

                {/* Storage Advice */}
                <div className="text-xs text-[#707a6c] flex items-start gap-2">
                  <Clock className="w-4 h-4 text-[#835400] shrink-0 mt-0.5" />
                  <span><strong>Storage Tip:</strong> {product.storageTip}</span>
                </div>
              </div>

              {/* Purchase Module: Quantity Stepper & Add to Basket Button */}
              <div className="pt-6 border-t border-[#e7e8e9] space-y-3">
                <div className="flex items-center gap-4">
                  
                  {/* Quantity Stepper */}
                  <div className="flex items-center bg-[#edeeef] rounded-lg p-1 border border-[#d9dadb]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      aria-label="Decrease quantity"
                      className="w-9 h-9 flex items-center justify-center rounded-md text-[#191c1d] hover:bg-white active:bg-[#d9dadb] transition-colors cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center text-sm font-bold text-[#191c1d] tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      aria-label="Increase quantity"
                      className="w-9 h-9 flex items-center justify-center rounded-md text-[#191c1d] hover:bg-white active:bg-[#d9dadb] transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Basket Action */}
                  <button
                    onClick={handleAdd}
                    className={`flex-1 py-3 px-6 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer ${
                      addedSuccess
                        ? 'bg-[#cbffc2] text-[#002204]'
                        : 'bg-[#0d631b] hover:bg-[#2e7d32] active:bg-[#005312] text-white'
                    }`}
                  >
                    {addedSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-[#0d631b]" />
                        <span>Added to Harvest Basket!</span>
                      </>
                    ) : (
                      <>
                        <span>Add {quantity > 1 ? `${quantity} to Basket` : 'to Basket'}</span>
                        <span className="tabular-nums opacity-90">· ${(product.price * quantity).toFixed(2)}</span>
                      </>
                    )}
                  </button>

                </div>

                {currentQuantityInCart > 0 && (
                  <p className="text-xs text-[#0d631b] text-center font-medium">
                    You currently have {currentQuantityInCart} in your basket
                  </p>
                )}
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
