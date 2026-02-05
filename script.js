// script.js - Client-side lottery logic

function shuffle(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function runLottery() {
    if (applicants.length === 0) {
        alert("No applicants available");
        return;
    }

    const shuffled = shuffle(applicants);
    const winner = shuffled[0];
    
    const flatIndex = Math.floor(Math.random() * availableFlats.length);
    const flatNo = availableFlats[flatIndex];

    window.location.href = `result.html?winnerId=${winner.id}&flatNo=${encodeURIComponent(flatNo)}`;
}

function populateApplicantsTable() {
    const tbody = document.getElementById('applicants-body');
    if (!tbody) return;

    tbody.innerHTML = '';

    applicants.forEach((app, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${app.applicationNo}</td>
            <td>${app.name}</td>
            <td><span class="category-badge">${app.category}</span></td>
        `;
        tbody.appendChild(row);
    });
}

function displayWinner() {
    const params = new URLSearchParams(window.location.search);
    const winnerId = parseInt(params.get('winnerId'));
    const flatNo = params.get('flatNo');

    if (!winnerId || !flatNo) {
        document.getElementById('winner-name').textContent = "Error loading result";
        return;
    }

    const winner = applicants.find(a => a.id === winnerId);
    if (!winner) {
        document.getElementById('winner-name').textContent = "Winner data not found";
        return;
    }

    document.getElementById('winner-name').textContent = winner.name;
    document.getElementById('flat-number').textContent = flatNo;
    document.getElementById('winner-app-no').textContent = winner.applicationNo;
    document.getElementById('winner-category').textContent = winner.category;

    // Set result date
    const now = new Date();
    document.getElementById('result-date').textContent = now.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Populate applicant table if on index page
    if (document.getElementById('applicants-body')) {
        populateApplicantsTable();
        const totalEl = document.getElementById('total-applicants');
        if (totalEl) totalEl.textContent = applicants.length;
    }

    // Display winner if on result page
    if (document.getElementById('winner-name')) {
        displayWinner();
    }
});

