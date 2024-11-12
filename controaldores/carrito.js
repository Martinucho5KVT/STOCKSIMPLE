class Carrito {
    constructor() {
        this.carrito = [];
        this.cargarCarritoDesdeLocalStorage();
    }

    // Función para agregar un producto al carrito
    agregarAlCarrito(producto) {
        const existe = this.carrito.find(item => item.modelo === producto.modelo);
        if (existe) {
            existe.cantidad += 1;
        } else {
            producto.cantidad = 1;
            this.carrito.push(producto);
        }
        this.actualizarCarritoLocalStorage();
    }

    // Función para obtener el contenido del carrito
    obtenerCarrito() {
        return this.carrito;
    }

    // Función para obtener el total del carrito
    obtenerTotal() {
        return this.carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
    }

    // Función para actualizar el carrito en el almacenamiento local
    actualizarCarritoLocalStorage() {
        localStorage.setItem("carrito", JSON.stringify(this.carrito));
    }

    // Cargar el carrito desde el almacenamiento local
    cargarCarritoDesdeLocalStorage() {
        const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
        if (carritoGuardado) {
            this.carrito = carritoGuardado;
        }
    }
}

// Exportamos la clase como una única función
export default Carrito;