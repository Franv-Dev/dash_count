// src/components/Home.jsx
import React, { useState } from 'react';
import { useAuth, useCart, useConfig } from '../context/GlobalState';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Card, 
  CardContent, 
  CardActions, 
  Grid, 
  Paper 
} from '@mui/material';
import { AddShoppingCart as AddIcon, Login as LoginIcon } from '@mui/icons-material';

export default function Home() {
  const { user, login } = useAuth();
  const { addToCart } = useCart();
  const { t } = useConfig();
  const [usernameInput, setUsernameInput] = useState('');

  const fakeProducts = [
    { id: 1, name: 'Laptop Pro', price: 999 },
    { id: 2, name: 'Mouse Gamer', price: 49 },
    { id: 3, name: 'Teclado Mecánico', price: 89 },
  ];

  return (
    <Box sx={{ mt: 2 }}>
      {/* Sección Login Fake (Presentado como un Tarjetón/Paper elegante) */}
      <Paper variant="outlined" sx={{ p: 3, mb: 5, maxWidth: 400, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          {t.login} (Fake Auth)
        </Typography>
        
        {user ? (
          <Typography variant="body1" color="success.main" sx={{ fontWeight: 'medium' }}>
            🎉 ¡Sesión activa como {user.name} ({user.role})!
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField 
              label="Nombre de usuario" 
              variant="outlined" 
              size="small"
              fullWidth
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
            />
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<LoginIcon />}
              onClick={() => usernameInput && login(usernameInput)}
            >
              {t.login}
            </Button>
          </Box>
        )}
      </Paper>

      {/* Sección Tienda en Grilla Nativa de MUI */}
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        Productos Disponibles
      </Typography>

      <Grid container spacing={3}>
        {fakeProducts.map(prod => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={prod.id}>
            <Card sx={{ height: '100%', display: 'flex', flexxlDirection: 'column', justifyContent: 'space-between', borderRadius: 2, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {prod.name}
                </Typography>
                <Typography variant="h5" color="success.main" sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
                  ${prod.price}
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  fullWidth 
                  startIcon={<AddIcon />}
                  onClick={() => addToCart(prod)}
                  sx={{ textTransform: 'none', fontWeight: 'bold' }}
                >
                  Añadir al {t.cart}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}