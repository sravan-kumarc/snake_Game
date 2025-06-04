
import React from 'react';
import { Card } from '@/components/ui/card';
import { useSnakeGame } from '@/hooks/useSnakeGame';
import GameGrid from '@/components/GameGrid';
import GameControls from '@/components/GameControls';
import GameStats from '@/components/GameStats';

const SnakeGame = () => {
  const {
    snake,
    food,
    gameRunning,
    gameOver,
    score,
    resetGame,
    changeDirection,
  } = useSnakeGame();

  return (
    <Card className="p-6 bg-black/20 backdrop-blur-sm border-blue-500/30">
      <div className="flex flex-col items-center space-y-4">
        <GameStats 
          score={score}
          gameRunning={gameRunning}
          gameOver={gameOver}
          onReset={resetGame}
        />

        <GameGrid snake={snake} food={food} />

        <GameControls onDirectionChange={changeDirection} />
      </div>
    </Card>
  );
};

export default SnakeGame;
