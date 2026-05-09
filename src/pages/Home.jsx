import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Rocket, Globe, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const Home = () => {
  const { scrollY } = useScroll();

  // Parallax transform values based on scroll
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 150]);

  // Debris & Cloud parallax transforms
  const debrisY1 = useTransform(scrollY, [0, 1000], [0, -400]);
  const debrisY2 = useTransform(scrollY, [0, 1000], [0, 500]);
  const cloudY1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const cloudY2 = useTransform(scrollY, [0, 1000], [0, 250]);

  const rotate1 = useTransform(scrollY, [0, 1000], [0, 360]);
  const rotate2 = useTransform(scrollY, [0, 1000], [0, -180]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <PageTransition>
      {/* Background Parallax Planets with mouse tracking */}
      <motion.div className="planet planet-1" style={{ y: y1, x: mousePos.x * -2, translateY: mousePos.y * -2 }} />
      <motion.div className="planet planet-2" style={{ y: y2, x: mousePos.x * 3, translateY: mousePos.y * 3 }} />
      <motion.div className="planet planet-3" style={{ y: y3, x: mousePos.x * -1, translateY: mousePos.y * -1 }} />

      {/* Floating Asteroids and Gas Clouds */}
      <motion.div className="debris asteroid" style={{ width: '40px', height: '35px', top: '25%', left: '15%', y: debrisY1, rotate: rotate1 }} />
      <motion.div className="debris asteroid" style={{ width: '70px', height: '80px', top: '65%', right: '10%', y: debrisY2, rotate: rotate2 }} />
      <motion.div className="debris asteroid" style={{ width: '25px', height: '30px', top: '80%', left: '30%', y: debrisY1, rotate: rotate1 }} />

      <motion.div className="debris gas-cloud" style={{ width: '350px', height: '350px', top: '15%', left: '-5%', background: 'rgba(59, 130, 246, 0.25)', y: cloudY1 }} />
      <motion.div className="debris gas-cloud" style={{ width: '450px', height: '450px', bottom: '5%', right: '-10%', background: 'rgba(109, 40, 217, 0.15)', y: cloudY2 }} />

      <main className="hero">
        <div className="nebula-bg" />

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1 animate={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}>
            BEYOND THE STARS
          </motion.h1>
          <p className="subtitle">Embark on a cinematic journey through the uncharted territories of the universe.</p>
          <div className="cta-group">
            <Link to="/explore" className="btn primary" style={{ textDecoration: 'none' }}>Start Exploring</Link>
            <Link to="/missions" className="btn secondary" style={{ textDecoration: 'none' }}>View Missions</Link>
          </div>
        </motion.div>

        <div className="cards-container">
          {[
            { icon: <Rocket size={40} />, title: "Deep Space", desc: "Traverse through nebulae and unknown star systems." },
            { icon: <Globe size={40} />, title: "Exoplanets", desc: "Discover new worlds with unique atmospheres and terrains." },
            { icon: <Sparkles size={40} />, title: "Cosmic Dust", desc: "Witness the birth of stars in breathtaking detail." }
          ].map((card, idx) => (
            <motion.div
              key={idx}
              className="glass-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 * idx }}
              whileHover={{ scale: 1.05, translateY: -10 }}
              style={{
                x: mousePos.x * (0.1 + idx * 0.05),
                y: mousePos.y * (0.1 + idx * 0.05)
              }}
            >
              <div className="card-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>
      <div style={{ height: "15vh" }} />
    </PageTransition>
  );
};

export default Home;
