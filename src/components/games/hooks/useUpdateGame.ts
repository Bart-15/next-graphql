import { useMutation } from '@apollo/client';

import { UPDATE_GAME } from '@/GraphQl/mutations/game.mutation';
import { LOAD_GAMES } from '@/GraphQl/queries/game.query';

export function useUpdateGame() {
  const [updateGame, { loading, error }] = useMutation(UPDATE_GAME, {
    refetchQueries: [{ query: LOAD_GAMES }],
    awaitRefetchQueries: true,
  });

  return {
    updateGame,
    loading,
    error,
  };
}
