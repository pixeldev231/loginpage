function registrar() {
    const email = document.querySelector(".email").value;
    const senha = document.querySelector(".password").value;

    if (!email || !senha) {
        alert("Preencha email e senha");
        return;
    }

    // salva no navegador
    localStorage.setItem("user_email", email);
    localStorage.setItem("user_senha", senha);

    alert("Registrado com sucesso!");
}

function login() {
    const email = document.querySelector(".email").value;
    const senha = document.querySelector(".password").value;

    const emailSalvo = localStorage.getItem("user_email");
    const senhaSalva = localStorage.getItem("user_senha");

    if (email === emailSalvo && senha === senhaSalva) {
        alert("Login OK ✅");
        window.location.href = "home.html"; // página depois do login
    } else {
        alert("Email ou senha incorretos ❌");
    }
}