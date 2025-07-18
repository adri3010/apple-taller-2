  const firebaseConfig = {
    apiKey: "AIzaSyCspI0VsYLHksmf5WXowYOiGpNbmI2Abgc",
    authDomain: "apple-6e3d1.firebaseapp.com",
    projectId: "apple-6e3d1",
    storageBucket: "apple-6e3d1.firebasestorage.app",
    messagingSenderId: "249542350977",
    appId: "1:249542350977:web:da5efb23d1433f95541580",
    measurementId: "G-890TBMF2WB"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const agregarProducto = async (nombre, precio) => {
  try {
    await db.collection("carrito").add({ nombre, precio });
    await cargarCarrito();
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
  }
};

const cargarCarrito = async () => {
  const lista = document.getElementById('carrito');
  lista.innerHTML = "";

  let total = 0;
  const productos = await db.collection("carrito").get();

  productos.forEach(doc => {
    const item = doc.data();
    total += item.precio;
    const li = document.createElement('li');
    li.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = "Eliminar";
    btnEliminar.style.marginLeft = "10px";
    btnEliminar.addEventListener('click', async () => {
      try {
        await db.collection("carrito").doc(doc.id).delete();
        await cargarCarrito();
      } catch (error) {
        console.error("Error al eliminar producto del carrito:", error);
      }
    });

    li.appendChild(btnEliminar);
    lista.appendChild(li);
  });

  const totalCompra = document.getElementById('totalCompra');
  if (!totalCompra) {
    const nuevototal = document.createElement("p");
    nuevototal.id = "totalCompra";
    nuevototal.textContent = `Total: $${total.toFixed(2)}`;
    lista.parentElement.appendChild(nuevototal);
  } else {
    totalCompra.textContent = `Total: $${total.toFixed(2)}`;
  }
};


document.getElementById('botoniphone15pro').addEventListener('click', () => agregarProducto("iPhone 15 Pro Max", 1199));
document.getElementById('botoniphonese').addEventListener('click', () => agregarProducto("iPhone SE (2022)", 429));
document.getElementById('botonmacbookairm3').addEventListener('click', () => agregarProducto("MacBook Air M3", 1099));
document.getElementById('botonmacbookprom3').addEventListener('click', () => agregarProducto("MacBook Pro M3", 1599));
document.getElementById('botonimacm3').addEventListener('click', () => agregarProducto("iMac M3 (24\")", 1299));
document.getElementById('botonipadairm2').addEventListener('click', () => agregarProducto("iPad Air M2", 599));
document.getElementById('botonipadprom5').addEventListener('click', () => agregarProducto("iPad Pro M4", 999));
document.getElementById('botonwatchseries9').addEventListener('click', () => agregarProducto("Apple Watch Series 9", 399));
document.getElementById('botonairpodspro2').addEventListener('click', () => agregarProducto("AirPods Pro (2da Gen)", 249));

// Filtro de búsqueda
document.addEventListener("DOMContentLoaded", () => {
  cargarCarrito();

  const buscador = document.getElementById("buscador");
  const productos = document.querySelectorAll("#productos > div");

  buscador.addEventListener("input", () => {
    const texto = buscador.value.toLowerCase();
    productos.forEach(producto => {
      const nombre = producto.querySelector("p").textContent.toLowerCase();
      producto.style.display = nombre.includes(texto) ? "block" : "none";
    });
  });
});

document.getElementById("confirmarCompra").addEventListener("click", async () => {
  try {
    const carrito = await db.collection("carrito").get();

    if (carrito.empty) {
      alert("Tu carrito está vacío.");
      return;
    }

    const productos = [];
    let total = 0;

    carrito.forEach(doc => {
      const data = doc.data();
      productos.push(data);
      total += data.precio;
    });


    await db.collection("ventas").add({
      productos,
      total,
      fecha: new Date()
    });

    const batch = db.batch();
    carrito.forEach(doc => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    await cargarCarrito();
    alert("¡Compra confirmada con éxito!");
  } catch (error) {
    console.error("Error al confirmar compra:", error);
    alert("Ocurrió un error al confirmar la compra.");
  }
});
