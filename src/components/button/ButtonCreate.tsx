'use client'
import React, { useState } from 'react';
import ModalCadastro from '../ModalCadastro';

const ButtonCreate = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        type="button"
        disabled={loading}
        onClick={handleOpenModal}
        className={`ml-8 w-48 py-2 rounded text-white font-semibold cursor-pointer ${
          loading ? 'bg-blue-700 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {loading ? 'Salvando...' : 'NOVA ESCOLA'}
      </button>

      {isModalOpen && <ModalCadastro open={isModalOpen} onClose={handleCloseModal} />}
    </div>
  );
};

export default ButtonCreate;