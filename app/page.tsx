import Appbar from "@/components/Appbar";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-gray-50 text-gray-900">
      <Appbar />
      <div className="flex flex-col justify-center items-center h-screen gap-6 px-4">
        <h1 className="border-b border-gray-300 pb-3 text-4xl font-bold tracking-tight text-gray-800 md:text-5xl lg:text-6xl">
          Blogs Mate
        </h1>
        <p className="text-center text-lg text-gray-600 max-w-md md:text-xl">
          A modal dialog that interrupts the user with important content and expects a response.
        </p>
        <Button variant="link" className="text-gray-700 hover:text-gray-900">
          <Link href="/login" className="flex items-center gap-1">
            Get Started
            <ChevronRight className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </main>
  );
}
