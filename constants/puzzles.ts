import { ChessPuzzle } from "@/constants/types";

export const puzzles: ChessPuzzle[] = [
//   {
//     id: '2',
//     title: 'Mate in 2',
//     date: '2024-03-22',
//     fen: '4r3/1pp2rbk/6pn/4n3/P3BN1q/1PB2bPP/8/2Q1RRK1 b - - 0 31',
//     solution: ['h4g3', 'f4g2', 'g3g2'],
//     description: 'Find the forced checkmate sequence',
//     moves: 3
//   },
  {
    id: '2',
    title: 'Mate in 1',
    date: '2024-03-21',
    fen: '4k3/4Q3/4K3/8/8/8/8/8 w - - 0 1',
    solution: ['e7e8'],
    description: 'Find the quickest checkmate',
    moves: 1
  },
];

export const getPuzzleForDate = (date: Date): ChessPuzzle => {
  const dateString = date.toISOString().split('T')[0];
  return puzzles.find(puzzle => puzzle.date === dateString) || puzzles[0];
};