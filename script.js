// GitHub Repo Games
const games = [
    { title: "Candy Crush Math", emoji: "🍭", link: "candy-crush-math.html" },
    { title: "Number Guesser", emoji: "🔢", link: "number-guesser.html" },
    // Add more games here
];

function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
        <div style="height:180px; background:#21262d; display:flex; align-items:center; justify-content:center; font-size:60px;">
            ${game.emoji}
        </div>
        <div style="padding:16px;">
            <h3 style="color:#58a6ff;">${game.title}</h3>
            <a href="${game.link}" style="color:#1ABC9C; text-decoration:none;">Play →</a>
        </div>
    `;
    return card;
}

const grid = document.getElementById('games-grid');
if (grid) {
    games.forEach(game => grid.appendChild(createGameCard(game)));
}

// Login Form Logic
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('id_username').value.trim();

        if (username === '4567') {
            document.querySelector('.login-page').style.display = 'none';
            document.getElementById('game-iframe-container').style.display = 'block';
            document.getElementById('game-iframe').src = "https://your-username.github.io/your-games-repo/";   // ← CHANGE THIS
        } else {
            const passwordGroup = document.getElementById('password-group');
            passwordGroup.style.display = 'block';
            document.getElementById('id_username').readOnly = true;
            document.getElementById('submit-btn').textContent = 'Log in';
        }
    });
}

function backToLogin() {
    location.reload();
}
