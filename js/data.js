// Charger les données JSON
export async function loadUsers() {
  return fetch('data/users.json').then(r => r.json());
}

export async function loadPages() {
  return fetch('data/pages.json').then(r => r.json());
}

// Charger ou initialiser status
export async function loadStatus() {
  const cached = localStorage.getItem('validationStatus');
  if (cached) return JSON.parse(cached);

  const res = await fetch('data/status.json').then(r => r.json());
  localStorage.setItem('validationStatus', JSON.stringify(res));
  return res;
}

// Sauvegarder le statut
export async function saveStatus(data) {
  localStorage.setItem('validationStatus', JSON.stringify(data));
}

// Charger ou initialiser historique
export async function loadHistory() {
  const cached = localStorage.getItem('actionHistory');
  if (cached) return JSON.parse(cached);

  const res = await fetch('data/history.json').then(r => r.json());
  localStorage.setItem('actionHistory', JSON.stringify(res));
  return res;
}

// Ajouter une action à l'historique
export async function addHistory(user, action, page, section, text = null) {
  const history = await loadHistory();
  const entry = {
    user,
    action,
    page,
    section,
    timestamp: new Date().toISOString()
  };
  if (text) entry.text = text;
  history.push(entry);
  localStorage.setItem('actionHistory', JSON.stringify(history));
}