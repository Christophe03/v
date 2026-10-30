import React, { useState, useMemo } from 'react';
import { Product, CartItem, Order, HarvestBasket } from './types';
import { PRODUCTS, PRODUCERS, HARVEST_BASKETS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryFilterBar } from './components/CategoryFilterBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProducersView } from './components/ProducersView';
import { HarvestBasketsView } from './components/HarvestBasketsView';
import { SeasonalCalendarView } from './components/SeasonalCalendarView';
import { Footer } from './components/Footer';
import { ShoppingBag, Check, MapPin, X } from 'lucide-react';

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<'marketplace' | 'producers' | 'baskets' | 'seasonal'>('marketplace');
  
  // Filtering & Search
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPostalModalOpen, setIsPostalModalOpen] = useState(false);
  const [selectedPostal, setSelectedPostal] = useState('69001 Lyon');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart State (Initialized with 1 fresh item for immediate tactile feel)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1 }
  ]);

  // Orders State
  const [pastOrders, setPastOrders] = useState<Order[]>([]);

  // Cart helper calculations
  const cartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cartItems]);

  // Toast notification trigger
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, qty: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    showToast(`Added ${qty} × ${product.name} to basket`);
  };

  const handleUpdateQuantity = (product: Product, quantity: number) => {
    setCartItems(prev => {
      if (quantity <= 0) {
        return prev.filter(item => item.product.id !== product.id);
      }
      return prev.map(item =>
        item.product.id === product.id ? { ...item, quantity } : item
      );
    });
  };

  const handleRemoveFromCart = (item: CartItem) => {
    setCartItems(prev => prev.filter(i => i.product.id !== item.product.id));
    showToast(`Removed ${item.product.name} from basket`);
  };

  const handleAddBasketToCart = (basket: HarvestBasket) => {
    // Convert basket items to matching products or a bundle item
    const bundleProduct: Product = {
      id: `basket-${basket.id}`,
      name: basket.name,
      producerId: 'prod-1',
      producerName: 'Terroir & Table Curated Box',
      producerDistance: 'Regional Alliance',
      producerRegion: 'Local Farm Network',
      category: 'produce',
      price: basket.price,
      unit: 'per crate',
      weightLabel: `${basket.itemsCount} curated items`,
      rating: 5.0,
      reviewCount: 42,
      imageUrl: basket.imageUrl,
      dietary: ['Bio', 'Local'],
      description: basket.description,
      originStory: basket.seasonalNote,
      harvestDate: 'Packed morning of delivery',
      storageTip: 'Unpack into crisper and bread box upon arrival.',
      inStock: true,
      stockQuantity: 10,
      badge: 'Zero-Waste Crate'
    };

    handleAddToCart(bundleProduct, 1);
  };

  const handleOrderSuccess = (order: Order) => {
    setPastOrders(prev => [order, ...prev]);
    setCartItems([]); // Clear cart after confirmed order
    showToast(`Order #${order.id} confirmed!`);
  };

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Dietary filter
      if (selectedDietary.length > 0) {
        const matchesAllDietary = selectedDietary.every(tag =>
          product.dietary.includes(tag as any)
        );
        if (!matchesAllDietary) return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesProducer = product.producerName.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        if (!matchesName && !matchesProducer && !matchesDesc) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'distance') {
        const distA = parseInt(a.producerDistance) || 0;
        const distB = parseInt(b.producerDistance) || 0;
        return distA - distB;
      }
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: featured first
      if (a.isSeasonalHighlight && !b.isSeasonalHighlight) return -1;
      if (!a.isSeasonalHighlight && b.isSeasonalHighlight) return 1;
      return 0;
    });
  }, [selectedCategory, selectedDietary, searchQuery, sortBy]);

  const toggleDietary = (tag: string) => {
    setSelectedDietary(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSelectProducerFilter = (producerId: string) => {
    const producer = PRODUCERS.find(p => p.id === producerId);
    if (producer) {
      setSearchQuery(producer.name);
      setActiveTab('marketplace');
      showToast(`Showing produce from ${producer.name}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] text-[#191c1d]">
      
      {/* Strict 3-Zone Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedPostal={selectedPostal}
        onChangePostal={() => setIsPostalModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Marketplace View */}
        {activeTab === 'marketplace' && (
          <div>
            {/* Hero Section */}
            <HeroBanner
              onExploreBaskets={() => setActiveTab('baskets')}
              onExploreMarket={() => {
                const el = document.getElementById('market-catalog');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Catalog Section */}
            <div id="market-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              
              {/* Category & Dietary Filter Bar */}
              <CategoryFilterBar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedDietary={selectedDietary}
                toggleDietary={toggleDietary}
                sortBy={sortBy}
                setSortBy={setSortBy}
                totalProductsCount={filteredProducts.length}
              />

              {/* Product Grid */}
              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-[#e7e8e9] space-y-3">
                  <p className="text-base font-semibold text-[#191c1d]">
                    No harvest produce found matching your current filters.
                  </p>
                  <p className="text-xs text-[#707a6c]">
                    Try clearing search terms or selecting "All Marketplace" to view all available local goods.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedDietary([]);
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 bg-[#0d631b] text-white text-xs font-semibold rounded-lg hover:bg-[#2e7d32] transition-colors cursor-pointer mt-2"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => {
                    const cartItem = cartItems.find(i => i.product.id === product.id);
                    const qtyInCart = cartItem ? cartItem.quantity : 0;

                    return (
                      <ProductCard
                        key={product.id}
                        product={product}
                        quantityInCart={qtyInCart}
                        onAddToCart={handleAddToCart}
                        onUpdateQuantity={(prod, qty) => handleUpdateQuantity(prod, qty)}
                        onSelectProduct={(prod) => setSelectedProduct(prod)}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Producers & Farms Directory View */}
        {activeTab === 'producers' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <ProducersView
              producers={PRODUCERS}
              products={PRODUCTS}
              onSelectProducerProducts={handleSelectProducerFilter}
              onSelectProduct={(prod) => setSelectedProduct(prod)}
              onAddToCart={(prod) => handleAddToCart(prod, 1)}
            />
          </div>
        )}

        {/* Curated Harvest Baskets View */}
        {activeTab === 'baskets' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <HarvestBasketsView
              baskets={HARVEST_BASKETS}
              onAddBasketToCart={handleAddBasketToCart}
            />
          </div>
        )}

        {/* Seasonal Harvest Calendar View */}
        {activeTab === 'seasonal' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <SeasonalCalendarView
              products={PRODUCTS}
              onSelectProduct={(prod) => setSelectedProduct(prod)}
            />
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer onNavigateTab={(tab) => setActiveTab(tab)} />

      {/* Sticky Mobile Checkout Bar (governed strictly by §1.I <= 15% mobile viewport height) */}
      {cartCount > 0 && !isCartOpen && !isCheckoutOpen && (
        <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#e7e8e9] p-3 shadow-lg">
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="text-[11px] text-[#707a6c] block">
                {cartCount} item{cartCount > 1 ? 's' : ''} in crate
              </span>
              <span className="text-sm font-bold text-[#191c1d] tabular-nums">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="py-2.5 px-5 bg-[#0d631b] hover:bg-[#2e7d32] text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>View Basket</span>
            </button>
          </div>
        </div>
      )}

      {/* Product Detail Modal (PDP Contiguous Module) */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        currentQuantityInCart={
          selectedProduct
            ? cartItems.find(i => i.product.id === selectedProduct.id)?.quantity || 0
            : 0
        }
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={(item, qty) => handleUpdateQuantity(item.product, qty)}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onExploreMarket={() => setActiveTab('marketplace')}
      />

      {/* Checkout 3-Step Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderSuccess={handleOrderSuccess}
        defaultPostal={selectedPostal}
      />

      {/* Postal Code Selector Modal */}
      {isPostalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-[#e7e8e9] shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#191c1d] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0d631b]" />
                <span>Select Delivery Zone</span>
              </h3>
              <button
                onClick={() => setIsPostalModalOpen(false)}
                className="text-[#707a6c] hover:text-[#191c1d]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-xs text-[#40493d]">
              Our refrigerated farm vans currently deliver to the following regional postal sectors:
            </p>

            <div className="space-y-1.5">
              {[
                '69001 Lyon (Presqu\'île & Pentes)',
                '69002 Lyon (Bellecour & Confluence)',
                '69004 Lyon (Croix-Rousse)',
                '69250 Neuville-sur-Saône',
                '69300 Caluire-et-Cuire',
                '69500 Bron & Est Lyonnais'
              ].map((zone) => (
                <button
                  key={zone}
                  onClick={() => {
                    setSelectedPostal(zone.split(' ')[0] + ' ' + zone.split(' ')[1]);
                    setIsPostalModalOpen(false);
                    showToast(`Delivery zone updated to ${zone}`);
                  }}
                  className={`w-full text-left text-xs p-2.5 rounded-lg border transition-colors cursor-pointer ${
                    selectedPostal.includes(zone.split(' ')[0])
                      ? 'border-[#0d631b] bg-[#cbffc2]/30 font-semibold text-[#002204]'
                      : 'border-[#d9dadb] hover:bg-[#f3f4f5] text-[#191c1d]'
                  }`}
                >
                  {zone}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tactile Feedback Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#191c1d] text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 border border-[#2e3132] animate-in fade-in slide-in-from-bottom-2 duration-150">
          <Check className="w-4 h-4 text-[#88d982]" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
