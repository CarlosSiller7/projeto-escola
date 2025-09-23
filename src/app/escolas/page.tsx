import MiniDrawer from '@/components/MiniDrawer';
import Table from '@/components/Table';
import SchoolFilters from '@/components/SchoolFilters';
import Box from "@mui/material/Box";
import ButtonCreate from '@/components/button/ButtonCreate';

export default function Page() {

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
        <SchoolFilters />
        <ButtonCreate />
        <Table />
      </Box>
    </Box>
  );
}


