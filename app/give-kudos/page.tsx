'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUsers, saveKudo, User } from '@/lib/kudoStorage';
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function GiveKudos() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [to, setTo] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) {
      router.push('/login');
    } else {
      setCurrentUser(JSON.parse(storedUser));
      setUsers(getUsers());
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      saveKudo({
        from: currentUser.username,
        to,
        message,
      });
      router.push('/dashboard');
    }
  };

  if (!currentUser) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
        <h1 className="text-4xl font-bold mb-6">Give Kudos</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <Label htmlFor="to">Recipient</Label>
            <Select onValueChange={setTo} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a recipient" />
              </SelectTrigger>
              <SelectContent>
                {users.filter(user => user.id !== currentUser.id).map((user) => (
                  <SelectItem key={user.id} value={user.username}>
                    {user.username}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your kudos message"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Send Kudos
          </Button>
        </form>
      </main>
    </div>
  );
}

