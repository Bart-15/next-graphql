export type Game = {
  id: string;
  title: string;
  platform: string[];
};

export type LoadGamesData = {
  games: Game[];
};
