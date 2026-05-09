import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const Explore = () => {
  const [apodData, setApodData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNasaData = async () => {
      try {
        // Fetch 3 random astronomy pictures of the day from NASA APOD API
        const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=3');
        if (!response.ok) {
          throw new Error('Failed to fetch from NASA API');
        }
        const data = await response.json();
        setApodData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNasaData();
  }, []);

  return (
    <PageTransition>
      <section className="section" style={{ paddingTop: '150px' }}>
        <div className="nebula-bg" style={{ filter: 'blur(60px)', opacity: 0.5 }} />

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          NASA Cosmic Archives
        </motion.h2>

        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', margin: '6rem 0' }}>
            <motion.div
              style={{
                width: '60px',
                height: '60px',
                border: '4px solid rgba(255,255,255,0.05)',
                borderTopColor: 'var(--accent-2)',
                borderRadius: '50%',
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', color: '#ef4444', margin: '4rem 0' }}>
            <AlertCircle size={48} style={{ margin: '0 auto', marginBottom: '1rem' }} />
            <p>Could not connect to NASA databases. {error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="feature-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
            {apodData.map((item, idx) => (
              <motion.div
                key={idx}
                className="glass-card"
                style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(109, 40, 217, 0.4)' }}
              >
                <div style={{ height: '250px', width: '100%', overflow: 'hidden' }}>
                  {item.media_type === 'image' ? (
                    <motion.img
                      src={item.url}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)' }}>
                      <p>Video Content</p>
                    </div>
                  )}
                </div>
                <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ marginBottom: '1rem', letterSpacing: '1px', fontSize: '1.2rem', lineHeight: '1.4' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1 }}>
                    {item.explanation}
                  </p>
                  <p style={{ marginTop: '1.5rem', color: 'var(--accent-2)', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '2px' }}>
                    {item.date}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </PageTransition>
  );
};

export default Explore;
