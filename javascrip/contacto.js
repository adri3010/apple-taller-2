document.addEventListener("DOMContentLoaded", () => {
  const img = document.getElementById('imagen')

  const imagenUno = () => img.src = '/img/iphoneimagendinamica.webp'
  const imagenDos = () => img.src = '/img/imagendinamicacuatro.jpg'
  const imagenTres = () => img.src = '/img/imagendinamicaseis.jpg'

  img.addEventListener('mouseover', imagenDos)
  img.addEventListener('mouseout', imagenUno)
  img.addEventListener('click', imagenTres)

  const formulario = document.getElementById("formulario")
  const tabla = document.getElementById("cuerpo-tabla")
  const botonEnviar = document.getElementById("botonenviar")
  const registroExitoso = document.getElementById("registrosexitoso")

  const campos = {
    nombre: document.getElementById("campoNombre"),
    apellido: document.getElementById("campoApellido"),
    correo: document.getElementById("campoCorreo"),
    telefono: document.getElementById("campoTelefono"),
    direccion: document.getElementById("campoDireccion"),
    dispositivo: document.getElementById("campoDispositivo"),
    mensaje: document.getElementById("campoMensaje"),
    solicitud: document.getElementById("campoSolicitud")
  }

  const errores = {
    nombre: document.getElementById("errornombre"),
    apellido: document.getElementById("errorapellido"),
    correo: document.getElementById("erroremail"),
    telefono: document.getElementById("errortelefono"),
    direccion: document.getElementById("errordireccion"),
    dispositivo: document.getElementById("errortipodedispositivo"),
    mensaje: document.getElementById("errormensaje"),
    solicitud: document.getElementById("errorSolicitud")
  }

  const validarCampo = (id, validacion, mensajeError) => {
    const campo = campos[id]
    const error = errores[id]
    const valor = campo.value.trim()

    if (!validacion(valor)) {
      campo.classList.add("invalido")
      campo.classList.remove("valido")
      error.textContent = mensajeError
      return false
    }

    campo.classList.add("valido")
    campo.classList.remove("invalido")
    error.textContent = ""
    return true
  }

  const validarFormulario = () =>
    validarCampo("nombre", val => val !== "", "El nombre es obligatorio") &&
    validarCampo("apellido", val => val !== "", "El apellido es obligatorio") &&
    validarCampo("correo", val => /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val), "Correo electrónico inválido") &&
    validarCampo("telefono", val => /^\d{10}$/.test(val), "El teléfono debe tener 10 números") &&
    validarCampo("direccion", val => /.+\s+(y|e|entre|,)\s+.+/i.test(val), "Dirección incompleta") &&
    validarCampo("dispositivo", val => val.length >= 3, "Escribe el tipo de dispositivo") &&
    validarCampo("mensaje", val => val.length >= 10, "El mensaje debe tener al menos 10 caracteres") &&
    validarCampo("solicitud", val => val.length >= 8, "La solicitud debe tener al menos 8 caracteres")

  Object.values(campos).forEach(input => {
    input.addEventListener("input", () => {
      botonEnviar.disabled = !validarFormulario()
    })
  })

  formulario.addEventListener("submit", e => {
    e.preventDefault()

    if (!validarFormulario()) {
      registroExitoso.textContent = "completa correctamente los compos"
      return
    }

    const fila = document.createElement("tr")
    fila.innerHTML = `
      <td>${campos.nombre.value.trim()}</td>
      <td>${campos.apellido.value.trim()}</td>
      <td>${campos.correo.value.trim()}</td>
      <td>${campos.telefono.value.trim()}</td>
      <td>${campos.dispositivo.value.trim()}</td>
      <td>${campos.mensaje.value.trim()}</td>
      <td>${campos.solicitud.value.trim()}</td>
    `
    tabla.appendChild(fila)

    registroExitoso.textContent = "registro existoso"
    formulario.reset()
    Object.values(campos).forEach(el => el.classList.remove("valido"))
    botonEnviar.disabled = true
  })
})
