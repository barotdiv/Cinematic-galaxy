import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const Missions = () => {
  const missionsList = [
    { name: "Project Alpha Centauri", status: "Active", date: "2042" },
    { name: "Andromeda Initiative", status: "Preparing", date: "2055" },
    { name: "Orion Nebula Survey", status: "Completed", date: "2038" },
  ];

  return (
    <PageTransition>
      <section className="section" style={{ paddingTop: '150px' }}>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Fleet Missions
        </motion.h2>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {missionsList.map((mission, idx) => (
            <motion.div
              key={idx}
              className="glass-card"
              style={{ width: '100%', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
            >
              <div>
                <h3>{mission.name}</h3>
                <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>Est. {mission.date}</p>
              </div>
              <span style={{
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                backgroundColor: mission.status === 'Active' ? 'rgba(59, 130, 246, 0.2)' :
                  mission.status === 'Completed' ? 'rgba(16, 185, 129, 0.2)' :
                    'rgba(245, 158, 11, 0.2)',
                color: mission.status === 'Active' ? '#60a5fa' :
                  mission.status === 'Completed' ? '#34d399' :
                    '#fbbf24',
                fontWeight: 'bold',
                letterSpacing: '1px'
              }}>
                {mission.status}
              </span>
            </motion.div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
};

export default Missions;
