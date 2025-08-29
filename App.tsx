
import React, { useState, useCallback } from 'react';
import { SceneDisplay } from './components/SceneDisplay';
import { ChoiceButtons } from './components/ChoiceButtons';
import { LoadingState } from './components/LoadingState';
import { StartScreen } from './components/StartScreen';
import { GameOverScreen } from './components/GameOverScreen';
import { generateStoryPart, generateImage } from './services/geminiService';
import type { GameState } from './types';
import { INITIAL_PROMPT } from './constants';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  const fetchNextScene = useCallback(async (prompt: string, previousScene?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const fullPrompt = previousScene 
        ? `The story so far: "${previousScene}". The player chose to: "${prompt}". Continue the story.`
        : prompt;

      // Generate story and image prompt simultaneously
      const storyPartPromise = generateStoryPart(fullPrompt);
      const newStoryPart = await storyPartPromise;
      
      setGameState({
        scene: newStoryPart.scene,
        choices: newStoryPart.choices,
        isGameOver: newStoryPart.isGameOver,
      });

      // Generate image based on the new scene's image prompt
      if (newStoryPart.imagePrompt) {
        const imageUrl = await generateImage(newStoryPart.imagePrompt);
        setCurrentImage(imageUrl);
      }

    } catch (err) {
      console.error(err);
      setError('The storytellers are resting. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleStartGame = useCallback(() => {
    setIsGameStarted(true);
    setGameState(null);
    setCurrentImage(null);
    fetchNextScene(INITIAL_PROMPT);
  }, [fetchNextScene]);
  
  const handleChoice = useCallback((choice: string) => {
    if (!gameState) return;
    fetchNextScene(choice, gameState.scene);
  }, [gameState, fetchNextScene]);

  const renderContent = () => {
    if (!isGameStarted) {
      return <StartScreen onStart={handleStartGame} />;
    }

    if (isLoading && !gameState) {
      return <LoadingState message="The mists of fate are swirling..." />;
    }
    
    if (error) {
        return (
            <div className="text-center text-red-400">
                <p>{error}</p>
                <button
                    onClick={handleStartGame}
                    className="mt-4 px-6 py-2 bg-red-800 hover:bg-red-700 rounded-lg transition-colors duration-300 font-title tracking-wider"
                >
                    Start Anew
                </button>
            </div>
        );
    }

    if (gameState?.isGameOver) {
      return (
        <GameOverScreen
          scene={gameState.scene}
          imageUrl={currentImage}
          onRestart={handleStartGame}
        />
      );
    }

    if (gameState) {
      return (
        <>
          <SceneDisplay imageUrl={currentImage} sceneText={gameState.scene} isLoading={isLoading && !!currentImage} />
          <ChoiceButtons
            choices={gameState.choices}
            onChoiceSelect={handleChoice}
            disabled={isLoading}
          />
        </>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center justify-center p-4">
      <main className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center flex-grow">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
