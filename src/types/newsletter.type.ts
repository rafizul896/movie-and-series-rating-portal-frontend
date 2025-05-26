
export type TNewsletter = {
  id: string;
  title: string;
  subject: string;
  content: string;
  status: "DRAFT" | "SENT" | "SCHEDULED";
  recipientCount: number;
  scheduledAt?: Date | null;
  isScheduled?: boolean;
  sentAt?: Date | null;
  createdAt?: Date;
};