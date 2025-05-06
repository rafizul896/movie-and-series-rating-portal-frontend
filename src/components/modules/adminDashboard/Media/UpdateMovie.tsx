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
import { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormProvider } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export enum MediaType {
  MOVIE = 'MOVIE',
  SERIES = 'SERIES'
}

const genreOptions = [
  { value: 'action', label: 'Action' },
  { value: 'crime', label: 'Crime' },
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

const castOptions = [
  { value: 'christian-bale', label: 'Christian Bale' },
  { value: 'heath-ledger', label: 'Heath Ledger' },
  { value: 'morgan-freeman', label: 'Morgan Freeman' },
  { value: 'gary-oldman', label: 'Gary Oldman' },
  { value: 'aaron-eckhart', label: 'Aaron Eckhart' },
];

type MovieFormData = {
  movieId: string
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
  discountPrice: number;
  thumbnail: string;
  streamingLink: string;
  isTrending: boolean;
};

export default function UpdateMovie({ movieId }: { movieId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const methods = useForm<MovieFormData>();

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isSubmitting },
  } = methods;

  const [openGenres, setOpenGenres] = useState(false);
  const [openPlatforms, setOpenPlatforms] = useState(false);
  const [openCast, setOpenCast] = useState(false);
  const selectedGenres = watch('genres') || [];
  const selectedPlatforms = watch('platforms') || [];
  const selectedCast = watch('cast') || [];

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`/api/movies/${movieId}`);
        const data = await res.json();

        reset({
          title: data.title || '',
          synopsis: data.synopsis || '',
          genres: data.genres || [],
          type: data.type || MediaType.MOVIE,
          releaseYear: data.releaseYear || new Date().getFullYear(),
          director: data.director || '',
          cast: data.cast || [],
          platforms: data.platforms || [],
          buyPrice: data.buyPrice || 0,
          rentPrice: data.rentPrice || 0,
          discountPrice: data.discountPrice || 0,
          thumbnail: data.thumbnail || '',
          streamingLink: data.streamingLink || '',
          isTrending: data.isTrending || false,
        });
        setLoading(false);
      } catch (err) {
        toast.error('Failed to fetch movie data');
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId, reset]);

  const toggleMultiSelect = (currentValues: string[], value: string, field: 'genres' | 'platforms' | 'cast') => {
    const updated = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    setValue(field, updated);
  };

  const onSubmit = async (data: MovieFormData) => {
  console.log(data);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Edit Movie</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Sinput
                name="title"
                label="Title"
                placeholder="Movie title"
                rules={{ required: 'Title is required' }}
              />
              
              <Sinput
                name="releaseYear"
                label="Release Year"
                type="number"
                placeholder="2023"
                rules={{
                  required: 'Release year is required',
                  min: { value: 1900, message: 'Year must be after 1900' },
                  max: { 
                    value: new Date().getFullYear() + 2, 
                    message: 'Year cannot be more than 2 years in future' 
                  },
                }}
              />
              
              <Sinput
                name="director"
                label="Director"
                placeholder="Director name"
                rules={{ required: 'Director is required' }}
              />

              <div className="space-y-2">
                <Label>Media Type</Label>
                <Select 
                  onValueChange={(value) => setValue('type', value as MediaType)} 
                  value={watch('type')}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(MediaType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Genres Multi-select */}
              <div className="space-y-2">
                <Label>Genres</Label>
                <Popover open={openGenres} onOpenChange={setOpenGenres}>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      role="combobox" 
                      aria-expanded={openGenres}
                      className="w-full justify-between"
                    >
                      {selectedGenres.length > 0
                        ? selectedGenres
                            .map(genre => genreOptions.find(g => g.value === genre)?.label)
                            .join(', ')
                        : 'Select genres...'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
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

              {/* Platforms Multi-select */}
              <div className="space-y-2">
                <Label>Platforms</Label>
                <Popover open={openPlatforms} onOpenChange={setOpenPlatforms}>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      role="combobox" 
                      aria-expanded={openPlatforms}
                      className="w-full justify-between"
                    >
                      {selectedPlatforms.length > 0
                        ? selectedPlatforms
                            .map(platform => platformOptions.find(p => p.value === platform)?.label)
                            .join(', ')
                        : 'Select platforms...'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0">
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

              {/* Cast Multi-select */}
              <div className="space-y-2 col-span-2">
                <Label>Cast Members</Label>
                <Popover open={openCast} onOpenChange={setOpenCast}>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      role="combobox" 
                      aria-expanded={openCast}
                      className="w-full justify-between"
                    >
                      {selectedCast.length > 0
                        ? selectedCast
                            .map(cast => castOptions.find(c => c.value === cast)?.label)
                            .join(', ')
                        : 'Select cast members...'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandGroup>
                        {castOptions.map((option) => (
                          <CommandItem
                            key={option.value}
                            onSelect={() => toggleMultiSelect(selectedCast, option.value, 'cast')}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                selectedCast.includes(option.value) ? 'opacity-100' : 'opacity-0'
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
              />
              
              <Sinput
                name="rentPrice"
                label="Rent Price ($)"
                type="number"
                step="0.01"
                placeholder="3.99"
              />
              
              <Sinput
                name="discountPrice"
                label="Discount Price ($)"
                type="number"
                step="0.01"
                placeholder="2.49"
              />
              
              <Sinput
                name="thumbnail"
                label="Thumbnail URL"
                placeholder="https://example.com/image.jpg"
              />
              
              <Sinput
                name="streamingLink"
                label="Streaming Link"
                placeholder="https://example.com/stream"
              />

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="isTrending" 
                  checked={watch('isTrending')}
                  onCheckedChange={(checked) => setValue('isTrending', Boolean(checked))}
                />
                <Label htmlFor="isTrending" className="font-medium">
                  Featured as Trending
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="synopsis">Synopsis</Label>
              <Textarea
                id="synopsis"
                {...methods.register('synopsis')}
                placeholder="Enter movie synopsis..."
                rows={5}
                className="min-h-[120px]"
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="min-w-[120px]"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">↻</span>
                    Updating...
                  </>
                ) : 'Update Movie'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}