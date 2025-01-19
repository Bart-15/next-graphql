import { useMutation } from '@apollo/client';
import { useState } from 'react';

import { ADD_GAME } from '@/GraphQl/mutations/game.mutation';
import { LOAD_GAMES } from '@/GraphQl/queries/game.query';

export function useAddGame() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    'laptop',
  ]);

  const [openDialog, setOpenDialog] = useState(false);

  // Add Game Mutation
  const [addGame, { loading, error }] = useMutation(ADD_GAME, {
    refetchQueries: [{ query: LOAD_GAMES }],
    awaitRefetchQueries: true,
  });

  return {
    selectedPlatforms,
    setSelectedPlatforms,
    openDialog,
    setOpenDialog,
    addGame,
    loading,
    error,
  };
}
