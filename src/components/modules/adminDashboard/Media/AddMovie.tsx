/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';
import Sinput from '@/components/form/Sinput';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export enum MediaType {
  MOVIE = 'MOVIE',
  SERIES = 'SERIES '
}

const genreOptions = [
  { value: 'action', label: 'Action' },
  { value: 'comedy', label: 'Comedy' },
  { value: 'drama', label: 'Drama' },
  { value: 'horror', label: 'Horror' },
  { value: 'sci-fi', label: 'Sci-Fi' },
  { value: 'romance', label: 'Romance' },
  { value: 'thriller', label: 'Thriller' },
];

const platformOptions = [
  { value: 'netflix', label: 'Netflix' },
  { value: 'amazon', label: 'Amazon Prime' },
  { value: 'disney', label: 'Disney+' },
  { value: 'hbo', label: 'HBO Max' },
];

type MovieFormData = {
  title: string;
  synopsis: string;
  genres: string[];
  type: MediaType;
  releaseYear: number;
  director: string;
  cast: string[];
  platforms: string[];
  buyPrice: number;
  rentPrice: number;
  streamingLink: string;
  isTrending: boolean;
};

export default function AddMovie() {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<MovieFormData>({
    defaultValues: {
      type: MediaType.MOVIE,
      isTrending: false,
      genres: [],
      platforms: [],
      cast: [],
    },
  });

  const [openGenres, setOpenGenres] = useState(false);
  const [openPlatforms, setOpenPlatforms] = useState(false);
  const selectedGenres = watch('genres');
  const selectedPlatforms = watch('platforms');

  const toggleMultiSelect = (currentValues: string[], value: string, field: 'genres' | 'platforms') => {
    const updated = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    setValue(field, updated);
  };

  const onSubmit = async (data: MovieFormData) => {
    console.log(data);
    // try {
    //   const response = await fetch('/api/movies', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       ...data,
    //       releaseYear: Number(data.releaseYear),
    //       buyPrice: Number(data.buyPrice),
    //       rentPrice: Number(data.rentPrice),
    //     }),
    //   });

    //   if (response.ok) {
    //     toast.success('Movie added successfully');
    //     router.push('/admin/media');
    //   } else {
    //     throw new Error('Failed to add movie');
    //   }
    // } catch (error) {
    //   toast.error('An error occurred while adding the movie');
    // }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Add New Movie</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Sinput
            name="title"
            label="Title"
            placeholder="Movie title"
            register={register}
            error={errors.title}
            rules={{ required: 'Title is required' }}
          />
          <Sinput
            name="releaseYear"
            label="Release Year"
            type="number"
            placeholder="2023"
            register={register}
            error={errors.releaseYear}
            rules={{
              required: 'Release year is required',
              min: { value: 1900, message: 'Year must be after 1900' },
              max: { value: new Date().getFullYear() + 2, message: 'Year cannot be more than 2 years in future' },
            }}
          />
          <Sinput
            name="director"
            label="Director"
            placeholder="Director name"
            register={register}
            error={errors.director}
            rules={{ required: 'Director is required' }}
          />

          {/* MediaType Selection with enum */}
          <div className="space-y-2">
            <Label>Media Type</Label>
            <Select onValueChange={(value) => setValue('type', value as MediaType)} defaultValue={MediaType.MOVIE}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(MediaType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.replace('_', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Multi-select genres */}
          <div className="space-y-2">
            <Label>Genres</Label>
            <Popover open={openGenres} onOpenChange={setOpenGenres}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between" type="button">
                  {selectedGenres.length > 0 ? selectedGenres.join(', ') : 'Select genres'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandGroup>
                    {genreOptions.map((option) => (
                      <CommandItem
                        key={option.value}
                        onSelect={() => toggleMultiSelect(selectedGenres, option.value, 'genres')}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            selectedGenres.includes(option.value) ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Multi-select platforms */}
          <div className="space-y-2">
            <Label>Platforms</Label>
            <Popover open={openPlatforms} onOpenChange={setOpenPlatforms}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between" type="button">
                  {selectedPlatforms.length > 0 ? selectedPlatforms.join(', ') : 'Select platforms'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandGroup>
                    {platformOptions.map((option) => (
                      <CommandItem
                        key={option.value}
                        onSelect={() => toggleMultiSelect(selectedPlatforms, option.value, 'platforms')}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            selectedPlatforms.includes(option.value) ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <Sinput
            name="buyPrice"
            label="Buy Price ($)"
            type="number"
            step="0.01"
            placeholder="9.99"
            register={register}
            error={errors.buyPrice}
          />
          <Sinput
            name="rentPrice"
            label="Rent Price ($)"
            type="number"
            step="0.01"
            placeholder="3.99"
            register={register}
            error={errors.rentPrice}
          />
          <Sinput
            name="streamingLink"
            label="Streaming Link"
            placeholder="https://example.com/stream"
            register={register}
            error={errors.streamingLink}
          />

          {/* Is Trending */}
          <div className="flex items-center space-x-2">
            <Checkbox id="isTrending" {...register('isTrending')} />
            <label htmlFor="isTrending" className="text-sm font-medium leading-none">
              Trending
            </label>
          </div>
        </div>

        {/* Synopsis */}
        <div className="space-y-2">
          <Label htmlFor="synopsis">Synopsis</Label>
          <Textarea
            id="synopsis"
            {...register('synopsis')}
            placeholder="Movie synopsis"
            rows={5}
            className={cn(errors.synopsis && 'border-destructive focus-visible:ring-destructive')}
          />
          {errors.synopsis && <p className="text-sm text-destructive">{errors.synopsis.message}</p>}
        </div>

        <div className="flex gap-4">
          <Button  type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add Movie'}
          </Button>
        </div>
      </form>
    </div>
  );
}
