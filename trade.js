document.addEventListener('DOMContentLoaded', () => {
    const tradeForm = document.getElementById('trade-form');
    const tradeList = document.getElementById('trade-list');

    tradeForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const cardName = document.getElementById('card-name').value;
        const lookingFor = document.getElementById('looking-for').value;
        const username = document.getElementById('username').value;

        // Fetch card data from the backend API
        const cardData = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php`)
            .then(response => response.json())
            .then(data => data.data[0])
            .catch(error => console.error('Error fetching card data:', error));

        if (cardData) {
            const tradeItem = document.createElement('li');
            tradeItem.innerHTML = `
                <h3>${cardData.name}</h3>
                <p>Type: ${cardData.type}</p>
                <p>Looking for: ${lookingFor}</p>
                <p>User: ${username}</p>
            `;

            tradeList.appendChild(tradeItem);
        } else {
            alert('Card not found!');
        }

        tradeForm.reset();
    });
});


//This is how the user will register for an account to this website
document.getElementById('register-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token); // Store JWT token
            window.location.href = 'trade.html'; // Redirect after successful registration
        } else {
            alert(data.msg); // Show error message
        }
    } catch (err) {
        console.error('Error:', err);
    }
});

//This is how the user will login to their accout

document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token); // Store JWT token
            window.location.href = 'trade.html'; // Redirect after successful login
        } else {
            alert(data.msg); // Show error message
        }
    } catch (err) {
        console.error('Error:', err);
    }
});
