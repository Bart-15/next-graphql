import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

import { GET_GAME } from '@/GraphQl/queries/game.query';
import type { Game } from '@/types/game.types';

type TQueryGame = {
  game: Game;
};

export function useViewGame(id: string) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    'laptop',
  ]);
  const { loading, error, data } = useQuery<TQueryGame>(GET_GAME, {
    variables: { id: id },
    skip: !id,
  });

  useEffect(() => {
    if (data) {
      setSelectedPlatforms(data.game.platform);
    }
  }, [data]);

  return {
    loading,
    error,
    data,
    selectedPlatforms,
    setSelectedPlatforms,
  };
}
