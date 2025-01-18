'use client';
import { useQuery } from '@apollo/client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { LOAD_GAMES } from '@/GraphQl/queries/games';

type Game = {
  id: string;
  title: string;
  platform: string[];
};

const Games = () => {
  const { loading, data } = useQuery(LOAD_GAMES);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Table>
      <TableCaption>A list of active Games</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="text-right">Platform</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.games.map((game: Game) => (
          <TableRow key={game.id}>
            <TableCell className="font-medium">{game.id}</TableCell>
            <TableCell>{game.title}</TableCell>
            <TableCell className="text-right">
              {game.platform.map((item) => item.split(' ')).join(', ')}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Games;
