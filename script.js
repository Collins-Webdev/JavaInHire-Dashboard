let currentPage = 0;

// Fonction pour charger les offres
function loadOffers(page) {
    fetch(`https://javainhire-backend.onrender.com/api/offers?page=${page}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur réseau');
            }
            return response.json();
        })
        .then(data => {
            const offersList = document.getElementById('offers-list');
            offersList.innerHTML = ''; // Effacer le contenu précédent

            data.content.forEach(offer => {
                const offerElement = document.createElement('div');
                offerElement.className = 'offer';
                offerElement.innerHTML = `
                    <h3>  <a href="${offer.link}" target="_blank">  ${offer.title}  </a> </h3>
                    <p>${offer.description}</p>
                    <p><strong>Source :</strong> <a href="https://empllo.com/" target="_blank"> ${offer.source}  </a> </p>
                    <a href="${offer.link}" target="_blank">👁️ Voir l'offre </a>
                    <button onclick="markAsFavorite(${offer.offerID})">❤️ Favoris</button>
                `;
                offersList.appendChild(offerElement);
            });

            // Mettre à jour la pagination
            document.getElementById('pageInfo').textContent = `Page ${page + 1}`;
        })
        .catch(error => {
            console.error('Erreur lors du chargement des offres :', error);
            alert('Erreur lors du chargement des offres. Voir la console pour plus de détails.');
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
