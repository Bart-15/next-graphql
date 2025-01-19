'use client';
import { useQuery } from '@apollo/client';

import AddGameForm from '@/components/games/AddGameForm';
import GameTable from '@/components/games/GameTable';
import { LOAD_GAMES } from '@/GraphQl/queries/game.query';
import type { LoadGamesData } from '@/types/game.types';

const Games = () => {
  const { loading, data } = useQuery<LoadGamesData>(LOAD_GAMES);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <AddGameForm />
      <GameTable games={data?.games!} />
    </div>
  );
};

export default Games;
