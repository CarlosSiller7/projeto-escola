'use server'

import { API_URL } from "@/env";
import { cookies } from "next/headers";

export async function listarEscolas(filtros: { nome?: string; cidade_id?: number; localizacao?: number }) {
  try {
    const query = new URLSearchParams();
    if (filtros.nome) query.append("nome", filtros.nome);
    if (filtros.cidade_id) query.append("cidade_id", filtros.cidade_id.toString());
    if (filtros.localizacao) query.append("localizacao", filtros.localizacao.toString());

    const token = (await cookies()).get("token")?.value;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/api/escolas?${query.toString()}`, {
      method: 'GET',
      headers,
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao buscar as escolas: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    const escolasFormatadas = data.data.map((escola: any) => ({
      id: escola.id,
      escola_nome: escola.nome,
      escola_cidade: escola.cidade.descricao,
      escola_estado: escola.cidade.estado.descricao,
      escola_email: escola.usuario.email,
    }));
    
    return {
      ...data,
      data: escolasFormatadas
    };

  } catch (error) {
    console.error("Ocorreu um erro ao buscar escolas:", error);
    throw error;
  }
}