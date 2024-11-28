'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getTotalKudos } from '@/lib/kudoStorage';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Analytics() {
  const [totalKudos, setTotalKudos] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) {
      router.push('/login');
    } else {
      setTotalKudos(getTotalKudos());
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
        <h1 className="text-4xl font-bold mb-6">Analytics</h1>
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Total Kudos Given</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-blue-600">{totalKudos}</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

