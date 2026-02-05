function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function runLottery() {
  if (!applicants?.length) {
    alert("No applicants available");
    return;
  }

  const shuffled = shuffle(applicants);
  const winner = shuffled[0];
  const flat = availableFlats[Math.floor(Math.random() * availableFlats.length)];

  const params = new URLSearchParams({ id: winner.id, flat });
  location.href = `result.html?${params}`;
}

function renderApplicants() {
  const tbody = document.getElementById("applicant-table-body");
  if (!tbody) return;

  tbody.innerHTML = applicants
    .map((app, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${app.applicationNo}</td>
        <td>${app.name}</td>
        <td><span class="tag">${app.category}</span></td>
      </tr>
    `)
    .join("");

  document.getElementById("total-applicants")?.replaceChildren(applicants.length);
}

function renderStats() {
  document.getElementById("stats-applicants")?.replaceChildren(applicants.length);
  document.getElementById("stats-flats")?.replaceChildren(availableFlats.length);
}

function showResult() {
  const params = new URLSearchParams(location.search);
  const id = Number(params.get("id"));
  const flat = params.get("flat");

  if (!id || !flat) {
    document.getElementById("winner-name").textContent = "Error loading result";
    return;
  }

  const winner = applicants.find(a => a.id === id);
  if (!winner) {
    document.getElementById("winner-name").textContent = "Winner not found";
    return;
  }

  // Screen display
  document.getElementById("winner-name").textContent     = winner.name;
  document.getElementById("flat-number").textContent     = flat;
  document.getElementById("winner-app-no").textContent   = winner.applicationNo;
  document.getElementById("winner-category").textContent = winner.category;

  // Certificate
  document.getElementById("cert-winner-name").textContent   = winner.name;
  document.getElementById("cert-flat-number").textContent   = flat;
  document.getElementById("cert-winner-app-no").textContent = winner.applicationNo;

  const dateStr = new Date().toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric"
  });

  document.getElementById("result-date").textContent = dateStr;
  document.getElementById("cert-date").textContent   = dateStr;
}

document.addEventListener("DOMContentLoaded", () => {
  renderApplicants();
  renderStats();
  if (document.querySelector(".result-box")) showResult();
});
