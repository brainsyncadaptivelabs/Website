export function initSimulator() {
  const slider = document.getElementById('workload-slider');
  const display = document.getElementById('sim-display');
  const stateLabel = document.getElementById('state-label');
  
  // Telemetry DOM elements
  const telemetryLoad = document.getElementById('telemetry-load');
  const telemetryLatency = document.getElementById('telemetry-latency');
  const telemetryRate = document.getElementById('telemetry-rate');

  // View containers
  const viewRest = document.getElementById('view-rest');
  const viewOptimal = document.getElementById('view-optimal');
  const viewStress = document.getElementById('view-stress');

  if (!slider || !display) return;

  function updateSimulator(value) {
    // Reset classes
    display.className = 'sim-display glass';
    slider.className = 'workload-slider';
    
    // Hide all views
    viewRest.style.display = 'none';
    viewOptimal.style.display = 'none';
    viewStress.style.display = 'none';

    // Update Telemetry percentage
    telemetryLoad.textContent = `${value}%`;

    if (value <= 30) {
      // CALM / REST STATE
      display.classList.add('state-rest');
      slider.classList.add('sim-state-rest');
      stateLabel.textContent = 'Low System Load';
      viewRest.style.display = 'block';

      // Telemetry variables
      telemetryLatency.textContent = '12ms';
      telemetryRate.textContent = `${Math.floor(10 + value / 2)} Hz`;

    } else if (value > 30 && value <= 75) {
      // OPTIMAL FLOW STATE
      display.classList.add('state-optimal');
      slider.classList.add('sim-state-optimal');
      stateLabel.textContent = 'Optimal Throughput';
      viewOptimal.style.display = 'grid';

      // Telemetry variables
      telemetryLatency.textContent = `${Math.max(3, Math.floor(12 - (value - 30) * 0.2))}ms`;
      telemetryRate.textContent = `${Math.floor(50 + (value - 30) * 1.5)} Hz`;

      // Trigger node movement animation frame
      animateOptimalNodes();

    } else {
      // HIGH STRESS STATE
      display.classList.add('state-stress');
      slider.classList.add('sim-state-stress');
      stateLabel.textContent = 'Overload Protection Active';
      viewStress.style.display = 'block';

      // Telemetry variables
      telemetryLatency.textContent = `${Math.floor(15 + (value - 75) * 0.8)}ms`;
      telemetryRate.textContent = `${Math.floor(110 + (value - 75) * 1.2)} Hz`;
    }
  }

  // Handle slider inputs
  slider.addEventListener('input', (e) => {
    updateSimulator(parseInt(e.target.value, 10));
  });

  // Initialize nodes for Optimal Flow view
  setupOptimalNodes();

  // Initial update
  updateSimulator(parseInt(slider.value, 10));
}

// Subsystem: Optimal Flow node connections generator
let optimalNodes = [];
function setupOptimalNodes() {
  const container = document.getElementById('node-network');
  if (!container) return;
  container.innerHTML = '';
  optimalNodes = [];

  for (let i = 0; i < 8; i++) {
    const node = document.createElement('div');
    node.className = 'node-item';
    
    const x = Math.random() * 80 + 10;
    const y = Math.random() * 80 + 10;
    node.style.left = `${x}%`;
    node.style.top = `${y}%`;
    
    container.appendChild(node);
    optimalNodes.push({
      element: node,
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2
    });
  }
}

function animateOptimalNodes() {
  const container = document.getElementById('node-network');
  if (!container || optimalNodes.length === 0) return;

  optimalNodes.forEach(node => {
    node.x += node.vx;
    node.y += node.vy;

    // Boundary bounces
    if (node.x < 5 || node.x > 95) node.vx = -node.vx;
    if (node.y < 5 || node.y > 95) node.vy = -node.vy;

    node.element.style.left = `${node.x}%`;
    node.element.style.top = `${node.y}%`;
  });
}
