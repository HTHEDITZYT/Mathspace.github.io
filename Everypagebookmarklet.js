javascript:(function(){
    var slots=JSON.parse(localStorage.getItem('wii-eta-slots'))||{};
    var slotNames=Object.keys(slots);
    
    if(slotNames.length>0){
        var choice=prompt('Saved positions:\n\n'+slotNames.map(function(s,i){return(i+1)+'. '+s}).join('\n')+'\n\nEnter number to load, or leave blank to create new position');
        if(choice&&slotNames[parseInt(choice)-1]){
            var pos=slots[slotNames[parseInt(choice)-1]];
            openIframe(pos.x,pos.y);
            return;
        }
    }
    
    alert('📍 Click anywhere on the page to place the Wii ETA window');
    
    var isSelecting=true;
    document.body.style.cursor='crosshair';
    
    function clickHandler(e){
        if(!isSelecting) return;
        e.preventDefault();
        e.stopPropagation();
        isSelecting=false;
        document.body.style.cursor='auto';
        document.removeEventListener('click',clickHandler,true);
        
        var x=Math.round(e.clientX - 240);
        var y=Math.round(e.clientY - 40);
        
        if(confirm('Place Wii ETA here?')){
            var slotName=prompt('Save this position as (name):');
            if(slotName){
                slots[slotName]={x:x,y:y};
                localStorage.setItem('wii-eta-slots',JSON.stringify(slots));
            }
            openIframe(x,y);
        }
    }
    
    document.addEventListener('click',clickHandler,true);
    
    function openIframe(x,y){
        if(document.getElementById('wii-eta-panel')) return;
        
        var style=document.createElement('style');
        style.innerHTML=`#wii-eta-panel{position:fixed;top:${y}px;left:${x}px;width:480px;height:620px;background:#fff;border:4px solid #182552;border-radius:12px;box-shadow:0 15px 40px rgba(0,0,0,0.4);z-index:99999999;overflow:hidden}#wii-eta-header{background:#182552;color:white;padding:12px;font-weight:bold;display:flex;justify-content:space-between;align-items:center;cursor:move}#wii-eta-frame{width:100%;height:calc(100% - 48px);border:none}`;
        document.head.appendChild(style);
        
        var panel=document.createElement('div');
        panel.id='wii-eta-panel';
        
        var header=document.createElement('div');
        header.id='wii-eta-header';
        header.innerHTML=`Wii ETA Helper <span style="cursor:pointer;font-size:22px" onclick="this.closest('#wii-eta-panel').remove()">✕</span>`;
        panel.appendChild(header);
        
        var frame=document.createElement('iframe');
        frame.id='wii-eta-frame';
        frame.src='https://wii-eta.vercel.app/';
        panel.appendChild(frame);
        
        document.body.appendChild(panel);
        
        // Draggable
        let dragging=false, ox, oy;
        header.addEventListener('mousedown', e=>{if(e.target.tagName==='SPAN')return; dragging=true; ox=e.clientX-panel.offsetLeft; oy=e.clientY-panel.offsetTop;});
        document.addEventListener('mousemove', e=>{if(!dragging)return; panel.style.left=(e.clientX-ox)+'px'; panel.style.top=(e.clientY-oy)+'px';});
        document.addEventListener('mouseup', ()=>{dragging=false;});
    }
})();
