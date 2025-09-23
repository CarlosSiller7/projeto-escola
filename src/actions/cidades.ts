'use server';
import { cookies } from 'next/headers';
import { Cidade } from '@/types/Escolas';
import { API_URL } from '@/env';

export const cidades = async (): Promise<Cidade[]> => {
  try {
    const cookiesList = cookies();
    const token = (await cookiesList).get('token')?.value;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/api/cidades`, {
      method: 'GET',
      headers: headers,
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Erro na resposta da API de cidades:', response.status, response.statusText);
      throw new Error('Erro ao buscar as cidades.');
    }

    const data: Cidade[] = await response.json();
    return data;
  } catch (err) {
    console.error('Erro ao buscar cidades:', err);
    return [];
  }
};