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

