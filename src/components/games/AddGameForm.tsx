import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useAddGame } from '@/components/games/hooks/useAddGame';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';
import {
  AddGameValidation,
  GameFormValues,
} from '@/validation/game.validation';

const AddGameForm = () => {
  const {
    selectedPlatforms,
    setSelectedPlatforms,
    openDialog,
    setOpenDialog,
    addGame,
    platformList,
  } = useAddGame();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GameFormValues>({
    mode: 'onChange',
    resolver: zodResolver(AddGameValidation),
    defaultValues: {
      title: '',
    },
  });

  useEffect(() => reset(), [openDialog, reset]);

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
      await addGame({
        variables: {
          game: payload,
        },
      });

      setOpenDialog(false);
    } catch (err) {
      console.error('Error adding game:', err);
    }
  }
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Game</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Game</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleCreateGame)} id="add-game-form">
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
            form="add-game-form"
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddGameForm;
