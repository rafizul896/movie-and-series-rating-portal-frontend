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
   <div className="relative bg-zinc-900/80 p-6  text-white py-14 px-6 rounded-3xl shadow-2xl border border-red-700 max-w-5xl mx-auto mt-10">
  {/* Spotlight effect */}
  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-red-900/10 to-transparent rounded-3xl pointer-events-none"></div>

  <div className="relative z-10 text-center space-y-4">
    <h2 className="text-4xl font-extrabold tracking-wide text-white drop-shadow-md">
      Join the FlimNest Club!
    </h2>
    <p className="text-md md:text-lg text-gray-300">
      Get hand-picked reviews, hot trailers, and exclusive ratings straight to your inbox.
    </p>

    <div className="grid md:grid-cols-3 gap-4 mt-8">
      <Input
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-white/90 text-black rounded-lg shadow-inner"
      />
      <Input
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-white/90 text-black rounded-lg shadow-inner"
      />
      <Button
        onClick={handleSubscribe}
        className="bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold hover:brightness-110 transition duration-200 rounded-lg"
      >
        {status === "loading" ? "Subscribing..." : "Subscribe"}
      </Button>
    </div>

    {status === "success" && (
      <p className="text-green-400 font-semibold mt-4">
        ✅ Subscribed successfully!
      </p>
    )}
  </div>
</div>

  );
};

export default UserNewsletterSection;
