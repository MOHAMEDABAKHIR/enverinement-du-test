// dashboard.js
const user = JSON.parse(localStorage.getItem("user"));
document.getElementById("welcome").textContent = `Bonjour ${user.username}`;
document.getElementById("profile-img").src = user.image;

const pages = await fetch("data/pages.json").then(r => r.json());
const status = await fetch("data/status.json").then(r => r.json());

pages.forEach(page => {
  const allValidated = page.sections.every(sec =>
    status[page.id][sec.id].validatedBy.includes(user.username)
  );
  const totalUsers = 7;
  const validatedCount = page.sections[0].id in status[page.id] 
    ? status[page.id][page.sections[0].id].validatedBy.length 
    : 0;

  const card = `
    <div class="card">
      <h3>${page.title}</h3>
      <p>Statut: <strong>${validatedCount === totalUsers ? '✅ Validé' : '🟡 En cours'}</strong></p>
      <a href="validation.html?page=${page.id}">Voir</a>
    </div>
  `;
  document.getElementById("page-cards").insertAdjacentHTML("beforeend", card);
});