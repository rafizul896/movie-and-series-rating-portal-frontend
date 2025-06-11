'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-center space-y-8 p-8 max-w-md mx-auto text-white">
        <div className="space-y-4">
          <h1 className="text-9xl font-bold text-white animate-pulse">
            404
          </h1>
          <h2 className="text-2xl font-semibold">
            Page Not Found
          </h2>
          <p className="leading-relaxed text-gray-400">
            Sorry, we couldn&lsquo;t find the page you&lsquo;re looking for. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            <Home size={20} />
            Return Home
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-400">
          <p>
            Need help?{" "}
            <Link href="/contact" className="text-red-500 hover:text-red-600 underline">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
