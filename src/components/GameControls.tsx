
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { Position } from '@/types/gameTypes';

interface GameControlsProps {
  onDirectionChange: (direction: Position) => void;
}

const GameControls: React.FC<GameControlsProps> = ({ onDirectionChange }) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="text-blue-200 text-sm mb-2">Use keyboard arrows or click below:</div>
      <div className="grid grid-cols-3 gap-2">
        <div></div>
        <Button
          onClick={() => onDirectionChange({ x: 0, y: -1 })}
          variant="outline"
          size="icon"
          className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
        >
          <ArrowUp className="w-4 h-4" />
        </Button>
        <div></div>
        <Button
          onClick={() => onDirectionChange({ x: -1, y: 0 })}
          variant="outline"
          size="icon"
          className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div></div>
        <Button
          onClick={() => onDirectionChange({ x: 1, y: 0 })}
          variant="outline"
          size="icon"
          className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
        >
          <ArrowRight className="w-4 h-4" />
        </Button>
        <div></div>
        <Button
          onClick={() => onDirectionChange({ x: 0, y: 1 })}
          variant="outline"
          size="icon"
          className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
        >
          <ArrowDown className="w-4 h-4" />
        </Button>
        <div></div>
      </div>
    </div>
  );
};

export default GameControls;
