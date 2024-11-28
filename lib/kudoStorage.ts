export interface User {
  id: string;
  username: string;
}

export interface Kudo {
  id: string;
  from: string;
  to: string;
  message: string;
  createdAt: string;
}

const dummyUsers: User[] = [
  { id: '1', username: 'alice' },
  { id: '2', username: 'bob' },
  { id: '3', username: 'charlie' },
  { id: '4', username: 'david' },
];

export function getUsers(): User[] {
  return dummyUsers;
}

export function getUser(username: string): User | undefined {
  return dummyUsers.find(user => user.username === username);
}

export function saveKudo(kudo: Omit<Kudo, 'id' | 'createdAt'>): Kudo {
  const newKudo: Kudo = {
    ...kudo,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
  };

  const kudos = getKudos();
  kudos.push(newKudo);
  localStorage.setItem('kudos', JSON.stringify(kudos));

  return newKudo;
}

export function getKudos(): Kudo[] {
  if (typeof window !== 'undefined') {
    const kudosString = localStorage.getItem('kudos');
    return kudosString ? JSON.parse(kudosString) : [];
  }
  return [];
}

export function getKudosForUser(username: string): Kudo[] {
  return getKudos().filter(kudo => kudo.to === username);
}

export function getTotalKudos(): number {
  return getKudos().length;
}

