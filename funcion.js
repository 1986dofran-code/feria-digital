import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAmEH-RAY_Hq6VLfF9fnYS5z3mKe2dx0yo",
  authDomain: "feria-digital-d2a98.firebaseapp.com",
  projectId: "feria-digital-d2a98",
  storageBucket: "feria-digital-d2a98.appspot.com",
  messagingSenderId: "902434509262",
  appId: "1:902434509262:web:dd75664ca494bf5651db9f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const $ = (id) => document.getElementById(id);

function setMessage(id, text, color) {
  const element = $(id);
  if (!element) {
    return;
  }

  element.textContent = text;
  element.style.color = color;
}

function clearMessage(id) {
  const element = $(id);
  if (element) {
    element.textContent = "";
  }
}

function traducirError(codigo) {
  switch (codigo) {
    case "auth/email-already-in-use":
      return "Este correo ya está registrado";
    case "auth/invalid-email":
      return "Correo inválido";
    case "auth/weak-password":
      return "Contraseña muy débil";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Correo o contraseña incorrectos";
    default:
      return "Error: " + codigo;
  }
}

window.mostrarInicio = function () {
  const panel = $("inicioPanel");
  if (!panel) {
    return;
  }

  const opening = panel.classList.contains("oculto");
  panel.classList.toggle("oculto");

  if (opening) {
    window.mostrarLogin();
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

window.mostrarRegistro = function () {
  $("registroForm")?.classList.remove("oculto");
  $("loginForm")?.classList.add("oculto");
  clearMessage("mensajeRegistro");
  clearMessage("mensajeLogin");
  $("regNombre")?.focus();
};

window.mostrarLogin = function () {
  $("loginForm")?.classList.remove("oculto");
  $("registroForm")?.classList.add("oculto");
  clearMessage("mensajeRegistro");
  clearMessage("mensajeLogin");
  $("loginEmail")?.focus();
};

window.registrarUsuario = async function () {
  const nombre = $("regNombre")?.value.trim() ?? "";
  const email = $("regEmail")?.value.trim() ?? "";
  const pass = $("regPass")?.value ?? "";

  if (!nombre || !email || !pass) {
    setMessage("mensajeRegistro", "Completa todos los campos", "red");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    await sendEmailVerification(userCredential.user);

    setMessage("mensajeRegistro", "Cuenta creada 🎉 Revisa tu correo", "green");
    $("registroForm")?.reset();
  } catch (error) {
    setMessage("mensajeRegistro", traducirError(error.code), "red");
  }
};

window.iniciarSesion = async function () {
  const email = $("loginEmail")?.value.trim() ?? "";
  const pass = $("loginPass")?.value ?? "";

  if (!email || !pass) {
    setMessage("mensajeLogin", "Completa correo y contraseña", "red");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, pass);
    setMessage("mensajeLogin", "Inicio de sesión exitoso", "green");
    $("loginForm")?.reset();
  } catch (error) {
    setMessage("mensajeLogin", traducirError(error.code), "red");
  }
};

window.verMas = function (id) {
  $(id)?.classList.toggle("oculto");
};

const registroForm = $("registroForm");
if (registroForm) {
  registroForm.addEventListener("submit", (event) => {
    event.preventDefault();
    window.registrarUsuario();
  });
}

const loginForm = $("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    window.iniciarSesion();
  });
}

const formulario = $("formulario");
if (formulario) {
  formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = $("nombre")?.value.trim() ?? "";
    const celular = $("celular")?.value.trim() ?? "";
    const correo = $("email")?.value.trim() ?? "";
    const mensaje = $("mensaje")?.value.trim() ?? "";

    if (!nombre) {
      setMessage("respuesta", "El nombre es obligatorio", "red");
      return;
    }

    if (!/^[0-9]{10,15}$/.test(celular)) {
      setMessage("respuesta", "El celular debe tener entre 10 y 15 números", "red");
      return;
    }

    if (!correo) {
      setMessage("respuesta", "El correo es obligatorio", "red");
      return;
    }

    if (mensaje.length < 10) {
      setMessage("respuesta", "El mensaje debe tener mínimo 10 caracteres", "red");
      return;
    }

    setMessage("respuesta", "¡Mensaje enviado! Pronto nos pondremos en contacto.", "green");
    formulario.reset();
  });
}
