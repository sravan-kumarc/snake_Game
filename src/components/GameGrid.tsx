
import React from 'react';
import { Position, GRID_SIZE } from '@/types/gameTypes';

interface GameGridProps {
  snake: Position[];
  food: Position;
}

const GameGrid: React.FC<GameGridProps> = ({ snake, food }) => {
  return (
    <div 
      className="grid border-2 border-blue-400 bg-gray-900"
      style={{
        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
        width: '400px',
        height: '400px',
      }}
    >
      {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
        const x = index % GRID_SIZE;
        const y = Math.floor(index / GRID_SIZE);
        
        const isSnake = snake.some(segment => segment.x === x && segment.y === y);
        const isFood = food.x === x && food.y === y;
        const isHead = snake[0]?.x === x && snake[0]?.y === y;

        return (
          <div
            key={index}
            className={`border border-gray-700/30 transition-all duration-100 ${
              isSnake 
                ? isHead 
                  ? 'bg-green-400 shadow-lg shadow-green-400/50' 
                  : 'bg-green-600'
                : isFood 
                  ? 'bg-red-500 shadow-lg shadow-red-500/50 animate-pulse' 
                  : 'bg-gray-800/30'
            }`}
          />
        );
      })}
    </div>
  );
};

export default GameGrid;
