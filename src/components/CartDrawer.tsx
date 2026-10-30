import React from 'react';
import { CartItem } from '../types';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (item: CartItem, newQty: number) => void;
  onRemoveItem: (item: CartItem) => void;
  onProceedToCheckout: () => void;
  onExploreMarket: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onExploreMarket
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 45.0;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 4.50;
  const total = subtotal + shippingFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#e7e8e9]">
          
          {/* Cart Header */}
          <div className="px-6 py-5 border-b border-[#e7e8e9] flex items-center justify-between bg-[#f8f9fa] shrink-0">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#0d631b]" />
              <h2 className="text-lg font-bold text-[#191c1d] font-heading">
                Harvest Basket
              </h2>
              <span className="text-xs bg-[#cbffc2] text-[#002204] font-semibold px-2 py-0.5 rounded-full">
                {items.reduce((acc, i) => acc + i.quantity, 0)} items
              </span>
            </div>
            
            <button
              onClick={onClose}
              aria-label="Close basket"
              className="p-1.5 rounded-lg text-[#707a6c] hover:text-[#191c1d] hover:bg-[#edeeef] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Refrigerated Delivery Progress Bar */}
          <div className="bg-[#f3f4f5] px-6 py-3 border-b border-[#e7e8e9] shrink-0">
            {amountToFreeShipping > 0 ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-[#40493d]">
                  <span>Add <strong className="font-semibold text-[#0d631b] tabular-nums">${amountToFreeShipping.toFixed(2)}</strong> for free delivery</span>
                  <span className="tabular-nums font-medium">{Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100))}%</span>
                </div>
                <div className="w-full bg-[#d9dadb] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#0d631b] h-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0d631b]">
                <Truck className="w-4 h-4" />
                <span>You unlocked free morning refrigerated delivery!</span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#f3f4f5]">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#edeeef] flex items-center justify-center text-[#707a6c]">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#191c1d]">Your basket is empty</h3>
                  <p className="text-xs text-[#707a6c] mt-1 max-w-xs">
                    Explore heirloom crops, fresh bread, and pasture cheeses direct from regional farmers.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onExploreMarket();
                  }}
                  className="px-5 py-2.5 bg-[#0d631b] hover:bg-[#2e7d32] text-white text-xs font-semibold rounded-lg transition-all cursor-pointer shadow-xs"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.product.id} className="py-4 flex gap-4 items-center">
                  {/* Thumbnail */}
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-lg object-cover bg-[#f3f4f5] shrink-0 border border-[#e7e8e9]"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-[#707a6c] block truncate">
                      {item.product.producerName}
                    </span>
                    <h4 className="text-xs font-semibold text-[#191c1d] truncate">
                      {item.product.name}
                    </h4>
                    <span className="text-xs font-bold text-[#191c1d] tabular-nums mt-0.5 block">
                      ${(item.product.price * item.quantity).toFixed(2)}
                      <span className="text-[10px] font-normal text-[#707a6c] ml-1">
                        (${item.product.price.toFixed(2)} {item.product.unit})
                      </span>
                    </span>

                    {/* Stepper & Remove */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center bg-[#edeeef] rounded-md p-0.5 border border-[#d9dadb]">
                        <button
                          onClick={() => onUpdateQuantity(item, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#191c1d] hover:bg-white rounded transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-[#191c1d] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#191c1d] hover:bg-white rounded transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item)}
                        className="text-xs text-[#ac0c18] hover:text-[#707a6c] transition-colors p-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#e7e8e9] bg-[#f8f9fa] shrink-0 space-y-4">
              <div className="space-y-2 text-xs text-[#40493d]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#191c1d] tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Refrigerated Farm Van Delivery</span>
                  <span className="font-semibold text-[#191c1d] tabular-nums">
                    {shippingFee === 0 ? <span className="text-[#0d631b]">FREE</span> : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#191c1d] pt-2 border-t border-[#e7e8e9]">
                  <span>Total</span>
                  <span className="tabular-nums font-heading text-base">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Eco pledge reminder */}
              <div className="flex items-center gap-2 text-[11px] text-[#707a6c] bg-[#edeeef] p-2.5 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-[#0d631b] shrink-0" />
                <span>Zero-waste guarantee: Delivered in returnable natural wooden crates.</span>
              </div>

              {/* Proceed Button */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 px-4 bg-[#0d631b] hover:bg-[#2e7d32] active:bg-[#005312] text-white font-bold text-sm rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Delivery & Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
