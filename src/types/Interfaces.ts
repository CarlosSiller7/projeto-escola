export interface User {
  nome: string;
}

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

export interface EscolaCompleta {
    id: number;
    nome: string;
    cidade_id: number;
    localizacao: string;
    turnos: string[];
}

export interface EscolasPayload {
    nome: string;
    cidade_id: number;
    localizacao: string;
    turnos: string[];
}

export type FormProps = {
  initialCities: Cidade[];
  initialError: string | null;
  escolaParaEdicao?: EscolaCompleta;
};

export type FormState = {
  nome: string;
  cidade_id: string;
  localizacao: string;
  turnos: string[]; 
};

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  initialCities: Cidade[];
    initialError: string | null;
    escolaParaEdicao?: EscolaCompleta;
}

export type ModalEditarProps = {
  open: boolean;
  onClose: () => void;
  escolaParaEdicao?: EscolaCompleta;
};

export type CustomSnackbarProps = {
  open: boolean;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  onClose: () => void;
};