'use client';

import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Formulario from "./Formulario";
import { Cidade } from "@/types/Interfaces";
import { cidades } from "@/actions/cidades";
import { ModalEditarProps } from "@/types/Interfaces";

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
  
}

const ModalEditar: React.FC<ModalEditarProps> = ({ open, onClose, escolaParaEdicao }) => {
    const [initialCities, setInitialCities] = useState<Cidade[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCities() {
            try {
                const fetchedCities = await cidades();
                setInitialCities(fetchedCities);
            } catch (err) {
                console.error('Erro ao buscar cidades:', err);
                setError('Não foi possível carregar as cidades. Tente novamente.');
            }
        }
        
        // Apenas busca as cidades quando o modal for aberto
        if (open) {
            fetchCities();
        }
    }, [open]);
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-editar-escola"
      aria-describedby="modal-editar-escola-form"
    >
        <Box sx={style}>
            <Formulario
                initialCities={initialCities}
                initialError={error}
                escolaParaEdicao={escolaParaEdicao}
            />
        </Box>
     
    </Modal>
  );
}

export default ModalEditar