// Cada uno de los artículo irá aquí
const productos = [
    { 
        id: 1, 
        nombre: "iPhone 16 Pro Max", 
        precio: 1619, 
        imagen: "https://sv.tiendasishop.com/cdn/shop/files/IMG-14858911_f2649c22-042e-43e0-a679-a527de575775.jpg?v=1731708368",
        descripcion: "Pantalla Super Retina XDR OLED LTPO" 
    },
    { 
        id: 2, 
        nombre: "Samsung Galaxy S25 Ultra", 
        precio: 1379, 
        imagen: "https://www.radioshackla.com/media/catalog/product/4/6/468749100014_2_.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:",
        descripcion: "Cámara de 200MP y procesador Snapdragon 8 Elite" 
    },
    { 
        id: 3, 
        nombre: "Google Pixel 9 Pro", 
        precio: 1477, 
        imagen: "https://rukminim2.flixcart.com/image/704/844/xif0q/mobile/q/b/g/-original-imah3zznscgh3fgk.jpeg?q=90&crop=false",
        descripcion: "Absolutamente todo integrado y hecho para la IA" 
    },
    { 
        id: 4, 
        nombre: "Xiaomi 13T Pro", 
        precio: 631, 
        imagen: "https://techzone.com.sv/wp-content/uploads/2024/01/4-1.webp",
        descripcion: "Pantalla AMOLED de 120Hz y carga rápida de 120W" 
    },
    { 
        id: 5, 
        nombre: "OnePlus 11", 
        precio: 871, 
        imagen: "https://m.media-amazon.com/images/I/71K84j2O8wL._UF1000,1000_QL80_.jpg",
        descripcion: "Procesador Snapdragon 8 Gen 2 y lente óptico Hasselblad" 
    },
    { 
        id: 6, 
        nombre: "Motorola Edge 40", 
        precio: 599, 
        imagen: "https://riiing.com.ar/wp-content/uploads/2023/09/Moto-Edge-40-1024x1024.png",
        descripcion: "Diseño delgado y pantalla pOLED de 144Hz" 
    },
    { 
        id: 7, 
        nombre: "Huawei P60 Pro", 
        precio: 899, 
        imagen: "https://m.media-amazon.com/images/I/5164NoUSjgL._AC_SL1000_.jpg",
        descripcion: "Cámara ultra vision y pantalla LTPO OLED" 
    },
    { 
        id: 8, 
        nombre: "Realme GT 3", 
        precio: 545, 
        imagen: "https://www.ubuy.sv/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvMzF6eHlheno0UkwuX1NTNDAwXy5qcGc.jpg",
        descripcion: "Carga de 240W y pantalla AMOLED de 144Hz" 
    },
    { 
        id: 9, 
        nombre: "Oppo Find X5", 
        precio: 847, 
        imagen: "https://images-cdn.ubuy.ma/659f39bcd8451128ed421a18-oppo-find-x5-pro-5g-6-7-034.jpg",
        descripcion: "Cámaras MariSilicon X y diseño cerámico" 
    },
    { 
        id: 10, 
        nombre: "RECOMENDACIÓN - Nothing Phone 2", 
        precio: 700, 
        imagen: "https://m.media-amazon.com/images/I/71hsuRTQ29L.jpg",
        descripcion: "Diseño transparente con LED Glyph Interface" 
    }
];

// Declaramos las variables globales
let carrito = [];
const DOM = {
    productos: document.getElementById('productos'),
    carrito: document.getElementById('lista-carrito'),
    total: document.getElementById('total'),
    vaciarBtn: document.getElementById('vaciar-carrito')
};

// Esta es nuestra función principal
function init() {
    renderizarProductos();
    cargarCarrito();
    DOM.vaciarBtn.addEventListener('click', vaciarCarrito);
}

// Aquí renderizamos los productos
function renderizarProductos() {
    DOM.productos.innerHTML = '';
    
    productos.forEach(producto => {
        const div = document.createElement('div');
        div.className = 'producto';
        div.innerHTML = `
            <div class="img-container">
                <img src="${producto.imagen}" alt="${producto.nombre}">
            </div>
            <div class="info">
                <h3>${producto.nombre}</h3>
                <p class="descripcion">${producto.descripcion}</p>
                <p class="precio">$${producto.precio}</p>
                <button class="btn-add" data-id="${producto.id}">Añadir al carrito</button>
            </div>
        `;
        DOM.productos.appendChild(div);
    });

    // Hacemos la delegación de evento para los botones
    DOM.productos.addEventListener('click', e => {
        if (e.target.classList.contains('btn-add')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            agregarAlCarrito(id);
        }
    });
}

// Especificamos las funciones del carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const existe = carrito.some(item => item.id === id);

    if (existe) {
        carrito = carrito.map(item => 
            item.id === id ? {...item, cantidad: item.cantidad + 1} : item
        );
    } else {
        carrito.push({...producto, cantidad: 1});
    }

    guardarCarrito();
    renderizarCarrito();
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarCarrito();
    renderizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    renderizarCarrito();
}

function renderizarCarrito() {
    DOM.carrito.innerHTML = '';

    if (carrito.length === 0) {
        DOM.carrito.innerHTML = '<li class="vacio">Tu carrito está vacío</li>';
        DOM.total.textContent = '0';
        return;
    }

    carrito.forEach(item => {
        const li = document.createElement('li');
        li.className = 'item-carrito';
        li.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}">
            <div class="detalles">
                <h4>${item.nombre}</h4>
                <p>$${item.precio} x ${item.cantidad}</p>
            </div>
            <button class="btn-remove" data-id="${item.id}">Quitar del carrito</button>
        `;
        DOM.carrito.appendChild(li);
    });

    // Se hace el cálculo total por los teléfonos en el carrito
    const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    DOM.total.textContent = total;

    // hacemos los event listeners para los botones de quitar
    document.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = parseInt(e.target.getAttribute('data-id'));
            eliminarDelCarrito(id);
        });
    });
}

// Funciones de almacenamiento local (para visualizar en el carrito y se guarden)
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        renderizarCarrito();
    }
}

// Inicializa
document.addEventListener('DOMContentLoaded', init);