import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RotateCcw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface Position {
  x: number;
  y: number;
}

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 15 };
const INITIAL_DIRECTION = { x: 0, y: -1 };

const SnakeGame = () => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [direction, setDirection] = useState<Position>(INITIAL_DIRECTION);
  const [gameRunning, setGameRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(INITIAL_DIRECTION);
    setGameRunning(false);
    setGameOver(false);
    setScore(0);
  };

  const changeDirection = useCallback((newDirection: Position) => {
    // Auto-start game if not running and not game over
    if (!gameRunning && !gameOver) {
      setGameRunning(true);
    }
    
    if (!gameRunning && !gameOver) return;
    
    // Prevent reversing into self
    if ((direction.x !== 0 && newDirection.x !== 0) || (direction.y !== 0 && newDirection.y !== 0)) {
      return;
    }
    
    setDirection(newDirection);
  }, [direction, gameRunning, gameOver]);

  const moveSnake = useCallback(() => {
    if (!gameRunning || gameOver) return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };
      
      head.x += direction.x;
      head.y += direction.y;

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true);
        setGameRunning(false);
        return currentSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        setGameRunning(false);
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameRunning, gameOver, generateFood]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        changeDirection({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
        changeDirection({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
        changeDirection({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
        changeDirection({ x: 1, y: 0 });
        break;
    }
  }, [changeDirection]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, 250);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  return (
    <Card className="p-6 bg-black/20 backdrop-blur-sm border-blue-500/30">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center justify-between w-full max-w-md">
          <div className="text-white text-xl font-bold">
            Score: {score}
          </div>
          <div className="space-x-2">
            <Button onClick={resetGame} variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

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

        {/* On-screen Controls */}
        <div className="flex flex-col items-center space-y-2">
          <div className="text-blue-200 text-sm mb-2">Use keyboard arrows or click below:</div>
          <div className="grid grid-cols-3 gap-2">
            <div></div>
            <Button
              onClick={() => changeDirection({ x: 0, y: -1 })}
              variant="outline"
              size="icon"
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
            <div></div>
            <Button
              onClick={() => changeDirection({ x: -1, y: 0 })}
              variant="outline"
              size="icon"
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div></div>
            <Button
              onClick={() => changeDirection({ x: 1, y: 0 })}
              variant="outline"
              size="icon"
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
            <div></div>
            <Button
              onClick={() => changeDirection({ x: 0, y: 1 })}
              variant="outline"
              size="icon"
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
            >
              <ArrowDown className="w-4 h-4" />
            </Button>
            <div></div>
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
    </Card>
  );
};

export default SnakeGame;
