"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUser } from "@/context/UserContext";
import { getAllNewslettersByUserID } from "@/services/newsletter";
import { FileText } from "lucide-react";
import { useEffect, useState } from "react";

type Subscriber = {
  email: string;
  name: string;
};
type NewsLetterHistory = {
  id: string;
  title: string;
  subject: string;
  content: string;
  status: "DRAFT" | "SCHEDULED" | "SENT";
};

type Newsletter = {
  Newsletter: NewsLetterHistory;
  createdAt: string; // ISO Date string
  Subscriber: Subscriber;
};

export default function UserNewsletterHistoryPage() {
  const { user } = useUser();
  const [userNewsletterHistory, setUserNewsletterHistory] = useState<
    Newsletter[]
  >([]);

  useEffect(() => {
    const fetchUserNewsletterHistory = async () => {
      try {
        const response = await getAllNewslettersByUserID(user?.id as string);
        const data = await response?.data;

        if (data) {
          setUserNewsletterHistory(data);
        } else {
          setUserNewsletterHistory([]);
        }
      } catch (error) {
        console.log("Error fetching user newsletter history:", error);
      }
    };
    fetchUserNewsletterHistory();
  }, [user?.id]);

  console.log("userNewsletterHistorys", userNewsletterHistory);
  return (
    <div className="bg-black">
      {/* New User Newsletter History Table */}
      <Card className="border-gray-800 bg-gray-900 shadow-xl mt-8 p-0">
        <CardContent className=" container mx-auto ">
          <Table>
            <TableHeader className="bg-gray-800">
              <TableRow className="hover:bg-gray-800 border-gray-800">
                <TableHead className="text-gray-300 text-center">
                  Title
                </TableHead>
                <TableHead className="text-gray-300 text-center">
                  Content
                </TableHead>
                <TableHead className="text-gray-300 text-center">
                  Status
                </TableHead>
                <TableHead className="text-gray-300 text-center">
                  Send At
                </TableHead>
                <TableHead className="text-gray-300 text-center">
                  Email
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userNewsletterHistory?.map((history: Newsletter) => (
                <TableRow
                  key={history?.createdAt}
                  className="border-gray-800 hover:bg-gray-800/50 text-center"
                >
                  <TableCell>
                    <div className="font-medium text-gray-100 text-center">
                      {history?.Newsletter?.title}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-gray-100 text-center">
                      {history?.Newsletter?.content?.substring(0, 50)}...
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <Badge
                        className={`${
                          history?.Newsletter?.status === "SENT"
                            ? "bg-green-800/20 text-green-400 border-green-900"
                            : "bg-gray-800/20 text-gray-400 border-gray-900"
                        } font-medium py-1`}
                        variant="outline"
                      >
                        {history?.Newsletter?.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-gray-100 text-center">
                      {new Date(history?.createdAt).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center items-center gap-2">
                      <FileText className="text-gray-400" />
                      <span className="text-gray-100">
                        {history?.Subscriber?.email}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ... [Keep existing dialogs and modals] ... */}
    </div>
  );
}
