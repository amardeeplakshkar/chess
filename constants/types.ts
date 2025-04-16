export interface ChessPuzzle {
    id: string;
    title: string;
    date: string;
    fen: string;
    solution: string[];
    description: string;
    moves: number;
  }
  
  export interface UserProgress {
    solvedPuzzles: string[];
    currentStreak: number;
    bestStreak: number;
    lastSolvedDate: string | null;
  }