'use client'

import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Card, CardContent, IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { listarEscolas } from "@/actions/escolas";

const columns: GridColDef[] = [
  { field: "escola_nome", headerName: "Nome da Escola", flex: 1.5 },
  { field: "escola_cidade", headerName: "Cidade", flex: 1 },
  { field: "escola_estado", headerName: "Estado", flex: 1 },
  {
    field: "actions",
    headerName: "Ações",
    flex: 1,
    sortable: false,
    renderCell: (params) => {
      const escola = params.row;

      const handleVisualizar = () => {
        alert(`Visualizar detalhes da escola: ${escola.escola_nome}`);
      };

      const handleEditar = () => {
        alert(`Editar a escola: ${escola.escola_nome}`);
      };

      return (
        <Box>
          <Tooltip title="Visualizar">
            <IconButton onClick={handleVisualizar} color="primary">
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar">
            <IconButton onClick={handleEditar} color="secondary">
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Box>
      );
    },
  },
];

export default function TabelaEscolas() {
  const [rows, setRows] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listarEscolas({}); 
        
        setRows(data.data);
      } catch (error) {
        console.error("Erro ao carregar escolas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Card sx={{ m: 2 }}>
      <CardContent>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </Box>
      </CardContent>
    </Card>
  );
}
