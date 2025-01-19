import { PencilLine, Trash } from 'lucide-react';
import { useState } from 'react';

import { useDeleteGame } from '@/components/games/hooks/useDeleteGame';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Game } from '@/types/game.types';

import UpdateGameForm from './UpdateGameForm';

type GameTableProps = {
  games: Game[];
};

const GameTable = ({ games }: GameTableProps) => {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [gameId, setGameId] = useState('');

  const { deleteGame } = useDeleteGame();

  async function handleDelete(id: string) {
    try {
      await deleteGame({
        variables: {
          id: id,
        },
      });
    } catch (err) {
      console.error('Error deleting game:', err);
    }
  }

  function handleOpenModal(id: string) {
    setGameId(id);
    setOpenUpdateModal(true);
  }

  return (
    <>
      <Table>
        <TableCaption>A list of active Games</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {games.map((game) => (
            <TableRow key={game.id}>
              <TableCell className="font-medium">{game.id}</TableCell>
              <TableCell>{game.title}</TableCell>
              <TableCell>
                {' '}
                {game.platform.map((item) => item.split(' ')).join(', ')}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Trash
                    className="bg-color-500 cursor-pointer"
                    onClick={() => handleDelete(game.id)}
                  />
                  <PencilLine
                    className="bg-color-500 cursor-pointer"
                    onClick={() => handleOpenModal(game.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <UpdateGameForm
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
        id={gameId}
      />
    </>
  );
};

export default GameTable;
