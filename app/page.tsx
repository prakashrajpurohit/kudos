import Link from 'next/link';
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold mb-6">
          Welcome to <span className="text-blue-600">KudoSpot</span>
        </h1>
        <p className="text-2xl mb-8">
          Start giving kudos to your colleagues!
        </p>
        <Button asChild>
          <Link href="/login">
            Login
          </Link>
        </Button>
      </main>
    </div>
  );
}

