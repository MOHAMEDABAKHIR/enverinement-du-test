// validation.js
const urlParams = new URLSearchParams(window.location.search);
const pageId = urlParams.get("page");
const user = JSON.parse(localStorage.getItem("user"));

const pages = await fetch("data/pages.json").then(r => r.json());
const page = pages.find(p => p.id === pageId);

document.getElementById("page-title").textContent = page.title;

page.sections.forEach(sec => {
  const sectionStatus = status[pageId][sec.id];
  const isUserValidated = sectionStatus.validatedBy.includes(user.username);

  let btnHtml = !isUserValidated
    ? `<button onclick="validateSection('${pageId}', '${sec.id}')">Valider</button>`
    : `<button disabled>Déjà validé</button>`;

  const commentsHtml = sectionStatus.comments.map(c =>
    `<div class="comment"><b>${c.user}</b>: ${c.text} (${new Date(c.timestamp).toLocaleString()})</div>`
  ).join("");

  document.getElementById("sections").insertAdjacentHTML("beforeend", `
    <div class="section">
      <h4>${sec.title}</h4>
      <img src="${sec.image}" alt="${sec.title}" style="max-width:100%">
      ${btnHtml}
      <textarea id="comment-${sec.id}" placeholder="Ajouter un commentaire"></textarea>
      <button onclick="addComment('${pageId}', '${sec.id}')">Commenter</button>
      <div class="comments">${commentsHtml}</div>
    </div>
  `);
});

async function validateSection(pageId, secId) {
  const status = await loadJson("data/status.json");
  if (!status[pageId][secId].validatedBy.includes(user.username)) {
    status[pageId][secId].validatedBy.push(user.username);
    await saveJson("data/status.json", status);
    addHistory(user.username, "validate", pageId, secId);
    location.reload();
  }
}