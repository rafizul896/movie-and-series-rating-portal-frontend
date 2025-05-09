"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Heart } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getAllWishlist, removeFromWishlistList } from "@/services/wishlist";
import { IWishlistMovie } from "@/types/wishlist.type";
import { toast } from "sonner";
import { PaymentModal } from "./PaymentModal";
import { useUser } from "@/context/UserContext";
import { IPurchaseItem } from "@/types/purchase.type";

export default function WishlistPage() {
  const { user } = useUser();
  const [wishlist, setWishlist] = useState<IWishlistMovie[]>([]);

  const fetchData = async () => {
    const res = await getAllWishlist();

    if (res?.data) {
      setWishlist(res.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const removeFromWishlist = async (id: number) => {
    console.log(id);
    try {
      const response = await removeFromWishlistList(id.toString());

      if (response.success) {
        toast.success(
          response?.message || "Movie removed from watchlist successfully"
        );
        fetchData();
      } else {
        toast.error("Failed to remove item from wishlist:", response.message);
      }
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  const totalPrice = wishlist.reduce((sum, item: IWishlistMovie) => {
    const basePrice =
      item.purchaseType === "BUY" ? item.buyPrice : item.rentPrice;

    const discountAmount = item.discountPercentage
      ? (basePrice * item.discountPercentage) / 100
      : 0;

    const finalPrice = basePrice - discountAmount;

    return sum + finalPrice;
  }, 0);

  const purchaseData = wishlist.map((item) => {
    const basePrice =
      item.purchaseType === "BUY" ? item.buyPrice : item.rentPrice;

    const discountAmount = item.discountPercentage
      ? (basePrice * item.discountPercentage) / 100
      : 0;

    const finalPrice = basePrice - discountAmount;

    const purchaseItem: IPurchaseItem = {
      movieId: item.movieId,
      userId: user?.id,
      purchase_type: item.purchaseType,
      currency: "USD",
      paymentStatus: "PAID",
      amount: finalPrice,
    };

    if (item.purchaseType === "RENT") {
      const accessExpiryDate = new Date();
      accessExpiryDate.setMonth(accessExpiryDate.getMonth() + 6);

      purchaseItem.accessExpiryTime = accessExpiryDate.toISOString();
    }

    return purchaseItem;
  });

  return (
    <div className="min-h-screen bg-black">
      <main className="container mx-auto px-4 py-8">
        {wishlist.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h2 className="text-2xl font-semibold mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 mb-6">
              Add movies and series to your wishlist to purchase them later
            </p>
            <Button className="bg-red-600 hover:bg-red-700">
              <Link href="/movies">Browse Movies</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {wishlist.map((item: IWishlistMovie) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden bg-black text-white"
                  >
                    <CardContent className="p-0">
                      <div className="flex items-start p-4">
                        <div className="flex-shrink-0 mr-4">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            width={100}
                            height={150}
                            className="rounded-md object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-semibold text-lg">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-500 capitalize">
                            {item.type}
                          </p>

                          {/* Radio Group for Purchase Type */}
                          <RadioGroup
                            defaultValue={item.purchaseType}
                            className="flex space-x-4 mt-2"
                            onValueChange={(value) => {
                              setWishlist((prevWishlist) =>
                                prevWishlist.map((wishItem) =>
                                  wishItem.id === item.id
                                    ? {
                                        ...wishItem,
                                        purchaseType: value as "BUY" | "RENT",
                                      }
                                    : wishItem
                                )
                              );
                            }}
                          >
                            <div className="flex items-center space-x-2  cursor-pointer">
                              <RadioGroupItem
                                value="BUY"
                                id={`buy-${item.id}`}
                                className="text-white"
                              />
                              <label
                                htmlFor={`buy-${item.id}`}
                                className="text-sm"
                              >
                                Buy
                              </label>
                            </div>
                            <div className="flex items-center space-x-2  cursor-pointer">
                              <RadioGroupItem
                                value="RENT"
                                id={`rent-${item.id}`}
                                className="text-white"
                              />
                              <label
                                htmlFor={`rent-${item.id}`}
                                className="text-sm"
                              >
                                Rent
                              </label>
                            </div>
                          </RadioGroup>

                          {(() => {
                            const basePrice =
                              item.purchaseType === "BUY"
                                ? item.buyPrice
                                : item.rentPrice;

                            const discountAmount = item?.discountPercentage
                              ? (basePrice * item?.discountPercentage) / 100
                              : 0;

                            const finalPrice = basePrice - discountAmount;

                            return (
                              <div className="mt-2">
                                {item?.discountPercentage ? (
                                  <div className="space-y-1">
                                    <p className="text-sm text-gray-400 line-through">
                                      ${basePrice.toFixed(2)}
                                    </p>
                                    <p className="text-red-500 font-semibold">
                                      ${finalPrice.toFixed(2)}{" "}
                                      <span className="text-green-400 text-xs ml-1">
                                        ({item.discountPercentage}% OFF)
                                      </span>
                                    </p>
                                  </div>
                                ) : (
                                  <p className="text-red-600 font-medium">
                                    ${basePrice.toFixed(2)}
                                  </p>
                                )}
                              </div>
                            );
                          })()}
                        </div>
                        <Button
                          size="icon"
                          className="text-gray-400 hover:text-red-600"
                          onClick={() => removeFromWishlist(item.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="bg-black text-white">
                <CardContent className="p-6 bg-black">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Items ({wishlist.length})
                      </span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="w-full">
                    <PaymentModal
                      amount={totalPrice}
                      purchaseData={purchaseData}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
