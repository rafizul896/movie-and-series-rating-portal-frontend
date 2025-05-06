"use client";
import LoadingPage from "@/app/loading";
import ReviewTable from "@/components/modules/adminDashboard/reviews/ReviewTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetAllReviews from "@/hooks/useReviews";
import { useState } from "react";

const ReviewManagementPage = () => {
  const [filter, setFilter] = useState("");
  const { allReviews, loading, refetch } = useGetAllReviews({
    filterReview: filter,
  });

  const handleChange = (value: string) => {
    setFilter(value == "none" ? "" : value);
  };

  console.log(allReviews?.data);
  return (
    <div>
      <div className="flex justify-between my-5">
        <h1>Reviews</h1>
        <div>
          <Select onValueChange={handleChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="unapproved">Not Approved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {loading ? (
        <LoadingPage />
      ) : (
        allReviews?.data.length && (
          <ReviewTable tableData={allReviews?.data} onRefetch={refetch} />
        )
      )}
    </div>
  );
};

export default ReviewManagementPage;
