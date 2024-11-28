'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getKudosForUser, User, Kudo } from '@/lib/kudoStorage';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [kudos, setKudos] = useState<Kudo[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) {
      router.push('/login');
    } else {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setKudos(getKudosForUser(parsedUser.username));
    }
  }, []);

  if (!user) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome, {user.username}!</h1>
        <div className="flex gap-4 mb-8">
          <Button asChild>
            <Link href="/give-kudos">Give Kudos</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/analytics">View Analytics</Link>
          </Button>
        </div>
        <h2 className="text-2xl font-bold mb-4">Your Kudos</h2>
        <div className="w-full max-w-2xl grid gap-4">
          {kudos.map((kudo) => (
            <Card key={kudo.id}>
              <CardHeader>
                <CardTitle>{kudo.from} says:</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{kudo.message}</p>
              </CardContent>
            </Card>
          ))}
          {kudos.length === 0 && (
            <p className="text-gray-500">You haven't received any kudos yet.</p>
          )}
        </div>
      </main>
    </div>
  );
}

