javascript:(function(){
    var targetText = 'timetable';
    var navLinks = document.querySelectorAll('a, li, div, span');
    var targetEl = null;
    
    for (var i = 0; i < navLinks.length; i++) {
        if (navLinks[i].textContent.trim().toLowerCase() === targetText) {
            targetEl = navLinks[i].closest('li') || navLinks[i].parentElement;
            break;
        }
    }
    
    if (!targetEl) {
        targetEl = document.querySelector('.navigation-menu, .sidebar, ul, nav') || document.body;
    }
    
    if (document.getElementById('semag-custom-item')) return;
    
    var style = document.createElement('style');
    style.innerHTML = `
        #semag-panel { position: fixed; top: 0; right: 0; width: 85%; height: 100%; background: #fff; z-index: 999999; box-shadow: -5px 0 15px rgba(0,0,0,0.3); border-left: 2px solid #ccc; display: none; }
        #semag-panel iframe { width: 100%; height: 100%; border: none; }
        .semag-icon-span { display: inline-flex; align-items: center; justify-content: center; margin-right: 8px; font-size: 1.1em; font-weight: bold; color: #4a90e2; vertical-align: middle; }
    `;
    document.head.appendChild(style);
    
    var newItem = targetEl.cloneNode(true);
    newItem.id = 'semag-custom-item';
    
    if (newItem.classList.contains('active')) {
        newItem.classList.remove('active');
    }
    
    var clickableElement = newItem.querySelector('a') || newItem;
    clickableElement.setAttribute('href', '#');
    
    var textContainer = null;
    var innerElements = clickableElement.querySelectorAll('*');
    if (innerElements.length > 0) {
        for (var j = 0; j < innerElements.length; j++) {
            if (innerElements[j].textContent.trim().toLowerCase() === targetText) {
                textContainer = innerElements[j];
                break;
            }
        }
    }
    
    if (textContainer) {
        textContainer.textContent = 'Mathspace';
    } else {
        clickableElement.textContent = 'Mathspace';
    }
    
    var existingIcon = clickableElement.querySelector('i, svg, img, .icon, .v-icon');
    if (existingIcon) {
        var mathIcon = document.createElement('span');
        mathIcon.className = 'semag-icon-span';
        mathIcon.innerHTML = '∑';
        existingIcon.parentNode.replaceChild(mathIcon, existingIcon);
    } else {
        var prefixIcon = document.createElement('span');
        prefixIcon.className = 'semag-icon-span';
        prefixIcon.innerHTML = '∑';
        clickableElement.insertBefore(prefixIcon, clickableElement.firstChild);
    }
    
    if (targetEl.insertAdjacentElement) {
        targetEl.insertAdjacentElement('afterend', newItem);
    } else {
        targetEl.parentNode.insertBefore(newItem, targetEl.nextSibling);
    }
    
    var panel = document.createElement('div');
    panel.id = 'semag-panel';
    
    var iframe = document.createElement('iframe');
    iframe.src = 'https://mathspace4567.github.io/login.html';
    
    panel.appendChild(iframe);
    document.body.appendChild(panel);
    
    newItem.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (panel.style.display === 'block') {
            panel.style.display = 'none';
        } else {
            panel.style.display = 'block';
        }
    });
})();
