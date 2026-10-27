import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Gamepad2, Sparkles } from 'lucide-react';
import { GameId } from '../types/mod.ts';
import { POPULAR_GAMES, GameMeta } from '../data/modsData.ts';

interface QuickGameSelectorProps {
  selectedGame: GameId;
  onSelectGame: (gameId: GameId) => void;
  gamesList: GameMeta[];
}

export const QuickGameSelector: React.FC<QuickGameSelectorProps> = ({
  selectedGame,
  onSelectGame,
  gamesList
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const checkScrollability = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener('resize', checkScrollability);
    return () => window.removeEventListener('resize', checkScrollability);
  }, [gamesList]);

  const scrollByAmount = (offset: number) => {
    const el = scrollContainerRef.current;
    if (el) {
      el.scrollBy({ left: offset, behavior: 'smooth' });
      setTimeout(checkScrollability, 300);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollContainerRef.current && e.deltaY !== 0) {
      scrollContainerRef.current.scrollLeft += e.deltaY * 0.8;
      checkScrollability();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setIsDragging(true);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeftState(el.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeftState - walk;
    checkScrollability();
  };

  return (
    <div className="relative mb-5 group select-none">
      <div className="flex items-center justify-between pb-2 px-1">
        <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
          <Gamepad2 className="w-3.5 h-3.5 text-cyan-400" />
          Быстрый выбор игры:
        </span>
        <span className="text-[11px] text-zinc-500 font-mono hidden sm:inline">
          Используйте стрелки или колесо мыши для прокрутки
        </span>
      </div>

      <div className="relative flex items-center">
        {/* Left Arrow Button */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scrollByAmount(-280)}
            className="absolute -left-2 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900/95 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700/80 shadow-lg backdrop-blur-md transition-all hover:scale-110 active:scale-95"
            aria-label="Прокрутить влево"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {/* Left Fade Gradient Mask */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-zinc-950 to-transparent pointer-events-none z-10" />
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScrollability}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeaveOrUp}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseMove={handleMouseMove}
          className={`flex items-center gap-2 overflow-x-auto py-1 px-1 scroll-smooth no-scrollbar cursor-grab active:cursor-grabbing ${
            isDragging ? 'select-none pointer-events-auto' : ''
          }`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {gamesList.map((game) => {
            const isActive = selectedGame === game.id;
            return (
              <button
                key={game.id}
                type="button"
                onClick={() => onSelectGame(game.id)}
                className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-150 flex items-center gap-2 border ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-zinc-950 font-bold border-cyan-400 shadow-md shadow-cyan-500/20 scale-[1.02]'
                    : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                <span className="truncate">{game.name}</span>
                {game.releaseYear && game.releaseYear !== 'System' && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                      isActive ? 'bg-zinc-950/20 text-zinc-950' : 'bg-zinc-800/80 text-zinc-500'
                    }`}
                  >
                    {game.releaseYear}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Fade Gradient Mask */}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-r from-transparent to-zinc-950 pointer-events-none z-10" />
        )}

        {/* Right Arrow Button */}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => scrollByAmount(280)}
            className="absolute -right-2 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900/95 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700/80 shadow-lg backdrop-blur-md transition-all hover:scale-110 active:scale-95"
            aria-label="Прокрутить вправо"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
