import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Volume2, VolumeX } from 'lucide-react';
import { toggleMute } from '../utils/audio';

const Navbar = () => {
  const [isMuted, setIsMuted] = useState(true);

  const handleToggleMute = () => {
    const newState = !isMuted;
    setIsMuted(newState);
    toggleMute(newState);
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="logo">COSMIC</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/explore">Explore</Link></li>
        <li><Link to="/missions">Missions</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button
          onClick={handleToggleMute}
          style={{
            background: 'transparent',
            border: 'none',
            color: isMuted ? 'var(--text-muted)' : 'var(--accent-2)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            filter: isMuted ? 'none' : 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.8))'
          }}
          title={isMuted ? "Unmute Ambient Audio" : "Mute Audio"}
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
        <button className="nav-cta">Join Fleet</button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
