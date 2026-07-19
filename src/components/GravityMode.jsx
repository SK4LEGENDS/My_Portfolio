import React, { useEffect, useState, useRef } from 'react';
import Matter from 'matter-js';

const GravityMode = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleToggle = () => setIsActive(prev => !prev);
    window.addEventListener('toggle-gravity-mode', handleToggle);
    return () => window.removeEventListener('toggle-gravity-mode', handleToggle);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const cards = Array.from(document.querySelectorAll('.uiverse-card, .project-card, .glass-card'));
    
    // Module aliases
    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          Bodies = Matter.Bodies,
          Composite = Matter.Composite,
          Mouse = Matter.Mouse,
          MouseConstraint = Matter.MouseConstraint;

    // create an engine
    const engine = Engine.create();

    // create a renderer
    const render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            wireframes: false,
            background: 'transparent',
            pixelRatio: window.devicePixelRatio
        }
    });
    
    render.canvas.style.position = 'fixed';
    render.canvas.style.top = '0';
    render.canvas.style.left = '0';
    render.canvas.style.zIndex = '9998'; // Just below custom cursor
    render.canvas.style.pointerEvents = 'auto'; 

    const bodies = [];
    
    // Boundaries
    const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 50, window.innerWidth * 2, 100, { isStatic: true });
    const wallLeft = Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight * 2, { isStatic: true });
    const wallRight = Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight * 2, { isStatic: true });
    
    Composite.add(engine.world, [ground, wallLeft, wallRight]);

    // Create boxes for each card
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      
      // Skip hidden cards
      if (rect.width === 0 || rect.height === 0 || rect.top < 0) return;
      
      card.style.opacity = '0';
      card.style.transition = 'opacity 0.2s';
      card.style.pointerEvents = 'none';
      
      const body = Bodies.rectangle(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        rect.width,
        rect.height,
        {
          restitution: 0.6,
          friction: 0.5,
          render: {
            fillStyle: '#1a1a1a',
            strokeStyle: '#ff6b00',
            lineWidth: 2
          }
        }
      );
      bodies.push(body);
    });

    // Add extra falling blocks for fun
    for(let i = 0; i < 20; i++) {
        bodies.push(Bodies.rectangle(
            Math.random() * window.innerWidth, 
            -Math.random() * 500, 
            40 + Math.random() * 40, 
            40 + Math.random() * 40, 
            {
                restitution: 0.9,
                render: { fillStyle: '#ff6b00' }
            }
        ));
    }

    Composite.add(engine.world, bodies);

    // add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // run the renderer
    Render.run(render);

    // create runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    const handleResize = () => {
       render.canvas.width = window.innerWidth;
       render.canvas.height = window.innerHeight;
       Matter.Body.setPosition(ground, { x: window.innerWidth / 2, y: window.innerHeight + 50 });
       Matter.Body.setPosition(wallRight, { x: window.innerWidth + 50, y: window.innerHeight / 2 });
    };
    window.addEventListener('resize', handleResize);

    const handleKeyDown = (e) => {
       if(e.key === 'Escape') setIsActive(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas) render.canvas.remove();
      Composite.clear(engine.world);
      Engine.clear(engine);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      
      cards.forEach(card => {
        card.style.opacity = '1';
        card.style.pointerEvents = 'auto';
      });
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-black/80 px-6 py-3 rounded-xl border border-primary/30 text-white z-[10000] font-mono pointer-events-none flex flex-col items-center">
      <span className="text-primary font-bold mb-1">GRAVITY ANOMALY DETECTED</span>
      <span className="text-sm opacity-80">Pick up and throw elements with your mouse.</span>
      <span className="text-xs opacity-50 mt-1">Press [ESC] to restore gravity.</span>
    </div>
  );
};

export default GravityMode;
