
import SnakeGame from "../components/SnakeGame";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-2 tracking-tight">
          Snake Game
        </h1>
        <p className="text-xl text-blue-200 mb-8">
          Use arrow keys to control the snake. Eat the red food to grow!
        </p>
        <SnakeGame />
      </div>
    </div>
  );
};

export default Index;
