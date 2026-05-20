
import React from 'react';
import { ConfigProvider, AuthProvider, CartProvider, useConfig } from './context/GlobalState';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import { Box, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';

// 1. Creamos dos temas estáticos por fuera para que React no los recree en cada renderizado
const lightTheme = createTheme({ palette: { mode: 'light' } });
const darkTheme = createTheme({ palette: { mode: 'dark' } });

function MainLayout() {
  const { theme } = useConfig();

  // Elegimos el tema correspondiente según tu estado global sin romper los hooks de material UI
  const currentMuiTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentMuiTheme}>
      <CssBaseline /> 
      
      <Box 
        sx={{ 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column',
          bgcolor: 'background.default', 
          color: 'text.primary',
          transition: 'background-color 0.3s ease, color 0.3s ease'
        }}
      >
        <Navbar />
        
        <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
          <Home />
        </Container>
        
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <ConfigProvider>
      <AuthProvider>
        <CartProvider>
          <MainLayout />
        </CartProvider>
      </AuthProvider>
    </ConfigProvider>
  );
}