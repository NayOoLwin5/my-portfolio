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
    title: 'AI Waste Management Report System',
    description: 'A full-stack waste incident reporting platform with offline AI capabilities for automatic waste classification, semantic similarity search, and trend analysis. Built with FastAPI, React, and PostgreSQL, featuring sentence-transformers for real-time duplicate detection and analytics dashboard',
    image: mongochangestream,
    technologies: [ 'Python', 'FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Docker', 'sentence-transformers (all-MiniLM-L6-v2)', 'NLTK', 'scikit-learn', 'Shadcn', 'Tailwind CSS'],
    category: 'fullstack',
    githubUrl: 'https://github.com/NayOoLwin5/waste-management-report-system',
    details: {
      challenge: 'Getting AI accomplished in offline environment and duplicate report detection',
      solution: 'Implemented sentence-transformers (all-MiniLM-L6-v2) for embedding generation and pgvector with HNSW indexing for fast vector similarity search in PostgreSQL to detect duplicate reports in real-time',
      features: [
        'Developed an enterprise-grade waste management platform using FastAPI, React, TypeScript, and PostgreSQL with Docker deployment, handling 100+ concurrent users and 100K+ incidents',
        'Implemented 4 offline AI features using all-MiniLM-L6-v2 (sentence-transformers) and scikit-learn: hybrid waste classification (90% accuracy), semantic similarity detection, keyword extraction, and AI-generated executive summaries—all processing done locally without external API calls',
        'Built vector similarity search with pgvector extension and HNSW indexing for real-time duplicate detection (<10ms query time) using 384-dimensional embeddings from sentence-transformers model',
        'Designed modular monolith architecture with structured logging, async operations, and automated database seeding script that generates 150 realistic incidents with full AI processing',
        'Created interactive analytics dashboard with time-series trends, anomaly detection, location hotspots, and data visualization using TanStack Query and Recharts'
      ]
    }
  },
  {
    id: 2,
    title: 'Mongo Data Sync',
    description: 'This project primarily focuses on mongo data sync from one database to another seamlessly, wriiten in javascript.',
    image: mongochangestream,
    technologies: [ 'Node.js', 'Javascript', 'Express', 'MongoDB', 'Mongo Change Streams', 'Redis', 'Bull.js'],
    category: 'backend',
    githubUrl: 'https://github.com/NayOoLwin5/Mongo-Data-Sync',
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
    id: 3,
    title: 'Chat App',
    description: 'A collaborative chat application with real-time chatting in a group and private chat',
    image: 'https://placehold.co/800x600/00BCD4/FFFFFF?text=Task+Management+App',
    technologies: ['React', 'Typescript', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Bull.js', 'Redis'],
    category: 'fullstack',
    githubUrl: 'https://github.com/NayOoLwin5/chat-app-frontend/tree/main',
    details: {
      challenge: 'High Volume of messages and scalability',
      solution: 'Leveraged Socket.io and Redis for caching and handling high volume of messages and scalability',
      features: [
        'User authentication (local and Google OAuth)',
        'Real-time messaging',
        'Group and private chat',
        'Friend management',
        'Message encryption',
        'Redis-based message queue for processing'
      ]
    }
  },
  {
    id: 4,
    title: 'Binance Trade Feed',
    description: 'A FastAPI-based service that provides real-time cryptocurrency trading data from Binance via WebSocket connections',
    image: 'https://placehold.co/800x600/5E35B1/FFFFFF?text=Fitness+Tracker',
    technologies: ['Python', 'FastAPI', 'websocket', 'Binance websocket streaming API'],
    category: 'backend',
    githubUrl: 'https://github.com/NayOoLwin5/Binance-Trade-Feed',
    details: {
      challenge: 'Handling real-time data from Binance WebSocket API',
      solution: 'Created a FastAPI service that subscribes to Binance WebSocket streams and processes incoming data in real-time.',
      features: [
        'Real-time cryptocurrency trading data',
        'WebSocket connections for multiple trading pairs',
        'Configurable trading pair subscriptions',
        'Automatic cleanup of stale trade data',
        'REST API endpoints for trade data access'
      ]
    }
  },
  {
    id: 5,
    title: 'ROS Obstacle Avoidance',
    description: 'A ROS (Robot Operating System) application for a robot to avoid obstacles in a simulated environment.',
    image: 'https://placehold.co/800x600/00BCD4/FFFFFF?text=Weather+Dashboard',
    technologies: ['ROS', 'Python', 'OpenCV', 'Gazebo', 'TensorFlow'],
    category: 'backend',
    githubUrl: 'https://github.com/NayOoLwin5/ROS-Obstacle-Avoidance',
    liveUrl: 'https://example.com',
    details: {
      challenge: 'Handling real-time data from Binance WebSocket API',
      solution: 'Created a FastAPI service that subscribes to Binance WebSocket streams and processes incoming data in real-time.',
      features: [
        'Real-time obstacle detection',
        'Intelligent path planning and navigation',
        'Simulated environment for comprehensive testing',
        'Seamless ROS integration for robust control',
        'Advanced obstacle avoidance with adaptive algorithms',
        'High-performance real-time data processing',
        'Enhanced sensor fusion for improved accuracy'
      ]
    }
  },
  {
    id: 6,
    title: 'Open Source Contribution',
    description: 'Contribution to open source projects like robotics and web development',
    image: 'https://placehold.co/800x600/5E35B1/FFFFFF?text=CMS+Platform',
    technologies: ['React', 'Node.js', 'GraphQL', 'Typescript', 'Javascript', 'Python', 'ROS'],
    category: 'fullstack',
    githubUrl: 'https://github.com/NayOoLwin5',
    details: {
      challenge: 'Diverse collaborative projects',
      solution: 'Contributed to open source projects like robotics and web development',
      features: [
        'Contributed to open source projects like robotics and web development',
        'Collaborated with developers from around the world',
        'Learned new technologies and improved coding skills',
        'Gained experience in team collaboration and project management'
      ]
    }
  }
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
                    <Box 
                      sx={{ 
                        position: 'relative', 
                        paddingTop: '60%', 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: 
                            project.id % 3 === 0 
                              ? 'linear-gradient(135deg, #5E35B1 0%, #3949AB 100%)' 
                              : project.id % 3 === 1 
                                ? 'linear-gradient(135deg, #00BCD4 0%, #2196F3 100%)'
                                : 'linear-gradient(135deg, #7E57C2 0%, #2196F3 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 3,
                          transition: 'transform 0.5s ease',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          },
                        }}
                      >
                        <Typography
                          variant="h4"
                          component="div"
                          sx={{
                            color: 'white',
                            fontWeight: 700,
                            textAlign: 'center',
                            textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                            position: 'relative',
                            zIndex: 2
                          }}
                        >
                          {project.title}
                        </Typography>
                      </Box>
                    </Box>
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
  
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
              href="https://github.com/NayOoLwin5"
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
            <Box 
              sx={{ 
                position: 'relative',
                height: 300,
                background: 
                  selectedProject.id % 3 === 0 
                    ? 'linear-gradient(135deg, #5E35B1 0%, #3949AB 100%)' 
                    : selectedProject.id % 3 === 1 
                      ? 'linear-gradient(135deg, #00BCD4 0%, #2196F3 100%)'
                      : 'linear-gradient(135deg, #7E57C2 0%, #2196F3 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="h2"
                component="div"
                sx={{
                  color: 'white',
                  fontWeight: 700,
                  textAlign: 'center',
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                {selectedProject.title}
              </Typography>
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