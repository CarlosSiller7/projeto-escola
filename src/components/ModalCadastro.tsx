'use client'
import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Formulario from './Formulário';
import { Typography } from '@mui/material';
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

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '90vw', 
  minWidth: '300px', 
  bgcolor: 'background.paper',
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