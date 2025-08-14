async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const encodedPass = btoa(password);

  const users = await fetch("data/users.json").then(r => r.json());
  const user = users.find(u => u.username === username && u.password === encodedPass);

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "dashboard.html";
  } else {
    alert("Identifiant ou mot de passe incorrect");
  }
}