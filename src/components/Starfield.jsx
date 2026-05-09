import React, { useEffect, useRef } from 'react';

const Starfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let stars = [];
    const numStars = 800;
    let animationFrameId;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    class Star {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = Math.random() * width;
        this.size = Math.random() * 1.5;
        this.speed = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.z -= this.speed;
        if (this.z <= 0) {
          this.z = width;
          this.x = Math.random() * width;
          this.y = Math.random() * height;
        }
      }

      draw() {
        let xOffset = this.x - width / 2;
        let yOffset = this.y - height / 2;

        let x = width / 2 + (xOffset / this.z) * width;
        let y = height / 2 + (yOffset / this.z) * width;

        let radius = this.size * (width / this.z);
        let opacity = 1 - (this.z / width);

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);

        let randomColor = Math.random();
        if (randomColor > 0.9) {
          ctx.fillStyle = `rgba(109, 40, 217, ${opacity})`;
        } else if (randomColor > 0.8) {
          ctx.fillStyle = `rgba(59, 130, 246, ${opacity})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        }

        ctx.fill();
      }
    }

    const init = () => {
      resize();
      window.addEventListener('resize', resize);

      for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
      }

      const handleMouseMove = (e) => {
        let mouseX = (e.clientX - width / 2) * 0.0005;
        let mouseY = (e.clientY - height / 2) * 0.0005;

        stars.forEach(star => {
          star.x -= mouseX * star.z;
          star.y -= mouseY * star.z;
        });
      };

      document.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('resize', resize);
        document.removeEventListener('mousemove', handleMouseMove);
      };
    };

    const cleanup = init();

    const animate = () => {
      ctx.fillStyle = 'rgba(3, 0, 20, 0.2)';
      ctx.fillRect(0, 0, width, height);

      stars.forEach(star => {
        star.update();
        star.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cleanup();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default Starfield;
