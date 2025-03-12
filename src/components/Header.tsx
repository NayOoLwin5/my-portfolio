import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  IconButton, 
  Typography, 
  Menu, 
  Container, 
  Button, 
  MenuItem,
  useScrollTrigger,
  Slide,
  Fab,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  DarkMode as DarkModeIcon, 
  LightMode as LightModeIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon 
} from '@mui/icons-material';
import { useColorMode } from '../theme/ThemeProvider';
import { motion } from 'framer-motion';

// Navigation pages
const pages = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'];

// Hide on scroll functionality
function HideOnScroll(props: { children: React.ReactElement }) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

// Scroll to top button
function ScrollTop() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Tooltip title="Scroll to top">
      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        <Box
          component={motion.div}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Fab
            color="primary"
            size="small"
            aria-label="scroll back to top"
            onClick={handleClick}
            sx={{
              opacity: trigger ? 1 : 0,
              transition: 'opacity 0.3s',
              '&:hover': {
                transform: 'translateY(-4px)',
              },
            }}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </Box>
      </Box>
    </Tooltip>
  );
}

const Header: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const theme = useTheme();
  const { mode, toggleColorMode } = useColorMode();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleNavClick = (page: string) => {
    handleCloseNavMenu();
    setDrawerOpen(false);
    
    // Smooth scroll to section
    const element = document.getElementById(page.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Get all sections and their positions
      const sections = pages.map(page => {
        const element = document.getElementById(page.toLowerCase());
        if (!element) return { id: page, top: 0, bottom: 0 };
        
        const rect = element.getBoundingClientRect();
        return {
          id: page,
          top: rect.top + scrollPosition,
          bottom: rect.bottom + scrollPosition
        };
      });
      
      // Find the current section
      for (const section of sections) {
        if (scrollPosition >= section.top - 100 && scrollPosition < section.bottom) {
          setActiveSection(section.id);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <HideOnScroll>
        <AppBar 
          position="fixed" 
          elevation={0}
          sx={{ 
            backdropFilter: 'blur(8px)',
            bgcolor: theme.palette.mode === 'light' 
              ? 'rgba(255, 255, 255, 0.8)' 
              : 'rgba(18, 18, 18, 0.8)',
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              {/* Logo for desktop */}
              <Typography
                variant="h6"
                noWrap
                component={motion.div}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.2rem',
                  color: 'primary.main',
                  textDecoration: 'none',
                }}
              >
                DEVELOPER
              </Typography>

              {/* Mobile menu */}
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={toggleDrawer(true)}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Drawer
                  anchor="left"
                  open={drawerOpen}
                  onClose={toggleDrawer(false)}
                >
                  <Box
                    sx={{ width: 250 }}
                    role="presentation"
                  >
                    <List>
                      {pages.map((page) => (
                        <ListItem key={page} disablePadding>
                          <ListItemButton 
                            onClick={() => handleNavClick(page)}
                            selected={activeSection === page}
                          >
                            <ListItemText primary={page} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Drawer>
              </Box>

              {/* Logo for mobile */}
              <Typography
                variant="h5"
                noWrap
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.2rem',
                  color: 'primary.main',
                  textDecoration: 'none',
                }}
              >
                DEV
              </Typography>

              {/* Desktop menu */}
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                {pages.map((page) => (
                  <Box
                    key={page}
                    component={motion.div}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => handleNavClick(page)}
                      sx={{
                        my: 2, 
                        mx: 1,
                        display: 'block',
                        color: activeSection === page 
                          ? 'primary.main' 
                          : 'text.primary',
                        fontWeight: activeSection === page ? 700 : 500,
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          width: activeSection === page ? '100%' : '0%',
                          height: '3px',
                          bottom: '0',
                          left: '0',
                          bgcolor: 'primary.main',
                          transition: 'width 0.3s ease-in-out',
                        },
                        '&:hover::after': {
                          width: '100%',
                        },
                      }}
                    >
                      {page}
                    </Button>
                  </Box>
                ))}
              </Box>

              {/* Theme toggle */}
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
                  <Box
                    component={motion.div}
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.4 }}
                  >
                    <IconButton 
                      onClick={toggleColorMode} 
                      sx={{ ml: 1 }}
                      color="inherit"
                    >
                      {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                    </IconButton>
                  </Box>
                </Tooltip>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Toolbar /> {/* Placeholder to prevent content from hiding behind AppBar */}
      <ScrollTop />
    </>
  );
};

export default Header; 