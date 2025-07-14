const registros = []
let registroTemporal = {}

document.getElementById('formulario-servicio').addEventListener('submit', e => {
  e.preventDefault()

  const nombre = document.getElementById('campo-nombre').value.trim()
  const correo = document.getElementById('campo-correo').value.trim()
  const telefono = document.getElementById('campo-telefono').value.trim()
  const producto = document.getElementById('campo-producto').value.trim()
  const problema = document.getElementById('campo-problema').value.trim()
  const solicitud = document.getElementById('campo-solicitud').value.trim()

  document.getElementById('ver-nombre').textContent = nombre
  document.getElementById('ver-correo').textContent = correo
  document.getElementById('ver-telefono').textContent = telefono
  document.getElementById('ver-producto').textContent = producto
  document.getElementById('ver-problema').textContent = problema
  document.getElementById('ver-solicitud').textContent = solicitud

  registroTemporal = { nombre, correo, telefono, producto, problema, solicitud }

  mostrarVentana('ventana-confirmacion')
})

document.getElementById('boton-confirmar').addEventListener('click', () => {
  registros.push(registroTemporal)
  actualizarTabla()
  mostrarVentana('ventana-tabla')
})

document.getElementById('boton-editar').addEventListener('click', () => {
  mostrarVentana('ventana-registro')
})

function mostrarVentana(id) {
  document.querySelectorAll('.ventana').forEach(v => v.classList.remove('activa'))
  document.getElementById(id).classList.add('activa')
}

function actualizarTabla() {
  const cuerpoTabla = document.getElementById('cuerpo-tabla')
  cuerpoTabla.innerHTML = ''
  registros.forEach(r => {
    const fila = document.createElement('tr')
    fila.innerHTML = `
      <td>${r.nombre}</td>
      <td>${r.correo}</td>
      <td>${r.telefono}</td>
      <td>${r.producto}</td>
      <td>${r.problema}</td>
      <td>${r.solicitud}</td>
    `
    cuerpoTabla.appendChild(fila)
  })
}
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
