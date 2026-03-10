/**
 * Configuración de selectores para evitar repeticiones
 */
const SELECTORES = {
  formulario: "formulario",
  respuesta: "respuesta",
  inputs: {
    nombre: "nombre",
    celular: "celular",
    mensaje: "mensaje"
  }
};

/**
 * Muestra u oculta un elemento alternando su visibilidad.
 * @param {string} id - El ID del elemento a manipular.
 */
const toggleInfo = (id) => {
  const elemento = document.getElementById(id);
  if (!elemento) return;

  const estaVisible = elemento.style.display === "block";
  elemento.style.display = estaVisible ? "none" : "block";
  
  console.log(`Información ${estaVisible ? "oculta" : "mostrada"}`);
};

/**
 * Lógica de validación de formulario
 */
const handleFormSubmit = (e) => {
  e.preventDefault();

  // Referencias a los elementos
  const form = e.target;
  const respuesta = document.getElementById(SELECTORES.respuesta);
  
  // Obtención de valores
  const values = {
    nombre: form[SELECTORES.inputs.nombre].value.trim(),
    celular: form[SELECTORES.inputs.celular].value.trim(),
    mensaje: form[SELECTORES.inputs.mensaje].value.trim()
  };

  // Validaciones (Estrategia de cláusulas de guarda)
  if (!values.nombre) {
    updateResponse(respuesta, "El nombre es obligatorio", "red");
    return;
  }

  if (!/^\d{10}$/.test(values.celular)) {
    updateResponse(respuesta, "El celular debe tener 10 dígitos", "red");
    return;
  }

  if (values.mensaje.length < 10) {
    updateResponse(respuesta, "Mensaje mínimo 10 caracteres", "red");
    return;
  }

  // Éxito
  updateResponse(respuesta, "Mensaje enviado correctamente ✅", "green");
  form.reset(); // Opcional: limpia el formulario al terminar
};

/**
 * Función auxiliar para actualizar el mensaje de respuesta
 */
const updateResponse = (elemento, mensaje, color) => {
  elemento.textContent = mensaje;
  elemento.style.color = color;
  console.log(`Validación: ${mensaje}`);
};

// --- Inicialización de Eventos ---
document.getElementById(SELECTORES.formulario)?.addEventListener("submit", handleFormSubmit);