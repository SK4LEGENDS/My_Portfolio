import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Simple AFK Pong Game component
const PongGame = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let ball = { x: canvas.width / 2, y: canvas.height / 2, vx: 5, vy: 5, radius: 10 };
    let paddleLeft = { x: 50, y: canvas.height / 2 - 50, w: 15, h: 100, speed: 4 };
    let paddleRight = { x: canvas.width - 65, y: canvas.height / 2 - 50, w: 15, h: 100, speed: 4 };

    let animationId;

    const draw = () => {
      // Clear canvas with full opacity to prevent motion blur artifacts
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#ff7f50';
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(paddleLeft.x, paddleLeft.y, paddleLeft.w, paddleLeft.h);
      ctx.fillRect(paddleRight.x, paddleRight.y, paddleRight.w, paddleRight.h);

      // Center line
      ctx.setLineDash([5, 15]);
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      // Ball movement
      ball.x += ball.vx;
      ball.y += ball.vy;

      // Wall collision
      if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0) {
        ball.vy *= -1;
      }

      // Paddle collision - mathematically correct bounding box intersection
      const hitLeft = ball.x - ball.radius <= paddleLeft.x + paddleLeft.w && 
                      ball.x + ball.radius >= paddleLeft.x && 
                      ball.y + ball.radius >= paddleLeft.y && 
                      ball.y - ball.radius <= paddleLeft.y + paddleLeft.h && 
                      ball.vx < 0;

      const hitRight = ball.x - ball.radius <= paddleRight.x + paddleRight.w && 
                       ball.x + ball.radius >= paddleRight.x && 
                       ball.y + ball.radius >= paddleRight.y && 
                       ball.y - ball.radius <= paddleRight.y + paddleRight.h && 
                       ball.vx > 0;

      if (hitLeft || hitRight) {
        // Reverse direction and slightly increase speed
        ball.vx *= -1.05; 
        
        // Cap speed to prevent physics clipping
        if (Math.abs(ball.vx) > 20) ball.vx = 20 * Math.sign(ball.vx);
        
        // Add a bit of spin/randomness to vy to make it more dynamic
        ball.vy += (Math.random() - 0.5) * 4;
        if (Math.abs(ball.vy) > 15) ball.vy = 15 * Math.sign(ball.vy);
      }

      // Reset if ball goes out
      if (ball.x < 0 || ball.x > canvas.width) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.vx = 5 * (Math.random() > 0.5 ? 1 : -1);
        ball.vy = 5 * (Math.random() > 0.5 ? 1 : -1);
      }

      // AI movement (smooth tracking, screensaver style)
      // The paddles effortlessly track the ball using linear interpolation (lerp)
      paddleLeft.y += (ball.y - (paddleLeft.y + paddleLeft.h / 2)) * 0.15;
      paddleRight.y += (ball.y - (paddleRight.y + paddleRight.h / 2)) * 0.15;

      // Clamp paddles to screen
      paddleLeft.y = Math.max(0, Math.min(canvas.height - paddleLeft.h, paddleLeft.y));
      paddleRight.y = Math.max(0, Math.min(canvas.height - paddleRight.h, paddleRight.y));

      animationId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      paddleRight.x = canvas.width - 65;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] bg-black/80 flex items-center justify-center pointer-events-none"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute top-10 text-white font-mono opacity-50 z-10 text-xl tracking-widest">
        AI TAKEOVER IN PROGRESS... MOVE MOUSE TO ABORT
      </div>
    </motion.div>
  );
};

const MatrixLoader = ({ isExiting }) => {
  const [textIndex, setTextIndex] = useState(0);
  const phrases = isExiting ? [
    "RESTORING NORMAL PROTOCOLS...",
    "DISCONNECTING SECURE CHANNELS...",
    "WIPING TRACES...",
    "SYSTEM NORMALIZED...",
    "GOODBYE."
  ] : [
    "BREACHING FIREWALL...",
    "BYPASSING SECURITY PROTOCOLS...",
    "DECRYPTING SECURE CHANNELS...",
    "ACCESSING MAINFRAME...",
    "WAKE UP, NEO..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex(prev => Math.min(prev + 1, phrases.length - 1));
    }, 550);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center font-mono text-[#00ff00]"
    >
      <div className="flex flex-col items-start space-y-3 p-8 w-full max-w-4xl">
        {phrases.slice(0, textIndex + 1).map((phrase, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg md:text-3xl font-bold tracking-widest uppercase drop-shadow-[0_0_10px_rgba(0,255,0,0.8)]"
          >
            {'>'} {phrase}
          </motion.div>
        ))}
        <motion.div 
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.5 }}
          className="text-lg md:text-3xl font-bold drop-shadow-[0_0_10px_rgba(0,255,0,0.8)] mt-2"
        >
          _
        </motion.div>
      </div>
    </motion.div>
  );
};

const EasterEggs = () => {
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const [isMatrixLoading, setIsMatrixLoading] = useState(false);
  const [isRetroMode, setIsRetroMode] = useState(false);
  const [isPongMode, setIsPongMode] = useState(false);

  const matrixModeRef = useRef(false);
  const matrixLoadingRef = useRef(false);

  // Keep refs in sync with state for useEffect closure
  useEffect(() => { matrixModeRef.current = isMatrixMode; }, [isMatrixMode]);
  useEffect(() => { matrixLoadingRef.current = isMatrixLoading; }, [isMatrixLoading]);

  const canvasRef = useRef(null);
  const typedWord = useRef('');
  const afkTimer = useRef(null);

  // Constants
  const MATRIX_WORDS = ['matrix', 'agent'];
  const RETRO_WORD = 'retro';
  const NYAN_WORD = 'nyan';
  const GRAVITY_WORD = 'gravity';
  
  // AFK Logic
  useEffect(() => {
    const resetAfkTimer = () => {
      setIsPongMode(false);
      clearTimeout(afkTimer.current);
      afkTimer.current = setTimeout(() => {
        setIsPongMode(true);
      }, 60000); // 60 seconds
    };

    window.addEventListener('mousemove', resetAfkTimer);
    window.addEventListener('keydown', resetAfkTimer);
    window.addEventListener('scroll', resetAfkTimer);
    window.addEventListener('click', resetAfkTimer);
    
    resetAfkTimer();

    return () => {
      window.removeEventListener('mousemove', resetAfkTimer);
      window.removeEventListener('keydown', resetAfkTimer);
      window.removeEventListener('scroll', resetAfkTimer);
      window.removeEventListener('click', resetAfkTimer);
      clearTimeout(afkTimer.current);
    };
  }, []);

  // Key sequence listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (/^[a-zA-Z]$/.test(e.key)) {
        typedWord.current = (typedWord.current + e.key.toLowerCase()).slice(-7); // max length of words
        
        // Matrix
        if (MATRIX_WORDS.some(w => typedWord.current.endsWith(w))) {
          if (!matrixModeRef.current && !matrixLoadingRef.current) {
            setIsMatrixLoading(true);
            setTimeout(() => {
              setIsMatrixLoading(false);
              setIsMatrixMode(true);
              window.dispatchEvent(new CustomEvent('matrix-mode', { detail: true }));
            }, 3000);
          } else if (matrixModeRef.current && !matrixLoadingRef.current) {
            setIsMatrixLoading(true);
            setTimeout(() => {
              setIsMatrixLoading(false);
              setIsMatrixMode(false);
              window.dispatchEvent(new CustomEvent('matrix-mode', { detail: false }));
            }, 3000);
          }
          typedWord.current = '';
        }
        
        // Retro
        if (typedWord.current.endsWith(RETRO_WORD)) {
          setIsRetroMode(prev => !prev);
          typedWord.current = '';
        }

        // Nyan
        if (typedWord.current.endsWith(NYAN_WORD)) {
          window.dispatchEvent(new CustomEvent('toggle-nyan-mode'));
          typedWord.current = '';
        }

        // Gravity
        if (typedWord.current.endsWith(GRAVITY_WORD)) {
          window.dispatchEvent(new CustomEvent('toggle-gravity-mode'));
          typedWord.current = '';
        }
        
      } else if (e.key === 'Backspace') {
        typedWord.current = typedWord.current.slice(0, -1);
      } else {
        typedWord.current = '';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Theme Body Classes
  useEffect(() => {
    if (isMatrixMode) document.body.classList.add('matrix-theme');
    else document.body.classList.remove('matrix-theme');
  }, [isMatrixMode]);

  useEffect(() => {
    if (isRetroMode) document.body.classList.add('retro-theme');
    else document.body.classList.remove('retro-theme');
  }, [isRetroMode]);

  // Matrix Rain Canvas Effect
  useEffect(() => {
    if (!isMatrixMode || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    const charsArray = matrixChars.split('');
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = charsArray[Math.floor(Math.random() * charsArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMatrixMode]);

  return (
    <>
      <AnimatePresence>
        {isMatrixLoading && <MatrixLoader isExiting={matrixModeRef.current} />}
      </AnimatePresence>

      <AnimatePresence>
        {isMatrixMode && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[-1] bg-black pointer-events-none flex flex-col items-center justify-center"
          >
            <canvas ref={canvasRef} className="absolute inset-0 opacity-40" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isPongMode && <PongGame />}
      </AnimatePresence>
    </>
  );
};

export default EasterEggs;
