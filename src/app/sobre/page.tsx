'use client'
import About from '@/components/About';
import MiniDrawer from '@/components/MiniDrawer';
import { Box } from '@mui/material';

export default function Page() {

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <MiniDrawer />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3, 
          mt: 7, 
          transition: "margin 0.3s ease", 
          width: "100%",
        }}
      >
        <About />
      </Box>
    </Box>
  );
}