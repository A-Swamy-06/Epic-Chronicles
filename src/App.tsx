import { type ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Mail, Menu, X } from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const [activePair, setActivePair] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);
  const pairs = useMemo(() => Array.from({ length: 24 }, (_, index) => ({
    number: index + 1,
    story: index * 2 + 1,
    reflection: index * 2 + 2,
  })), []);
  const filteredPairs = pairs.filter((pair) => `pair ${pair.number} ${String(pair.number).padStart(2, '0')}`.includes(query.toLowerCase().trim()));

  useEffect(() => {
    if (activePair === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActivePair(null);
      if (event.key === 'ArrowRight') setActivePair((value) => value === null ? null : Math.min(24, value + 1));
      if (event.key === 'ArrowLeft') setActivePair((value) => value === null ? null : Math.max(1, value - 1));
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [activePair]);

  return (
    <main className="min-h-[100dvh] text-[#292c3b]">
      <header className="relative z-10 mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-10 lg:px-16">
        <a href="#top" className="flex items-center gap-3" aria-label="Ayyappa Swamy's collection home">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-[#b6a889] text-[#a84b32]"><BookOpen size={18} strokeWidth={1.6} /></span>
          <span className="leading-tight"><span className="serif block text-[17px] font-semibold">Ayyappa Swamy</span><span className="eyebrow text-[8px] text-[#81745f]">Values card collection</span></span>
        </a>
        <nav className="hidden items-center gap-9 text-[12px] font-semibold text-[#5e5c57] md:flex">
          <a href="#collection" className="transition-colors hover:text-[#b44e34]">The collection</a>
          <a href="#about" className="transition-colors hover:text-[#b44e34]">About the cards</a>
          <a href="#contact" className="transition-colors hover:text-[#b44e34]">Contact</a>
        </nav>
        <button className="rounded-full border border-[#c9bea8] p-2 md:hidden" aria-label={mobileMenu ? 'Close menu' : 'Open menu'} onClick={() => setMobileMenu(!mobileMenu)}><Menu size={19} /></button>
        {mobileMenu && <nav className="absolute right-5 top-[70px] grid gap-4 rounded-xl border border-[#d7cbb5] bg-[#faf5e9] p-5 text-sm shadow-lg md:hidden"><a onClick={() => setMobileMenu(false)} href="#collection">The collection</a><a onClick={() => setMobileMenu(false)} href="#about">About the cards</a><a onClick={() => setMobileMenu(false)} href="#contact">Contact</a></nav>}
      </header>

      <section id="top" className="page-shell grid items-center gap-12 px-5 pb-20 pt-8 sm:px-10 md:grid-cols-[.9fr_1.1fr] md:gap-14 md:px-16 md:pb-28 md:pt-12">
        <div className="enter order-2 max-w-[530px] md:order-1">
          <div className="eyebrow mb-6 flex items-center gap-3 text-[#a84b32]"><span className="h-px w-9 bg-[#a84b32]" />A story, a value, a way forward</div>
          <h1 className="serif max-w-[590px] text-[clamp(3.5rem,7.8vw,7rem)] leading-[.98] tracking-[-.045em] text-[#282c3a]">Old stories.<br /><em className="font-medium text-[#a84b32]">Living values.</em></h1>
          <p className="mt-7 max-w-[425px] text-[15px] leading-7 text-[#65615a]">A visual journey through the Ramayana, gathered into 24 illustrated moments and the lessons they leave with us.</p>
          <a href="#collection" className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#292c3b] px-6 py-3.5 text-[12px] font-semibold tracking-wide text-[#fff8e9] transition hover:bg-[#a84b32]">Explore the collection <ArrowDown size={15} /></a>
          <div className="mt-12 flex items-center gap-5 border-t border-[#d3c7b1] pt-5">
            <span className="serif text-3xl text-[#a84b32]">24</span><p className="max-w-[210px] text-[11px] leading-5 text-[#777064]">paired cards<br />story on one side, reflection on the other</p>
          </div>
        </div>
        <div className="enter-delay order-1 flex items-center justify-center md:order-2">
          <div className="relative w-[min(78%,420px)] -rotate-2">
            <span className="absolute -right-12 top-10 z-0 hidden w-[68%] rotate-[8deg] rounded-sm bg-[#e5c98d] p-2 shadow-xl sm:block">
              <img src="/cards/page-02.jpg" alt="Reflection card: Curiosity" className="relative z-10 aspect-[.66] w-full object-cover" />
            </span>
            <button onClick={() => setActivePair(1)} className="hero-art-frame relative z-10 block w-full cursor-zoom-in bg-[#f6e8c1] p-2 text-left" aria-label="Open the first story and reflection cards">
              <img src="/cards/page-01.jpg" alt="Illustrated story card: Narada tells Valmiki about Rama" className="relative z-10 block aspect-[.66] w-full object-cover" />
              <span className="absolute -bottom-5 -left-7 z-20 hidden rotate-2 border border-[#b8a989] bg-[#f7f0df] px-4 py-2 text-[9px] uppercase tracking-[.18em] text-[#6b604b] sm:block">A Ramayana values journal</span>
            </button>
          </div>
        </div>
      </section>

      <div className="page-shell px-5 sm:px-10 md:px-16"><div className="ornament-line" /></div>

      <section id="about" className="page-shell grid gap-8 px-5 py-14 sm:px-10 md:grid-cols-[1fr_1.5fr] md:gap-20 md:px-16 md:py-20">
        <div><span className="eyebrow text-[#a84b32]">How to read the collection</span><h2 className="serif mt-4 text-3xl leading-tight sm:text-4xl">A tale told in<br />two quiet steps.</h2></div>
        <div className="grid gap-7 sm:grid-cols-2 sm:gap-10">
          <div className="border-l border-[#b9a98b] pl-5"><span className="eyebrow text-[#a84b32]">01 / The story</span><p className="mt-3 text-sm leading-6 text-[#65615a]">Each illustrated page holds a scene from the Ramayana—an invitation to pause with the characters and their choices.</p></div>
          <div className="border-l border-[#b9a98b] pl-5"><span className="eyebrow text-[#a84b32]">02 / The reflection</span><p className="mt-3 text-sm leading-6 text-[#65615a]">Turn the page for a value, a question, or a small skill to carry from the story into everyday life.</p></div>
        </div>
      </section>

      <section id="collection" className="bg-[#eae1cf] py-16 sm:py-20">
        <div className="page-shell px-5 sm:px-10 md:px-16">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><span className="eyebrow text-[#a84b32]">The illustrated archive · 24 pairs</span><h2 className="serif mt-3 text-4xl sm:text-5xl">Browse the cards</h2><p className="mt-3 max-w-lg text-sm leading-6 text-[#716b5f]">Choose any pair to see both pages together. Every card is presented at its original proportions.</p></div>
            <label className="flex w-full items-center gap-3 border-b border-[#a99c82] pb-2 md:w-[220px]"><span className="text-xs text-[#81745f]">Find a pair</span><input aria-label="Find a pair by number" data-testid="input-search-pair" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#a69a84]" placeholder="01 — 24" inputMode="numeric" value={query} onChange={(event) => setQuery(event.target.value.replace(/[^\d]/g, ''))} /></label>
          </div>
          {filteredPairs.length > 0 ? <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:grid-cols-6">
            {filteredPairs.map(({ number, story, reflection }) => <button key={number} data-testid={`card-pair-${number}`} onClick={() => setActivePair(number)} className="pair-card group text-left">
              <div className="relative mb-4 aspect-[1.12] overflow-hidden border border-[#cfc1a7] bg-[#d8c49b] p-2 shadow-[0_7px_18px_rgba(75,55,27,.09)]">
                <img src={`/cards/page-${String(story).padStart(2, '0')}.jpg`} alt={`Story side, pair ${String(number).padStart(2, '0')}`} loading={number > 6 ? 'lazy' : 'eager'} className="card-art absolute inset-y-2 left-2 w-[57%] border-r-2 border-[#eee0be] object-cover object-top" />
                <img src={`/cards/page-${String(reflection).padStart(2, '0')}.jpg`} alt={`Reflection side, pair ${String(number).padStart(2, '0')}`} loading="lazy" className="card-art absolute inset-y-2 right-2 w-[37%] object-cover object-top" />
                <span className="absolute bottom-3 right-3 grid h-7 w-7 place-items-center rounded-full bg-[#f6efdf] text-[#a84b32] shadow"><ArrowUpRight size={14} /></span>
              </div>
              <div className="flex items-baseline justify-between gap-2"><span className="serif text-[17px] text-[#302f36]">Pair {String(number).padStart(2, '0')}</span><span className="pair-open eyebrow text-[8px] text-[#8c8068]">View pair <ArrowRight className="inline" size={10} /></span></div>
              <p className="mt-1 text-[10px] tracking-wide text-[#817967]">Story · Reflection</p>
            </button>)}
          </div> : <div className="border border-dashed border-[#b9a98b] py-16 text-center"><p className="serif text-2xl">No pair by that number</p><p className="mt-2 text-sm text-[#777064]">Try a number from 1 to 24.</p></div>}
          <div className="mt-12 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[.18em] text-[#837864]"><span className="h-px w-8 bg-[#b9a98b]" />48 pages, held in pairs<span className="h-px w-8 bg-[#b9a98b]" /></div>
        </div>
      </section>

      <section id="contact" className="page-shell grid gap-10 px-5 py-16 sm:px-10 md:grid-cols-[1fr_1fr] md:items-center md:px-16 md:py-24">
        <div><span className="eyebrow text-[#a84b32]">A collection assembled with care</span><h2 className="serif mt-4 text-4xl leading-tight sm:text-5xl">Continue the<br />conversation.</h2><p className="mt-4 max-w-md text-sm leading-6 text-[#6d685e]">This gallery was assembled by Ayyappa Swamy. For questions or a conversation about the project, get in touch.</p></div>
        <div className="border-y border-[#cfc1a7] py-5">
          <div className="flex items-center justify-between gap-4 border-b border-[#d9cfbc] pb-4"><div><span className="eyebrow text-[8px] text-[#96896f]">Student</span><p className="serif mt-1 text-xl">Ayyappa Swamy</p></div><span className="text-xs text-[#a84b32]">01 / 01</span></div>
          <a href="mailto:24pa1a0557@vishnu.edu.in" className="mt-4 flex items-center justify-between gap-3 py-2 text-sm text-[#484750] transition hover:text-[#a84b32]"><span className="flex items-center gap-3"><Mail size={15} />24pa1a0557@vishnu.edu.in</span><ArrowUpRight size={14} /></a>
          <a href="tel:9014704797" className="mt-1 flex items-center justify-between gap-3 py-2 text-sm text-[#484750] transition hover:text-[#a84b32]"><span>Telephone</span><span>9014704797</span></a>
        </div>
      </section>
      <footer className="border-t border-[#d3c7b1] px-5 py-6 sm:px-10 md:px-16"><div className="page-shell flex flex-col justify-between gap-2 text-[10px] tracking-wide text-[#827965] sm:flex-row"><span>A Ramayana values-card collection · Ayyappa Swamy</span><a href="#top" className="hover:text-[#a84b32]">Return to the beginning ↑</a></div></footer>

      {activePair !== null && <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-[#22232a]/75 p-3 backdrop-blur-sm sm:p-6" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setActivePair(null); }}>
        <section className="modal-panel flex max-h-[96dvh] w-full max-w-[1180px] flex-col overflow-hidden border border-[#d6c7aa] bg-[#f5efdf] shadow-2xl" role="dialog" aria-modal="true" aria-label={`Pair ${activePair}: story and reflection`}>
          <header className="flex shrink-0 items-center justify-between border-b border-[#d3c7b1] px-4 py-3 sm:px-6">
            <div><span className="eyebrow text-[8px] text-[#a84b32]">Ramayana values cards</span><h3 className="serif text-xl">Pair {String(activePair).padStart(2, '0')} <span className="text-sm font-normal text-[#817967]">/ 24</span></h3></div>
            <button onClick={() => setActivePair(null)} aria-label="Close pair viewer" className="grid h-9 w-9 place-items-center rounded-full border border-[#cfc1a7] hover:bg-[#eae1cf]"><X size={17} /></button>
          </header>
          <div className="grid min-h-0 flex-1 gap-3 overflow-auto p-3 sm:grid-cols-2 sm:gap-5 sm:p-5">
            {[{ label: 'The story', page: activePair * 2 - 1 }, { label: 'The reflection', page: activePair * 2 }].map(({ label, page }) => <figure key={page} className="flex min-h-0 flex-col items-center">
              <figcaption className="eyebrow mb-2 text-[8px] text-[#8a7a5d]">{label} · page {String(page).padStart(2, '0')}</figcaption>
              <div className="flex min-h-0 w-full flex-1 justify-center overflow-auto"><img src={`/cards/page-${String(page).padStart(2, '0')}.jpg`} alt={`${label} card, page ${page}`} className="h-auto max-h-full w-auto max-w-full border border-[#c6b58f] object-contain shadow-[0_10px_30px_rgba(74,48,22,.16)]" /></div>
            </figure>)}
          </div>
          <footer className="flex shrink-0 items-center justify-between border-t border-[#d3c7b1] px-4 py-3 sm:px-6">
            <button disabled={activePair === 1} onClick={() => setActivePair(Math.max(1, activePair - 1))} className="flex items-center gap-2 text-xs font-semibold text-[#55525a] hover:text-[#a84b32] disabled:opacity-35"><ArrowLeft size={15} /> Previous</button>
            <span className="text-[10px] tracking-[.16em] text-[#817967]">{String(activePair).padStart(2, '0')} <span className="mx-1">/</span> 24</span>
            <button disabled={activePair === 24} onClick={() => setActivePair(Math.min(24, activePair + 1))} className="flex items-center gap-2 text-xs font-semibold text-[#55525a] hover:text-[#a84b32] disabled:opacity-35">Next <ArrowRight size={15} /></button>
          </footer>
        </section>
      </div>}
    </main>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
