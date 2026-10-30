import React, { useState } from 'react';
import { Producer, Product } from '../types';
import { MapPin, Award, Calendar, Star, ArrowRight, ShieldCheck } from 'lucide-react';

interface ProducersViewProps {
  producers: Producer[];
  products: Product[];
  onSelectProducerProducts: (producerId: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProducersView: React.FC<ProducersViewProps> = ({
  producers,
  products,
  onSelectProducerProducts,
  onSelectProduct,
  onAddToCart
}) => {
  const [selectedProducerId, setSelectedProducerId] = useState<string | null>(null);

  const selectedProducer = producers.find(p => p.id === selectedProducerId) || null;
  const producerProducts = selectedProducerId
    ? products.filter(p => p.producerId === selectedProducerId)
    : [];

  return (
    <div className="space-y-10 py-6">
      {/* Intro Header */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#835400] mb-2">
          <span>Direct Farm Alliances</span>
          <span aria-hidden="true">·</span>
          <span>Zero Middlemen</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#0d631b]">Fair Farmer Compensation</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#191c1d] font-heading tracking-tight">
          Meet the Independent Growers, Bakers & Herders
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[#40493d] leading-relaxed">
          Every harvest item on Terroir & Table originates from a named family farmstead within 50 kilometers. Growers set their own prices and receive 85% of each sale.
        </p>
      </div>

      {/* Producer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {producers.map((producer) => {
          const farmProducts = products.filter(p => p.producerId === producer.id);

          return (
            <article
              key={producer.id}
              className="bg-white rounded-xl border border-[#e7e8e9] overflow-hidden hover:border-[#bfcaba] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Cover Banner */}
                <div className="relative h-44 bg-[#f3f4f5] overflow-hidden">
                  <img
                    src={producer.coverUrl}
                    alt={producer.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Distance Pill / Tag */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-[#0d631b] text-[11px] font-bold px-2 py-0.5 rounded-sm shadow-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{producer.distanceKm} km away</span>
                  </div>

                  {/* Rating */}
                  <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-white text-xs font-medium">
                    <Star className="w-3.5 h-3.5 text-[#fcab28] fill-[#fcab28]" />
                    <span className="tabular-nums font-bold">{producer.rating.toFixed(2)}</span>
                    <span className="opacity-80">· Est. {producer.establishedYear}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-xs font-semibold text-[#835400] block">{producer.craft}</span>
                    <h3 className="text-lg font-bold text-[#191c1d] mt-0.5 font-heading">
                      {producer.name}
                    </h3>
                    <p className="text-xs text-[#707a6c] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#707a6c]" />
                      <span>{producer.location}</span>
                    </p>
                  </div>

                  <p className="text-xs text-[#40493d] line-clamp-3 leading-relaxed">
                    {producer.bio}
                  </p>

                  {/* Specialties (Clean unboxed inline list) */}
                  <div className="pt-2 border-t border-[#f3f4f5] text-xs">
                    <span className="text-[11px] text-[#707a6c] block mb-1">Key Specialties:</span>
                    <div className="flex flex-wrap gap-1 text-[11px] text-[#191c1d]">
                      {producer.specialties.map((spec, i) => (
                        <span key={spec} className="bg-[#f3f4f5] px-2 py-0.5 rounded">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="flex flex-wrap gap-1 text-[10px] text-[#0d631b] font-medium pt-1">
                    {producer.certifications.map((cert) => (
                      <span key={cert} className="flex items-center gap-1 bg-[#cbffc2]/40 px-2 py-0.5 rounded">
                        <ShieldCheck className="w-3 h-3" />
                        <span>{cert}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectProducerProducts(producer.id)}
                  className="w-full py-2.5 px-4 bg-[#f8f9fa] hover:bg-[#0d631b] hover:text-white border border-[#d9dadb] hover:border-transparent text-[#191c1d] text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>View All {farmProducts.length} Items</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
