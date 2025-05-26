"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import {  subscribeToNewsletter } from "@/services/newsletter";

const UserNewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { user } = useUser();

  const handleSubscribe = async () => {
    if (!email || !name) {
      toast.error("Please fill in all fields");
      return;
    }
    const userId = user?.id;

    try {
      const res = await subscribeToNewsletter(email, name, userId);
      if (res.success) {
        toast.success(res?.message || "You have successfully subscribed to the newsletter!");
        setEmail("");
        setName("");
      } else {
        toast.error(res?.message || "Failed to subscribe to the newsletter");
      }
    }
    catch (error:any) {
      return toast.error(error?.message || "An error occurred while subscribing");
    }
  };

  return (
    <div className="py-10 px-4 md:px-20 bg-gradient-to-br from-red-800 to-red-600 text-white rounded-2xl shadow-lg container mx-auto">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Subscribe to Our Movie Newsletter
        </h2>
        <p className="text-md md:text-lg mb-6">
          Get the latest updates on top-rated movies, exclusive reviews, and
          fan-favorite ratings straight to your inbox.
        </p>
        <Card className="bg-red-700/70 backdrop-blur p-6 border-none">
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-1 bg-white text-black"
            />
            <Input
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-1 bg-white text-black"
            />
            <Button
              onClick={handleSubscribe}
              disabled={status === "loading"}
              className="col-span-1 bg-white text-red-700 hover:bg-gray-200"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </Button>
          </CardContent>
        </Card>
        {status === "success" && (
          <p className="mt-4 text-green-200 font-semibold">
            🎉 You are subscribed to our movie newsletter!
          </p>
        )}
      </div>
    </div>
  );
};

export default UserNewsletterSection;
