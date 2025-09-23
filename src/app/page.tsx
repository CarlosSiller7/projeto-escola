'use client'

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import MiniDrawer from '@/components/MiniDrawer';

interface User {
  id: string;
  nome: string;
  email: string;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      try {
        const userData = JSON.parse(userCookie);
        setUser(userData);
      } catch (e) {
        console.error("Erro ao fazer o parse do cookie de usuário:", e);
        Cookies.remove('user');
        router.push('/login'); 
      }
    } else {
      router.push('/login');
    }
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <MiniDrawer />
        {user ? (
          <><h1 className="text-4xl font-bold text-center sm:text-left">
            Bem-vindo, {user.nome}!
          </h1></>
        ) : (
          <>
            
          </>
        )}
      </main>
    </div>
  );
}