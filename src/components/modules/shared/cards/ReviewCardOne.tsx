"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

type TreviewComment = {
  id: number;
  comment: string;
};

type TReviewCardOne = {
  id: number;
  name: string;
  profileImage: string;
  rating: number;
  content: string;
  date: string;
  tags: string[];
  comments: TreviewComment[];
};

type TComment = {
  comment: string;
};

const ReviewCardOne = ({ review }: { review: TReviewCardOne }) => {
  const form = useForm<TComment>({
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = (data: TComment) => {
    const commentData = {
      comment: data.comment,
      reviewId: review.id,
    };
    console.log(commentData);
  };

  return (
    <div className="mb-5">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <img
            src={review.profileImage}
            alt={review.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p>{review.name}</p>
            <p>⭐{review.rating}</p>
            <p>
              {review.tags.map((t) => (
                <span key={t}>#{t} </span>
              ))}
            </p>
          </div>
        </div>
        <p>{review.date}</p>
      </div>

      <p className="mb-5">{review.content}</p>

      <div className="p-3 rounded">
        <p className="mb-1">Comments</p>
        <hr />
        <div className="mt-3 w-full rounded space-y-2">
          {review.comments.map((c) => (
            <div
              key={c.id}
              className="text-sm text-white bg-gray-600/40 mb-2 p-2 rounded"
            >
              {c.comment}
            </div>
          ))}
        </div>

        {/* new  */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row items-center gap-2 mt-3"
          >
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Write a comment..."
                      className="bg-zinc-800 text-white placeholder:text-gray-400 border border-zinc-700 w-full"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="customOutlined"
              className="whitespace-nowrap"
            >
              Comment
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ReviewCardOne;
