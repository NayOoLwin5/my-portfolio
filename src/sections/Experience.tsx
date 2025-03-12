import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Stepper, 
  Step, 
  StepLabel, 
  StepContent,
  Button,
  useTheme,
  List,
  ListItem,
  ListItemText,
  Chip,
  useMediaQuery
} from '@mui/material';
import { 
  Work as WorkIcon, 
  School as SchoolIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import resumePdf from '../assets/Nay_Oo_Lwin_Resume.pdf';

// Experience data
const workExperience = [
  {
    id: 1,
    title: 'Fullstack Developer',
    company: 'Silent Partner',
    duration: 'Dec 2024 - Present',
    description: 'Fullstack developer, CRM, DMS, Meta messaging platforms Integration Developer',
    achievements: [
      'Worked on CRM, DMS, Meta messaging platforms integrations to nurture leads and convert them into potential customers',
      'Developed automated campaigns to send AI personalized follow up messages to customers',
      'Architected and maintained a flexible FastAPI backend system, seamlessly integrating diverse third-party APIs and services using a modular design and standardized error-handling protocols',
      'Developed multiple OAuth configurations for CRM systems to facilitate seamless client onboarding and effortless connectivity with our platform',
      'Designed and maintained internal portal features using React to meet varied business needs and deliver an intuitive user experience'
    ],
    technologies: ['React', 'TypeScript', 'Python', 'FastAPI', 'Firebase', 'OAuth', 'Pytest', 'Docker', 'AWS'],
    type: 'work'
  },
  {
    id: 2,
    title: 'Backend Developer',
    company: 'Tensorplex Labs',
    duration: 'Mar 2024 - Nov 2024',
    description: 'Developed an DApp as backend developer',
    achievements: [
      'Developed and maintained ethereum and substrate web3 wallet authentications flow that includes wallet and signature verification with message against the blockchain networks and developed JWT auth flow in Gin Golang',
      'Developed long running background jobs in FastApi using celery for loads of requests handling and websockets to notify user that task has been completed',
      'Took responsiblity of file storage migration from supabase to S3 in FastApi',
      'Maintaing Gin and FastApi backend systems for the RESTFUL APIs and background running services'
    ],
    technologies: [ 'web3', 'blockchain', 'Gin Golang', 'FastAPI', 'Celery', 'AWS', 'PostgreSQL', 'Redis', 'Docker', 'Supabase', 'JWT', 'OAuth' ],
    type: 'work'
  },
  {
    id: 3,
    title: 'Fullstack Javascript Developer',
    company: 'AYAPAY Digital Wallet',
    duration: 'May 2022 - May 2024',
    description: 'Collaborated in a team to work on a pay digital wallet',
    achievements: [
      'Developed push notification microservice using Express.js and firebase-admin. Implemented scheduled cronjob to query all the tokens from the database once in a day and stored them in Redis cache. Implemented a Redis based queue using Bull.js to queue each 500 tokens to send via firebase-admin',
      'Worked on a Nest.js event-driven microservice architecture that watches insert/update database operations with Mongodb Change Streams to sync data with another database. The high frequecy data are triggered and added in Redis queue by avoiding duplication with locking mechanism. Added retry flow for any failed event to execute the job again',
      'Developed a instant cashback campaign application that is able to run multiple campaigns concurrently using multi-threaded architecture and made use of bull.js redis queue for each cashback handling in Express.js',
      'Worked on internal portals enhancements with React like creating forms using form.io and enhancing dashbaords and list views for better pagination and skeleton loading views',
      'Took responsibility of third-party services integration of online billers on Node-RED for request/verify payment transactions'
    ],
    technologies: ['JavaScript', 'HTML/CSS', 'React', 'Nest.js', 'Express.js', 'Sails.js', 'Node-RED', 'Redis', 'Bull.js', 'Firebase', 'Mongodb', 'Docker', 'AWS', 'ELK', 'Jest', 'Mongodb Change Streams'],
    type: 'work'
  },
  {
    id: 3,
    title: 'Odoo Web Developer',
    company: 'Global Connect Asia(ERP)',
    duration: 'Dec 2021 - Apr 2022',
    description: 'Worked on ERP project for inventory management and sales',
    achievements: [
      'Research and development of Odoo related technologies',
      'Designed and Customized Odoo modules based on clients needs by understanding their bussiness workflow',
      'Wrote and supported extended API and interfaces with other key business systems'
    ],
    technologies: ['JavaScript', 'HTML/CSS', 'React', 'Nest.js', 'Express.js', 'Sails.js', 'Node-RED', 'Redis', 'Bull.js', 'Firebase', 'Mongodb', 'Docker', 'AWS', 'ELK', 'Jest', 'Mongodb Change Streams'],
    type: 'work'
  },
  {
    id: 4,
    title: 'Software Engineer Intern',
    company: 'JdeRobot(Open Source)',
    duration: 'Dec 2020 - Feb 2021',
    description: 'Worked on JdeRobot, an open source robot operating system platform',
    achievements: [
      'Developed a web-template with ROS and Gazebo for running autonomous navigation simulation',
      'Used Gzweb as server and let it communicate with Gzclient on web browser via websocket connection',
      'Used docker technology for running the server for less CPU and GPU comsumption',
      'Developed better UI only with Vanilla JS and CSS'
    ],
    technologies: ['ROS', 'Gazebo', 'Gzweb', 'Docker', 'JavaScript', 'CSS', 'HTML'],
    type: 'work'
  },
  {
    id: 5,
    title: 'Bachelor of Technology in Mechanical Engineering',
    company: 'JNTU College of Engineering Hyderabad, India',
    duration: '2017 - 2021',
    description: '',
    achievements: [],
    technologies: [],
    type: 'education'
  },
];

const Experience: React.FC = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [expandedItems, setExpandedItems] = useState<number[]>([0]);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setExpandedItems([activeStep + 1]);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setExpandedItems([activeStep - 1]);
  };

  const handleReset = () => {
    setActiveStep(0);
    setExpandedItems([0]);
  };

  const toggleExpanded = (index: number) => {
    if (expandedItems.includes(index)) {
      setExpandedItems(expandedItems.filter(item => item !== index));
    } else {
      setExpandedItems([...expandedItems, index]);
    }
  };

  const handleDownloadResume = () => {
    // Create a link element
    const link = document.createElement('a');
    link.href = resumePdf;
    link.download = 'Nay_Oo_Lwin_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box
      id="experience"
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
            MY EXPERIENCE
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
            Work History & Education
          </Typography>

          <Typography
            component={motion.p}
            variants={itemVariants}
            color="text.secondary"
            sx={{ mb: 6, textAlign: 'center', maxWidth: '800px', mx: 'auto' }}
          >
            My professional journey and educational background. 
            Explore my career path and the skills I've developed along the way.
          </Typography>

          {/* Desktop Timeline View */}
          {!isMobile && (
            <Box 
              component={motion.div}
              variants={itemVariants}
              sx={{ display: { xs: 'none', md: 'block' } }}
            >
              <Stepper activeStep={activeStep} orientation="vertical">
                {workExperience.map((experience, index) => (
                  <Step key={experience.id} expanded={expandedItems.includes(index)}>
                    <StepLabel
                      StepIconComponent={() => (
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: experience.type === 'work' 
                              ? 'primary.main' 
                              : 'secondary.main',
                            color: '#fff',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                          }}
                        >
                          {experience.type === 'work' ? <WorkIcon /> : <SchoolIcon />}
                        </Box>
                      )}
                      onClick={() => experience.type !== 'education' && toggleExpanded(index)}
                      sx={{ 
                        cursor: experience.type !== 'education' ? 'pointer' : 'default',
                        '& .MuiStepLabel-label': {
                          fontWeight: 600,
                          fontSize: '1.25rem',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" fontWeight={600}>
                          {experience.title} • {experience.company}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                          {experience.duration}
                        </Typography>
                      </Box>
                    </StepLabel>
                    <StepContent>
                      <Box sx={{ mb: 2 }}>
                        <Typography paragraph>{experience.description}</Typography>
                        {experience.type !== 'education' && (
                          <>
                            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                              Key Achievements:
                            </Typography>
                        <List disablePadding>
                          {experience.achievements.map((achievement, achieveIndex) => (
                            <ListItem key={achieveIndex} sx={{ py: 0.5 }}>
                              <ListItemText
                                primary={achievement}
                                primaryTypographyProps={{
                                  component: motion.p,
                                  initial: { opacity: 0, x: -10 },
                                  animate: { opacity: 1, x: 0 },
                                  transition: { delay: 0.2 + (achieveIndex * 0.1) },
                                  color: 'text.secondary',
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                        </>
                        )}
                        
                        {experience.technologies.length > 0 && (
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                              Technologies Used:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                              {experience.technologies.map((tech, techIndex) => (
                                <Chip
                                  key={techIndex}
                                  label={tech}
                                  size="small"
                                  component={motion.div}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.4 + (techIndex * 0.05) }}
                                  sx={{
                                    backgroundColor: theme.palette.mode === 'light' 
                                      ? 'rgba(94, 53, 177, 0.1)' 
                                      : 'rgba(94, 53, 177, 0.2)',
                                    color: 'primary.main',
                                    fontWeight: 500,
                                  }}
                                />
                              ))}
                            </Box>
                          </Box>
                        )}
                      </Box>
                      <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          disabled={index === workExperience.length - 1}
                          size="small"
                          sx={{ borderRadius: '20px', px: 3 }}
                        >
                          Continue
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={handleBack}
                          disabled={index === 0}
                          size="small"
                          sx={{ borderRadius: '20px', px: 3 }}
                        >
                          Back
                        </Button>
                        {index === workExperience.length - 1 && (
                          <Button 
                            variant="outlined" 
                            onClick={handleReset}
                            size="small"
                            sx={{ borderRadius: '20px', px: 3 }}
                          >
                            Reset
                          </Button>
                        )}
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Box>
          )}

          {/* Mobile Cards View */}
          {isMobile && (
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <Grid container spacing={3}>
                {workExperience.map((experience, index) => (
                  <Grid item xs={12} key={index}>
                    <Paper
                      component={motion.div}
                      variants={itemVariants}
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: '16px',
                        overflow: 'hidden',
                        border: `1px solid ${theme.palette.divider}`,
                        backgroundColor: theme.palette.mode === 'light' 
                          ? 'rgba(255, 255, 255, 0.9)' 
                          : 'rgba(35, 35, 40, 0.8)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                      }}
                    >
                      <Box sx={{ 
                        display: 'flex', 
                        gap: 2, 
                        mb: 2, 
                        alignItems: 'center',
                        cursor: 'pointer',
                      }}
                      onClick={() => toggleExpanded(index)}
                      >
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: experience.type === 'work' 
                              ? 'primary.main' 
                              : 'secondary.main',
                            color: '#fff',
                            flexShrink: 0,
                          }}
                        >
                          {experience.type === 'work' ? <WorkIcon /> : <SchoolIcon />}
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" fontWeight={600}>
                            {experience.title}
                          </Typography>
                          <Typography variant="subtitle1">
                            {experience.company}
                          </Typography>
                        </Box>
                        <ExpandMoreIcon 
                          sx={{ 
                            transform: expandedItems.includes(index) ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease',
                          }} 
                        />
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {experience.duration}
                      </Typography>

                      {expandedItems.includes(index) && (
                        <Box 
                          component={motion.div}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Typography paragraph>{experience.description}</Typography>
                          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                            Key Achievements:
                          </Typography>
                          <List disablePadding dense>
                            {experience.achievements.map((achievement, achieveIndex) => (
                              <ListItem key={achieveIndex} sx={{ py: 0.5 }}>
                                <ListItemText
                                  primary={achievement}
                                  primaryTypographyProps={{
                                    color: 'text.secondary',
                                    fontSize: '0.9rem',
                                  }}
                                />
                              </ListItem>
                            ))}
                          </List>
                          
                          {experience.technologies.length > 0 && (
                            <Box sx={{ mt: 2 }}>
                              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                                Technologies Used:
                              </Typography>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {experience.technologies.map((tech, techIndex) => (
                                  <Chip
                                    key={techIndex}
                                    label={tech}
                                    size="small"
                                    sx={{
                                      backgroundColor: theme.palette.mode === 'light' 
                                        ? 'rgba(94, 53, 177, 0.1)' 
                                        : 'rgba(94, 53, 177, 0.2)',
                                      color: 'primary.main',
                                      fontWeight: 500,
                                      fontSize: '0.7rem',
                                    }}
                                  />
                                ))}
                              </Box>
                            </Box>
                          )}
                        </Box>
                      )}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Resume Download Button */}
          <Box 
            component={motion.div}
            variants={itemVariants}
            sx={{ textAlign: 'center', mt: 6 }}
          >
            <Box
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={handleDownloadResume}
                sx={{ 
                  borderRadius: '30px',
                  px: 4,
                  py: 1.5,
                  boxShadow: '0 0 15px rgba(94, 53, 177, 0.5)',
                }}
              >
                Download Resume
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Experience; 