import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { IoMdMenu } from 'react-icons/io';
import imagem from '../img/logo_1.png';
import { Link, useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#FFF',
  '&:hover': {
    backgroundColor: '#EAEAEA',
  },
  marginRight: theme.spacing(2),
  marginLeft: 'auto',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#000',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (path) => {
    handleMenuClose();
    console.log(`Navegando para: ${path}`);
    navigate(path);
  };

  const handleLogout = (path) => {
    localStorage.removeItem('token');
    navigate(path);
  };

  const handleInicioClick = () => {
    // Lógica a ser executada quando o botão "Início" for clicado
    console.log("Botão 'Início' clicado!");
    handleMobileMenuClose(); // Fechar o menu após clicar em "Início"
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => handleMenuItemClick('/perfil')}>Perfil</MenuItem>
      <MenuItem onClick={() => handleMenuItemClick('/sair')}>Sair</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      PaperProps={{
        sx: { backgroundColor: '#630a0a' }
      }}
    >
      <MenuItem style={{ color: 'white' }} component={Link} to="/inicio" onClick={() => handleMenuItemClick("/inicio")}>
        <IconButton
          size="large"
          aria-label="home"
          color="inherit"
        ></IconButton>
        <p>Início</p>
      </MenuItem>
      <MenuItem style={{ color: 'white' }} component={Link} to="/favoritos" onClick={() => handleMenuItemClick("/favoritos")}>
        <IconButton size="large" aria-label="mostrar 4 novos emails" color="#630a0a">
          <Badge badgeContent={0} color="error"></Badge>
        </IconButton>
        <p>Favoritos</p>
      </MenuItem>
      <MenuItem style={{ color: 'white' }} component={Link} to="/posts" onClick={() => handleMenuItemClick("/posts")}>
        <IconButton
          size="large"
          aria-label="mostrar 17 novas notificações"
          color="inherit"
        >
          <Badge badgeContent={0} color="error"></Badge>
        </IconButton>
        <p>Posts</p>
      </MenuItem>
      <MenuItem style={{ color: 'white' }} component={Link} to="/perfil" onClick={() => handleMenuItemClick("/perfil")}>
        <IconButton
          size="large"
          aria-label="conta do usuário atual"
          aria-controls={menuId}
          aria-haspopup="true"
          color="inherit"
        ></IconButton>
        <p>Perfil</p>
      </MenuItem>
      <MenuItem style={{ color: 'white' }} onClick={() => handleLogout('/')}>
        <IconButton
          size="large"
          aria-label="sair"
          color="inherit"
        >
        </IconButton>
        <p>Sair</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#630a0a' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="abrir menu"
            sx={{ mr: 2 }}
            onClick={handleMobileMenuOpen}
          >
            <IoMdMenu />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Search>
                <SearchIconWrapper></SearchIconWrapper>
                <StyledInputBase
                  placeholder="Pesquisar…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Box>
          </Box>
          <img src={imagem} style={{ width: 80 }} alt="Logo" />
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="mostrar mais"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            ></IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
