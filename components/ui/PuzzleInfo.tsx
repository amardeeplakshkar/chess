import React from 'react';
import { ChessPuzzle } from '@/constants/types';
import { Calendar, Trophy } from 'lucide-react';

interface PuzzleInfoProps {
  puzzle: ChessPuzzle;
  streak: number;
}

export const PuzzleInfo: React.FC<PuzzleInfoProps> = ({ puzzle, streak }) => {
  return (
    <div className="w-full max-w-md mx-auto mb-6 text-center">
      <h1 className="text-2xl font-bold mb-2">{puzzle.title}</h1>
      <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
        <div className="flex items-center gap-1">
          <Calendar size={16} />
          <span>{new Date(puzzle.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <Trophy size={16} />
          <span>Streak: {streak}</span>
        </div>
      </div>
      <p className="mt-2 text-gray-400">{puzzle.description}</p>
    </div>
  );
};