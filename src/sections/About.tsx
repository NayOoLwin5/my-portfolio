import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Avatar,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import Myself from "../assets/images/Me.jpg";
const About: React.FC = () => {
  const theme = useTheme();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    <Box
      id="about"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor:
          theme.palette.mode === "light"
            ? "rgba(245, 245, 247, 0.7)"
            : "rgba(30, 30, 32, 0.7)",
      }}
    >
      <Container maxWidth="lg">
        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Typography
            component={motion.div}
            variants={itemVariants}
            sx={{
              color: "primary.main",
              fontWeight: 600,
              mb: 1,
              fontSize: "1rem",
              textAlign: "center",
            }}
          >
            ABOUT ME
          </Typography>

          <Typography
            variant="h2"
            component={motion.h2}
            variants={itemVariants}
            sx={{
              fontWeight: 700,
              mb: 6,
              textAlign: "center",
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Let me introduce myself
          </Typography>

          <Grid container spacing={6} alignItems="center">
            {/* Profile Image */}
            <Grid item xs={12} md={5}>
              <Box
                component={motion.div}
                variants={itemVariants}
                sx={{
                  position: "relative",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: "20px",
                    padding: "10px",
                    background: "linear-gradient(120deg, #5E35B1, #00BCD4)",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    pointerEvents: "none",
                  },
                }}
              >
                <Box
                  component="img"
                  src={Myself}
                  alt="Developer profile"
                  sx={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    borderRadius: "10px",
                    transition: "transform 0.5s ease",
                    "&:hover": {
                      transform: "scale(1.03)",
                    },
                  }}
                />
              </Box>
            </Grid>

            {/* About Text */}
            <Grid item xs={12} md={7}>
              <Box component={motion.div} variants={itemVariants}>
                <Typography
                  variant="h4"
                  gutterBottom
                  fontWeight={600}
                  sx={{ mb: 2 }}
                >
                  Software Developer
                </Typography>

                <Typography
                  color="text.secondary"
                  paragraph
                  sx={{ mb: 3, fontSize: "1.1rem", lineHeight: 1.7 }}
                >
                  Hello! I'm Nay Oo Lwin, a passionate software developer and open source contributor with
                  over 4 years of experience building web applications and
                  digital products.
                </Typography>

                <Typography
                  color="text.secondary"
                  paragraph
                  sx={{ mb: 3, fontSize: "1.1rem", lineHeight: 1.7 }}
                >
                  I specialize in designing and implementing scalable and
                  reliable systems that can efficiently handle high traffic and
                  significant loads. My expertise includes developing REST,
                  GraphQL APIs and microservices, with a strong focus on
                  creating sustainable, long-lasting, and cost-effective
                  architectures. Additionally, I have extensive experience in frontend
                  development, particularly specializing in React, ensuring
                  responsive, user-friendly interfaces that align seamlessly
                  with backend functionalities.
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{ mb: 4, fontSize: "1.1rem", lineHeight: 1.7 }}
                >
                  I have successfully contributed to a fintech platform with a
                  substantial user base, where I designed microservices
                  incorporating caching and queuing mechanisms. These solutions
                  effectively managed large volumes of requests and optimized
                  system and database performance. My ability to design logical
                  systems for complex database operations and high-demand
                  environments ensures robustness and efficiency across
                  projects.
                </Typography>

                {/* Key Facts */}
                <Grid container spacing={2} sx={{ mt: 3 }}>
                  {[
                    { number: "4+", label: "Years Experience" },
                    { number: "10+", label: "Projects Completed" },
                    { number: "20+", label: "Open Source Contributions" },
                  ].map((item, index) => (
                    <Grid item xs={6} sm={3} key={index}>
                      <Paper
                        component={motion.div}
                        whileHover={{
                          y: -10,
                          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                        }}
                        transition={{ duration: 0.3 }}
                        elevation={0}
                        sx={{
                          py: 2,
                          px: 1,
                          textAlign: "center",
                          borderRadius: "12px",
                          backgroundColor:
                            theme.palette.mode === "light"
                              ? "rgba(255, 255, 255, 0.9)"
                              : "rgba(40, 40, 45, 0.7)",
                          border: `1px solid ${theme.palette.divider}`,
                        }}
                      >
                        <Typography
                          variant="h4"
                          component="div"
                          fontWeight={700}
                          color="primary"
                          sx={{ mb: 0.5 }}
                        >
                          {item.number}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.label}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
