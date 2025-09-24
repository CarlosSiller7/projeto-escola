'use client'
import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Formulario from './Formulario';
import { Cidade } from '@/types/Escolas';
import { cidades } from '@/actions/cidades';

let initialCities: Cidade[] = [];
  let error: string | null = null;

 try {
    initialCities = await cidades();
  } catch (err) {
    console.error('Erro ao buscar cidades na camada de servidor:', err);
    error = 'Não foi possível carregar as cidades. Tente novamente.';
  }

  interface EscolaCompleta {
    id: number;
    nome: string;
    cidade_id: number;
    localizacao: string;
    turnos: string[];
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  initialCities: Cidade[];
    initialError: string | null;
    escolaParaEdicao?: EscolaCompleta;
}

const style = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 'full', 
  minWidth: '300px', 
  bgcolor: 'transparent',
  border: 'none',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  maxHeight: '50vh',
  
};

const ModalCadastro: React.FC<ModalProps> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box sx={style}>
        <Formulario initialCities={initialCities} initialError={error} />
      </Box>
    </Modal>
  );
}

export default ModalCadastro;