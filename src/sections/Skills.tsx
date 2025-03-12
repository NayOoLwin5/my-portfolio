import React from 'react';
import { Container, Typography, Box, Grid, Paper, useTheme, Chip, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
// Import icons
import HtmlIcon from '@mui/icons-material/Html';
import CssIcon from '@mui/icons-material/Css';
import JavascriptIcon from '@mui/icons-material/Javascript';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import BrushIcon from '@mui/icons-material/Brush';
import BuildIcon from '@mui/icons-material/Build';
import WebIcon from '@mui/icons-material/Web';
import DevicesIcon from '@mui/icons-material/Devices';

// Define skill categories - reduced to 3 items
const skillCategories = [
  {
    title: 'Frontend',
    icon: <WebIcon fontSize="large" />,
    color: "#7E57C2", // Purple
    skills: [
      'React.js',
      'Material-UI',
      'Tailwind CSS',
      'TypeScript',
      'JavaScript',
      'Redux',
      'Web3.js',
      'Next.js',
      'HTML5/CSS3'
    ]
  },
  {
    title: 'Backend',
    icon: <StorageIcon fontSize="large" />,
    color: "#5C6BC0", // Indigo
    skills: [
      'Express',
      'Nest.js',
      'FastAPI',
      'Python',
      'Go',
      'Redis',
      'RESTful APIs',
      'GraphQL',
      'NoSQL',
      'SQL',
    ]
  },
  {
    title: 'DevOps & Tools',
    icon: <BuildIcon fontSize="large" />,
    color: "#26A69A", // Teal
    skills: [
      'Git',
      'Docker',
      'AWS',
      'Firebase',
      'Cloudflare',
      'CI/CD',
      'Github Actions',
      'Gitlab CI/CD',
      'AWS CodePipeline'
    ]
  }
];

// Additional skills grouped by category
const additionalSkillsGroups = [
  {
    category: 'Frameworks & Tools',
    icon: <CodeIcon fontSize="small" />,
    skills: [ 'NodeJS', 'Redis', 'Memcached', 'Mongodb', 'Express.js', 'Mongodb Change Streams', 'supabase', 'celery', 'prisma', 'OAuth', 'Bull.js', 'Socket.io', 'RabbitMQ', 'apm', 'ELK', 'sentry', 'zerolog', 'Node-RED', 'websocket', 'mqtt']
  },
  {
    category: 'Cloud & Deployment',
    icon: <CloudIcon fontSize="small" />,
    skills: ['Vercel', 'Netlify', 'Heroku', 'AWS S3', 'AWS Lambda', 'AWS EC2']
  },
  {
    category: 'Testing & Optimization',
    icon: <BuildIcon fontSize="small" />,
    skills: ['Jest', 'Vitest', 'React Testing Library', 'Apache JMeter', 'Pytest']
  }
];

const Skills: React.FC = () => {
  const theme = useTheme();

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

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1 * custom,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -10,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <Box
      id="skills"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.background.default,
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
            MY SKILLS
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
            Technical Expertise
          </Typography>

          <Typography
            component={motion.p}
            variants={itemVariants}
            color="text.secondary"
            sx={{ mb: 8, textAlign: 'center', maxWidth: '800px', mx: 'auto' }}
          >
            I've spent years honing my skills across the full stack. Here's what I bring to every project.
          </Typography>

          {/* Main skill categories */}
          <Grid container spacing={3} justifyContent="center">
            {skillCategories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  component={motion.div}
                  custom={index}
                  variants={cardVariants}
                  whileHover="hover"
                  elevation={0}
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: '16px',
                    border: `1px solid ${theme.palette.divider}`,
                    backgroundColor: theme.palette.mode === 'light' 
                      ? 'rgba(255, 255, 255, 0.9)' 
                      : 'rgba(25, 25, 25, 0.9)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    position: 'relative',
                    maxWidth: { sm: '360px', md: '100%' },
                    mx: 'auto',
                  }}
                >
                  {/* Color accent at top of card */}
                  <Box sx={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: category.color
                  }} />
                  
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 2.5,
                    mt: 1
                  }}>
                    <Avatar sx={{ 
                      bgcolor: `${category.color}15`, 
                      color: category.color,
                      mr: 2 
                    }}>
                      {category.icon}
                    </Avatar>
                    <Typography variant="h6" fontWeight={600}>
                      {category.title}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ flexGrow: 1 }}>
                    {category.skills.map((skill, skillIndex) => (
                      <Box 
                        key={skillIndex} 
                        sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          py: 1,
                          borderBottom: skillIndex < category.skills.length - 1 ? 
                            `1px solid ${theme.palette.divider}` : 'none'
                        }}
                      >
                        <Box 
                          sx={{ 
                            width: 6, 
                            height: 6, 
                            borderRadius: '50%',
                            bgcolor: category.color,
                            mr: 1.5
                          }} 
                        />
                        <Typography variant="body2">
                          {skill}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Additional skills by category */}
          <Box 
            component={motion.div}
            variants={itemVariants}
            sx={{ mt: 8 }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ 
                mb: 4, 
                textAlign: 'center',
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 80,
                  height: 3,
                  bgcolor: 'primary.main',
                  borderRadius: 2
                }
              }}
            >
              Additional Technologies
            </Typography>

            <Grid container spacing={3} sx={{ mt: 2 }}>
              {additionalSkillsGroups.map((group, groupIndex) => (
                <Grid item xs={12} sm={6} key={groupIndex}>
                  <Paper
                    component={motion.div}
                    variants={itemVariants}
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: '16px',
                      border: `1px solid ${theme.palette.divider}`,
                      backgroundColor: theme.palette.mode === 'light' 
                        ? 'rgba(255, 255, 255, 0.8)' 
                        : 'rgba(30, 30, 30, 0.8)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 2
                    }}>
                      <Box sx={{ 
                        mr: 1.5, 
                        color: 'primary.main' 
                      }}>
                        {group.icon}
                      </Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {group.category}
                      </Typography>
                    </Box>
                    
                    <Box sx={{
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: 1
                    }}>
                      {group.skills.map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          size="small"
                          component={motion.div}
                          whileHover={{ scale: 1.05 }}
                          sx={{
                            borderRadius: '12px',
                            backgroundColor: theme.palette.mode === 'light' 
                              ? 'rgba(94, 53, 177, 0.08)' 
                              : 'rgba(94, 53, 177, 0.15)',
                            border: '1px solid',
                            borderColor: 'primary.light',
                            '&:hover': {
                              backgroundColor: 'primary.main',
                              color: 'white'
                            }
                          }}
                        />
                      ))}
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Skills; 