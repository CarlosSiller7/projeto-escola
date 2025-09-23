'use client';

import React, { useState } from 'react';
import { cadastro } from '@/actions/cadastro';
import { useRouter } from 'next/navigation';
import { Cidade } from '@/types/Escolas';

type FormProps = {
  initialCities: Cidade[];
  initialError: string | null;
};

type FormState = {
  nome: string;
  cidade_id: string;
  localizacao: string;
  turnos: string[]; 
};


export default function Formulario({ initialCities, initialError }: FormProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    nome: '',
    cidade_id: '',
    localizacao: '',
    turnos: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(initialError);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleTurno = (turno: string) => {
    setForm((prev) => {
      const exists = prev.turnos.includes(turno);
      return {
        ...prev,
        turnos: exists
          ? prev.turnos.filter((t) => t !== turno)
          : [...prev.turnos, turno],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setValidationErrors({});

    try {
      const payload = {
        nome: form.nome,
        cidade_id: Number(form.cidade_id),
        localizacao: form.localizacao,
        turnos: form.turnos,
      };

      await cadastro(payload as any);

      alert('Escola criada com sucesso!');
      router.push('/');
    } catch (err: any) {
      if (err.validation) {
        setValidationErrors(err.validation);
      } else {
        setError('Erro inesperado. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const turnoOptions = [
    { code: 'M', label: 'Manhã' },
    { code: 'T', label: 'Tarde' },
    { code: 'N', label: 'Noite' },
    { code: 'I', label: 'Integral' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">
          Cadastro de Escola
        </h2>

        {error && (
          <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>
        )}

        {Object.keys(validationErrors).length > 0 && (
          <div className="bg-red-600 text-white p-3 rounded mb-4">
            <ul className="text-sm">
              {Object.entries(validationErrors).map(([field, msgs]) =>
                (msgs as string[])?.map((m, idx) => (
                  <li key={`${field}-${idx}`} className="mb-1">
                    <strong>{field}:</strong> {m}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="nome"
            value={form.nome}
            onChange={handleChange}
            placeholder="Nome da escola"
            className="w-full px-4 py-2 rounded bg-blue-100 text-black"
          />

          <select
            name="cidade_id"
            value={form.cidade_id}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-blue-100 text-black"
          >
            {initialCities.length === 0 ? (
              <option>{error || 'Não há cidades disponíveis.'}</option>
            ) : (
              <>
                <option value="">Selecione a cidade</option>
                {initialCities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.descricao}
                  </option>
                ))}
              </>
            )}
          </select>

          <select
            name="localizacao"
            value={form.localizacao}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-blue-100 text-black"
          >
            <option value="">Selecione a localização</option>
            <option value="1">Urbana</option>
            <option value="2">Rural</option>
          </select>

          <div>
            <label className="text-sm text-white block mb-2">Turnos</label>
            <div className="flex gap-3">
              {turnoOptions.map((t) => (
                <label
                  key={t.code}
                  className="flex items-center gap-2 text-white"
                >
                  <input
                    type="checkbox"
                    checked={form.turnos.includes(t.code)}
                    onChange={() => toggleTurno(t.code)}
                  />
                  <span>{t.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || initialCities.length === 0}
            className={`w-full py-2 rounded text-white font-semibold ${
              loading || initialCities.length === 0
                ? 'bg-blue-700 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {loading ? 'Salvando...' : 'CADASTRAR ESCOLA'}
          </button>
        </form>
      </div>
    </div>
  );
}