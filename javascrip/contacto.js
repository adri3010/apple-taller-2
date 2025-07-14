document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario-registro");

  const campoNombre = document.getElementById("campo-nombre");
  const campoCorreo = document.getElementById("campo-correo");
  const campoTelefono = document.getElementById("campo-telefono");
  const campoAsunto = document.getElementById("campo-asunto");
  const campoMensaje = document.getElementById("campo-mensaje");

  const confirmarNombre = document.getElementById("confirmar-nombre");
  const confirmarCorreo = document.getElementById("confirmar-correo");
  const confirmarTelefono = document.getElementById("confirmar-telefono");
  const confirmarAsunto = document.getElementById("confirmar-asunto");
  const confirmarMensaje = document.getElementById("confirmar-mensaje");

  const botonConfirmar = document.getElementById("boton-confirmar");
  const botonEditar = document.getElementById("boton-editar");

  const ventanaRegistro = document.getElementById("ventana-registro");
  const ventanaConfirmacion = document.getElementById("ventana-confirmacion");
  const ventanaTabla = document.getElementById("ventana-tabla");

  const cuerpoTabla = document.getElementById("cuerpo-tabla");

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = campoNombre.value.trim();
    const correo = campoCorreo.value.trim();
    const telefono = campoTelefono.value.trim();
    const asunto = campoAsunto.value.trim();
    const mensaje = campoMensaje.value.trim();

    if (nombre && correo && telefono && asunto && mensaje) {
      confirmarNombre.textContent = nombre;
      confirmarCorreo.textContent = correo;
      confirmarTelefono.textContent = telefono;
      confirmarAsunto.textContent = asunto;
      confirmarMensaje.textContent = mensaje;

      ventanaRegistro.classList.remove("activa");
      ventanaConfirmacion.classList.add("activa");
    }
  });

  botonEditar.addEventListener("click", () => {
    ventanaConfirmacion.classList.remove("activa");
    ventanaRegistro.classList.add("activa");
  });

  botonConfirmar.addEventListener("click", () => {
    const nuevaFila = document.createElement("tr");

    nuevaFila.innerHTML = `
      <td>${confirmarNombre.textContent}</td>
      <td>${confirmarCorreo.textContent}</td>
      <td>${confirmarTelefono.textContent}</td>
      <td>${confirmarAsunto.textContent}</td>
      <td>${confirmarMensaje.textContent}</td>
    `;

    cuerpoTabla.appendChild(nuevaFila);

    ventanaConfirmacion.classList.remove("activa");
    ventanaTabla.classList.add("activa");

    formulario.reset();
  });

  const enlacesVentana = document.querySelectorAll("a[data-ventana]");

  enlacesVentana.forEach((enlace) => {
    enlace.addEventListener("click", (e) => {
      e.preventDefault();
      const destino = enlace.getAttribute("data-ventana");

      document.querySelectorAll(".ventana").forEach((ventana) => {
        ventana.classList.remove("activa");
      });

      const ventanaDestino = document.getElementById(destino);
      if (ventanaDestino) {
        ventanaDestino.classList.add("activa");
      }
    });
  });
});
document.querySelectorAll('a[data-ventana]').forEach(enlace => {
  enlace.addEventListener('click', e => {
    e.preventDefault()
    const idVentana = enlace.getAttribute('data-ventana')

  
    document.querySelectorAll('.ventana').forEach(ventana => {
      ventana.classList.remove('activa')
    })

    const ventanaMostrar = document.getElementById(idVentana)
    if (ventanaMostrar) ventanaMostrar.classList.add('activa')
  })
})

