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
  DialogContent, 
  DialogActions,
  useTheme,
  Tab,
  Tabs
} from '@mui/material';
import { 
  GitHub as GitHubIcon, 
  Close as CloseIcon,
  YouTube as YouTubeIcon
} from '@mui/icons-material';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { motion, AnimatePresence } from 'framer-motion';
import mongochangestream from "../assets/images/mongochangestream.png";
import postlikepro from '../assets/images/postlikekpro.png';
import wasteManagement from '../assets/images/waste_managment.png';
import binancetradefeed from '../assets/images/binance.png';
import chatApp from '../assets/images/chatApp.png';
import obstacleAvoidance from '../assets/images/obstacle_avoidance.png';
import openSource from '../assets/images/open_source.png';
import upwork from '../assets/images/upwork.png';

// Official Upwork "U" logo mark
const UpworkIcon = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
  </SvgIcon>
);

// Project data
const projects = [
    {
    id: 1,
    title: 'PostLikePro: AI Powered Social Media content and automation SaaS',
    description: 'A full-stack AI-powered social media content and automation SaaS platform with offline AI capabilities for automatic content generation, semantic similarity search, and trend analysis. Built with NestJS, Next.js, and Supabase (PostgreSQL), featuring Gemini embeddings for real-time duplicate detection and analytics dashboard',
    image: postlikepro,
    technologies: [ 'NestJS', 'Next.js', 'TypeScript', 'Supabase', 'RAG', 'Langchain', 'AI', 'Gemini embeddings', 'pgvector', 'Docker', 'Shadcn', 'Tailwind CSS', 'Stripe API', 'Social media API integrations'],
    category: 'fullstack',
    githubUrl: '',
    youtubeUrl: 'https://www.youtube.com/@NayOoLwin',
    details: {
      challenge: 'Multi-tenant data isolation, AI context accuracy per brand, and scaling real-time social media event processing without hitting API rate limits.',
      solution: 'Used Supabase Row Level Security for tenant isolation, RAG with Gemini embeddings for brand-aware AI replies, and Bull queues to throttle and buffer social media webhook events.',
      features: [
        'Built a multi-tenant AI social media SaaS with NestJS + Next.js and Supabase covering campaign creation, comment automation, and DM management end-to-end',
        'Engineered a RAG pipeline using Gemini embeddings, LangChain and pgvector on Supabase for context-aware AI auto-replies with intelligent agent routing in a Smart Inbox',
        'Implemented AI campaign generation that learns brand voice from past posts, producing on-brand captions, images, and scheduled content calendars via social media APIs',
        'Built event-driven async architecture with Bull queues, social media webhooks, and Supabase Realtime — zero polling, all live updates pushed in real-time',
        'Designed a credit-based AI billing system with per-tenant usage tracking, Stripe subscription integration, tier enforcement, and white-label multi-brand support'
      ]
    }
  },
  {
    id: 2,
    title: 'Seomaximus - AI SEO Content Optimization Tool (Upwork)',
    description: 'An AI-powered SEO and marketing automation tool built for a client on Upwork. Automates backlink outreach by discovering target blogs, scraping contact emails, and feeding leads into outreach campaigns — plus an AI social post scheduler that generates and publishes branded content via Facebook OAuth.',
    image: upwork,
    technologies: [ 'FastAPI', 'Selenium', 'Playwright', 'Jinja2', 'Celery', 'Smartlead', 'Meta Graph API', 'OAuth', 'Google Search API (custom)'],
    category: 'fullstack',
    githubUrl: '',
    upworkUrl: 'https://www.upwork.com/freelancers/~017d50ae9f5045d0b1',
    details: {
      challenge: 'Automating the full backlink outreach pipeline end-to-end — from discovering relevant sites and extracting contact emails at scale to scheduling AI-generated social posts and publishing them reliably across platforms.',
      solution: 'DDD FastAPI backend with a Google Search wrapper + Selenium for lead discovery, Celery for async AI content generation, and Playwright + Meta Graph API for publishing.',
      features: [
        'Developed a domain-driven design FastAPI backend that automates backlink outreach: built a Google-search wrapper that discovers blogs and landing pages, scrapes contact emails with Selenium, and feeds validated leads into Smartlead for automated outreach',
        'Implemented an AI-powered social post scheduler using Celery workers to generate captions, hashtags and image keywords; rendered templated posts (Jinja2) to images with Playwright and published them via Facebook OAuth + Meta Graph API'
      ]
    }
  },
    {
    id: 3,
    title: 'AI Waste Management Report System',
    description: 'A full-stack waste incident reporting platform with offline AI capabilities for automatic waste classification, semantic similarity search, and trend analysis. Built with FastAPI, React, and PostgreSQL, featuring sentence-transformers for real-time duplicate detection and analytics dashboard',
    image: wasteManagement,
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
    id: 4,
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
    id: 5,
    title: 'Chat App',
    description: 'A collaborative chat application with real-time chatting in a group and private chat',
    image: chatApp,
    technologies: ['React', 'Typescript', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Bull.js', 'Redis'],
    category: 'fullstack',
    githubUrl: 'https://github.com/NayOoLwin5/chat-app-frontend/tree/main',
    githubUrls: [
      { label: 'Frontend', url: 'https://github.com/NayOoLwin5/chat-app-frontend/tree/main' },
      { label: 'Backend', url: 'https://github.com/NayOoLwin5/chat-app-backend' },
    ],
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
    id: 6,
    title: 'Binance Trade Feed',
    description: 'A FastAPI-based service that provides real-time cryptocurrency trading data from Binance via WebSocket connections',
    image: binancetradefeed,
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
    id: 7,
    title: 'ROS Obstacle Avoidance',
    description: 'A ROS (Robot Operating System) application for a robot to avoid obstacles in a simulated environment.',
    image: obstacleAvoidance,
    technologies: ['ROS', 'Python', 'OpenCV', 'Gazebo', 'TensorFlow'],
    category: 'backend',
    githubUrl: 'https://github.com/TheRoboticsClub/colab-2020-Nay-Oo-Lwin/tree/master/Obstacle-avoidance_on_web-template',
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
    id: 8,
    title: 'Open Source Contribution',
    description: 'Contribution to open source projects like robotics and web development',
    image: openSource,
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

  const getProjectRepos = (project: typeof projects[0]) => {
    const githubUrls = (project as any).githubUrls as { label: string; url: string }[] | undefined;
    if (githubUrls?.length) return githubUrls;
    return project.githubUrl ? [{ label: 'Code', url: project.githubUrl }] : [];
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
            SIDE PROJECTS
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
            Things I've Built
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
                    <Box sx={{ position: 'relative', overflow: 'hidden', height: 200 }}>
                      <CardMedia
                        component="img"
                        image={project.image}
                        alt={project.title}
                        sx={{
                          height: 200,
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease',
                          '&:hover': { transform: 'scale(1.05)' },
                        }}
                      />
                      {/* Bottom gradient for readability */}
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)',
                          pointerEvents: 'none',
                        }}
                      />
                    </Box>
                    <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{
                          mb: 2,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          minHeight: '3.9em', // 3 lines × 1.3 line-height
                        }}
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
                      {/* mt: 'auto' pushes this row to the bottom of every card */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
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
                          {(project as any).youtubeUrl ? (
                            <IconButton
                              aria-label="youtube"
                              href={(project as any).youtubeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{
                                mr: 1,
                                color: '#FF0000',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  backgroundColor: 'rgba(255, 0, 0, 0.1)',
                                  transform: 'scale(1.2)',
                                },
                              }}
                            >
                              <YouTubeIcon fontSize="small" />
                            </IconButton>
                          ) : (project as any).upworkUrl ? (
                            <IconButton
                              aria-label="upwork"
                              href={(project as any).upworkUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{
                                mr: 1,
                                color: '#14a800',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  backgroundColor: 'rgba(20, 168, 0, 0.1)',
                                  transform: 'scale(1.2)',
                                },
                              }}
                            >
                              <UpworkIcon fontSize="small" />
                            </IconButton>
                          ) : (
                            getProjectRepos(project).map((repo) => (
                              <IconButton 
                                key={repo.url}
                                aria-label={`${repo.label} GitHub repository`}
                                title={`${repo.label} repo`}
                                href={repo.url}
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
                            ))
                          )}
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
                width: '100%',
                aspectRatio: '16 / 9',
                overflow: 'hidden',
                backgroundColor: theme.palette.mode === 'light' ? '#f5f5f7' : '#0e0e12',
              }}
            >
              <Box
                component="img"
                src={selectedProject.image}
                alt={selectedProject.title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  display: 'block',
                }}
              />
              {/* Bottom gradient for title legibility */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 40%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />
              <Typography
                variant="h4"
                component="div"
                sx={{
                  position: 'absolute',
                  bottom: 20,
                  left: 24,
                  right: 64,
                  color: 'white',
                  fontWeight: 700,
                  textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                  zIndex: 2,
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
                  zIndex: 3,
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
              {(selectedProject as any).youtubeUrl ? (
                <Button
                  variant="contained"
                  href={(selectedProject as any).youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  endIcon={<YouTubeIcon />}
                  sx={{ borderRadius: '20px', px: 3, backgroundColor: '#FF0000', '&:hover': { backgroundColor: '#cc0000' } }}
                >
                  Watch Demo
                </Button>
              ) : (selectedProject as any).upworkUrl ? (
                <Button
                  variant="contained"
                  href={(selectedProject as any).upworkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  endIcon={<UpworkIcon />}
                  sx={{ borderRadius: '20px', px: 3, backgroundColor: '#14a800', '&:hover': { backgroundColor: '#0f7a00' } }}
                >
                  View on Upwork
                </Button>
              ) : (
                getProjectRepos(selectedProject).map((repo) => (
                  <Button
                    key={repo.url}
                    variant="contained"
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="secondary"
                    endIcon={<GitHubIcon />}
                    sx={{ borderRadius: '20px', px: 3 }}
                  >
                    {repo.label === 'Code' ? 'View Code' : `${repo.label} Repo`}
                  </Button>
                ))
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Projects; 