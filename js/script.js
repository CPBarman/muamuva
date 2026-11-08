// MUAMUVA Phase 1 — frontend interactions only. Django authentication comes in Phase 2.
const modal = document.getElementById("authModal");
const form = document.getElementById("authForm");
const nameFields = document.getElementById("nameFields");
const title = document.getElementById("authTitle");
const description = document.getElementById("authDescription");
const kicker = document.getElementById("authKicker");
const submit = document.getElementById("submitButton");
const switchText = document.getElementById("switchText");
const feedback = document.getElementById("feedback");
const password = document.getElementById("password");
let mode = "login";
let previousFocus = null;

document.getElementById("year").textContent = new Date().getFullYear();

function setMode(nextMode) {
  mode = nextMode;
  const signup = mode === "signup";
  title.textContent = signup ? "Create your account." : "Welcome back.";
  description.textContent = signup
    ? "A few details and your Muamuva space is ready to begin."
    : "Log in to continue to your Muamuva account.";
  kicker.textContent = signup ? "JOIN THE MUAMUVA COMMUNITY" : "YOUR SPACE STARTS HERE";
  nameFields.classList.toggle("visible", signup);
  document.getElementById("firstName").required = signup;
  document.getElementById("lastName").required = signup;
  document.getElementById("loginOptions").hidden = signup;
  submit.textContent = signup ? "Create account →" : "Log in →";
  switchText.innerHTML = signup
    ? 'Already have an account? <button class="text-button" type="button" data-switch="login">Log in</button>'
    : 'New to Muamuva? <button class="text-button" type="button" data-switch="signup">Create an account</button>';
  feedback.textContent = "";
}
function openModal(nextMode) {
  previousFocus = document.activeElement;
  form.reset();
  password.type = "password";
  document.getElementById("togglePassword").textContent = "Show";
  setMode(nextMode);
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  setTimeout(() => (nextMode === "signup" ? document.getElementById("firstName") : document.getElementById("identity")).focus(), 40);
}
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  form.reset();
  feedback.textContent = "";
  if (previousFocus) previousFocus.focus();
}
document.querySelectorAll("[data-auth]").forEach(button => button.addEventListener("click", () => openModal(button.dataset.auth)));
modal.addEventListener("click", event => { if (event.target.matches("[data-close]")) closeModal(); });
document.addEventListener("click", event => {
  const switchButton = event.target.closest("[data-switch]");
  if (switchButton) {
    setMode(switchButton.dataset.switch);
    (mode === "signup" ? document.getElementById("firstName") : document.getElementById("identity")).focus();
  }
});
document.addEventListener("keydown", event => { if (event.key === "Escape" && modal.classList.contains("open")) closeModal(); });
document.getElementById("togglePassword").addEventListener("click", () => {
  const reveal = password.type === "password";
  password.type = reveal ? "text" : "password";
  document.getElementById("togglePassword").textContent = reveal ? "Hide" : "Show";
});
document.getElementById("forgot").addEventListener("click", () => {
  feedback.textContent = "Password recovery will be available after the Django backend is connected.";
});
form.addEventListener("submit", event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  feedback.textContent = mode === "signup"
    ? "Registration form looks good. Real account creation will be enabled in Phase 2."
    : "Login form looks good. Real credential verification will be enabled in Phase 2.";
});
const nav = document.getElementById("nav");
const menuToggle = document.getElementById("menuToggle");
menuToggle.addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));
