import Formulario from '@/components/Formulário';
import MiniDrawer from '@/components/MiniDrawer';
import { cidades } from '@/actions/cidades';
import { Cidade } from '@/types/Escolas';

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
    <>
      <MiniDrawer />
      <Formulario initialCities={initialCities} initialError={error} />
    </>
  );
}