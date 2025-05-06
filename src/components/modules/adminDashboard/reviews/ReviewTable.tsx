import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteReview, toggleApproveReview } from "@/services/reviewService";
import { TReview } from "@/types/review.type";
import { Trash2 } from "lucide-react";

const ReviewTable = ({
  tableData,
  onRefetch,
}: {
  tableData: TReview[];
  onRefetch: () => void;
}) => {
  const handleToggle = async (reviewId: string) => {
    const token = localStorage.getItem("accessToken") || "";
    try {
      await toggleApproveReview(reviewId, token);
      onRefetch(); // ✅ refresh reviews after toggle
    } catch (err) {
      console.error("Toggle failed", err);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    const token = localStorage.getItem("accessToken") || "";
    try {
      await deleteReview(reviewId, token);
      onRefetch();
    } catch (err) {
      console.error("Delete review failed", err);
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Movie</TableHead>
            <TableHead>Review</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData?.map((review) => (
            <TableRow key={review.id}>
              <TableCell>{review.movie.title}</TableCell>
              <TableCell>{review.content}</TableCell>
              <TableCell>
                {review.approved ? "Approved" : "Not Approved"}
              </TableCell>
              <TableCell>
                <button
                  onClick={() => {
                    handleToggle(review.id);
                  }}
                >
                  {review.approved ? (
                    <span className="w-full bg-red-600 text-white cursor-pointer px-2 py-1 rounded">
                      Unpublish
                    </span>
                  ) : (
                    <span className="w-full bg-green-600 text-white cursor-pointer px-2 py-1 rounded">
                      Approve
                    </span>
                  )}
                </button>
              </TableCell>
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Trash2 className="cursor-pointer" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-black">
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete and remove this review from the servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="text-black">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteReview(review.id)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReviewTable;
