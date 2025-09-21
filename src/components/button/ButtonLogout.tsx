import React from 'react'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function ButtonLogout()  {
    const router = useRouter();

      const handleLogout = () => {
        Cookies.remove('user');
        Cookies.remove('token');
        router.push('/login');
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        className=" text-whiter"
      >
                Sair
      </button>
    </div>
  )
}

