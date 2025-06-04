
import React from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

interface GameStatsProps {
  score: number;
  gameRunning: boolean;
  gameOver: boolean;
  onReset: () => void;
}

const GameStats: React.FC<GameStatsProps> = ({ score, gameRunning, gameOver, onReset }) => {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-white text-xl font-bold">
          Score: {score}
        </div>
        <div className="space-x-2">
          <Button onClick={onReset} variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      {gameOver && (
        <div className="text-center animate-fade-in">
          <div className="text-red-400 text-2xl font-bold mb-2">Game Over!</div>
          <div className="text-white text-lg">Final Score: {score}</div>
        </div>
      )}

      {!gameRunning && !gameOver && (
        <div className="text-center text-blue-200 text-sm animate-fade-in">
          Press any arrow key to start playing!
        </div>
      )}
    </div>
  );
};

export default GameStats;
