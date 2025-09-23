export type Cidade = {
  id: number;
  estado_id: number;
  descricao: string;
  estado: {
    id: number;
    descricao: string;
    sigla: string;
  };
};

export type Escola = {
  id?: number;
  nome: string;
  cidade_id: number | string;
  localizacao: string;
  turnos: string[];
};
