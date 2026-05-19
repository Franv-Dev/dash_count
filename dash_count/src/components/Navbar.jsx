// src/components/Navbar.jsx
import React from 'react';
import { useConfig, useAuth, useCart } from '../context/GlobalState';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Select, 
  MenuItem, 
  IconButton, 
  Badge, 
  Box,
  Stack 
} from '@mui/material';
import { 
  ShoppingCart as ShoppingCartIcon, 
  Brightness4 as DarkIcon, 
  Brightness7 as LightIcon, 
  AccountCircle 
} from '@mui/icons-material';

export default function Navbar() {
  const { theme, toggleTheme, lang, setLang, t } = useConfig();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  return (
    <AppBar position="static" color={theme === 'dark' ? 'inherit' : 'primary'} elevation={2}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Izquierda: Logo */}
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
          Programacion 3
        </Typography>

        {/* Derecha: Controles y Estados Globales */}
        <Stack direction="row" spacing={3} alignItems="center">
          
          {/* Selector de Idioma */}
          <Select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            size="small"
            sx={{ 
              color: 'inherit', 
              backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)',
              },

              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme === 'dark' ? '#fff' : 'primary.main',
              },

              '& .MuiSelect-select': {
                color: 'inherit',
                py: 0.5
              }
            }}
          >
            <MenuItem value="es">ES</MenuItem>
            <MenuItem value="en">EN</MenuItem>
          </Select>

          {/* Botón de Tema (claro/oscuro) */}
          <IconButton color="inherit" onClick={toggleTheme}>
            {theme === 'light' ? <DarkIcon /> : <LightIcon />}
          </IconButton>

          {/* Bloque de Usuario (login / cerrar sesion) */}
          <Box>
            {user ? (
              <Stack direction="row" spacing={1} alignItems="center">
                <AccountCircle fontSize="small" />
                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                  {t.welcome}, <strong>{user.name}</strong>
                </Typography>
                <Button 
                  variant="contained" 
                  color="error" 
                  size="small" 
                  onClick={logout}
                  sx={{ textTransform: 'none', ml: 1 }}
                >
                  {t.logout}
                </Button>
              </Stack>
            ) : (
              <Typography variant="body2" sx={{ opacity: 0.7, fontStyle: 'italic' }}>
                ({t.login})
              </Typography>
            )}
          </Box>

          {/* Contador Global del Carrito Estilizado */}
          <IconButton color="inherit" aria-label="cart">
            <Badge badgeContent={totalItems} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

        </Stack>
      </Toolbar>
    </AppBar>
  );
}