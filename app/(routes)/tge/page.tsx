'use client'

import { ChessBoard } from '@/components/ui/ChessBoard';
import { PuzzleInfo } from '@/components/ui/PuzzleInfo';
import { getPuzzleForDate } from '@/constants/puzzles';
import { UserProgress } from '@/constants/types';
import { RotateCcw } from 'lucide-react';
import React, { useState } from 'react';

const STORAGE_KEY = 'chess-puzzle-progress';

function App() {
    const [currentPuzzle, setCurrentPuzzle] = useState(getPuzzleForDate(new Date()));
    const [showSuccess, setShowSuccess] = useState(false);
    const [progress, setProgress] = useState<UserProgress>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : {
            solvedPuzzles: [],
            currentStreak: 0,
            bestStreak: 0,
            lastSolvedDate: null,
        };
    });

    const handleCorrectSolution = () => {
        setShowSuccess(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setProgress((prev) => {
            const today = new Date().toISOString().split('T')[0];
            const newStreak = prev.lastSolvedDate === today ? prev.currentStreak : prev.currentStreak + 1;

            return {
                ...prev,
                solvedPuzzles: [...prev.solvedPuzzles, currentPuzzle.id],
                currentStreak: newStreak,
                bestStreak: Math.max(newStreak, prev.bestStreak),
                lastSolvedDate: today,
            };
        });
    };

    const handleIncorrectMove = () => {
        setShowSuccess(false);
    };

    const resetPuzzle = () => {
        setCurrentPuzzle(getPuzzleForDate(new Date()));
        setShowSuccess(false);
    };
    return (
        <div className='flex items-center flex-col h-[88dvh] py-4'>
            <PuzzleInfo puzzle={currentPuzzle} streak={progress.currentStreak} />
            <div className='flex-1 flex justify-center items-center'>
                <div className='bg-white shadow-md rounded-lg'>
                    <ChessBoard
                        puzzle={currentPuzzle}
                        onCorrectSolution={handleCorrectSolution}
                        onIncorrectMove={handleIncorrectMove}
                    />

                </div>
            </div>
            {showSuccess ? (
                <div className="text-center">
                    <div className="bg-green-100 text-green-800 p-4 rounded-lg">
                        <h3 className="font-bold">Congratulations!</h3>
                        <p>Youve solved todays puzzle!</p>
                    </div>
                </div>
            ) : (
                <button
                    className="flex items-center gap-2 p-3 rounded-full shadow-md hover:shadow-lg transition-shadow"
                    onClick={resetPuzzle}
                >
                    <RotateCcw size={20} />
                </button>
            )}

        </div>
    )
}

export default App