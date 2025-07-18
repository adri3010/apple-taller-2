
const inputNombre = document.getElementById("nombre");
const inputCorreo = document.getElementById("correo");
const inputTarjeta = document.getElementById("tarjeta");
const inputVencimiento = document.getElementById("vencimiento");
const inputCVV = document.getElementById("cvv");
const btnEnviar = document.querySelector("form button");
const formulario = document.getElementById("formularioPago");


const mensajeExito = document.createElement("div");
mensajeExito.id = "registroExitoso";
formulario.appendChild(mensajeExito);


const crearError = (input) => {
  const error = document.createElement("div");
  error.className = "error";
  error.id = `error-${input.id}`;
  input.insertAdjacentElement("afterend", error);
};

[ inputNombre, inputCorreo, inputTarjeta, inputVencimiento, inputCVV ].forEach(crearError);



const validarNombre = () => {
  const error = document.getElementById("error-nombre");
  if (inputNombre.value.trim() === "") {
    error.textContent = "El nombre es obligatorio";
    return aplicarClase(inputNombre, false);
  } else {
    error.textContent = "";
    return aplicarClase(inputNombre, true);
  }
};

const validarCorreo = () => {
  const regex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
  const error = document.getElementById("error-correo");
  if (!regex.test(inputCorreo.value.trim())) {
    error.textContent = "Correo inválido";
    return aplicarClase(inputCorreo, false);
  } else {
    error.textContent = "";
    return aplicarClase(inputCorreo, true);
  }
};

const validarTarjeta = () => {
  const valor = inputTarjeta.value.replace(/\s/g, "");
  const error = document.getElementById("error-tarjeta");
  if (!/^\d{16}$/.test(valor)) {
    error.textContent = "La tarjeta debe tener 16 dígitos";
    return aplicarClase(inputTarjeta, false);
  } else {
    error.textContent = "";
    return aplicarClase(inputTarjeta, true);
  }
};

const validarVencimiento = () => {
  const valor = inputVencimiento.value;
  const error = document.getElementById("error-vencimiento");
  if (!valor) {
    error.textContent = "Fecha requerida";
    return aplicarClase(inputVencimiento, false);
  }
  const [año, mes] = valor.split("-");
  const hoy = new Date();
  const fechaIngresada = new Date(año, mes);
  if (fechaIngresada <= hoy) {
    error.textContent = "Fecha no válida";
    return aplicarClase(inputVencimiento, false);
  } else {
    error.textContent = "";
    return aplicarClase(inputVencimiento, true);
  }
};

const validarCVV = () => {
  const error = document.getElementById("error-cvv");
  if (!/^\d{3}$/.test(inputCVV.value.trim())) {
    error.textContent = "CVV inválido";
    return aplicarClase(inputCVV, false);
  } else {
    error.textContent = "";
    return aplicarClase(inputCVV, true);
  }
};


inputTarjeta.addEventListener("input", (e) => {
  let valor = e.target.value.replace(/\D/g, "");
  valor = valor.substring(0, 16);
  const bloques = valor.match(/.{1,4}/g);
  e.target.value = bloques ? bloques.join(" ") : "";
});


inputCVV.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/\D/g, "").substring(0, 3);
});

const aplicarClase = (elemento, valido) => {
  if (valido) {
    elemento.classList.remove("invalido");
    elemento.classList.add("valido");
  } else {
    elemento.classList.add("invalido");
    elemento.classList.remove("valido");
  }
  return valido;
};


const validarFormulario = () => {
  const ok =
    validarNombre() &&
    validarCorreo() &&
    validarTarjeta() &&
    validarVencimiento() &&
    validarCVV();

  btnEnviar.disabled = !ok;
  return ok;
};

[inputNombre, inputCorreo, inputTarjeta, inputVencimiento, inputCVV].forEach((input) => {
  input.addEventListener("input", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validarFormulario()) {
    mensajeExito.textContent = "Procesando pago...";
    setTimeout(() => {
      mensajeExito.textContent = "¡Pago exitoso! Gracias por tu compra.";
      formulario.reset();
      btnEnviar.disabled = true;
      document.querySelectorAll(".valido").forEach((e) => e.classList.remove("valido"));
    }, 1500);
  } else {
    mensajeExito.textContent = "Por favor, corrige los errores.";
  }
});
