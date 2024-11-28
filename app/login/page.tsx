'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUser } from '@/lib/kudoStorage';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Login() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = getUser(username);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      router.push('/dashboard');
    } else {
      setError('User not found. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold mb-6">Login to KudoSpot</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-xs">
          <div className="mb-4">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </main>
    </div>
  );
}

