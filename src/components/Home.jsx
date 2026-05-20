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
  Paper,
  Container 
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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
        <Paper variant="outlined" sx={{ p: 3, width: '100%', maxWidth: 400, borderRadius: 2, boxShadow: 1 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            {t.login} (Fake Auth)
          </Typography>
          
          {user ? (
            <Typography variant="body1" color="success.main" sx={{ fontWeight: 'medium' }}>
              🎉 ¡Sesión activa como {user.name} ({user.role})!
            </Typography>
          ) : (
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                fullWidth
                startIcon={<LoginIcon />}
                onClick={() => usernameInput && login(usernameInput)}
                sx={{ textTransform: 'none' }}
              >
                {t.login}
              </Button>
            </Box>
          )}
        </Paper>
      </Box>

      <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: 'bold' }}>
        Productos Disponibles
      </Typography>

      <Grid container spacing={3}>
        {fakeProducts.map(prod => (
          <Grid item xs={12} sm={6} md={4} key={prod.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: 2, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1, minHeight: '60px' }}>
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
                  sx={{ textTransform: 'none', fontWeight: 'bold', backgroundColor: '#9c27b0', '&:hover': { backgroundColor: '#7b1fa2' } }}
                >
                  Añadir al {t.cart}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}