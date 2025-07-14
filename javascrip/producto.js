function buscarProducto(event) {
  event.preventDefault();

  const input = document.getElementById('busqueda').value.trim().toLowerCase();
  const productos = document.querySelectorAll('.producto');

  let encontrado = false;

  productos.forEach(producto => {
    producto.classList.remove('resaltado');

    const nombre = producto.querySelector('h2').textContent.toLowerCase();
    if (nombre.includes(input)) {
      producto.scrollIntoView({ behavior: "smooth", block: "center" });
      producto.classList.add('resaltado');
      encontrado = true;
    }
  });

  if (!encontrado) {
    alert("Producto no encontrado.");
  }
}