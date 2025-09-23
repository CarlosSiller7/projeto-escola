'use server'
import { API_URL } from "@/env";
import Cookies from "js-cookie";

type FiltrosEscolas = {
  nome?: string;
  cidade_id?: number;
  localizacao?: number;
};

export const listarEscolas = async (filtros?: FiltrosEscolas) => {
  try {
    const query = new URLSearchParams();
    if (filtros?.nome) query.append("nome", filtros.nome);
    if (filtros?.cidade_id) query.append("cidade_id", filtros.cidade_id.toString());
    if (filtros?.localizacao) query.append("localizacao", filtros.localizacao.toString());

    const token = Cookies.get("token");

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/api/escolas?${query.toString()}`, {
      method: "GET",
      headers: headers,
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao buscar as escolas: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Ocorreu um erro ao buscar escolas:", err);
    throw err;
  }
};


