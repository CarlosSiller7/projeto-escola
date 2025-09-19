'use client'

import { Login } from '@/actions/login';
import { useState } from 'react';

export default function Page() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    try{
    const response = Login({email, senha}) 
    console.log(response)
    } 
    catch (err) {
      console.error('Ocorreu um erro:', err);
      setError('Ocorreu um erro na rede. Por favor, tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
    setError('');
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
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-green-100 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-green-100 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="flex items-center justify-between text-green-100 text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Lembrar-me
            </label>
            <a href="#" className="hover:underline">
              Esqueceu sua senha?
            </a>
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

        <p className="mt-6 text-center text-green-100 text-sm">
          Novo por aqui?{" "}
          <a href="/cadastro" className="font-semibold hover:underline">
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
}
