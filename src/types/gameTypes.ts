
export interface Position {
  x: number;
  y: number;
}

export interface GameState {
  snake: Position[];
  food: Position;
  direction: Position;
  gameRunning: boolean;
  gameOver: boolean;
  score: number;
}

export const GRID_SIZE = 20;
export const INITIAL_SNAKE = [{ x: 10, y: 10 }];
export const INITIAL_FOOD = { x: 15, y: 15 };
export const INITIAL_DIRECTION = { x: 0, y: -1 };
