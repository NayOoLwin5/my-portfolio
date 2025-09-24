import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  TextField, 
  Button, 
  Paper, 
  IconButton, 
  useTheme,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  Email as EmailIcon, 
  LocationOn as LocationIcon, 
  Phone as PhoneIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  YouTube as YouTubeIcon,
  Send as SendIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { ReactComponent as UpworkSVG } from '../assets/icons/upwork.svg';

// Upwork Icon Component using the actual SVG file
const UpworkIcon: React.FC<{ color?: string }> = ({ color = 'currentColor' }) => (
  <UpworkSVG 
    style={{ 
      width: '24px', 
      height: '24px', 
      fill: color 
    }} 
  />
);

const Contact: React.FC = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Validate subject
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Message should be at least 20 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Replace this URL with your own unique Formspree form ID
        const response = await fetch('https://formspree.io/f/xwpopodq', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        if (response.ok) {
          // Show success message
          setSnackbar({
            open: true,
            message: 'Your message has been sent successfully! I will get back to you soon.',
            severity: 'success',
          });
          
          // Clear form
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
          });
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        // Show error message
        setSnackbar({
          open: true,
          message: 'There was an error sending your message. Please try again later.',
          severity: 'error',
        });
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Show validation error message
      setSnackbar({
        open: true,
        message: 'Please fix the errors in the form and try again.',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  return (
    <Box
      id="contact"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.mode === 'light' 
          ? 'rgba(245, 245, 247, 0.7)' 
          : 'rgba(30, 30, 32, 0.7)',
      }}
    >
      <Container maxWidth="lg">
        <Box 
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Typography
            component={motion.div}
            variants={itemVariants}
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              mb: 1,
              fontSize: '1rem',
              textAlign: 'center',
            }}
          >
            GET IN TOUCH
          </Typography>

          <Typography
            variant="h2"
            component={motion.h2}
            variants={itemVariants}
            sx={{
              fontWeight: 700,
              mb: 2,
              textAlign: 'center',
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            Contact Me
          </Typography>

          <Typography
            component={motion.p}
            variants={itemVariants}
            color="text.secondary"
            sx={{ mb: 6, textAlign: 'center', maxWidth: '800px', mx: 'auto' }}
          >
            Feel free to reach out if you have any questions, project inquiries,
            or just want to connect. I'm always open to new opportunities and collaborations.
          </Typography>

          <Grid container spacing={4}>
            {/* Contact Info */}
            <Grid item xs={12} md={5}>
              <Box component={motion.div} variants={itemVariants}>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ mb: 3, fontWeight: 600 }}
                >
                  Let's Talk
                </Typography>

                <Typography paragraph color="text.secondary" sx={{ mb: 4 }}>
                  Whether you have a project in mind, a question about my work, or just want to say hello,
                  I'd love to hear from you. Fill out the form or use my contact information below.
                </Typography>

                {/* Contact Details */}
                <Box sx={{ mb: 4 }}>
                  {[
                    { 
                      icon: <EmailIcon />, 
                      label: 'Email', 
                      value: 'nayoolwinpersonal@gmail.com',
                      link: 'mailto:nayoolwinpersonal@gmail.com' 
                    },
                    { 
                      icon: <PhoneIcon />, 
                      label: 'Phone', 
                      value: '+66 946277650',
                      link: 'tel:+66946277650' 
                    },
                    { 
                      icon: <LocationIcon />, 
                      label: 'Location', 
                      value: 'Bangkok, Thailand',
                      link: null 
                    },
                  ].map((item, index) => (
                    <Box 
                      key={index} 
                      component={motion.div}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + (index * 0.1) }}
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 2.5,
                        '&:hover': {
                          '& .MuiTypography-root': {
                            color: 'primary.main',
                          },
                        }
                      }}
                    >
                      <Box 
                        sx={{ 
                          mr: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 45,
                          height: 45,
                          borderRadius: '12px',
                          backgroundColor: theme.palette.mode === 'light' 
                            ? 'rgba(94, 53, 177, 0.1)' 
                            : 'rgba(94, 53, 177, 0.2)',
                          color: 'primary.main',
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Box>
                        <Typography 
                          variant="subtitle2" 
                          color="text.secondary"
                          sx={{ mb: 0.5 }}
                        >
                          {item.label}
                        </Typography>
                        {item.link ? (
                          <Typography 
                            component="a" 
                            href={item.link}
                            sx={{ 
                              color: 'text.primary', 
                              textDecoration: 'none',
                              transition: 'color 0.2s ease',
                              '&:hover': {
                                color: 'primary.main',
                              }
                            }}
                          >
                            {item.value}
                          </Typography>
                        ) : (
                          <Typography color="text.primary">
                            {item.value}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>

                {/* Social Links */}
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ mb: 2, fontWeight: 600 }}
                >
                  Connect with Me
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  {[
                    { icon: <GitHubIcon />, label: 'GitHub', link: 'https://github.com/NayOoLwin5', color: '#333' },
                    { icon: <LinkedInIcon />, label: 'LinkedIn', link: 'https://www.linkedin.com/in/nay-oo-lwin-4b3976199/', color: '#0077B5' },
                    { icon: <YouTubeIcon />, label: 'Youtube', link: 'https://www.youtube.com/channel/UCAHyRo_zoWFP2gSzBGJWyIw', color: '#FF0000' },
                    { icon: <UpworkIcon />, label: 'Upwork', link: 'https://www.upwork.com/freelancers/~017d50ae9f5045d0b1', color: '#14A800' },
                  ].map((item, index) => (
                    <Box
                      key={index}
                      component={motion.div}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { delay: 0.6 + (index * 0.1) }
                      }}
                    >
                      <IconButton
                        aria-label={item.label}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          p: 1.5,
                          color: theme.palette.mode === 'light' ? item.color : 'white',
                          backgroundColor: theme.palette.mode === 'light' 
                            ? 'rgba(94, 53, 177, 0.1)' 
                            : 'rgba(94, 53, 177, 0.2)',
                          '&:hover': {
                            transform: 'scale(1.2)',
                            backgroundColor: theme.palette.mode === 'light' 
                              ? 'rgba(94, 53, 177, 0.2)' 
                              : 'rgba(94, 53, 177, 0.3)',
                          },
                        }}
                      >
                        {item.icon}
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>

            {/* Contact Form */}
            <Grid item xs={12} md={7}>
              <Box
                component={motion.div}
                variants={itemVariants}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: '16px',
                    backgroundColor: theme.palette.mode === 'light' 
                      ? 'rgba(255, 255, 255, 0.9)' 
                      : 'rgba(35, 35, 40, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ mb: 3, fontWeight: 600 }}
                  >
                    Send a Message
                  </Typography>

                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Your Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          error={!!errors.name}
                          helperText={errors.name}
                          variant="outlined"
                          required
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '10px',
                              transition: 'all 0.3s ease',
                              '&:hover fieldset': {
                                borderColor: 'primary.main',
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Your Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          error={!!errors.email}
                          helperText={errors.email}
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '10px',
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          error={!!errors.subject}
                          helperText={errors.subject}
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '10px',
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          rows={5}
                          label="Your Message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          error={!!errors.message}
                          helperText={errors.message}
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '10px',
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Box
                          component={motion.div}
                          whileHover={{ 
                            scale: 1.02,
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            disabled={isSubmitting}
                            endIcon={isSubmitting ? null : <SendIcon />}
                            sx={{ 
                              py: 1.5, 
                              borderRadius: '10px',
                              fontWeight: 600,
                              boxShadow: '0 6px 20px rgba(94, 53, 177, 0.4)',
                            }}
                          >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </form>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Google Maps Embed */}
      <Box 
        component={motion.div}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        sx={{ 
          mt: 8, 
          height: '400px', 
          overflow: 'hidden',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '50px',
            background: 'linear-gradient(to bottom, rgba(245,245,247,1) 0%, rgba(245,245,247,0) 100%)',
            opacity: theme.palette.mode === 'light' ? 1 : 0,
            zIndex: 1,
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50px',
            background: 'linear-gradient(to top, rgba(245,245,247,1) 0%, rgba(245,245,247,0) 100%)',
            opacity: theme.palette.mode === 'light' ? 1 : 0,
            zIndex: 1,
          },
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248057.55644128312!2d100.4683020139333!3d13.724544918516242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d6032280d61f3%3A0x10100b25de24820!2sBangkok!5e0!3m2!1sen!2sth!4v1741606280251!5m2!1sen!2sth"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="Google Maps"
        />
      </Box>

      {/* Notification Snackbar */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact; 