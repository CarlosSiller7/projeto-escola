import Formulario from '@/components/Formulário';
import MiniDrawer from '@/components/MiniDrawer';
import { cidades } from '@/actions/cidades';
import { Cidade } from '@/types/Escolas';
import { Box } from '@mui/material';

export default async function Page() {
  let initialCities: Cidade[] = [];
  let error: string | null = null;

  try {
    initialCities = await cidades();
  } catch (err) {
    console.error('Erro ao buscar cidades no lado do servidor:', err);
    error = 'Não foi possível carregar as cidades. Tente novamente.';
  }

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
      <MiniDrawer />
      <Formulario initialCities={initialCities} initialError={error} />
      </Box>
    </Box>
  );
}