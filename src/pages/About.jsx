import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const About = () => {
  const { scrollY } = useScroll();

  // Parallax elements for About page
  const cloud1 = useTransform(scrollY, [0, 1000], [0, -150]);
  const cloud2 = useTransform(scrollY, [0, 1000], [0, 200]);
  const asteroid1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const asteroid2 = useTransform(scrollY, [0, 1000], [0, -400]);
  const rotateAst = useTransform(scrollY, [0, 1000], [0, 180]);

  return (
    <PageTransition>
      {/* Floating Elements */}
      <motion.div className="debris gas-cloud" style={{ width: '400px', height: '400px', top: '10%', left: '-10%', background: 'rgba(236, 72, 153, 0.15)', y: cloud1 }} />
      <motion.div className="debris gas-cloud" style={{ width: '500px', height: '500px', bottom: '0', right: '-15%', background: 'rgba(3, 105, 161, 0.2)', y: cloud2 }} />
      <motion.div className="debris asteroid" style={{ width: '60px', height: '50px', top: '20%', right: '20%', y: asteroid1, rotate: rotateAst }} />
      <motion.div className="debris asteroid" style={{ width: '30px', height: '40px', bottom: '20%', left: '15%', y: asteroid2, rotate: rotateAst }} />

      <section className="section" style={{ paddingTop: '150px' }}>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About Us
        </motion.h2>

        <motion.div
          className="glass-card"
          style={{ width: '100%', maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '4rem 2rem', position: 'relative', zIndex: 10 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Pioneering The Future</h3>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
            We are a collective of explorers, engineers, and visionaries dedicated to charting the unknown.
            Since our inception, our mission has been to push the boundaries of human reach and understanding.
            Through state-of-the-art spacecraft and cutting-edge propulsion systems, we bridge the vast gaps
            between the stars. Join us as we step into the cosmic frontier.
          </p>

          <button className="btn primary" style={{ marginTop: '3rem' }}>Join Our Team</button>
        </motion.div>
      </section>
      <div style={{ height: "20vh" }} />
    </PageTransition>
  );
};

export default About;
