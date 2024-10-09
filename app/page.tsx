
import Appbar from "@/components/Appbar";
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link";
export default function Home() {
  return (
    <main>
      <Appbar />
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <div className="scroll-m-20 border-b pb-2 text-5xl font-semibold tracking-tight first:mt-0">
          Blogs mate
        </div>
        <div className="text-xl text-muted-foreground p-3">
          A modal dialog that interrupts the user with important content and expects
          a response.
        </div>
        <Button variant="link">
          <ChevronRight className="h-4 w-4" />
          <Link href="/login">Get Started</Link>
        </Button>
      </div>
    </main>
  );
}
