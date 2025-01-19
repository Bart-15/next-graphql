import { useMutation } from '@apollo/client';

import { DELETE_GAME } from '@/GraphQl/mutations/game.mutation';
import { LOAD_GAMES } from '@/GraphQl/queries/game.query';

export function useDeleteGame() {
  const [deleteGame, { loading, error }] = useMutation(DELETE_GAME, {
    refetchQueries: [{ query: LOAD_GAMES }],
    awaitRefetchQueries: true,
  });

  return {
    deleteGame,
    loading,
    error,
  };
}
