
import { API_URL } from '@/env';
import Cookies from 'js-cookie';

type Escolas = {
  nome: string;
  cidade_id: number | string;
  localizacao: string;
  turnos: string[];
};

export const cadastro = async (payload: Escolas) => {
  try {
    const token = Cookies.get('token');
    const res = await fetch(`${API_URL}/api/escolas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      const err: any = new Error('Erro ao criar escola');
      err.validation = data;
      throw err;
    }

    return data;
  } catch (err) {
    console.error('Ocorreu um erro ao criar escola:', err);
    throw err;
  }
};


