function mostrarMsg(texto, ok=true) {
    const m = document.getElementById("msg");
    m.innerText = texto;
    m.style.color = ok ? "green" : "red";
}

async function registrar() {
    const email = document.querySelector(".email").value;
    const senha = document.querySelector(".password").value;

    const r = await fetch("http://localhost:3000/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
    });

    const t = await r.text();
    mostrarMsg(t, r.ok);
}

async function login() {
    const email = document.querySelector(".email").value;
    const senha = document.querySelector(".password").value;

    const r = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
    });

    const t = await r.text();
    mostrarMsg(t, r.ok);

    if (r.ok) {
        setTimeout(() => {
            window.location.href = "home.html";
        }, 800);
    }
}