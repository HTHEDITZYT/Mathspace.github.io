document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('id_username').value.trim();
    const password = document.getElementById('id_password').value.trim();
    const passwordGroup = document.getElementById('password-group');
    const submitBtn = document.getElementById('submit-btn');

    if (passwordGroup.style.display === 'none') {
        // First step - show password field
        passwordGroup.style.display = 'block';
        document.getElementById('id_username').readOnly = true;
        submitBtn.textContent = 'Log in';
        document.getElementById('id_password').focus();
    } else {
        // Password step
        if (password === '4567') {
            // SECRET: Load iframe
            document.querySelector('.login-page').style.display = 'none';
            document.getElementById('game-iframe-container').style.display = 'block';
            
            // ← CHANGE THIS TO YOUR GITHUB GAMES REPO URL
            document.getElementById('game-iframe').src = "https://wii-eta.vercel.app/";
        } else {
            alert("✅ Logged in successfully! (Demo mode)");
        }
    }
});

function backToLogin() {
    document.getElementById('game-iframe-container').style.display = 'none';
    document.querySelector('.login-page').style.display = 'block';
    
    // Reset form
    document.getElementById('login-form').reset();
    document.getElementById('password-group').style.display = 'none';
    document.getElementById('id_username').readOnly = false;
    document.getElementById('submit-btn').textContent = 'Continue';
}
