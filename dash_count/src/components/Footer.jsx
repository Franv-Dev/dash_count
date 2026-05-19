
import React from 'react';
import { useConfig } from '../context/GlobalState';
import { Box, Container, Typography } from '@mui/material';

export default function Footer() {
  // Consumimos el estado de configuración de forma segura
  const { theme } = useConfig();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto', // Esto empuja el footer al fondo de la pantalla si hay poco contenido
        backgroundColor: theme === 'dark' ? 'background.paper' : '#eaeaea',
        color: 'text.secondary',
        borderTop: 1,
        borderColor: 'divider',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center', // Alineación vertical correcta usando Flexbox en Material UI
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
          © {new Date().getFullYear()} - Programación 3.
        </Typography>
      </Container>
    </Box>
  );
}