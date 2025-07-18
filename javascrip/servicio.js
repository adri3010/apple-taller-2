const registros = []

document.getElementById('formulario-servicio').addEventListener('submit', e => {
  e.preventDefault()

  const nombre = document.getElementById('campo-nombre').value.trim()
  const correo = document.getElementById('campo-correo').value.trim()
  const telefono = document.getElementById('campo-telefono').value.trim()
  const fecha = document.getElementById('campo-fecha').value
  const producto = document.getElementById('campo-producto').value.trim()
  const problema = document.getElementById('campo-problema').value.trim()
  const solicitud = document.getElementById('campo-solicitud').value.trim()

 
  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)
  if (!correoValido) {
    alert("Por favor, ingresa un correo electrónico válido.")
    return
  }


  const telefonoValido = /^\d{10}$/.test(telefono)
  if (!telefonoValido) {
    alert("El teléfono debe tener exactamente 10 dígitos numéricos.")
    return
  }


  if (!nombre || !fecha || !producto || !problema || !solicitud) {
    alert("Por favor, completa todos los campos obligatorios.")
    return
  }

  const nuevoRegistro = {nombre,correo,telefono,fecha,producto,problema,solicitud
  }

  registros.push(nuevoRegistro)
  actualizarTabla()
  e.target.reset()
})

function actualizarTabla() {
  const cuerpoTabla = document.getElementById('cuerpo-tabla')
  cuerpoTabla.innerHTML = ''
  registros.forEach(r => {
    const fila = document.createElement('tr')
    fila.innerHTML = `
      <td>${r.nombre}</td>
      <td>${r.correo}</td>
      <td>${r.telefono}</td>
      <td>${r.fecha}</td>
      <td>${r.producto}</td>
      <td>${r.problema}</td>
      <td>${r.solicitud}</td>
    `
    cuerpoTabla.appendChild(fila)
  })
}
