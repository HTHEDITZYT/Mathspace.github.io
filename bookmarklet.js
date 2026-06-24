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
        #semag-panel { position: fixed; top: 0; right: 0; width: 85%; height: 100%; background: #fff; z-index: 999999; box-shadow: -5px 0 15px rgba(0,0,0,0.3); border-left: 2px solid #ccc; display: none; overflow: hidden; }
        #semag-internal-frame { width: 100%; height: 100%; border: none; }
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
    
    var localFrame = document.createElement('iframe');
    localFrame.id = 'semag-internal-frame';
    panel.appendChild(localFrame);
    document.body.appendChild(panel);
    
    var htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Mathspace</title>
    <style>
        html, body { margin: 0; padding: 0; width: 100%; height: 100%; background: #f5f7fa; color: #333; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; overflow: hidden; }
        .fixed-header { background: #fff; border-bottom: 1px solid #e1e4e8; padding: 15px 20px; box-sizing: border-box; }
        .topbar-anonymous { display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto; }
        .join-class-link a { color: #4a90e2; text-decoration: none; font-weight: 600; }
        .login-page { padding: 60px 20px; display: flex; justify-content: center; box-sizing: border-box; }
        .container { width: 100%; max-width: 480px; background: #fff; padding: 35px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); box-sizing: border-box; }
        .text-center { text-align: center; }
        .login-h2 { margin-top: 0; margin-bottom: 25px; font-size: 28px; font-weight: 500; }
        .form-group { margin-bottom: 20px; }
        .form-control { width: 100%; padding: 12px; font-size: 16px; border: 1px solid #ccd1d9; border-radius: 4px; box-sizing: border-box; }
        .row { display: flex; justify-content: space-between; align-items: center; font-size: 14px; }
        .forgot-pw { color: #7f8c8d; text-decoration: none; }
        .btn { display: block; width: 100%; padding: 14px; font-size: 16px; font-weight: bold; border: none; border-radius: 4px; cursor: pointer; text-align: center; box-sizing: border-box; text-decoration: none; }
        .btn-primary { background: #4a90e2; color: #fff; margin-top: 10px; }
        .btn-primary:hover { background: #357abd; }
        .clever-login { background: #fff; color: #1c75bc; border: 1px solid #1c75bc; margin-top: 20px; }
        .clever-login:hover { background: #f0f7fc; }
        .mtl { margin-top: 20px; border-top: 1px solid #eee; padding-top: 10px; }
        
        #game-iframe-container { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #fff; display: none; }
        #game-iframe { width: 100%; height: 100%; border: none; display: block; }
    </style>
</head>
<body>
<div id="login-interface">
    <div class="fixed-header fixed-header-login-page">
        <nav class="topbar-anonymous">
            <div class="logo-container">
                <img alt="Mathspace" src="https://mathspace.co" style="width: 144px;">
            </div>
            <div class="join-class-link"><a href="#">Join class</a></div>
        </nav>
    </div>
    <div class="login-page">
        <div class="container">
            <h2 class="text-center login-h2">Login</h2>
            <form id="login-form" onsubmit="handleFormSubmit(event)">
                <div class="form-group">
                    <input type="text" id="id_username" class="form-control" placeholder="Username or Email" required>
                </div>
                <div id="password-group" class="form-group" style="display: none;">
                    <input type="password" id="id_password" class="form-control" placeholder="Password">
                </div>
                <div class="form-group">
                    <div class="row">
                        <div><label><input type="checkbox"> Remember me</label></div>
                        <div><a href="#" class="forgot-pw">Forgot password</a></div>
                    </div>
                </div>
                <button type="submit" id="submit-btn" class="btn btn-primary">Continue</button>
            </form>
            <div class="mtl">
                <a href="#" class="btn clever-login" onclick="triggerGameArea(event)">Sign in with Clever</a>
            </div>
        </div>
    </div>
</div>

<div id="game-iframe-container">
    <iframe id="game-iframe" allowfullscreen></iframe>
</div>

<script>
    var step = 1;
    function handleFormSubmit(e) {
        e.preventDefault();
        var passGroup = document.getElementById('password-group');
        var submitBtn = document.getElementById('submit-btn');
        if (step === 1) {
            passGroup.style.display = 'block';
            document.getElementById('id_password').setAttribute('required', 'required');
            submitBtn.textContent = 'Login';
            step = 2;
        } else {
            triggerGameArea();
        }
    }
    function triggerGameArea(e) {
        if(e) e.preventDefault();
        document.getElementById('login-interface').style.display = 'none';
        document.getElementById('game-iframe-container').style.display = 'block';
        document.getElementById('game-iframe').src = 'https://2604moon.firebaseapp.com';
    }
</script>
</body>
</html>`;

    localFrame.contentWindow.document.open();
    localFrame.contentWindow.document.write(htmlContent);
    localFrame.contentWindow.document.close();
    
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
