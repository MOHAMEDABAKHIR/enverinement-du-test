// history.js
let history = await fetch("data/history.json").then(r => r.json());

function renderHistory(list) {
  document.getElementById("history-list").innerHTML = list.map(h => `
    <div class="history-item">
      <img src="data/users.json" width="30" style="border-radius:50%"> <!-- Charger l'image via script -->
      <b>${h.user}</b> a ${h.action === 'validate' ? 'validé' : 'commenté'} 
      la section <i>${h.section}</i> de la page <i>${h.page}</i>
      le ${new Date(h.timestamp).toLocaleString()}
    </div>
  `).join("");
}

// Filtres
document.querySelectorAll("input, select").forEach(el => {
  el.addEventListener("input", () => {
    let filtered = history;
    const u = document.getElementById("filter-user").value;
    const a = document.getElementById("filter-action").value;
    const d = document.getElementById("filter-date").value;

    if (u) filtered = filtered.filter(h => h.user.includes(u));
    if (a) filtered = filtered.filter(h => h.action === a);
    if (d) filtered = filtered.filter(h => h.timestamp.startsWith(d));

    renderHistory(filtered);
  });
});

renderHistory(history);