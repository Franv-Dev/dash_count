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
  Stack,
  Container 
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
    <AppBar 
      position="static"
      sx={{
        backgroundColor: theme === 'dark' ? '#0b0f19' : 'primary.main',
        borderBottom: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
        boxShadow: 1
      }}
    >
      <Container maxWidth="lg" disableGutters>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
            Programacion 3
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center">
            
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

            <IconButton color="inherit" onClick={toggleTheme}>
              {theme === 'light' ? <DarkIcon /> : <LightIcon />}
            </IconButton>

            <Box sx={{ mr: 1 }}>
              {user ? (
                <Stack direction="row" spacing={1} alignItems="center">
                  <AccountCircle fontSize="small" />
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                    {t.welcome}, <strong>{user.name}</strong>
                  </Typography>
                  <Button 
                    variant="outlined" 
                    color="error" 
                    size="small" 
                    onClick={logout}
                    sx={{ 
                      textTransform: 'none', 
                      ml: 1,
                      borderRadius: 1.5, 
                      borderWidth: '1.5px',
                      '&:hover': { borderWidth: '1.5px' } 
                    }}
                  >
                    {t.logout}
                  </Button>
                </Stack>
              ) : (
                // CORRECCIÓN: Se quitaron los paréntesis que envolvían al texto
                <Typography variant="body2" sx={{ opacity: 0.7, fontStyle: 'italic' }}>
                  {t.login}
                </Typography>
              )}
            </Box>

            <IconButton color="inherit" aria-label="cart">
              <Badge 
                badgeContent={totalItems} 
                color="secondary"
                sx={{ '& .MuiBadge-badge': { backgroundColor: '#9c27b0', color: '#fff' } }}
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}