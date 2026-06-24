javascript:(function(){
    if(document.getElementById('wii-eta-panel')) {
        document.getElementById('wii-eta-panel').style.display = 
            document.getElementById('wii-eta-panel').style.display === 'block' ? 'none' : 'block';
        return;
    }

    var style = document.createElement('style');
    style.innerHTML = `
        #wii-eta-panel { 
            position: fixed; 
            top: 60px; 
            right: 20px; 
            width: 460px; 
            height: 620px; 
            background: #fff; 
            z-index: 9999999; 
            box-shadow: -8px 0 25px rgba(0,0,0,0.35); 
            border: 3px solid #182552; 
            border-radius: 12px; 
            overflow: hidden; 
            display: block;
        }
        #wii-eta-header {
            background: #182552;
            color: white;
            padding: 10px 14px;
            font-family: system-ui, sans-serif;
            font-size: 15px;
            font-weight: 600;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: move;
        }
        #wii-eta-iframe { 
            width: 100%; 
            height: calc(100% - 44px); 
            border: none; 
        }
        .wii-close { cursor: pointer; font-size: 20px; }
    `;
    document.head.appendChild(style);

    var panel = document.createElement('div');
    panel.id = 'wii-eta-panel';

    var header = document.createElement('div');
    header.id = 'wii-eta-header';
    header.innerHTML = `Wii ETA Helper <span class="wii-close">✕</span>`;
    panel.appendChild(header);

    var iframe = document.createElement('iframe');
    iframe.id = 'wii-eta-iframe';
    iframe.src = 'https://wii-eta.vercel.app/';
    panel.appendChild(iframe);

    document.body.appendChild(panel);

    // Draggable header
    let isDragging = false, x = 0, y = 0;
    header.addEventListener('mousedown', e => {
        if(e.target.classList.contains('wii-close')) return;
        isDragging = true;
        x = e.clientX - panel.offsetLeft;
        y = e.clientY - panel.offsetTop;
    });
    document.addEventListener('mousemove', e => {
        if(!isDragging) return;
        panel.style.left = (e.clientX - x) + 'px';
        panel.style.top = (e.clientY - y) + 'px';
        panel.style.right = 'auto';
    });
    document.addEventListener('mouseup', () => isDragging = false);

    // Close button
    header.querySelector('.wii-close').addEventListener('click', () => {
        panel.style.display = 'none';
    });

    // Click anywhere on the panel to bring it to front
    panel.addEventListener('click', () => panel.style.zIndex = 9999999);
})();
