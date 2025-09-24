'use client'

import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { SelectChangeEvent } from '@mui/material';
import { Grid } from '@mui/material';
import { cidades } from '@/actions/cidades';
import { Cidade } from '@/types/Interfaces';

export default function SchoolFilters({ onSearch }: { onSearch: (schoolName: string, cityId: string) => void }) {
  const [city, setCity] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [cities, setCities] = useState<Cidade[]>([]);
  const [loadingCities, setLoadingCities] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoadingCities(true);
        const fetchedCities = await cidades();
        setCities(fetchedCities);
      } catch (err: any) {
        console.error("Erro ao buscar cidades:", err);
        setError("Não foi possível carregar as cidades.");
      } finally {
        setLoadingCities(false);
      }
    };
    fetchCities();
  }, []);

  const handleCityChange = (event: SelectChangeEvent) => {
    setCity(event.target.value);
  };

  const handleSchoolNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSchoolName(event.target.value);
  };

  const handleSearch = () => {
    onSearch(schoolName, city);
  };

  const handleClear = () => {
    setCity('');
    setSchoolName('');
    onSearch('', '');
  };

  return (
    <Card sx={{ m: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Filtros de Busca
        </Typography>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid>
            <Box sx={{ display: "flex", gap: 2 }}>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel id="city-select-label">Cidade</InputLabel>
                <Select
                  labelId="city-select-label"
                  id="city-select"
                  value={city}
                  label="Cidade"
                  onChange={handleCityChange}
                >
                  <MenuItem value="">
                    <em>Todas</em>
                  </MenuItem>
                  {cities.map((c) => (
                    <MenuItem key={c.id} value={String(c.id)}>
                      {c.descricao}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                sx={{ minWidth: 250 }}
                label="Nome da Escola"
                variant="outlined"
                value={schoolName}
                onChange={handleSchoolNameChange}
              />
            </Box>
          </Grid>
          <Grid>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="contained"
                color='primary'
                onClick={handleSearch}
                startIcon={<SearchIcon />}
              >
                Buscar
              </Button>
              <Button
                variant="outlined"
                color='error'
                onClick={handleClear}
                startIcon={<ClearIcon />}
              >
                Limpar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}