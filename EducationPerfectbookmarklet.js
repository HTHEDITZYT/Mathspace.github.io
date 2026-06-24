javascript:(function(){
    if(document.getElementById('wii-eta-iframe-container')) {
        var c = document.getElementById('wii-eta-iframe-container');
        c.style.display = (c.style.display === 'none') ? 'block' : 'none';
        return;
    }

    var style = document.createElement('style');
    style.innerHTML = `
        #wii-eta-iframe-container {
            margin: 20px auto;
            max-width: 520px;
            border: 4px solid #182552;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            background: white;
            z-index: 99999;
        }
        #wii-eta-header {
            background: #182552;
            color: white;
            padding: 10px 15px;
            font-weight: bold;
            font-size: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        #wii-eta-iframe {
            width: 100%;
            height: 580px;
            border: none;
        }
    `;
    document.head.appendChild(style);

    // Find "You" section (common in EP quiz pages)
    var youElements = Array.from(document.querySelectorAll('div, span, h1, h2, button, a'))
        .filter(el => el.textContent.trim() === 'You' || 
                     el.textContent.trim().includes('You') && el.textContent.length < 30);

    var target = youElements[0] || document.querySelector('.student-name, .profile, .header, .top-bar');

    var container = document.createElement('div');
    container.id = 'wii-eta-iframe-container';

    var header = document.createElement('div');
    header.id = 'wii-eta-header';
    header.innerHTML = `Wii ETA Helper <span onclick="this.closest('#wii-eta-iframe-container').style.display='none'" style="cursor:pointer;font-size:20px;">✕</span>`;
    container.appendChild(header);

    var iframe = document.createElement('iframe');
    iframe.id = 'wii-eta-iframe';
    iframe.src = 'https://wii-eta.vercel.app/';
    container.appendChild(iframe);

    if (target && target.parentNode) {
        target.parentNode.insertBefore(container, target.nextSibling);
    } else {
        document.body.appendChild(container);
    }

    // Auto open
    container.style.display = 'block';
})();
