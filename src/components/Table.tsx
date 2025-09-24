// components/Table.tsx
'use client';

import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Card, CardContent, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ModalEditar from "./ModalEditar";
import { API_URL } from "@/env";
import Cookies from "js-cookie";
import { EscolaCompleta } from "@/types/Interfaces";

export default function Table({ rows, loading }: { rows: any[], loading: boolean }) {
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [escolaParaEdicao, setEscolaParaEdicao] = React.useState<EscolaCompleta | undefined>(undefined);

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setEscolaParaEdicao(undefined);
    };

    const handleEditar = async (escola: any) => {
        try {
            const token = Cookies.get("token");

            const response = await fetch(`${API_URL}/api/escolas/${escola.id}`, {
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                cache: "no-store",
            });

            if (!response.ok) throw new Error("Erro ao buscar escola");

            const data = await response.json();

            setEscolaParaEdicao({
                id: data.id,
                nome: data.nome,
                cidade_id: data.cidade_id,
                localizacao: data.localizacao,
                turnos: data.turnos?.map((t: any) => t.turno_sigla) || [],
            });

            setIsEditModalOpen(true);
        } catch (error) {
            console.error(error);
        }
    };

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

                return (
                    <Box>
                        <Tooltip title="Editar">
                            <IconButton onClick={() => handleEditar(escola)} color="secondary">
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                );
            },
        },
    ];

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
                                paginationModel: { pageSize: 8 },
                            },
                        }}
                        pageSizeOptions={[5]}
                        disableRowSelectionOnClick
                    />
                </Box>
            </CardContent>
            <ModalEditar
                open={isEditModalOpen}
                onClose={handleCloseEditModal}
                escolaParaEdicao={escolaParaEdicao}
            />
        </Card>
    );
}