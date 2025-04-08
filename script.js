let currentPage = 0;

// Fonction pour charger les offres
function loadOffers(page) {
    // Afficher le loader
    const loader = document.getElementById('loader');
    loader.style.display = 'flex';
    
    // Animation de progression aléatoire pour le loader
    const progress = document.querySelector('.progress');
    let width = 0;
    const progressInterval = setInterval(() => {
        width += Math.random() * 10;
        if (width >= 95) width = 95;
        progress.style.width = `${width}%`;
    }, 300);

    fetch(`https://javainhire-backend.onrender.com/api/offers?page=${page}`)
        .then(response => {
            if (!response.ok) throw new Error('Erreur réseau');
            return response.json();
        })
        .then(data => {
            clearInterval(progressInterval);
            loader.style.display = 'none';
            
            const offersList = document.getElementById('offers-list');
            offersList.innerHTML = '';

            data.content.forEach(offer => {
                const offerElement = document.createElement('div');
                offerElement.className = 'offer';
                offerElement.innerHTML = `
                    <h3><a href="${offer.link}" target="_blank">${offer.title}</a></h3>
                    <p>${offer.description}</p>
                    <p><strong>Source :</strong> <a href="https://empllo.com/" target="_blank">${offer.source}</a></p>
                    <a href="${offer.link}" target="_blank">👁️ Voir l'offre</a>
                    <button onclick="markAsFavorite(${offer.offerID})">❤️ Favoris</button>
                `;
                offersList.appendChild(offerElement);
            });

            document.getElementById('pageInfo').textContent = `Page ${page + 1}`;
        })
        .catch(error => {
            clearInterval(progressInterval);
            loader.style.display = 'none';
            console.error('Erreur:', error);
            offersList.innerHTML = `<p class="error-message">Erreur de chargement. Veuillez rafraîchir la page.</p>`;
        });
}

// Pagination
document.getElementById('nextPage').addEventListener('click', () => {
    currentPage++;
    loadOffers(currentPage);
});

document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        loadOffers(currentPage);
    }
});

// Charger les offres au démarrage
loadOffers(currentPage);

// Fonction pour marquer une offre comme favorite
function markAsFavorite(offerID) {
    fetch(`https://javainhire-backend.onrender.com/api/offers/${offerID}/favorite`, { method: 'POST' })
        .then(response => {
            if (response.ok) {
                alert('Offre marquée comme favorite !');
            }
        });
}
