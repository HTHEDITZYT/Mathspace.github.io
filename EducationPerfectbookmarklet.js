javascript:(function(){
    // Prevent duplicates
    if(document.getElementById('wii-eta-custom-item')) {
        toggleWiiPanel();
        return;
    }

    var style = document.createElement('style');
    style.innerHTML = `
        #wii-eta-panel { 
            position: fixed; 
            top: 80px; 
            right: 30px; 
            width: 480px; 
            height: 640px; 
            background: #fff; 
            z-index: 9999999; 
            box-shadow: -10px 0 30px rgba(0,0,0,0.4); 
            border: 4px solid #182552; 
            border-radius: 12px; 
            overflow: hidden; 
            display: none;
        }
        #wii-eta-header {
            background: #182552;
            color: white;
            padding: 12px 16px;
            font-family: system-ui, sans-serif;
            font-size: 16px;
            font-weight: 700;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: move;
        }
        #wii-eta-iframe { 
            width: 100%; 
            height: calc(100% - 48px); 
            border: none; 
        }
        .wii-close { cursor: pointer; font-size: 22px; line-height: 1; }
    `;
    document.head.appendChild(style);

    // Create floating panel
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

    // Draggable
    let isDragging = false, offsetX, offsetY;
    header.addEventListener('mousedown', e => {
        if(e.target.classList.contains('wii-close')) return;
        isDragging = true;
        offsetX = e.clientX - panel.getBoundingClientRect().left;
        offsetY = e.clientY - panel.getBoundingClientRect().top;
    });
    document.addEventListener('mousemove', e => {
        if(!isDragging) return;
        panel.style.left = (e.clientX - offsetX) + 'px';
        panel.style.top = (e.clientY - offsetY) + 'px';
        panel.style.right = 'auto';
    });
    document.addEventListener('mouseup', () => isDragging = false);

    // Close button
    header.querySelector('.wii-close').addEventListener('click', () => {
        panel.style.display = 'none';
    });

    function toggleWiiPanel() {
        panel.style.display = (panel.style.display === 'block') ? 'none' : 'block';
    }

    // === Inject menu item (like SEQTA) ===
    var targetText = ['timetable', 'schedule', 'home', 'dashboard', 'classes']; // common EP nav words
    var navLinks = document.querySelectorAll('a, li, div[role="menuitem"], .nav-item, .menu-item, span');
    var targetEl = null;

    for (var i = 0; i < navLinks.length; i++) {
        var text = navLinks[i].textContent.trim().toLowerCase();
        if (targetText.some(t => text.includes(t))) {
            targetEl = navLinks[i].closest('li') || navLinks[i].parentElement || navLinks[i];
            break;
        }
    }

    if (!targetEl) targetEl = document.querySelector('nav, .sidebar, .menu, .navigation') || document.body;

    var newItem = targetEl.cloneNode(true);
    newItem.id = 'wii-eta-custom-item';

    // Clean and rename
    var link = newItem.querySelector('a') || newItem;
    link.href = '#';
    link.style.cursor = 'pointer';

    // Change text to "Wii ETA"
    var textNode = Array.from(link.childNodes).find(n => n.nodeType === 3);
    if (textNode) textNode.textContent = 'Wii ETA';
    else link.textContent = 'Wii ETA';

    // Add icon (optional)
    var icon = document.createElement('span');
    icon.style.marginRight = '8px';
    icon.innerHTML = '🎮';
    link.insertBefore(icon, link.firstChild);

    // Insert after original item
    if (targetEl.parentNode) {
        targetEl.parentNode.insertBefore(newItem, targetEl.nextSibling);
    }

    // Click handler
    newItem.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        toggleWiiPanel();
    });

    // Show panel immediately first time
    setTimeout(() => { panel.style.display = 'block'; }, 800);
})();
