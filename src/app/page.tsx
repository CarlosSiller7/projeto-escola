'use client'

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import MiniDrawer from '@/components/MiniDrawer';
import { Box } from '@mui/material';

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
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <MiniDrawer />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          mt: 7,
          transition: "margin 0.3s ease",
          width: "100%",
        }}
      >
        {user ? (
          <>
            <h1 className="text-4xl font-bold text-center sm:text-left">
              Bem-vindo, {user.nome}!
            </h1>
          </>
        ) : (
          <>
            
          </>
        )}
      </Box>
    </Box>
  );
}