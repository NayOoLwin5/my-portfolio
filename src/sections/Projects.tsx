import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Chip, 
  Button, 
  IconButton, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  useTheme,
  Tab,
  Tabs
} from '@mui/material';
import { 
  GitHub as GitHubIcon, 
  Launch as LaunchIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import mongochangestream from "../assets/images/mongochangestream.png";

// Project data
const projects = [
  {
    id: 1,
    title: 'Mongo Data Sync',
    description: 'This project primarily focuses on mongo data sync from one database to another seamlessly, wriiten in javascript.',
    image: mongochangestream,
    technologies: [ 'Node.js', 'Express', 'MongoDB', 'Mongo Change Streams', 'Redis', 'Bull.js'],
    category: 'backend',
    githubUrl: 'https://github.com/NayOoLwin5/Mongo-Data-Sync',
    liveUrl: 'https://github.com/NayOoLwin5/Mongo-Data-Sync',
    details: {
      challenge: 'Concurrency and duplicate data handling.',
      solution: 'Implemented Redis and Bull.js to handle concurrency and duplicate data handling.',
      features: [
        'Used to stablize the system load for handling impressive amount of change events per second by processing data one by one',
        'Change Stream watches for update and insert operations of a collection and add each event asynchronously in bull.js queue without any blocking process',
        'Bull.js get those job data one by one from redis, process the data synchronously and add them in another database',
        'With use of changeStreamLog collection that tracks each event processing state, duplicates can be checked with its status of each event. And also, can make use of uniqeue indexes additionally in database level',
        'Change stream event can trigger more than one time depending on database shreding and replica sets. To avoid duplicates, redis caching comes into play to cache each event with change streams Id with 4 secs expiry set'
      ]
    }
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, task assignments, and deadline tracking.',
    image: 'https://placehold.co/800x600/00BCD4/FFFFFF?text=Task+Management+App',
    technologies: ['React', 'Firebase', 'Material UI', 'Redux'],
    category: 'frontend',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    details: {
      challenge: 'Creating a real-time collaboration system that maintains consistency across multiple users editing the same tasks.',
      solution: 'Leveraged Firebase Realtime Database with optimistic UI updates and conflict resolution to ensure a smooth collaborative experience.',
      features: [
        'Drag-and-drop task organization',
        'Real-time updates and notifications',
        'Task commenting and attachment uploads',
        'Team management and permissions',
        'Calendar integration',
        'Customizable labels and priorities'
      ]
    }
  },
  {
    id: 3,
    title: 'Health & Fitness Tracker',
    description: 'A mobile-first application for tracking workouts, nutrition, and health metrics with data visualization.',
    image: 'https://placehold.co/800x600/5E35B1/FFFFFF?text=Fitness+Tracker',
    technologies: ['React Native', 'Express', 'MongoDB', 'Chart.js'],
    category: 'mobile',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    details: {
      challenge: 'Designing an intuitive data visualization system that would motivate users while providing actionable insights.',
      solution: 'Created custom chart components with interactive elements that highlighted progress and suggested improvements based on historical data.',
      features: [
        'Customizable workout plans',
        'Nutrition tracking and meal suggestions',
        'Progress charts and statistics',
        'Goal setting and achievement tracking',
        'Social sharing and community features',
        'Integration with wearable devices'
      ]
    }
  },
  {
    id: 4,
    title: 'Weather Dashboard',
    description: 'A weather forecasting application with interactive maps, location-based services, and severe weather alerts.',
    image: 'https://placehold.co/800x600/00BCD4/FFFFFF?text=Weather+Dashboard',
    technologies: ['React', 'TypeScript', 'OpenWeather API', 'Leaflet Maps'],
    category: 'frontend',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    details: {
      challenge: 'Optimizing performance while handling large datasets from multiple weather API sources.',
      solution: 'Implemented efficient data caching strategies and lazy loading to maintain a responsive interface even with complex weather visualization.',
      features: [
        'Current conditions and forecasts',
        'Interactive radar maps',
        'Location-based weather alerts',
        'Historical weather data comparison',
        'Customizable dashboard widgets',
        'Offline mode with cached data'
      ]
    }
  },
  {
    id: 5,
    title: 'Content Management System',
    description: 'A headless CMS with a React admin interface, API management, and multilingual content support.',
    image: 'https://placehold.co/800x600/5E35B1/FFFFFF?text=CMS+Platform',
    technologies: ['React', 'Node.js', 'GraphQL', 'PostgreSQL'],
    category: 'fullstack',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    details: {
      challenge: 'Creating a flexible content modeling system that could adapt to various client needs while maintaining performance.',
      solution: 'Developed a dynamic schema system with GraphQL that allowed for custom content types while optimizing database queries.',
      features: [
        'Custom content type builder',
        'Role-based access control',
        'Version history and content rollback',
        'Scheduled publishing',
        'Multilingual content support',
        'API key management and rate limiting'
      ]
    }
  },
  {
    id: 6,
    title: 'Virtual Classroom',
    description: 'An educational platform with live video lectures, course management, and interactive learning tools.',
    image: 'https://placehold.co/800x600/00BCD4/FFFFFF?text=Virtual+Classroom',
    technologies: ['React', 'WebRTC', 'Socket.io', 'Express', 'MongoDB'],
    category: 'fullstack',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    details: {
      challenge: 'Building a reliable real-time video streaming system that could handle multiple participants with varying internet connections.',
      solution: 'Implemented adaptive streaming quality with WebRTC and created fallback mechanisms to ensure continuity during connection issues.',
      features: [
        'Live video lectures with screen sharing',
        'Interactive whiteboard',
        'Real-time chat and Q&A',
        'Assignment submission and grading',
        'Course material management',
        'Attendance tracking and analytics'
      ]
    }
  },
];

const Projects: React.FC = () => {
  const theme = useTheme();
  const [category, setCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<null | typeof projects[0]>(null);
  const [open, setOpen] = useState(false);

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

  // Handle category change
  const handleCategoryChange = (_: React.SyntheticEvent, newValue: string) => {
    setCategory(newValue);
  };

  // Filter projects by category
  const filteredProjects = category === 'all' 
    ? projects 
    : projects.filter(project => project.category === category);

  // Handle dialog open/close
  const handleClickOpen = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      id="projects"
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
            MY WORK
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
            Recent Projects
          </Typography>

          <Typography
            component={motion.p}
            variants={itemVariants}
            color="text.secondary"
            sx={{ mb: 6, textAlign: 'center', maxWidth: '800px', mx: 'auto' }}
          >
            Here are some of the projects I've worked on recently. 
            Each represents unique challenges and solutions in web development.
          </Typography>

          {/* Category Tabs */}
          <Box
            component={motion.div}
            variants={itemVariants}
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mb: 6,
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <Tabs 
              value={category} 
              onChange={handleCategoryChange}
              indicatorColor="primary"
              textColor="primary"
              sx={{ 
                '& .MuiTab-root': {
                  fontSize: '1rem',
                  fontWeight: 500,
                  px: 3,
                  py: 2,
                  minWidth: 0,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: 'primary.main',
                    opacity: 1,
                  },
                },
              }}
            >
              <Tab 
                label="All Projects" 
                value="all" 
                sx={{ textTransform: 'none' }}
              />
              <Tab 
                label="Frontend" 
                value="frontend" 
                sx={{ textTransform: 'none' }}
              />
              <Tab 
                label="Fullstack" 
                value="fullstack" 
                sx={{ textTransform: 'none' }}
              />
              <Tab 
                label="Mobile" 
                value="mobile" 
                sx={{ textTransform: 'none' }}
              />
            </Tabs>
          </Box>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <Grid 
              component={motion.div}
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              container 
              spacing={4}
            >
              {filteredProjects.map((project) => (
                <Grid item xs={12} sm={6} md={4} key={project.id}>
                  <Card
                    component={motion.div}
                    variants={itemVariants}
                    whileHover={{ 
                      y: -15,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                    }}
                    transition={{ duration: 0.3 }}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      backgroundColor: theme.palette.mode === 'light' 
                        ? 'rgba(255, 255, 255, 0.9)' 
                        : 'rgba(35, 35, 40, 0.8)',
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <Box sx={{ position: 'relative', paddingTop: '60%' }}>
                      <CardMedia
                        component="img"
                        image={project.image}
                        alt={project.title}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          },
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
                        }}
                      />
                    </Box>
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography 
                        gutterBottom 
                        variant="h5" 
                        component="h3" 
                        fontWeight={600}
                      >
                        {project.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ mb: 2, minHeight: '3rem' }}
                      >
                        {project.description}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <Chip
                            key={index}
                            label={tech}
                            size="small"
                            sx={{
                              backgroundColor: theme.palette.mode === 'light' 
                                ? 'rgba(94, 53, 177, 0.1)' 
                                : 'rgba(94, 53, 177, 0.2)',
                              color: 'primary.main',
                              fontWeight: 500,
                            }}
                          />
                        ))}
                        {project.technologies.length > 3 && (
                          <Chip
                            label={`+${project.technologies.length - 3}`}
                            size="small"
                            sx={{
                              backgroundColor: 'rgba(0, 0, 0, 0.05)',
                              fontWeight: 500,
                            }}
                          />
                        )}
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box
                          component={motion.div}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button 
                            variant="outlined" 
                            onClick={() => handleClickOpen(project)}
                            size="small"
                          >
                            View Details
                          </Button>
                        </Box>
                        <Box>
                          <IconButton 
                            aria-label="github"
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ 
                              mr: 1,
                              transition: 'all 0.3s ease',
                              '&:hover': { 
                                backgroundColor: 'rgba(94, 53, 177, 0.1)',
                                transform: 'scale(1.2)'
                              }
                            }}
                          >
                            <GitHubIcon fontSize="small" />
                          </IconButton>
                          <IconButton 
                            aria-label="live demo"
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ 
                              transition: 'all 0.3s ease',
                              '&:hover': { 
                                backgroundColor: 'rgba(0, 188, 212, 0.1)',
                                transform: 'scale(1.2)'
                              }
                            }}
                          >
                            <LaunchIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </AnimatePresence>

          {/* View All Projects Button */}
          <Box 
            component={motion.div}
            variants={itemVariants}
            sx={{ textAlign: 'center', mt: 6 }}
          >
            <Button
              variant="contained"
              size="large"
              href="https://github.com"
              target="_blank"
              endIcon={<GitHubIcon />}
              sx={{ 
                borderRadius: '30px',
                px: 4,
                py: 1.5,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 0 15px rgba(94, 53, 177, 0.5)',
                }
              }}
            >
              View All Projects on GitHub
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Project Detail Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
          }
        }}
      >
        {selectedProject && (
          <>
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                image={selectedProject.image}
                alt={selectedProject.title}
                height="300"
                sx={{ objectPosition: 'center top' }}
              />
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <DialogTitle sx={{ 
              p: 3,
              pb: 0,
              fontSize: '1.8rem', 
              fontWeight: 600 
            }}>
              {selectedProject.title}
            </DialogTitle>
            <DialogContent sx={{ p: 3 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Challenge
                </Typography>
                <Typography color="text.secondary" paragraph>
                  {selectedProject.details.challenge}
                </Typography>

                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Solution
                </Typography>
                <Typography color="text.secondary" paragraph>
                  {selectedProject.details.solution}
                </Typography>

                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Key Features
                </Typography>
                <Box component="ul" sx={{ pl: 2, color: 'text.secondary' }}>
                  {selectedProject.details.features.map((feature, index) => (
                    <Typography component="li" key={index} paragraph>
                      {feature}
                    </Typography>
                  ))}
                </Box>
              </Box>

              <Typography variant="h6" gutterBottom fontWeight={600}>
                Technologies Used
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {selectedProject.technologies.map((tech, index) => (
                  <Chip
                    key={index}
                    label={tech}
                    sx={{
                      backgroundColor: theme.palette.mode === 'light' 
                        ? 'rgba(94, 53, 177, 0.1)' 
                        : 'rgba(94, 53, 177, 0.2)',
                      color: 'primary.main',
                      fontWeight: 500,
                      px: 1,
                      py: 2.5,
                    }}
                  />
                ))}
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3, pt: 0 }}>
              <Button 
                variant="outlined" 
                onClick={handleClose}
                sx={{ borderRadius: '20px', px: 3 }}
              >
                Close
              </Button>
              <Button 
                variant="contained" 
                href={selectedProject.liveUrl}
                target="_blank"
                endIcon={<LaunchIcon />}
                sx={{ borderRadius: '20px', px: 3 }}
              >
                View Live
              </Button>
              <Button
                variant="contained"
                href={selectedProject.githubUrl}
                target="_blank"
                color="secondary"
                endIcon={<GitHubIcon />}
                sx={{ borderRadius: '20px', px: 3 }}
              >
                View Code
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Projects; 