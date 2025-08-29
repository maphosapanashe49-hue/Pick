
export interface GameState {
  scene: string;
  choices: string[];
  isGameOver: boolean;
}

export interface StoryPart extends GameState {
  imagePrompt: string;
}
