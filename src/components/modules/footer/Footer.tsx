import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <section className="py-2">
      <div className="w-full mx-auto bg-zinc-900/80 p-6 rounded-xl  text-center px-8 py-12 rounded-t-3xl shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-700">
          FilmNest
        </h2>
        <p className="text-white mb-8">
          For the latest updates, subscribe to our newsletter and get exclusive
          news, giveaways and freebies
        </p>
        <form className=" flex-col sm:flex-row items-center gap-4 justify-center hidden">
          <Input
            type="email"
            placeholder="Your Email Address"
            className="w-full sm:w-80 bg-[#2B2B3C] text-white placeholder:text-gray-400 border-none focus-visible:ring-2 focus-visible:ring-white-400"
          />
          <Button
            variant={"custom"}
            className=" text-white px-8 hover:bg-red-500 transition-all"
          >
            SUBSCRIBE
          </Button>
        </form>
      </div>
      <div
        className="text-center text-sm text-white bg-red-500/50 py-2"
      >
        © Copyright 2025 | All rights reserved
      </div>
    </section>
  );
}
