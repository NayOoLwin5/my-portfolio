import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Link, 
  Grid, 
  Divider,
  useTheme,
  IconButton
} from '@mui/material';
import { 
  Email as EmailIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  YouTube as YouTubeIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        backgroundColor: theme.palette.mode === 'light' 
          ? 'rgba(30, 30, 32, 0.95)' 
          : 'rgba(18, 18, 20, 0.95)',
        color: '#fff',
        position: 'relative',
      }}
    >
      {/* Scroll to top button */}
      <Box
        sx={{
          position: 'absolute',
          top: -25,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Box
          component={motion.div}
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <IconButton
            onClick={scrollToTop}
            aria-label="scroll to top"
            sx={{
              backgroundColor: 'primary.main',
              color: '#fff',
              width: 50,
              height: 50,
              boxShadow: '0 4px 14px rgba(94, 53, 177, 0.4)',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            <KeyboardArrowUpIcon fontSize="medium" />
          </IconButton>
        </Box>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Logo & info */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'primary.main',
                mb: 2,
              }}
            >
              DEVELOPER
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
              A passionate software developer specializing in creating exceptional digital experiences 
              with modern technologies and clean, efficient code.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              {[
                { icon: <GitHubIcon />, href: 'https://github.com/NayOoLwin5', label: 'GitHub' },
                { icon: <LinkedInIcon />, href: 'https://www.linkedin.com/in/nay-oo-lwin-4b3976199/', label: 'LinkedIn' },
                { icon: <YouTubeIcon />, href: 'https://www.youtube.com/channel/UCAHyRo_zoWFP2gSzBGJWyIw', label: 'Youtube' },
                { icon: <EmailIcon />, href: 'mailto:nayoolwinpersonal@gmail.com', label: 'Email' },
              ].map((item, index) => (
                <IconButton 
                  key={index}
                  component="a"
                  href={item.href}
                  aria-label={item.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.8)', 
                    '&:hover': { 
                      color: 'primary.main',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    } 
                  }}
                >
                  {item.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" fontWeight={600} color="primary.light" sx={{ mb: 2 }}>
              Quick Links
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
              {['Home', 'About', 'Skills', 'Projects', 'Experience'].map((item) => (
                <Box component="li" key={item} sx={{ mb: 1 }}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    color="inherit"
                    underline="none"
                    sx={{ 
                      opacity: 0.8, 
                      transition: 'all 0.2s ease',
                      '&:hover': { 
                        opacity: 1, 
                        color: 'primary.main',
                        pl: 0.5,
                      } 
                    }}
                  >
                    {item}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" fontWeight={600} color="primary.light" sx={{ mb: 2 }}>
              Contact
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Link
                  href="tel:+15551234567"
                  color="inherit"
                  underline="none"
                  sx={{ 
                    opacity: 0.8, 
                    transition: 'opacity 0.2s ease',
                    '&:hover': { opacity: 1, color: 'primary.main' } 
                  }}
                >
                  +66 946277650
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Link
                  href="mailto:nayoolwinpersonal@gmail.com"
                  color="inherit"
                  underline="none"
                  sx={{ 
                    opacity: 0.8, 
                    transition: 'opacity 0.2s ease',
                    '&:hover': { opacity: 1, color: 'primary.main' } 
                  }}
                >
                  nayoolwinpersonal@gmail.com
                </Link>
              </Box>
              <Box component="li" sx={{ opacity: 0.8 }}>
                Bangkok, Thailand
              </Box>
            </Box>
          </Grid>

          {/* Legal Links */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" fontWeight={600} color="primary.light" sx={{ mb: 2 }}>
              Legal
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
              {['Privacy Policy', 'Terms of Service', 'Cookies'].map((item) => (
                <Box component="li" key={item} sx={{ mb: 1 }}>
                  <Link
                    href="#"
                    color="inherit"
                    underline="none"
                    sx={{ 
                      opacity: 0.8, 
                      transition: 'opacity 0.2s ease',
                      '&:hover': { opacity: 1, color: 'primary.main' } 
                    }}
                  >
                    {item}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Copyright */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © {currentYear} Nay Oo Lwin. All rights reserved.
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.5 }}>
            Designed and built with ❤️ using React and Material UI
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 