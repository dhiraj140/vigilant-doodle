// script.js

function shuffle(array) {
    let current = array.length;
    while (current !== 0) {
        let random = Math.floor(Math.random() * current);
        current--;
        [array[current], array[random]] = [array[random], array[current]];
    }
    return array;
}

function runLottery() {
    if (applicants.length === 0) {
        alert("No applicants available.");
        return;
    }

    const shuffled = shuffle([...applicants]);
    const winner = shuffled[0];

    const flatIndex = Math.floor(Math.random() * availableFlats.length);
    const flatNo = availableFlats[flatIndex];

    const params = new URLSearchParams();
    params.set("winnerId", winner.id);
    params.set("flatNo", flatNo);

    window.location.href = "result.html?" + params.toString();
}

function populateApplicantsTable() {
    const tbody = document.getElementById("applicants-body");
    if (!tbody) return;

    tbody.innerHTML = "";

    applicants.forEach((app, idx) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${idx + 1}</td>
            <td>${app.applicationNo}</td>
            <td>${app.name}</td>
            <td><span class="category-badge">${app.category}</span></td>
        `;
        tbody.appendChild(tr);
    });

    const totalEl = document.getElementById("total-applicants");
    if (totalEl) totalEl.textContent = applicants.length;

    const homeTotal = document.getElementById("total-applicants-home");
    if (homeTotal) homeTotal.textContent = applicants.length;

    const homeFlats = document.getElementById("total-flats-home");
    if (homeFlats) homeFlats.textContent = availableFlats.length;
}

function showWinner() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("winnerId"));
    const flat = params.get("flatNo");

    if (!id || !flat) {
        document.getElementById("winner-name").textContent = "Error loading result";
        return;
    }

    const winner = applicants.find(a => a.id === id);
    if (!winner) {
        document.getElementById("winner-name").textContent = "Winner not found";
        return;
    }

    document.getElementById("winner-name").textContent     = winner.name;
    document.getElementById("flat-number").textContent     = flat;
    document.getElementById("winner-app-no").textContent   = winner.applicationNo;
    document.getElementById("winner-category").textContent = winner.category;

    document.getElementById("cert-winner-name").textContent   = winner.name;
    document.getElementById("cert-flat-number").textContent   = flat;
    document.getElementById("cert-winner-app-no").textContent = winner.applicationNo;

    const today = new Date().toLocaleDateString("en-IN", {
        day: "numeric", month: "long", year: "numeric"
    });
    document.getElementById("result-date").textContent = today;
    document.getElementById("cert-date").textContent   = today;
}

document.addEventListener("DOMContentLoaded", () => {
    populateApplicantsTable();

    if (document.getElementById("winner-name")) {
        showWinner();
    }
});
