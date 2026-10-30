import React from 'react';
import { ShoppingBag, Search, Sparkles, MapPin } from 'lucide-react';

interface NavbarProps {
  activeTab: 'marketplace' | 'producers' | 'baskets' | 'seasonal';
  setActiveTab: (tab: 'marketplace' | 'producers' | 'baskets' | 'seasonal') => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedPostal: string;
  onChangePostal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  cartTotal,
  onOpenCart,
  searchQuery,
  setSearchQuery,
  selectedPostal,
  onChangePostal
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#f8f9fa]/95 backdrop-blur-md border-b border-[#e7e8e9]">
      {/* Slim Top Delivery Alert Bar */}
      <div className="bg-[#0d631b] text-white text-xs py-1.5 px-4 text-center font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span>Fresh morning harvest dispatch</span>
          <span aria-hidden="true">·</span>
          <span>Order within the next 4 hours for tomorrow morning's delivery</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#cbffc2]">Free refrigerated delivery over $45</span>
        </div>
      </div>

      {/* Main Top Bar adhering to the strict 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          
          {/* Zone 1: Single Text Element Brand Wordmark */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => setActiveTab('marketplace')}
              className="text-left group cursor-pointer"
            >
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold tracking-tight text-[#191c1d] font-heading group-hover:text-[#0d631b] transition-colors whitespace-nowrap">
                  Terroir & Table
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0d631b] hidden sm:inline">
                  Artisanal
                </span>
              </div>
            </button>

            {/* Quiet location selector */}
            <button 
              onClick={onChangePostal}
              className="hidden lg:flex items-center gap-1.5 text-xs text-[#40493d] hover:text-[#0d631b] transition-colors pl-3 border-l border-[#d9dadb] cursor-pointer"
              title="Change Delivery Postal Code"
            >
              <MapPin className="w-3.5 h-3.5 text-[#0d631b]" />
              <span className="whitespace-nowrap">Delivering to <strong className="font-semibold text-[#191c1d]">{selectedPostal}</strong></span>
            </button>
          </div>

          {/* Zone 2: 4 Clean Single-Line Text Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button
              onClick={() => setActiveTab('marketplace')}
              className={`whitespace-nowrap transition-colors py-1 cursor-pointer border-b-2 ${
                activeTab === 'marketplace'
                  ? 'border-[#0d631b] text-[#0d631b] font-semibold'
                  : 'border-transparent text-[#40493d] hover:text-[#191c1d]'
              }`}
            >
              Marketplace
            </button>

            <button
              onClick={() => setActiveTab('producers')}
              className={`whitespace-nowrap transition-colors py-1 cursor-pointer border-b-2 ${
                activeTab === 'producers'
                  ? 'border-[#0d631b] text-[#0d631b] font-semibold'
                  : 'border-transparent text-[#40493d] hover:text-[#191c1d]'
              }`}
            >
              Producers & Farms
            </button>

            <button
              onClick={() => setActiveTab('baskets')}
              className={`whitespace-nowrap transition-colors py-1 cursor-pointer border-b-2 ${
                activeTab === 'baskets'
                  ? 'border-[#0d631b] text-[#0d631b] font-semibold'
                  : 'border-transparent text-[#40493d] hover:text-[#191c1d]'
              }`}
            >
              Harvest Baskets
            </button>

            <button
              onClick={() => setActiveTab('seasonal')}
              className={`whitespace-nowrap transition-colors py-1 cursor-pointer border-b-2 ${
                activeTab === 'seasonal'
                  ? 'border-[#0d631b] text-[#0d631b] font-semibold'
                  : 'border-transparent text-[#40493d] hover:text-[#191c1d]'
              }`}
            >
              Seasonal Calendar
            </button>
          </nav>

          {/* Zone 3: Search affordance + Primary Action: Cart */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Search Input */}
            <div className="relative hidden sm:block w-48 lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#707a6c]" />
              <input
                type="text"
                placeholder="Search heirloom, baker..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#edeeef] hover:bg-[#e7e8e9] focus:bg-white text-xs text-[#191c1d] rounded-lg pl-9 pr-3 py-2 border border-transparent focus:border-[#0d631b] focus:outline-none transition-all placeholder:text-[#707a6c]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#707a6c] hover:text-[#191c1d]"
                >
                  ×
                </button>
              )}
            </div>

            {/* Primary Action Button: Cart Drawer */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2.5 px-4 py-2.5 bg-[#0d631b] hover:bg-[#2e7d32] active:bg-[#005312] text-white rounded-lg transition-all shadow-sm cursor-pointer whitespace-nowrap"
              aria-label={`Shopping Cart with ${cartCount} items`}
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#fcab28] text-[#2a1800] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold hidden sm:inline">Basket</span>
              {cartTotal > 0 && (
                <span className="text-xs font-medium tabular-nums pl-1 border-l border-white/20">
                  ${cartTotal.toFixed(2)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex md:hidden items-center justify-between border-t border-[#e7e8e9] py-2.5 overflow-x-auto gap-4 no-scrollbar">
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`text-xs whitespace-nowrap font-medium px-2 py-1 rounded-md ${
              activeTab === 'marketplace' ? 'bg-[#cbffc2] text-[#002204]' : 'text-[#40493d]'
            }`}
          >
            Marketplace
          </button>
          <button
            onClick={() => setActiveTab('producers')}
            className={`text-xs whitespace-nowrap font-medium px-2 py-1 rounded-md ${
              activeTab === 'producers' ? 'bg-[#cbffc2] text-[#002204]' : 'text-[#40493d]'
            }`}
          >
            Farms & Growers
          </button>
          <button
            onClick={() => setActiveTab('baskets')}
            className={`text-xs whitespace-nowrap font-medium px-2 py-1 rounded-md ${
              activeTab === 'baskets' ? 'bg-[#cbffc2] text-[#002204]' : 'text-[#40493d]'
            }`}
          >
            Harvest Boxes
          </button>
          <button
            onClick={() => setActiveTab('seasonal')}
            className={`text-xs whitespace-nowrap font-medium px-2 py-1 rounded-md ${
              activeTab === 'seasonal' ? 'bg-[#cbffc2] text-[#002204]' : 'text-[#40493d]'
            }`}
          >
            In Season Now
          </button>
        </div>
      </div>
    </header>
  );
};
