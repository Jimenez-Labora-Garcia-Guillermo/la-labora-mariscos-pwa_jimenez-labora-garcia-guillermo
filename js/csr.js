// csr.js — Renderizado en el Cliente (CSR)
// "CSR" significa que el HTML llega casi vacío y es ESTE archivo JavaScript,
// ya corriendo en el navegador del usuario, quien construye el contenido.

// 1) Buscamos el contenedor vacío que dejamos en index.html
const contenedorCatalogo = document.getElementById("catalogo");

// Estado del catálogo: todos los productos y la categoría que se está viendo
let productosCatalogo = [];
let categoriaActiva = "Todos";

// Crea la tarjeta (<div class="producto">) de un producto, desde JavaScript puro
function crearTarjeta(producto) {
  const tarjeta = document.createElement("div");
  tarjeta.className = "producto";

  // usamos el propio objeto "producto" para llenar el texto (sin plantillas de servidor)
  tarjeta.innerHTML = `
    <img class="producto__foto" src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
    <strong>${producto.nombre}</strong>
    <span class="precio">$${producto.precio}</span>
    <p>Stock: ${producto.stock}</p>
    <button type="button" data-id="${producto.id}">Agregar al carrito</button>
  `;

  // conectamos el botón recién creado con la función agregarAlCarrito() de carrito.js
  tarjeta.querySelector("button").addEventListener("click", () => {
    agregarAlCarrito(producto);
  });

  return tarjeta;
}

// Dibuja el catálogo según la categoría activa:
//  - "Todos": los productos agrupados, con un título por cada categoría
//  - una categoría: solo los productos de esa categoría
function pintarCatalogo() {
  contenedorCatalogo.innerHTML = ""; // borra el esqueleto (o los productos anteriores)
  contenedorCatalogo.removeAttribute("aria-busy");
  let ultimaCategoria = null;

  productosCatalogo
    .filter((producto) => categoriaActiva === "Todos" || producto.categoria === categoriaActiva)
    .forEach((producto) => {
      if (categoriaActiva === "Todos" && producto.categoria !== ultimaCategoria) {
        const titulo = document.createElement("h3");
        titulo.className = "categoria-titulo";
        titulo.textContent = producto.categoria;
        contenedorCatalogo.appendChild(titulo);
        ultimaCategoria = producto.categoria;
      }
      contenedorCatalogo.appendChild(crearTarjeta(producto));
    });
}

// Crea la barra de botones de filtro (Todos + una por categoría) justo arriba del catálogo
function crearFiltros() {
  // las categorías salen del propio catalogo.json (sin repetir y en el mismo orden)
  const categorias = ["Todos", ...new Set(productosCatalogo.map((producto) => producto.categoria))];

  // el contenedor ya está en index.html (así su espacio queda reservado y la página no salta)
  const barra = document.getElementById("filtros-categoria");

  categorias.forEach((categoria) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.textContent = categoria;
    boton.dataset.categoria = categoria;
    boton.setAttribute("aria-pressed", categoria === categoriaActiva);
    barra.appendChild(boton);
  });

  // un solo listener para toda la barra (delegación de eventos)
  barra.addEventListener("click", (evento) => {
    const boton = evento.target.closest("button[data-categoria]");
    if (!boton) return;

    categoriaActiva = boton.dataset.categoria;
    barra.querySelectorAll("button").forEach((b) => {
      b.setAttribute("aria-pressed", b.dataset.categoria === categoriaActiva);
    });
    pintarCatalogo();
  });
}

// 2) fetch() le pide el archivo catalogo.json al servidor (aquí simula una API real).
//    fetch() devuelve una "promesa": un valor que llegará más adelante, no de inmediato.
fetch("catalogo.json")
  .then((respuesta) => respuesta.json()) // convierte el texto recibido en un array de objetos JS
  .then((productos) => {
    // 3) Ya tenemos los productos: guardamos la lista, creamos los filtros y dibujamos las tarjetas
    productosCatalogo = productos;
    crearFiltros();
    pintarCatalogo();
  })
  .catch((error) => {
    // si algo falla (por ejemplo, sin conexión y sin caché), avisamos en pantalla
    contenedorCatalogo.innerHTML = "<p>No se pudo cargar el catálogo. Intenta más tarde.</p>";
    console.error("Error al cargar catálogo:", error);
  });
