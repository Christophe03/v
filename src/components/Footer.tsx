import React from 'react';
import { Sprout, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: 'marketplace' | 'producers' | 'baskets' | 'seasonal') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  return (
    <footer className="bg-[#191c1d] text-[#f8f9fa] border-t border-[#2e3132] mt-20">
      
      {/* 4 Guarantees Banner */}
      <div className="border-b border-[#2e3132] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
            <div className="flex items-start gap-3">
              <Sprout className="w-5 h-5 text-[#88d982] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white font-semibold mb-0.5">Living Bio Soil</strong>
                <span className="text-[#bfcaba]">100% pesticide-free, biodynamic and heirloom seed heritage.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-[#88d982] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white font-semibold mb-0.5">24h Farm Gate Dispatch</strong>
                <span className="text-[#bfcaba]">Harvested at sunrise, on your kitchen table tomorrow morning.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <RefreshCw className="w-5 h-5 text-[#88d982] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white font-semibold mb-0.5">Zero Single-Use Plastic</strong>
                <span className="text-[#bfcaba]">Delivered in returnable wooden crates and natural cotton bags.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#88d982] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white font-semibold mb-0.5">Fair Grower Share</strong>
                <span className="text-[#bfcaba]">85% of each order directly compensates the independent farmer.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <span className="text-xl font-bold font-heading text-white tracking-tight">
              Terroir & Table
            </span>
            <p className="text-xs text-[#bfcaba] leading-relaxed max-w-sm">
              An artisanal food collective connecting conscious regional households with heirloom growers, natural bakers, and farmstead creameries.
            </p>
            <div className="pt-2 text-xs text-[#707a6c]">
              <span>Regional Hub: Val de Saône & Monts du Lyonnais</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Marketplace Navigation
            </h4>
            <ul className="space-y-1.5 text-xs text-[#bfcaba]">
              <li>
                <button
                  onClick={() => onNavigateTab('marketplace')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Daily Harvest Produce
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('producers')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Meet the Partner Growers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('baskets')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Weekly Curated Boxes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('seasonal')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Agrarian Peak Calendar
                </button>
              </li>
            </ul>
          </div>

          {/* Sourcing Charter */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Our Agrarian Commitment
            </h4>
            <p className="text-xs text-[#bfcaba] leading-relaxed">
              We never maintain central cold warehouse stocks. Products are ordered in real time from partner growers, harvested the morning of dispatch, and transported in dedicated refrigerated zero-emissions vans.
            </p>
            <p className="text-[11px] text-[#707a6c] pt-2">
              Interested grower? Inquiries open for certified organic farms within 50km.
            </p>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="border-t border-[#2e3132] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#707a6c] gap-4">
          <p>© {new Date().getFullYear()} Terroir & Table. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-[#bfcaba] cursor-pointer">Quality & Bio Charter</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-[#bfcaba] cursor-pointer">Returnable Crates</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-[#bfcaba] cursor-pointer">Delivery Coverage Map</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
