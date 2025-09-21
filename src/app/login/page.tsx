'use client'

import { Login } from '@/actions/login';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await Login({ email: formData.email, senha: formData.senha });
     

      //Armazenando o token em cookies
      if (response?.token) {
         Cookies.set('token', response.token, { expires: 7 }); 

        // Armazenando o usuário também:
        Cookies.set('user', JSON.stringify({
           id: response.id,
           nome: response.nome,
           email: response.email,
         }), { expires: 7 });

       
        router.push('/');
      } else {
        setError("E-mail ou senha inválidos");
      }

    } 
    catch (err) {
      console.error("Ocorreu um erro:", err);
      setError("Ocorreu um erro na rede. Por favor, tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-600 to-green-900">
      <div className="bg-green-800 bg-opacity-60 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-96">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Login
        </h2>

        {error && (
          <div className="bg-red-500 text-white p-2 rounded-lg text-center mb-4">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name='email'
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-green-100 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <input
              type="password"
              name='senha'
              placeholder="Senha"
              value={formData.senha}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-green-100 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold shadow-md transition ${
              loading ? 'bg-green-700 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {loading ? 'Entrando...' : 'ENTRAR'}
          </button>
        </form>

        <p className="mt-6 text-end text-green-100 text-sm">
          <a href="#" className="font-semibold hover:underline">
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
}
