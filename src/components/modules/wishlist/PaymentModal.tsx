"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

type PaymentModalProps = {
  amount: number;
  purchaseData: any;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export function PaymentModal({ amount, purchaseData }: PaymentModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-red-600 hover:bg-red-700 w-full">
          <div className="flex items-center justify-center w-full">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Proceed to Checkout
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black">
        <DialogHeader>
          <DialogTitle>
            You are about to pay <strong>${amount.toFixed(2)}</strong>.
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Elements stripe={stripePromise}>
            <CheckoutForm setOpen={setOpen} purchaseData={purchaseData} />
          </Elements>
        </div>
      </DialogContent>
    </Dialog>
  );
}
