javascript:(function(){
  // Wii ETA Helper Bookmarklet for Education Perfect
  // Creates a draggable floating panel with iframe
  
  const PANEL_ID = 'wii-eta-panel';
  const BUTTON_ID = 'wii-eta-nav-btn';
  const HEADER_COLOR = '#182552';
  const IFRAME_URL = 'https://wii-eta.vercel.app/';
  
  // Check if panel already exists (toggle off)
  if (document.getElementById(PANEL_ID)) {
    document.getElementById(PANEL_ID).remove();
    const btn = document.getElementById(BUTTON_ID);
    if (btn) btn.remove();
    return;
  }
  
  // Create floating panel container
  const panel = document.createElement('div');
  panel.id = PANEL_ID;
  panel.style.cssText = `
    position: fixed;
    width: 480px;
    height: 640px;
    top: 50px;
    right: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    z-index: 999999;
    display: flex;
    flex-direction: column;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;
  
  // Responsive sizing for mobile
  if (window.innerWidth < 768) {
    panel.style.width = 'calc(100vw - 20px)';
    panel.style.height = '70vh';
    panel.style.right = '10px';
    panel.style.left = '10px';
  }
  
  // Header
  const header = document.createElement('div');
  header.style.cssText = `
    background-color: ${HEADER_COLOR};
    color: white;
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: move;
    user-select: none;
    border-radius: 8px 8px 0 0;
    touch-action: none;
  `;
  header.innerHTML = '<span style="font-weight: 600; font-size: 14px;">Wii ETA Helper</span><button style="background: none; border: none; color: white; font-size: 20px; cursor: pointer; padding: 0; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">✕</button>';
  
  // Close button
  header.querySelector('button').addEventListener('click', function(e) {
    e.stopPropagation();
    panel.remove();
    const btn = document.getElementById(BUTTON_ID);
    if (btn) btn.remove();
  });
  
  // iframe
  const iframe = document.createElement('iframe');
  iframe.src = IFRAME_URL;
  iframe.style.cssText = `
    flex: 1;
    border: none;
    border-radius: 0 0 8px 8px;
    background: white;
  `;
  iframe.allow = 'clipboard-read; clipboard-write';
  
  panel.appendChild(header);
  panel.appendChild(iframe);
  document.body.appendChild(panel);
  
  // Dragging functionality (mouse + touch)
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;
  
  function startDrag(e) {
    isDragging = true;
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    const rect = panel.getBoundingClientRect();
    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;
  }
  
  function moveDrag(e) {
    if (!isDragging) return;
    e.preventDefault();
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    panel.style.left = (clientX - offsetX) + 'px';
    panel.style.top = (clientY - offsetY) + 'px';
    panel.style.right = 'auto';
    panel.style.bottom = 'auto';
  }
  
  function endDrag() {
    isDragging = false;
  }
  
  header.addEventListener('mousedown', startDrag);
  header.addEventListener('touchstart', startDrag);
  document.addEventListener('mousemove', moveDrag);
  document.addEventListener('touchmove', moveDrag, {passive: false});
  document.addEventListener('mouseup', endDrag);
  document.addEventListener('touchend', endDrag);
  
  // Try to inject button into navbar (Education Perfect specific)
  setTimeout(function() {
    try {
      // Look for notification bell or nav icons
      const navContainer = document.querySelector('[role="navigation"]') || 
                          document.querySelector('.navbar') ||
                          document.querySelector('nav') ||
                          document.querySelector('[class*="nav"]');
      
      if (navContainer) {
        const btn = document.createElement('button');
        btn.id = BUTTON_ID;
        btn.style.cssText = `
          background: ${HEADER_COLOR};
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          margin: 0 8px;
          transition: opacity 0.2s;
        `;
        btn.textContent = '⚡ Wii ETA';
        btn.addEventListener('click', function(e) {
          e.stopPropagation();
          const pnl = document.getElementById(PANEL_ID);
          pnl.style.display = pnl.style.display === 'none' ? 'flex' : 'none';
        });
        
        // Try to insert near the end of nav (before profile menu)
        navContainer.appendChild(btn);
      }
    } catch (e) {
      // Silently fail if nav injection doesn't work
    }
  }, 100);
})();
