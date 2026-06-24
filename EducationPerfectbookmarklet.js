javascript:(function(){
    if(document.getElementById('wii-eta-container')){
        var c = document.getElementById('wii-eta-container');
        c.style.display = (c.style.display === 'none') ? 'block' : 'none';
        return;
    }

    var style = document.createElement('style');
    style.innerHTML = `
        #wii-eta-container {
            position: fixed !important;
            bottom: 15px !important;
            left: 15px !important;
            width: 460px !important;
            height: 620px !important;
            background: white !important;
            border: 4px solid #182552 !important;
            border-radius: 12px !important;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5) !important;
            z-index: 99999999 !important;
            overflow: hidden !important;
            display: block !important;
        }
        #wii-eta-header {
            background: #182552 !important;
            color: white !important;
            padding: 12px !important;
            font-weight: bold !important;
            text-align: center !important;
            cursor: move !important;
            font-size: 16px !important;
        }
        #wii-eta-iframe {
            width: 100% !important;
            height: calc(100% - 48px) !important;
            border: none !important;
        }
    `;
    document.head.appendChild(style);

    var container = document.createElement('div');
    container.id = 'wii-eta-container';

    var header = document.createElement('div');
    header.id = 'wii-eta-header';
    header.innerHTML = 'Wii ETA Helper <span style="float:right; cursor:pointer; font-size:22px;" onclick="document.getElementById(\'wii-eta-container\').style.display=\'none\'">✕</span>';
    container.appendChild(header);

    var iframe = document.createElement('iframe');
    iframe.id = 'wii-eta-iframe';
    iframe.src = 'https://wii-eta.vercel.app/';
    container.appendChild(iframe);

    document.body.appendChild(container);

    // Draggable (touch + mouse support for iPad)
    let dragging = false, startX, startY;
    header.addEventListener('mousedown', startDrag);
    header.addEventListener('touchstart', startDrag);

    function startDrag(e) {
        dragging = true;
        const touch = e.touches ? e.touches[0] : e;
        startX = touch.clientX - container.offsetLeft;
        startY = touch.clientY - container.offsetTop;
    }

    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('mouseup', () => dragging = false);
    document.addEventListener('touchend', () => dragging = false);

    function drag(e) {
        if (!dragging) return;
        const touch = e.touches ? e.touches[0] : e;
        container.style.left = (touch.clientX - startX) + 'px';
        container.style.top = (touch.clientY - startY) + 'px';
        container.style.bottom = 'auto';
    }

    // === Attach to Notification Bell ===
    function attachToNotification() {
        // Common selectors for notification bell on EP
        const selectors = [
            'button[aria-label*="notification"]', 
            '.notification-bell', 
            'i.fa-bell', 
            '[data-testid*="notification"]',
            'svg path[d*="bell"]',
            '.top-bar button',
            'header button'
        ];

        for (let sel of selectors) {
            let bells = document.querySelectorAll(sel);
            for (let bell of bells) {
                if (bell.textContent.includes('🛎') || bell.innerHTML.includes('bell')) {
                    bell.onclick = null;
                    bell.addEventListener('click', function(e){
                        e.stopImmediatePropagation();
                        container.style.display = (container.style.display === 'none') ? 'block' : 'none';
                    });
                    return true;
                }
            }
        }

        // Fallback: try to find any top right icon
        const topButtons = document.querySelectorAll('header button, .top-bar button, nav button');
        if (topButtons.length > 0) {
            const likelyBell = topButtons[topButtons.length - 1];
            likelyBell.addEventListener('click', function(e){
                e.stopImmediatePropagation();
                container.style.display = (container.style.display === 'none') ? 'block' : 'none';
            });
        }
    }

    // Run attachment
    setTimeout(attachToNotification, 800);
    setTimeout(attachToNotification, 2000); // try again

    // Show initially
    container.style.display = 'block';
})();
