"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { createPurchase } from "@/services/purchase";
import { deleteManyWishlistItem } from "@/services/wishlist";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useState,
  FormEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { toast } from "sonner";

const CheckoutForm = ({
  setOpen,
  purchaseData,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  purchaseData: any;
}) => {
  const router = useRouter();
  const { user } = useUser();
  const email = user?.email;
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/payment/create-stripe-payment-intent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 6, currency: "usd" }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data?.data?.clientSecret);
      })
      .catch((err) => {
        console.error("Error fetching clientSecret:", err);
      });
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setLoading(false);
      return;
    }

    const { error: paymentMethodError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (paymentMethodError) {
      console.error("[createPaymentMethod error]", paymentMethodError);
      setCardError(paymentMethodError.message || "Payment method error");
      setLoading(false);
      return;
    }

    setCardError("");

    // Confirm card payment
    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: email || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.error("[confirmCardPayment error]", confirmError);
      setCardError(confirmError.message || "Payment failed");
      setLoading(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const paymentInfo = purchaseData.map((item: any) => ({
        ...item,
        transactionId: paymentIntent.id,
      }));

      try {
        const res = await createPurchase(paymentInfo);

        if (res) {
          toast.success(res.message);
          await deleteManyWishlistItem();
          setOpen(false);

          router.push("/watchlist");
        }
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err?.message);
        }
      }
    }

    setLoading(false);
  };

  return (
    <form className="mt-7" onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": { color: "#aab7c4" },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {cardError && <p className="text-red-500 text-sm my-3">{cardError}</p>}
      <div className="flex mt-5 justify-end gap-5">
        <Button variant="custom" onClick={() => setOpen(false)}>
          Cancel
        </Button>

        <Button
          type="submit"
          className="bg-green-600 hover:bg-green-700"
          disabled={!stripe || loading || !clientSecret}
        >
          {loading ? "Processing..." : "Confirm Order"}
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;
