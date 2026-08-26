import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CaseCard } from './components/CaseCard';
import { CaseDetailView } from './components/CaseDetailView';
import { InvestigationRunner } from './components/InvestigationRunner';
import { RiddleChatbot } from './components/RiddleChatbot';
import { HowItWorksView } from './components/HowItWorksView';
import { HostMysteryView } from './components/HostMysteryView';
import { AboutView } from './components/AboutView';
import { MyCasesView } from './components/MyCasesView';
import { AdminView } from './components/AdminView';
import { AICaseGeneratorModal } from './components/AICaseGeneratorModal';
import { CaseOfTheDay } from './components/CaseOfTheDay';
import { INITIAL_CASES } from './data';
import { MysteryCase, ActiveView, CartItem } from './types';
import { DetectiveBadgeModal } from './components/DetectiveBadgeSystem';

export default function App() {
  const [cases, setCases] = useState<MysteryCase[]>(INITIAL_CASES);
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedCaseId, setSelectedCaseId] = useState<string>('the-last-toast');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [isRiddleBotOpen, setIsRiddleBotOpen] = useState(false);
  const [isAIGeneratorOpen, setIsAIGeneratorOpen] = useState(false);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [purchasedCaseIds, setPurchasedCaseIds] = useState<string[]>(['the-last-toast']);
  const [completedCaseIds, setCompletedCaseIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('detective_completed_cases');
      return saved ? JSON.parse(saved) : ['the-last-toast'];
    } catch {
      return ['the-last-toast'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('detective_completed_cases', JSON.stringify(completedCaseIds));
    } catch (e) {
      console.error(e);
    }
  }, [completedCaseIds]);

  const handleToggleCompleteCase = (caseId: string) => {
    setCompletedCaseIds((prev) =>
      prev.includes(caseId) ? prev.filter((id) => id !== caseId) : [...prev, caseId]
    );
  };

  const handleSolveCase = (caseId: string) => {
    setCompletedCaseIds((prev) => Array.from(new Set([...prev, caseId])));
  };

  const selectedCase = cases.find((c) => c.id === selectedCaseId) || cases[0];

  const handlePlayCase = (caseToPlay: MysteryCase) => {
    setCases((prev) => {
      if (prev.some((c) => c.id === caseToPlay.id)) return prev;
      return [caseToPlay, ...prev];
    });
    setPurchasedCaseIds((prev) => Array.from(new Set([...prev, caseToPlay.id])));
    setSelectedCaseId(caseToPlay.id);
    setActiveView('investigate');
  };

  const handleSelectCaseWithObj = (caseId: string) => {
    setSelectedCaseId(caseId);
    setActiveView('case-detail');
  };

  const handleCaseGenerated = (newCase: MysteryCase) => {
    setCases((prev) => [newCase, ...prev]);
    // Auto-unlock for creator
    setPurchasedCaseIds((prev) => Array.from(new Set([...prev, newCase.id])));
    setSelectedCaseId(newCase.id);
    setActiveView('case-detail');
  };

  const handleAddToCart = (mysteryCase: MysteryCase) => {
    setCart((prev) => [
      ...prev,
      {
        caseId: mysteryCase.id,
        format: 'Digital Download',
        price: mysteryCase.price,
      },
    ]);
    setIsCartOpen(true);
  };

  const handleToggleWishlist = (caseId: string) => {
    setWishlist((prev) =>
      prev.includes(caseId) ? prev.filter((id) => id !== caseId) : [...prev, caseId]
    );
  };

  const handleSelectCase = (caseId: string) => {
    setSelectedCaseId(caseId);
    setActiveView('case-detail');
  };

  const handleStartSession = (caseId: string) => {
    setSelectedCaseId(caseId);
    setActiveView('player-investigation');
  };

  const handleCheckout = () => {
    const newPurchased = cart.map((item) => item.caseId);
    setPurchasedCaseIds((prev) => Array.from(newSet([...prev, ...newPurchased])));
    setCart([]);
    setIsCartOpen(false);
    alert('Thank you! Your digital mystery case files have been unlocked in your library.');
    setActiveView('my-cases');
  };

  function newSet(arr: string[]) {
    return Array.from(new Set(arr));
  }

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.premise.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDiff =
      selectedDifficulty === 'all' ||
      c.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

    return matchesSearch && matchesDiff;
  });

  const purchasedCasesList = cases.filter((c) => purchasedCaseIds.includes(c.id));

  return (
    <div className="min-h-screen bg-[#fdfae8] text-[#1c1c11] flex flex-col font-sans selection:bg-[#ffdea5] selection:text-[#261900]">
      {/* Top Banner Notice */}
      <div className="bg-[#4a1c1c] text-[#ffdea5] py-2 px-4 text-center font-mono text-xs font-bold border-b border-black/30 flex items-center justify-center space-x-2">
        <span className="material-symbols-outlined text-sm">psychology</span>
        <span>NEW: Agent Cipher AI Riddle Hint Bot is live! Solve riddles to earn mystery hints.</span>
        <button
          onClick={() => setIsRiddleBotOpen(true)}
          className="underline hover:text-white ml-2 text-[11px]"
        >
          Try It Now →
        </button>
      </div>

      {/* Main Navbar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        cartCount={cart.length}
        wishlistCount={wishlist.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAIGenerator={() => setIsAIGeneratorOpen(true)}
        onOpenBadgeModal={() => setIsBadgeModalOpen(true)}
        completedCount={completedCaseIds.length}
        selectedCaseId={selectedCaseId}
      />

      {/* View Router */}
      <main className="flex-1">
        {/* 1. HOME VIEW */}
        {activeView === 'home' && (
          <div className="space-y-12 pb-16">
            {/* Hero Dossier Banner */}
            <section className="bg-[#f7f4e2] border-b-2 border-black py-12 md:py-16 px-4 md:px-12 paper-texture relative">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <span className="font-mono text-xs uppercase font-bold text-[#4a1c1c] bg-[#ffdea5] px-3 py-1 border border-black/20 tracking-widest inline-block">
                    FEATURED COLD CASE • FILE #402-A
                  </span>

                  <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-black leading-tight">
                    The Last Toast
                  </h1>

                  <p className="font-serif italic text-lg md:text-xl text-neutral-800 leading-relaxed">
                    "A celebratory toast at the grand Sterling Estate ends with an unexpected death. Six high-society guests remain, each with a deadly secret."
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-800">
                    <span className="bg-[#ffdea5] px-2.5 py-1 font-bold border border-black/20">
                      Seasoned Difficulty
                    </span>
                    <span>•</span>
                    <span>4–8 Players</span>
                    <span>•</span>
                    <span>90–120 Minutes</span>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-4">
                    <button
                      onClick={() => handleSelectCase('the-last-toast')}
                      className="bg-black text-white font-sans text-xs uppercase tracking-wider font-bold px-8 py-4 hover:bg-[#4a1c1c] transition-colors shadow-lg"
                    >
                      Inspect Case File
                    </button>
                    <button
                      onClick={() => setIsRiddleBotOpen(true)}
                      className="bg-[#a17f3b] text-white font-sans text-xs uppercase tracking-wider font-bold px-6 py-4 hover:bg-amber-900 transition-colors flex items-center space-x-2 border border-black/20 shadow-lg"
                    >
                      <span className="material-symbols-outlined text-sm">psychology</span>
                      <span>Ask AI Riddle Bot for Clues</span>
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="dossier-card border-2 border-black p-4 relative shadow-2xl">
                    <div className="paper-clip" />
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpb5tIhIS6X4ou5RDH0ceNdYwQFsLCEfN0QZfOZniwVBQqqpAfKbcfA_udshU1ng4W4fXUsESMFjSB2Z0Dcl2CJnTwOV14DXCdc5ApLgBpq4r4HlxiMNTuZUE0zNv-Azyuz7PPo8AycOJ8_RaMt1iMzgXg-Q_vZ5VeZ92apLE8CnjGsA7jx25Pj7c_puKCeBxBEPvnque82-vfnZTVvELQI4YnLVUdPALsoMD8RMKm4vQtLqzKURw"
                      alt="The Last Toast"
                      className="w-full h-80 object-cover grayscale contrast-125 border border-black/30"
                    />
                    <div className="mt-3 font-mono text-xs text-center font-bold text-[#4a1c1c]">
                      EVIDENCE #018 • TIPPED CRYSTAL COUPE
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* AI Riddle Bot Highlight Section */}
            <section className="max-w-7xl mx-auto px-4 md:px-12">
              <div className="bg-[#4a1c1c] text-white p-8 md:p-12 border-2 border-black flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center space-x-2 text-[#ffdea5] font-mono text-xs uppercase tracking-widest font-bold">
                    <span className="material-symbols-outlined text-sm">psychology</span>
                    <span>Interactive AI Feature</span>
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold">
                    Meet Agent Cipher: Your AI Riddle Hint Bot
                  </h2>
                  <p className="font-sans text-xs md:text-sm text-amber-100/90 leading-relaxed">
                    Stuck during your investigation? Talk to Agent Cipher! Solve clever noir riddles to unlock progressive case hints safely without spoiling the solution.
                  </p>
                </div>

                <button
                  onClick={() => setIsRiddleBotOpen(true)}
                  className="bg-[#ffdea5] text-black font-sans text-xs uppercase tracking-wider font-bold px-8 py-4 hover:bg-white transition-colors flex items-center space-x-2 whitespace-nowrap shadow-md"
                >
                  <span className="material-symbols-outlined text-sm">psychology</span>
                  <span>Solve Riddles For Hints</span>
                </button>
              </div>
            </section>

            {/* Case of the Day Feature Banner */}
            <section className="max-w-7xl mx-auto px-4 md:px-12">
              <CaseOfTheDay
                onSelectCase={handleSelectCaseWithObj}
                onPlayCase={handlePlayCase}
              />
            </section>

            {/* Case Catalog Grid */}
            <section className="max-w-7xl mx-auto px-4 md:px-12 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-black pb-4 gap-4">
                <div>
                  <h2 className="font-serif text-3xl font-bold text-black">
                    Archival Mystery Cases
                  </h2>
                  <p className="font-mono text-xs text-neutral-600">
                    Select a dossier to review evidence, suspect files, and solution guides.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs text-neutral-600 font-bold">Filter:</span>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="bg-[#f7f4e2] border border-black px-3 py-1.5 font-mono text-xs text-black focus:outline-none"
                  >
                    <option value="all">All Difficulties</option>
                    <option value="Rookie">Rookie</option>
                    <option value="Seasoned">Seasoned</option>
                    <option value="Master Detective">Master Detective</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCases.map((c) => (
                  <CaseCard
                    key={c.id}
                    mysteryCase={c}
                    onSelectCase={handleSelectCase}
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={handleToggleWishlist}
                    isWishlisted={wishlist.includes(c.id)}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* 2. CASES VIEW */}
        {activeView === 'cases' && (
          <div className="max-w-7xl mx-auto px-4 md:px-12 py-12 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-black pb-4 gap-4">
              <div>
                <h1 className="font-serif text-4xl font-bold text-black">Case File Archives</h1>
                <p className="font-mono text-xs text-neutral-600">
                  Showing {filteredCases.length} cold cases matching your search criteria.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsAIGeneratorOpen(true)}
                  className="bg-[#4a1c1c] text-[#ffdea5] font-sans text-xs uppercase tracking-wider font-bold px-4 py-2 hover:bg-black transition-colors flex items-center space-x-2 border border-black shadow-md"
                >
                  <span className="material-symbols-outlined text-sm">auto_awesome</span>
                  <span>Generate Custom AI Case</span>
                </button>
                <input
                  type="text"
                  placeholder="Search title, premise, tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#f7f4e2] border border-black px-3 py-2 font-mono text-xs text-black placeholder:text-neutral-500 focus:outline-none w-48 sm:w-64"
                />
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="bg-[#f7f4e2] border border-black px-3 py-2 font-mono text-xs text-black focus:outline-none"
                >
                  <option value="all">All Difficulties</option>
                  <option value="Rookie">Rookie</option>
                  <option value="Seasoned">Seasoned</option>
                  <option value="Master Detective">Master Detective</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCases.map((c) => (
                <CaseCard
                  key={c.id}
                  mysteryCase={c}
                  onSelectCase={handleSelectCase}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  isWishlisted={wishlist.includes(c.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* 3. CASE DETAIL VIEW */}
        {activeView === 'case-detail' && selectedCase && (
          <CaseDetailView
            mysteryCase={selectedCase}
            onAddToCart={handleAddToCart}
            onHostSession={handleStartSession}
            onOpenRiddleBot={() => setIsRiddleBotOpen(true)}
            onBack={() => setActiveView('cases')}
          />
        )}

        {/* 4. INVESTIGATION RUNNER */}
        {activeView === 'player-investigation' && selectedCase && (
          <InvestigationRunner
            mysteryCase={selectedCase}
            onOpenRiddleBot={() => setIsRiddleBotOpen(true)}
            onExitSession={() => setActiveView('case-detail')}
            onSolveCase={handleSolveCase}
          />
        )}

        {/* 5. HOW IT WORKS */}
        {activeView === 'how-it-works' && (
          <HowItWorksView
            onBrowseCases={() => setActiveView('cases')}
            onOpenRiddleBot={() => setIsRiddleBotOpen(true)}
          />
        )}

        {/* 6. HOST MYSTERY */}
        {activeView === 'host-mystery' && (
          <HostMysteryView
            cases={cases}
            onStartSession={handleStartSession}
            onOpenRiddleBot={() => setIsRiddleBotOpen(true)}
          />
        )}

        {/* 7. ABOUT VIEW */}
        {activeView === 'about' && <AboutView />}

        {/* 8. MY CASES */}
        {activeView === 'my-cases' && (
          <MyCasesView
            purchasedCases={purchasedCasesList}
            completedCaseIds={completedCaseIds}
            onSelectCase={handleSelectCase}
            onHostSession={handleStartSession}
            onBrowseCases={() => setActiveView('cases')}
            onToggleCompleteCase={handleToggleCompleteCase}
            onOpenBadgeModal={() => setIsBadgeModalOpen(true)}
          />
        )}

        {/* 9. ADMIN */}
        {activeView === 'admin' && (
          <AdminView
            cases={cases}
            onAddNewCase={(newCase) => setCases((prev) => [newCase, ...prev])}
            onOpenAIGenerator={() => setIsAIGeneratorOpen(true)}
          />
        )}
      </main>

      {/* Detective Credentials Badge Modal */}
      <DetectiveBadgeModal
        isOpen={isBadgeModalOpen}
        onClose={() => setIsBadgeModalOpen(false)}
        completedCaseIds={completedCaseIds}
        purchasedCaseIds={purchasedCaseIds}
      />

      {/* Gemini AI Case Generator Modal */}
      <AICaseGeneratorModal
        isOpen={isAIGeneratorOpen}
        onClose={() => setIsAIGeneratorOpen(false)}
        onCaseGenerated={handleCaseGenerated}
      />

      {/* Floating Riddle Chatbot Launcher Button */}
      {!isRiddleBotOpen && (
        <button
          onClick={() => setIsRiddleBotOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-[#4a1c1c] text-white p-4 rounded-full shadow-2xl border-2 border-black hover:bg-black transition-all flex items-center space-x-2 group"
          title="Open Agent Cipher Riddle Hint Bot"
        >
          <span className="material-symbols-outlined text-2xl text-[#ffdea5]">psychology</span>
          <span className="font-sans text-xs font-bold uppercase tracking-wider hidden sm:inline text-[#ffdea5] pr-1">
            Agent Cipher (AI Riddle Bot)
          </span>
        </button>
      )}

      {/* Embedded Persistent Riddle Chatbot Component */}
      <RiddleChatbot
        currentCase={selectedCase}
        allCases={cases}
        isOpen={isRiddleBotOpen}
        onClose={() => setIsRiddleBotOpen(false)}
      />

      {/* Shopping Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-end">
          <div className="w-full max-w-md bg-[#fdfae8] border-l-2 border-black p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b-2 border-black pb-3">
                <h3 className="font-serif text-2xl font-bold text-black">Your Case Folder</h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-black hover:text-[#4a1c1c]"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {cart.length > 0 ? (
                <div className="space-y-3 font-mono text-xs">
                  {cart.map((item, idx) => {
                    const c = cases.find((caseItem) => caseItem.id === item.caseId);
                    return (
                      <div
                        key={idx}
                        className="bg-[#f7f4e2] p-3 border border-black/30 flex justify-between items-center"
                      >
                        <div>
                          <div className="font-serif font-bold text-sm text-black">{c?.title}</div>
                          <div className="text-neutral-500 text-[10px]">{item.format}</div>
                        </div>
                        <div className="font-mono text-[10px] bg-emerald-800 text-white px-2 py-0.5 uppercase font-bold">Included</div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="font-mono text-xs text-neutral-600 py-8 text-center">
                  Your case folder is empty.
                </p>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t-2 border-black pt-4 space-y-4 font-mono text-xs">
                <div className="flex justify-between text-sm font-bold text-black">
                  <span>Selected Archives:</span>
                  <span>{cart.length} Case Files</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-black text-white font-sans text-xs uppercase tracking-wider font-bold py-3.5 hover:bg-[#4a1c1c]"
                >
                  Access All Selected Cases
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Wishlist Drawer */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-end">
          <div className="w-full max-w-md bg-[#fdfae8] border-l-2 border-black p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b-2 border-black pb-3">
                <h3 className="font-serif text-2xl font-bold text-black">Saved Wishlist</h3>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="text-black hover:text-[#4a1c1c]"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {wishlist.length > 0 ? (
                <div className="space-y-3 font-mono text-xs">
                  {wishlist.map((id) => {
                    const c = cases.find((caseItem) => caseItem.id === id);
                    if (!c) return null;
                    return (
                      <div
                        key={id}
                        className="bg-[#f7f4e2] p-3 border border-black/30 flex justify-between items-center"
                      >
                        <div>
                          <div className="font-serif font-bold text-sm text-black">{c.title}</div>
                          <div className="text-neutral-500 text-[10px]">{c.difficulty}</div>
                        </div>
                        <button
                          onClick={() => {
                            handleSelectCase(c.id);
                            setIsWishlistOpen(false);
                          }}
                          className="bg-black text-white px-2.5 py-1 text-[10px] uppercase font-bold"
                        >
                          View
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="font-mono text-xs text-neutral-600 py-8 text-center">
                  No cases saved to wishlist.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Global Footer */}
      <footer className="bg-[#f7f4e2] border-t-2 border-black py-10 px-4 md:px-12 font-sans text-xs text-neutral-700 mt-12 paper-texture">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-2">
            <h4 className="font-serif text-xl font-bold text-black">The Case Files</h4>
            <p className="font-mono text-[11px] leading-relaxed text-neutral-600">
              Interactive cold case mystery games and archival murder mystery bureau.
            </p>
          </div>

          <div>
            <h5 className="font-mono font-bold uppercase text-black mb-2">Navigation</h5>
            <ul className="space-y-1 font-mono text-[11px]">
              <li>
                <button onClick={() => setActiveView('home')} className="hover:underline">
                  Home Archives
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('cases')} className="hover:underline">
                  Case Catalog
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('how-it-works')} className="hover:underline">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('host-mystery')} className="hover:underline">
                  Host a Mystery
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-mono font-bold uppercase text-black mb-2">Interactive AI</h5>
            <ul className="space-y-1 font-mono text-[11px]">
              <li>
                <button onClick={() => setIsRiddleBotOpen(true)} className="hover:underline text-[#4a1c1c] font-bold">
                  Agent Cipher AI Riddle Bot
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('about')} className="hover:underline">
                  Bureau History
                </button>
              </li>
            </ul>
          </div>

          <div className="font-mono text-[11px] space-y-1 text-neutral-600">
            <p className="font-bold text-black">BUREAU ARCHIVES BUREAU</p>
            <p>Confidential Docket #402-A</p>
            <p>© {new Date().getFullYear()} The Case Files. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
