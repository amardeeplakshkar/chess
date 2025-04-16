import React, { useState, useCallback, useEffect } from 'react';
import { Chess, Square } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { ChessPuzzle } from '@/constants/types';

interface ChessBoardProps {
  puzzle: ChessPuzzle;
  onCorrectSolution: () => void;
  onIncorrectMove: () => void;
}

export const ChessBoard: React.FC<ChessBoardProps> = ({
  puzzle,
  onCorrectSolution,
}) => {
  const [game, setGame] = useState(new Chess(puzzle.fen));
//   const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [validMoves, setValidMoves] = useState<{ [square: string]: boolean }>({});
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);

  // Check if the current sequence matches the solution
  const checkSolution = useCallback(() => {
    const solutionMoves = puzzle.solution.slice(0, moveHistory.length);
    const isCorrect = solutionMoves.every((move, index) => 
      move.toLowerCase() === moveHistory[index].toLowerCase()
    );

    if (isCorrect && moveHistory.length === puzzle.solution.length) {
      onCorrectSolution();
    }
  }, [moveHistory, puzzle.solution, onCorrectSolution]);

  const makeMove = useCallback(
    (move: { from: string; to: string; promotion?: string }) => {
      try {
        const gameCopy = new Chess(game.fen());
        
        // Get all legal moves for the piece
        const legalMoves = gameCopy.moves({ 
          square: move.from as Square,
          verbose: true 
        });

        // Check if the move is legal
        const isLegalMove = legalMoves.some(m => 
          m.from === move.from && 
          m.to === move.to
        );

        if (!isLegalMove) {
          return false;
        }

        // Make the move
        const result = gameCopy.move({
          from: move.from,
          to: move.to,
          promotion: move.promotion || 'q'
        });

        if (result === null) {
          return false;
        }

        const moveString = `${move.from}${move.to}${move.promotion || ''}`;
        setMoveHistory(prev => [...prev, moveString]);
        setGame(gameCopy);
        setValidMoves({});
        setSelectedPiece(null);

        return true;
      } catch (error) {
        console.error('Move error:', error);
        return false;
      }
    },
    [game]
  );

  // Effect to check solution after each move
  useEffect(() => {
    if (moveHistory.length > 0) {
      checkSolution();
    }
  }, [moveHistory, checkSolution]);

  const onPieceClick = (square: string) => {
    const piece = game.get(square as Square);
    
    // If clicking the same piece, deselect it
    if (selectedPiece === square) {
      setSelectedPiece(null);
      setValidMoves({});
      return;
    }

    // If clicking a valid target square with a piece selected
    if (selectedPiece && validMoves[square]) {
      makeMove({ from: selectedPiece, to: square });
      return;
    }

    // If clicking a new piece
    if (piece) {
      setSelectedPiece(square);
      // Get all legal moves including captures
      const moves = game.moves({ 
        square: square as Square, 
        verbose: true 
      }) as { to: string }[];
      
      const newValidMoves: { [square: string]: boolean } = {};
      moves.forEach((move) => {
        newValidMoves[move.to] = true;
      });

      setValidMoves(newValidMoves);
    } else {
      setSelectedPiece(null);
      setValidMoves({});
    }
  };

  const customSquareStyles = () => {
    const styles: { [square: string]: React.CSSProperties } = {};
    
    // Highlight selected piece
    if (selectedPiece) {
      styles[selectedPiece] = {
        backgroundColor: 'rgba(255, 255, 0, 0.2)',
      };
    }

    // Show valid moves
    Object.keys(validMoves).forEach((square) => {
      const pieceOnSquare = game.get(square as Square);
      if (pieceOnSquare) {
        // Show capture squares with a different style
        styles[square] = {
          background: 'radial-gradient(circle, rgba(255,0,0,0.2) 85%, transparent 85%)',
          borderRadius: '50%',
        };
      } else {
        // Show regular move squares
        styles[square] = {
          background: 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
          borderRadius: '50%',
        };
      }
    });

    return styles;
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Chessboard
        position={game.fen()}
        onPieceDrop={(source, target) => {
          const result = makeMove({
            from: source,
            to: target,
            promotion: 'q', // Always promote to queen for simplicity
          });
          return result;
        }}
        onPieceClick={onPieceClick}
        onSquareClick={onPieceClick}
        customSquareStyles={customSquareStyles()}
        boardWidth={250}
        customBoardStyle={{
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        }}
      />
    </div>
  );
};