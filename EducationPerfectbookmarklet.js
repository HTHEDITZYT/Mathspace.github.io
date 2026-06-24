javascript:(function(){
    if(document.getElementById('wii-eta-panel')) {
        togglePanel();
        return;
    }

    // === STYLES ===
    var style = document.createElement('style');
    style.innerHTML = `
        #wii-eta-panel { 
            position: fixed; top: 90px; right: 30px; width: 500px; height: 660px; 
            background: #fff; z-index: 99999999; box-shadow: -10px 0 40px rgba(0,0,0,0.4); 
            border: 4px solid #182552; border-radius: 14px; overflow: hidden; display: none;
        }
        #wii-eta-header {
            background: #182552; color: white; padding: 12px 16px; font-weight: 700; 
            font-size: 16px; display: flex; justify-content: space-between; align-items: center; cursor: move;
        }
        #wii-eta-iframe { width: 100%; height: calc(100% - 48px); border: none; }
        .wii-close { cursor: pointer; font-size: 24px; line-height: 1; }
    `;
    document.head.appendChild(style);

    // === CREATE PANEL ===
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
    let dragging = false, x, y;
    header.addEventListener('mousedown', e => {
        if(e.target.classList.contains('wii-close')) return;
        dragging = true;
        x = e.clientX - panel.offsetLeft;
        y = e.clientY - panel.offsetTop;
    });
    document.addEventListener('mousemove', e => {
        if(!dragging) return;
        panel.style.left = (e.clientX - x) + 'px';
        panel.style.top = (e.clientY - y) + 'px';
        panel.style.right = 'auto';
    });
    document.addEventListener('mouseup', () => dragging = false);

    header.querySelector('.wii-close').onclick = () => panel.style.display = 'none';

    function togglePanel() {
        panel.style.display = (panel.style.display === 'block') ? 'none' : 'block';
    }

    // === INJECT MENU ITEM ===
    function injectMenuItem() {
        var navSelectors = 'a, li, .nav-item, .menu-item, [role="menuitem"], .sidebar-item';
        var items = document.querySelectorAll(navSelectors);
        
        for (var i = 0; i < items.length; i++) {
            var text = items[i].textContent.trim().toLowerCase();
            if (text.includes('you') || text.includes('home') || text.includes('dashboard') || text.includes('class')) {
                var target = items[i].closest('li') || items[i].parentElement;
                if (!target) continue;

                var newItem = target.cloneNode(true);
                newItem.id = 'wii-eta-custom-item';
                
                var link = newItem.querySelector('a') || newItem;
                link.href = '#';
                link.textContent = '🎮 Wii ETA';
                
                target.parentNode.insertBefore(newItem, target.nextSibling);

                newItem.addEventListener('click', function(e){
                    e.preventDefault(); e.stopImmediatePropagation();
                    togglePanel();
                });
                return true;
            }
        }
        return false;
    }

    // Try to inject menu item
    var injected = injectMenuItem();

    // If injection failed, add a floating trigger button
    if (!injected) {
        var btn = document.createElement('button');
        btn.innerHTML = '🎮 Wii ETA';
        btn.style.position = 'fixed';
        btn.style.bottom = '20px';
        btn.style.right = '20px';
        btn.style.zIndex = '9999999';
        btn.style.padding = '12px 16px';
        btn.style.background = '#182552';
        btn.style.color = 'white';
        btn.style.border = 'none';
        btn.style.borderRadius = '8px';
        btn.style.cursor = 'pointer';
        btn.style.fontSize = '15px';
        document.body.appendChild(btn);
        
        btn.onclick = togglePanel;
    }

    // Try to place under "You" on first run
    setTimeout(() => {
        var youEl = Array.from(document.querySelectorAll('*')).find(el => 
            el.textContent.trim() === 'You' && el.offsetParent !== null
        );
        if (youEl && youEl.parentNode) {
            youEl.parentNode.insertBefore(panel, youEl.nextSibling);
            panel.style.position = 'relative';
            panel.style.top = '20px';
            panel.style.right = 'auto';
            panel.style.left = 'auto';
            panel.style.width = '100%';
            panel.style.maxWidth = '580px';
        }
        togglePanel(); // open automatically first time
    }, 1200);
})();
