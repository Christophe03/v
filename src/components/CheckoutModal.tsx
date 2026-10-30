import React, { useState } from 'react';
import { CartItem, Order } from '../types';
import { X, CheckCircle2, Truck, ShieldCheck, Clock, MapPin, CreditCard, Banknote, Calendar, ArrowRight } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderSuccess: (order: Order) => void;
  defaultPostal: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderSuccess,
  defaultPostal
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
  const deliveryFee = subtotal >= 45 ? 0 : 4.50;
  const total = subtotal + deliveryFee;

  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');
  const [name, setName] = useState('Eleanor Vance');
  const [phone, setPhone] = useState('+33 6 42 18 90 22');
  const [address, setAddress] = useState('14 Rue des Pierres Plantées, 69001 Lyon');
  const [postal, setPostal] = useState(defaultPostal || '69001');
  const [slot, setSlot] = useState('Tomorrow Morning (08:00 - 11:00 AM)');
  const [deliveryDate, setDeliveryDate] = useState('Tomorrow, Saturday Oct 31');
  const [deliveryNotes, setDeliveryNotes] = useState('Leave crate at wooden porch gate if not answered.');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'applepay'>('card');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder: Order = {
      id: `TT-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: [...cartItems],
      subtotal,
      deliveryFee,
      total,
      deliverySlot: slot,
      deliveryDate,
      recipientName: name,
      address,
      phone,
      paymentMethod: paymentMethod === 'card' ? 'Visa •••• 4242' : paymentMethod === 'applepay' ? 'Apple Pay' : 'Cash upon Delivery',
      status: 'Harvesting'
    };

    setConfirmedOrder(newOrder);
    setStep('confirmed');
    onOrderSuccess(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs">
      <div className="fixed inset-0" onClick={step === 'confirmed' ? onClose : undefined} aria-hidden="true" />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#e7e8e9] overflow-hidden z-10 flex flex-col my-auto max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#e7e8e9] bg-[#f8f9fa] flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-base font-bold text-[#191c1d] font-heading">
              {step === 'details' && 'Step 1: Delivery Slot & Address'}
              {step === 'payment' && 'Step 2: Choose Payment Method'}
              {step === 'confirmed' && 'Order Confirmed & Farm Dispatched'}
            </h3>
            <p className="text-xs text-[#707a6c]">
              {step !== 'confirmed' ? 'Refrigerated regional zero-emissions delivery' : 'Your harvest order receipt'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#707a6c] hover:text-[#191c1d] hover:bg-[#edeeef] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto">
          {step === 'details' && (
            <div className="space-y-6">
              
              {/* Delivery Slot Selection */}
              <div>
                <label className="text-xs font-bold text-[#191c1d] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#0d631b]" />
                  <span>Select Morning Delivery Window</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { label: 'Morning Slot', time: 'Tomorrow 08:00 – 11:00 AM', tag: 'Fresh Harvest' },
                    { label: 'Afternoon Slot', time: 'Tomorrow 02:00 – 05:00 PM', tag: 'Standard' },
                    { label: 'Evening Slot', time: 'Tomorrow 06:00 – 08:30 PM', tag: 'After Work' }
                  ].map((s) => (
                    <button
                      key={s.time}
                      type="button"
                      onClick={() => setSlot(s.time)}
                      className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                        slot === s.time
                          ? 'border-[#0d631b] bg-[#cbffc2]/30 text-[#002204] ring-1 ring-[#0d631b]'
                          : 'border-[#d9dadb] bg-white hover:border-[#707a6c]'
                      }`}
                    >
                      <span className="text-[11px] font-semibold text-[#835400] block">{s.label}</span>
                      <span className="text-xs font-bold text-[#191c1d] block mt-0.5">{s.time}</span>
                      <span className="text-[10px] text-[#707a6c] mt-1 block">{s.tag}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery Address Form */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-[#191c1d] uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#0d631b]" />
                  <span>Recipient & Delivery Address</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-[#707a6c] block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs p-2.5 bg-[#f8f9fa] border border-[#d9dadb] rounded-lg focus:bg-white focus:border-[#0d631b] focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#707a6c] block mb-1">Mobile Phone (Delivery SMS)</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs p-2.5 bg-[#f8f9fa] border border-[#d9dadb] rounded-lg focus:bg-white focus:border-[#0d631b] focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-[#707a6c] block mb-1">Street Address, Apt / Floor</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full text-xs p-2.5 bg-[#f8f9fa] border border-[#d9dadb] rounded-lg focus:bg-white focus:border-[#0d631b] focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-[#707a6c] block mb-1">Postal Code</label>
                    <input
                      type="text"
                      value={postal}
                      onChange={(e) => setPostal(e.target.value)}
                      className="w-full text-xs p-2.5 bg-[#f8f9fa] border border-[#d9dadb] rounded-lg focus:bg-white focus:border-[#0d631b] focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#707a6c] block mb-1">Delivery Instruction</label>
                    <input
                      type="text"
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      placeholder="e.g. Code 4812, ring twice"
                      className="w-full text-xs p-2.5 bg-[#f8f9fa] border border-[#d9dadb] rounded-lg focus:bg-white focus:border-[#0d631b] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Order Summary Strip */}
              <div className="p-3.5 bg-[#f3f4f5] rounded-xl flex items-center justify-between text-xs text-[#40493d]">
                <div>
                  <span>Total for {cartItems.length} harvest items</span>
                  <span className="block text-[11px] text-[#707a6c]">Including refrigerated van transport</span>
                </div>
                <span className="text-base font-bold text-[#191c1d] tabular-nums font-heading">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Continue Button */}
              <button
                type="button"
                onClick={() => setStep('payment')}
                className="w-full py-3 bg-[#0d631b] hover:bg-[#2e7d32] text-white text-xs font-bold rounded-lg transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Continue to Payment Selection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-[#191c1d] uppercase tracking-wider mb-3 block">
                  Select Payment Method
                </label>
                
                <div className="space-y-2.5">
                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#0d631b] bg-[#cbffc2]/20 ring-1 ring-[#0d631b]'
                        : 'border-[#d9dadb] hover:border-[#707a6c]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-[#0d631b]" />
                      <div>
                        <span className="text-xs font-bold text-[#191c1d] block">Credit / Debit Card</span>
                        <span className="text-[11px] text-[#707a6c]">Visa, Mastercard, Cartes Bancaires</span>
                      </div>
                    </div>
                    <span className="text-xs text-[#707a6c] font-mono">•••• 4242</span>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('applepay')}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'applepay'
                        ? 'border-[#0d631b] bg-[#cbffc2]/20 ring-1 ring-[#0d631b]'
                        : 'border-[#d9dadb] hover:border-[#707a6c]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 flex items-center justify-center font-bold text-xs bg-black text-white rounded">
                        
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#191c1d] block">Apple Pay</span>
                        <span className="text-[11px] text-[#707a6c]">Instant 1-touch authentication</span>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#0d631b] bg-[#cbffc2]/20 ring-1 ring-[#0d631b]'
                        : 'border-[#d9dadb] hover:border-[#707a6c]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Banknote className="w-5 h-5 text-[#835400]" />
                      <div>
                        <span className="text-xs font-bold text-[#191c1d] block">Cash on Delivery (Farm Driver)</span>
                        <span className="text-[11px] text-[#707a6c]">Pay exact amount upon inspection of crates</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-[#0d631b] bg-[#cbffc2] px-2 py-0.5 rounded font-semibold">
                      Zero Fees
                    </span>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-[#f8f9fa] rounded-xl p-4 border border-[#e7e8e9] space-y-2 text-xs text-[#40493d]">
                <div className="flex justify-between">
                  <span>Farm produce subtotal</span>
                  <span className="tabular-nums font-medium text-[#191c1d]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Refrigerated van dispatch</span>
                  <span className="tabular-nums font-medium text-[#191c1d]">
                    {deliveryFee === 0 ? 'FREE ($45+ threshold)' : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Returnable Wooden Crate Deposit</span>
                  <span className="text-[#0d631b] font-medium">$0.00 (Free Loan)</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#191c1d] pt-2 border-t border-[#e7e8e9]">
                  <span>Total Due</span>
                  <span className="tabular-nums font-heading text-base">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="px-4 py-3 border border-[#d9dadb] rounded-lg text-xs font-semibold text-[#191c1d] hover:bg-[#edeeef] cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="flex-1 py-3 bg-[#0d631b] hover:bg-[#2e7d32] text-white text-xs font-bold rounded-lg transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Confirm Harvest Order (${total.toFixed(2)})</span>
                </button>
              </div>
            </div>
          )}

          {step === 'confirmed' && confirmedOrder && (
            <div className="space-y-6 text-center py-2">
              <div className="w-14 h-14 bg-[#cbffc2] rounded-full flex items-center justify-center mx-auto text-[#002204]">
                <CheckCircle2 className="w-8 h-8 text-[#0d631b]" />
              </div>

              <div>
                <span className="text-xs font-bold text-[#835400] tracking-wider uppercase block">
                  Order Dispatched to Growers
                </span>
                <h3 className="text-xl font-bold text-[#191c1d] font-heading mt-1">
                  Order #{confirmedOrder.id} Confirmed!
                </h3>
                <p className="text-xs text-[#40493d] mt-1 max-w-md mx-auto">
                  Thank you, {confirmedOrder.recipientName}. The growers have received your morning harvest sheet. You will receive an SMS when the driver leaves the hub.
                </p>
              </div>

              {/* Live Farm Progress Timeline */}
              <div className="bg-[#f8f9fa] rounded-xl p-4 border border-[#e7e8e9] text-left">
                <h4 className="text-xs font-bold text-[#191c1d] mb-3">Live Order Status:</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs">
                    <div className="w-6 h-6 rounded-full bg-[#0d631b] text-white flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </div>
                    <div>
                      <span className="font-semibold text-[#191c1d] block">Order Received by Farmstead</span>
                      <span className="text-[10px] text-[#707a6c]">Transmitted directly to 3 growers</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <div className="w-6 h-6 rounded-full bg-[#cbffc2] text-[#002204] flex items-center justify-center text-[10px] font-bold">
                      2
                    </div>
                    <div>
                      <span className="font-semibold text-[#191c1d] block">Harvesting & Oven Baking</span>
                      <span className="text-[10px] text-[#707a6c]">Early dawn schedule (05:00 - 07:00 AM)</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs opacity-60">
                    <div className="w-6 h-6 rounded-full bg-[#edeeef] text-[#707a6c] flex items-center justify-center text-[10px] font-bold">
                      3
                    </div>
                    <div>
                      <span className="font-semibold text-[#191c1d] block">Refrigerated Van Delivery</span>
                      <span className="text-[10px] text-[#707a6c]">{confirmedOrder.deliverySlot}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Receipt Snapshot */}
              <div className="text-xs text-left text-[#40493d] p-3.5 bg-[#f3f4f5] rounded-xl space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#707a6c]">Delivery Address:</span>
                  <span className="font-medium text-[#191c1d] truncate max-w-[240px]">{confirmedOrder.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#707a6c]">Time Window:</span>
                  <span className="font-medium text-[#0d631b]">{confirmedOrder.deliverySlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#707a6c]">Payment Method:</span>
                  <span className="font-medium text-[#191c1d]">{confirmedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[#191c1d] pt-2 border-t border-[#d9dadb]">
                  <span>Total Amount Paid:</span>
                  <span className="tabular-nums">${confirmedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 bg-[#0d631b] hover:bg-[#2e7d32] text-white text-xs font-bold rounded-lg transition-all cursor-pointer"
              >
                Return to Marketplace
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
