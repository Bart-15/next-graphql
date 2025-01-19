import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useUpdateGame } from '@/components/games/hooks/useUpdateGame';
import { useViewGame } from '@/components/games/hooks/useViewGame';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';
import { platformList } from '@/data/const';
import {
  AddGameValidation,
  GameFormValues,
} from '@/validation/game.validation';

type UpdateGameFormProps = {
  id: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const UpdateGameForm = ({ id, open, setOpen }: UpdateGameFormProps) => {
  const { data, selectedPlatforms, setSelectedPlatforms, loading } =
    useViewGame(id);
  const { updateGame } = useUpdateGame();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<GameFormValues>({
    mode: 'onChange',
    resolver: zodResolver(AddGameValidation),
  });

  useEffect(() => {
    if (data) {
      setValue('title', data?.game.title);
    }
  }, [data]);

  async function handleCreateGame(formValues: GameFormValues) {
    if (!selectedPlatforms.length) {
      alert('Please select atleast one platform');
      return;
    }

    const payload = {
      title: formValues.title,
      platform: selectedPlatforms,
    };

    try {
      await updateGame({
        variables: {
          id: id,
          edits: payload,
        },
      });

      setOpen(false);
    } catch (err) {
      console.error('Error adding game:', err);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Game</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleCreateGame)} id="update-game-form">
          <div className="mb-2 space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="amount" className="sr-only">
                Title
              </Label>
              <Input id="amount" type="string" {...register('title')} />
            </div>
            {errors.title && (
              <p className="mt-2 text-xs text-red-500">
                {' '}
                {errors.title?.message}{' '}
              </p>
            )}
          </div>
          <div>
            <MultiSelect
              options={platformList}
              onValueChange={setSelectedPlatforms}
              defaultValue={selectedPlatforms}
              placeholder="Select Platforms"
              variant="inverted"
              maxCount={3}
            />
          </div>
        </form>

        <DialogFooter>
          <Button
            type="submit"
            className="btn btn-primary"
            form="update-game-form"
          >
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateGameForm;
