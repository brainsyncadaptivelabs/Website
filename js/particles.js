export class NeuralParticles {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 150 };
    
    this.resizeCanvas();
    this.init();
    this.animate();

    window.addEventListener('resize', () => this.resizeCanvas());
    
    // Add mouse move listener
    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  resizeCanvas() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.init();
  }

  init() {
    this.particles = [];
    // Adjust density based on screen size
    const quantity = Math.floor((this.canvas.width * this.canvas.height) / 9000);
    const count = Math.min(Math.max(quantity, 30), 120);

    for (let i = 0; i < count; i++) {
      const size = Math.random() * 2 + 1;
      const x = Math.random() * (this.canvas.width - size * 2) + size;
      const y = Math.random() * (this.canvas.height - size * 2) + size;
      const directionX = (Math.random() * 0.4) - 0.2;
      const directionY = (Math.random() * 0.4) - 0.2;
      // Vibrant colors corresponding to design theme (blue/purple/cyan)
      const colorChoices = ['#3B82F6', '#8B5CF6', '#00F2FE'];
      const color = colorChoices[Math.floor(Math.random() * colorChoices.length)];

      this.particles.push({
        x,
        y,
        directionX,
        directionY,
        size,
        color,
        originalSpeedX: directionX,
        originalSpeedY: directionY
      });
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Update position
      p.x += p.directionX;
      p.y += p.directionY;

      // Edge collisions
      if (p.x > this.canvas.width || p.x < 0) {
        p.directionX = -p.directionX;
      }
      if (p.y > this.canvas.height || p.y < 0) {
        p.directionY = -p.directionY;
      }

      // Mouse interactive attraction
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.mouse.radius) {
          // Subtle attraction force
          const force = (this.mouse.radius - distance) / this.mouse.radius;
          p.x += (dx / distance) * force * 0.8;
          p.y += (dy / distance) * force * 0.8;
        }
      }

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2, false);
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = p.color;
      this.ctx.fill();
      this.ctx.shadowBlur = 0; // reset shadow
    }

    // Connect particles
    this.connect();
  }

  connect() {
    let opacityValue = 1;
    const maxDist = 120;
    
    for (let a = 0; a < this.particles.length; a++) {
      for (let b = a; b < this.particles.length; b++) {
        const distSq = ((this.particles[a].x - this.particles[b].x) ** 2) + 
                       ((this.particles[a].y - this.particles[b].y) ** 2);
        
        if (distSq < maxDist * maxDist) {
          const distance = Math.sqrt(distSq);
          opacityValue = 1 - (distance / maxDist);
          
          // Connection color is a mix, glowing soft blue/violet
          this.ctx.strokeStyle = `rgba(59, 130, 246, ${opacityValue * 0.15})`;
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[a].x, this.particles[a].y);
          this.ctx.lineTo(this.particles[b].x, this.particles[b].y);
          this.ctx.stroke();
        }
      }

      // Connect to mouse if close
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const mDistSq = ((this.particles[a].x - this.mouse.x) ** 2) + 
                        ((this.particles[a].y - this.mouse.y) ** 2);
        if (mDistSq < this.mouse.radius * this.mouse.radius) {
          const mDistance = Math.sqrt(mDistSq);
          opacityValue = 1 - (mDistance / this.mouse.radius);
          this.ctx.strokeStyle = `rgba(0, 242, 254, ${opacityValue * 0.25})`;
          this.ctx.lineWidth = 1.2;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[a].x, this.particles[a].y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.stroke();
        }
      }
    }
  }
}
