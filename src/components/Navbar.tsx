import React, { useState } from 'react';
import { ActiveView } from '../types';

interface NavbarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  cartCount: number;
  wishlistCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAIGenerator?: () => void;
  onOpenBadgeModal?: () => void;
  completedCount?: number;
  selectedCaseId?: string;
  userEmail?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  cartCount,
  wishlistCount,
  searchQuery,
  setSearchQuery,
  onOpenCart,
  onOpenWishlist,
  onOpenAIGenerator,
  onOpenBadgeModal,
  completedCount = 0,
  userEmail
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveView('cases');
    }
  };

  return (
    <header className="bg-[#fdfae8] border-b-2 border-black shadow-sm sticky top-0 z-50 w-full">
      <nav className="flex justify-between items-center w-full px-4 md:px-12 max-w-7xl mx-auto h-20">
        {/* Brand Logo */}
        <button
          onClick={() => setActiveView('home')}
          className="font-serif text-base md:text-lg font-bold text-black tracking-tight hover:opacity-80 transition-opacity text-left"
        >
          The Case Files
        </button>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex space-x-6 lg:space-x-8 items-center font-sans text-xs uppercase tracking-widest font-bold">
          <button
            onClick={() => setActiveView('home')}
            className={`pb-1 transition-colors ${
              activeView === 'home'
                ? 'text-black border-b-2 border-black'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveView('cases')}
            className={`pb-1 transition-colors ${
              activeView === 'cases' || activeView === 'case-detail'
                ? 'text-black border-b-2 border-black'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            Cases
          </button>
          <button
            onClick={() => setActiveView('how-it-works')}
            className={`pb-1 transition-colors ${
              activeView === 'how-it-works'
                ? 'text-black border-b-2 border-black'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            How It Works
          </button>
          <button
            onClick={() => setActiveView('host-mystery')}
            className={`pb-1 transition-colors ${
              activeView === 'host-mystery' || activeView === 'host-setup'
                ? 'text-black border-b-2 border-black'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            Host a Mystery
          </button>
          <button
            onClick={() => setActiveView('about')}
            className={`pb-1 transition-colors ${
              activeView === 'about'
                ? 'text-black border-b-2 border-black'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            About
          </button>
        </div>

        {/* Trailing Actions */}
        <div className="flex items-center space-x-4 lg:space-x-6">
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center border-b border-black pb-1">
            <span className="material-symbols-outlined text-neutral-600 text-lg mr-2">search</span>
            <input
              type="text"
              placeholder="Search Archives..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:outline-none p-0 font-mono text-xs text-black placeholder:text-neutral-500 w-32 xl:w-40"
            />
          </form>

          <div className="hidden md:flex items-center space-x-3">
            {onOpenBadgeModal && (
              <button
                onClick={onOpenBadgeModal}
                className="bg-[#f7f4e2] text-[#4a1c1c] font-mono text-xs font-bold px-2.5 py-1.5 border border-black/40 hover:bg-[#ffdea5] transition-colors flex items-center space-x-1 shadow-sm"
                title="Investigator Badge & Credentials"
              >
                <span className="material-symbols-outlined text-sm">badge</span>
                <span>Badge (Lvl {completedCount + 1})</span>
              </button>
            )}
            {onOpenAIGenerator && (
              <button
                onClick={onOpenAIGenerator}
                className="bg-[#4a1c1c] text-[#ffdea5] font-sans text-xs uppercase tracking-wider font-bold px-3 py-2 hover:bg-black transition-colors flex items-center space-x-1.5 border border-black/30 shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                <span>AI Case Gen</span>
              </button>
            )}
            <button
              onClick={() => setActiveView('my-cases')}
              className="font-mono text-xs text-black underline underline-offset-4 hover:text-[#a17f3b] transition-colors"
            >
              {userEmail ? 'My Cases' : 'Account'}
            </button>
            <button
              onClick={() => setActiveView('cases')}
              className="bg-black text-white font-sans text-xs uppercase tracking-wider font-bold px-4 py-2 hover:bg-neutral-800 transition-colors"
            >
              Find a Case
            </button>
          </div>

          {/* Icon Actions */}
          <div className="flex items-center space-x-3 text-black">
            <button
              onClick={onOpenCart}
              className="relative p-1 hover:text-[#a17f3b] transition-colors"
              title="Shopping Cart"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#4a1c1c] text-white text-[10px] font-mono w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenWishlist}
              className="relative p-1 hover:text-[#a17f3b] transition-colors"
              title="Saved Wishlist"
            >
              <span className="material-symbols-outlined">favorite</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#a17f3b] text-white text-[10px] font-mono w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveView('admin')}
              className="p-1 hover:text-[#a17f3b] transition-colors hidden sm:block"
              title="Bureau Admin Management"
            >
              <span className="material-symbols-outlined">admin_panel_settings</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1 text-black"
            >
              <span className="material-symbols-outlined">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fdfae8] border-t border-black/20 px-6 py-6 space-y-4">
          <form onSubmit={handleSearchSubmit} className="flex items-center border-b border-black pb-2 mb-4">
            <span className="material-symbols-outlined text-neutral-600 text-lg mr-2">search</span>
            <input
              type="text"
              placeholder="Search Archives..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:outline-none p-0 font-mono text-xs text-black placeholder:text-neutral-500 w-full"
            />
          </form>

          <div className="flex flex-col space-y-3 font-sans text-xs uppercase tracking-widest font-bold">
            <button
              onClick={() => { setActiveView('home'); setMobileMenuOpen(false); }}
              className="text-left py-1 text-black hover:text-[#a17f3b]"
            >
              Home
            </button>
            <button
              onClick={() => { setActiveView('cases'); setMobileMenuOpen(false); }}
              className="text-left py-1 text-black hover:text-[#a17f3b]"
            >
              Cases
            </button>
            <button
              onClick={() => { setActiveView('how-it-works'); setMobileMenuOpen(false); }}
              className="text-left py-1 text-black hover:text-[#a17f3b]"
            >
              How It Works
            </button>
            <button
              onClick={() => { setActiveView('host-mystery'); setMobileMenuOpen(false); }}
              className="text-left py-1 text-black hover:text-[#a17f3b]"
            >
              Host a Mystery
            </button>
            <button
              onClick={() => { setActiveView('about'); setMobileMenuOpen(false); }}
              className="text-left py-1 text-black hover:text-[#a17f3b]"
            >
              About
            </button>
            <button
              onClick={() => { setActiveView('my-cases'); setMobileMenuOpen(false); }}
              className="text-left py-1 text-black hover:text-[#a17f3b] border-t border-black/10 pt-3"
            >
              My Case Library
            </button>
            <button
              onClick={() => { setActiveView('admin'); setMobileMenuOpen(false); }}
              className="text-left py-1 text-black hover:text-[#a17f3b]"
            >
              Bureau Admin
            </button>
          </div>

          <button
            onClick={() => { setActiveView('cases'); setMobileMenuOpen(false); }}
            className="w-full bg-black text-white font-sans text-xs uppercase tracking-wider font-bold py-3 hover:bg-neutral-800 transition-colors mt-2"
          >
            Find a Case
          </button>
        </div>
      )}
    </header>
  );
};
