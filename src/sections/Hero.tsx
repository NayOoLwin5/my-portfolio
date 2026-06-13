import React from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { KeyboardArrowDown as KeyboardArrowDownIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import CodeEditor from '../components/CodeEditor';

const Hero: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0, 0.9],
      },
    },
  };

  // Handle scroll to About section
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      id="home"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component={motion.div}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Typography
                component={motion.div}
                variants={itemVariants}
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  mb: 2,
                  fontFamily: 'monospace',
                }}
              >
                Hello, my name is
              </Typography>

              <Typography
                variant="h1"
                component={motion.h1}
                variants={itemVariants}
                sx={{
                  fontWeight: 800,
                  mb: 1,
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                }}
              >
                Nay Oo Lwin
              </Typography>

              <Typography
                variant="h2"
                component={motion.h2}
                variants={itemVariants}
                sx={{
                  color: 'text.secondary',
                  mb: 3,
                  fontWeight: 600,
                  fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
                }}
              >
                I build exceptional digital experiences
              </Typography>

              <Typography
                component={motion.p}
                variants={itemVariants}
                color="text.secondary"
                sx={{ mb: 4, maxWidth: '600px', fontSize: '1.1rem' }}
              >
                I'm a software developer specializing in building 
                high-performance applications with modern technologies. 
                Currently focused on creating accessible, human-centered products.
              </Typography>

              <Box component={motion.div} variants={itemVariants}>
                <Box
                  component={motion.div}
                  animate={{ 
                    y: [10, -5, 10],
                  }}
                  transition={{ 
                    duration: 1.8,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 0 15px rgba(94, 53, 177, 0.5)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  sx={{ display: 'inline-block', mr: 2 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={scrollToAbout}
                    endIcon={<KeyboardArrowDownIcon />}
                    sx={{ 
                      borderRadius: '30px',
                      px: 4,
                      py: 1.5,
                      fontSize: '1rem'
                    }}
                  >
                    Discover More
                  </Button>
                </Box>

                <Box
                  component={motion.div}
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: 'primary.main', 
                  }}
                  whileTap={{ scale: 0.98 }}
                  sx={{ display: 'inline-block' }}
                >
                  <Button
                    variant="outlined"
                    size="large"
                    href="#contact"
                    sx={{ 
                      borderRadius: '30px',
                      px: 4,
                      py: 1.5,
                      fontSize: '1rem',
                      position: 'relative',
                      overflow: 'hidden',
                      border: '2px solid',
                      borderColor: theme => theme.palette.mode === 'light' 
                        ? 'rgba(94, 53, 177, 0.6)' 
                        : 'rgba(94, 53, 177, 0.8)',
                      color: theme => theme.palette.mode === 'light' 
                        ? 'rgba(94, 53, 177, 0.9)' 
                        : 'rgba(255, 255, 255, 0.9)',
                      fontWeight: 600,
                      backdropFilter: 'blur(5px)',
                      background: theme => theme.palette.mode === 'light'
                        ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(240, 240, 255, 0.6))'
                        : 'linear-gradient(135deg, rgba(94, 53, 177, 0.1), rgba(70, 40, 120, 0.2))',
                      boxShadow: '0 4px 15px rgba(94, 53, 177, 0.2)',
                      textTransform: 'none',
                      letterSpacing: '0.5px',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: theme => theme.palette.mode === 'light'
                          ? 'linear-gradient(135deg, rgba(94, 53, 177, 0.2), rgba(120, 80, 200, 0.1))'
                          : 'linear-gradient(135deg, rgba(94, 53, 177, 0.4), rgba(120, 80, 200, 0.2))',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        zIndex: -1,
                      },
                      '&:hover': {
                        borderColor: 'primary.main',
                        boxShadow: '0 8px 25px rgba(94, 53, 177, 0.3)',
                      },
                      '&:hover::before': {
                        opacity: 1,
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                        transition: 'all 0.6s ease',
                        zIndex: 1,
                      },
                      '&:hover::after': {
                        left: '100%',
                      },
                      '& .arrow': {
                        position: 'absolute',
                        left: '-30px',
                        opacity: 0,
                        transition: 'all 0.3s ease',
                        color: theme => theme.palette.mode === 'light' 
                          ? 'rgba(94, 53, 177, 1)' 
                          : 'rgba(255, 255, 255, 1)',
                        zIndex: 2,
                      },
                      '& .text': {
                        position: 'relative',
                        transition: 'all 0.3s ease',
                        zIndex: 2,
                      },
                      '&:hover .arrow': {
                        left: 'calc(50% - 12px)',
                        opacity: 1,
                      },
                      '&:hover .text': {
                        transform: 'translateX(30px)',
                        opacity: 0,
                      }
                    }}
                  >
                    <ArrowForwardIcon className="arrow" />
                    <span className="text">Contact Me</span>
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
            <CodeEditor />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero; 