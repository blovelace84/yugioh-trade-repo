document.addEventListener('DOMContentLoaded', () => {
    const tradeForm = document.getElementById('trade-form');
    const tradeList = document.getElementById('trade-list');

    tradeForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const cardName = document.getElementById('card-name').value;
        const lookingFor = document.getElementById('looking-for').value;
        const username = document.getElementById('username').value;

        const tradeItem = document.createElement('li');
        tradeItem.innerHTML = `
            <h3>${cardName}</h3>
            <p>Looking for: ${lookingFor}</p>
            <p>User: ${username}</p>
        `;

        tradeList.appendChild(tradeItem);

        tradeForm.reset();
    });
});
