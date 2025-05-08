"use client";

import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { TSearchBarOne } from "@/types/form.type";

const genres = [
  "Action",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Thriller",
];
const platforms = [
  "Netflix",
  "Amazon Prime",
  "Disney+",
  "HBO Max",
  "Apple TV+",
];

const years = Array.from({ length: 25 }, (_, i) => `${2025 - i}`);

const SearchBarOne = ({
  form,
  onSubmit,
}: {
  form: UseFormReturn<TSearchBarOne>;
  onSubmit: (data: TSearchBarOne) => void;
}) => {
  return (
    <div className="bg-zinc-900/80 p-6 rounded-xl shadow-md container mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row gap-4">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem className="md:w-1/2">
                  <FormLabel className="text-white">Search</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Search movies or series..."
                      className="bg-zinc-800 text-white placeholder:text-gray-400 border border-zinc-700"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="md:w-1/2 flex gap-4">
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Genre</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="bg-zinc-800 text-white border border-zinc-700">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 text-white">
                          {genres.map((g) => (
                            <SelectItem key={g} value={g}>
                              {g}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="platform"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel className="text-white">Platform</FormLabel>
                    <FormControl className="w-1/2">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="bg-zinc-800 text-white border border-zinc-700 w-full ">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 text-white">
                          {platforms.map((p) => (
                            <SelectItem key={p} value={p}>
                              {p}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Year</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="bg-zinc-800 text-white border border-zinc-700">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 text-white max-h-60 overflow-auto">
                          {years.map((y) => (
                            <SelectItem key={y} value={y}>
                              {y}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-5">
              <Button type="submit" variant={"custom"} className="w-full">
                Search
              </Button>
            </div>
            <div className="pt-5">
              <Button
                onClick={() => form.reset()}
                type="submit"
                variant={"custom"}
                className="w-full"
              >
                Clear
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SearchBarOne;
