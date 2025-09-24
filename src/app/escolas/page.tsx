'use client'

import React, { useState, useEffect } from 'react';
import MiniDrawer from '@/components/MiniDrawer';
import Table from '@/components/Table';
import SchoolFilters from '@/components/SchoolFilters';
import Box from "@mui/material/Box";
import ButtonCreate from '@/components/button/ButtonCreate';
import { listarEscolas } from '@/actions/escolas';

export default function Page() {
  const [escolas, setEscolas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [schoolName, setSchoolName] = useState('');
  const [cityId, setCityId] = useState('');

  const fetchEscolas = async () => {
  setLoading(true);
  try {
    const filters = {
      ...(schoolName ? { nome: schoolName } : {}),
      ...(cityId ? { cidade_id: Number(cityId) } : {}),
    };
    const data = await listarEscolas(filters);
    setEscolas(data.data);
  } catch (error) {
    console.error("Erro ao buscar escolas:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchEscolas();
  }, [schoolName, cityId]);

  const handleSearch = (name: string, city: string) => {
    setSchoolName(name);
    setCityId(city);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <MiniDrawer />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1, 
          mt: 7, 
          transition: "margin 0.3s ease", 
          width: "100%",
        }}
      >
        <SchoolFilters onSearch={handleSearch} />
        <ButtonCreate />
        <Table rows={escolas} loading={loading} />
      </Box>
    </Box>
  );
}