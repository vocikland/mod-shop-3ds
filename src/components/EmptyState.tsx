import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  onReset: () => void;
  searchQuery: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onReset, searchQuery }) => {
  return (
    <div className="py-16 px-4 text-center max-w-md mx-auto space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
        <SearchX className="w-7 h-7" />
      </div>
      <div>
        <h3 className="text-base font-bold text-white">Ничего не найдено</h3>
        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
          {searchQuery
            ? `По запросу «${searchQuery}» модов не найдено. Попробуйте изменить фильтры или ввести другое название.`
            : 'По выбранной комбинации фильтров нет доступных модификаций.'}
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-xl border border-zinc-700 transition-colors"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Сбросить все фильтры</span>
      </button>
    </div>
  );
};
