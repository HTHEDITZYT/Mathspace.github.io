javascript:(function(){
    if(document.getElementById('wii-eta-container')){
        document.getElementById('wii-eta-container').remove();
        return;
    }
    
    var div = document.createElement('div');
    div.id = 'wii-eta-container';
    div.style.position = 'fixed';
    div.style.bottom = '10px';
    div.style.left = '10px';
    div.style.width = '460px';
    div.style.height = '620px';
    div.style.background = 'white';
    div.style.border = '4px solid #182552';
    div.style.borderRadius = '12px';
    div.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    div.style.zIndex = '99999999';
    div.style.overflow = 'hidden';
    
    var header = document.createElement('div');
    header.style.background = '#182552';
    header.style.color = 'white';
    header.style.padding = '10px';
    header.style.fontWeight = 'bold';
    header.style.textAlign = 'center';
    header.style.cursor = 'move';
    header.innerHTML = 'Wii ETA Helper <span style="float:right;cursor:pointer;font-size:20px;" onclick="this.parentElement.parentElement.remove()">✕</span>';
    div.appendChild(header);
    
    var iframe = document.createElement('iframe');
    iframe.src = 'https://wii-eta.vercel.app/';
    iframe.style.width = '100%';
    iframe.style.height = 'calc(100% - 45px)';
    iframe.style.border = 'none';
    div.appendChild(iframe);
    
    document.body.appendChild(div);
    
    // Make it draggable (works on iPad too)
    let dragging = false, x = 0, y = 0;
    header.addEventListener('touchstart', e => {
        dragging = true;
        x = e.touches[0].clientX - div.offsetLeft;
        y = e.touches[0].clientY - div.offsetTop;
    });
    document.addEventListener('touchmove', e => {
        if(!dragging) return;
        div.style.left = (e.touches[0].clientX - x) + 'px';
        div.style.top = (e.touches[0].clientY - y) + 'px';
        div.style.bottom = 'auto';
    });
    document.addEventListener('touchend', () => dragging = false);
})();
