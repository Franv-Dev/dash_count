
import React from 'react';
import { useConfig } from '../context/GlobalState';
import { Box, Container, Typography } from '@mui/material';

export default function Footer() {
 
  const { theme } = useConfig();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto', 
        backgroundColor: theme === 'dark' ? '#0b0f19' : '#faf8f8',
        color: 'text.secondary',
        borderTop: 2,
        borderColor: theme === 'dark' ? '#7b1fa2' : '#9c27b0',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body2" sx={{ fontWeight: 'medium',
          letterSpacing: '0.05em',
          color: theme === 'dark' ? '#b9a0bf' : 'text.secondary' }}>
          © {new Date().getFullYear()} - Programación 3.
        </Typography>
      </Container>
    </Box>
  );
}