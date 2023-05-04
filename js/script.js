//Productos Tienda JSON

fetch ("./data.json")
  .then(res => res.json())
  .then(productos => {
    miAplicacion(productos)
  })
    .catch((error) => 

      Swal.fire({

        icon: 'error',
        title: 'No hay stock',
        background: 'rgb(116, 108, 108)',
        color: 'white'
    
      })
    
    )
function miAplicacion(productos) {

rendeProducts(productos)

//Función para renderizar productos (Tarjetas interactivas DOM)

function rendeProducts (arrayDeProductos) {

    let containerProductos = document.getElementById("containerProducts")

    containerProductos.innerHTML = ""

        arrayDeProductos.forEach (el => {
          
        let tarjetasProductos = document.createElement("div")
        tarjetasProductos.className = "tarjetaDeProducto col-sm-12 col-md-12 col-lg 12 col-xl-3 col-xxl-3"
        tarjetasProductos.innerHTML =

        `<h3>${el.nombre}</h3>
        <p>Categoria: ${el.categoria}</p>
        <img class="imagentarjeta" src=${el.img}>
        <p>Precio: $ ${el.precio}</p>
        <p>Quedan <span id="span${el.id}">${el.stock}</span> unidades</p>
        <button id=${el.id} class="btnAgregar">Agregar a Carrito</button>`

        containerProductos.append(tarjetasProductos)

        let button = document.getElementById(el.id)

        button.addEventListener("click", agregarACarrito)
        button.addEventListener("click", seAgrego)

    })

}

let carritoIndex = document.getElementById("carritoDOM")
let carrito = []

if (localStorage.getItem("carritoLStorage")) {

  carrito = JSON.parse (localStorage.getItem("carritoLStorage"))
  renderizarCarrito(carrito)//con esto se logra que al cargar de nuevo la página aparezcan los productos en el carrito DOM

}

//Busqueda de producto conforme a su ID y push a array de carritos vacio más renderizado en DOM, con función que está más adelante.

function agregarACarrito (e){

  let buscadoCarrito = productos.find(el => el.id === Number(e.target.id))
  let position = productos.findIndex(el => el.id === Number(e.target.id))

  if (productos[position].stock > 0) {

    let spanId = document.getElementById("span" + e.target.id)

    productos[position].stock--
    spanId.innerHTML = productos[position].stock

    if (carrito.some (el => el.id == buscadoCarrito.id)) {

      let posicionProducto = carrito.findIndex(el => el.id === buscadoCarrito.id)
      carrito[posicionProducto].unidades++
      carrito[posicionProducto].subtotal = carrito[posicionProducto].precio * carrito[posicionProducto].unidades

    } else {

      carrito.push({

        id: buscadoCarrito.id,
        nombre: buscadoCarrito.nombre,
        precio: buscadoCarrito.precio,
        unidades: 1,
        subtotal: buscadoCarrito.precio,
      
      })

    }

  } else { 

      Swal.fire({

        icon: 'error',
        title: 'No hay stock',
        background: 'rgb(116, 108, 108)',
        color: 'white'
    
      })
    }

    localStorage.setItem("carritoLStorage", JSON.stringify(carrito))
    renderizarCarrito(carrito)

}

//Alert agregar a carrito.

function seAgrego() {

  Toastify({

    text: "SE AGREGÓ AL CARRITO",
    duration: 1500,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(90deg, rgba(3,6,98,1) 9%, rgba(4,15,156,1) 32%, rgba(14,27,207,1) 55%, rgba(37,51,233,1) 81%, rgba(61,71,242,1) 97%)",
    }
    
  }).showToast();

}

//Función renderizar carrito para agregar al DOM

function renderizarCarrito(arrayDeProductos) {

  carritoIndex.innerHTML = ""

  let total = carrito.reduce ((acc,prod) => acc + prod.subtotal, 0)

  arrayDeProductos.forEach(el => {

    carritoIndex.innerHTML += `SE AGREGO: <p>${el.nombre} Unidades: ${el.unidades} Subtotal: $ ${el.subtotal}<p>`

  })

  carritoIndex.innerHTML += `<span class="total">Su Total es: $ ${total}`

}

let inicioSes = document.getElementById("inicioSesion")
let registoUsu = document.getElementById("registro")

inicioSes.classList.add("formatoRegYSes")
registoUsu.classList.add("formatoRegYSes")

let containerRegSes  = document.getElementById("containerResIni")
let containerProd = document.getElementById("productosAdele")
let usuario = document.getElementById("usuario")
let contrasenia = document.getElementById("contrasenia")
let registrarse = document.getElementById("registrar")

registrarse.classList.add("btnRegIn")

//Función registro usuario

registrarse.addEventListener("click", () => {

  console.log(usuario.value)
  console.log(contrasenia.value)

  let informacion = {usuario: usuario.value, contrasenia: contrasenia.value}
  let JSONinformacion = JSON.stringify (informacion)
  localStorage.setItem("informacion", JSONinformacion)

  if ((isNaN(usuario.value)) && contrasenia.value !== isNaN) {

    registro()

  } else {

    registroError()

  }

})

function registro(){

  Swal.fire({

    icon: 'success',
    title: 'Usted se ha registrado correctamente',
    background: 'rgb(116, 108, 108)',
    color: 'white'

  })

}

function registroError() {

  Swal.fire({
    icon: 'error',
    title: 'Debe ingresar un usuario y contraseña válida.',
    background: 'rgb(116, 108, 108)',
    color: 'white'

  })

}

let usuarioInicio = document.getElementById("usuarioInicio")
let contraseniaInicio = document.getElementById("contraseniaInicio")
let iniciarSesion = document.getElementById("inicio")

iniciarSesion.classList.add("btnRegIn")

//Función Inicio Sesión

iniciarSesion.addEventListener("click", () => {

  console.log(usuarioInicio.value)
  console.log(contraseniaInicio.value)

  let informacion = JSON.parse(localStorage.getItem("informacion"))

  if (informacion.usuario == usuarioInicio.value && informacion.contrasenia == contraseniaInicio.value) {

    Bienvenido()  
    containerProd.classList.remove("ocultar")
    inicioSes.classList.add("ocultar")
    registoUsu.classList.add("ocultar")

  } else {

    inicioError()

  }
})

function Bienvenido() {

  Swal.fire({

    title: 'Bienvenido a la tienda de Adele',
    imageUrl: 'https://media.glamour.mx/photos/61904b932d97bd4c522a19cc/master/w_1600%2Cc_limit/269428.jpeg',
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: 'Custom image',
    background: 'rgb(116, 108, 108)',
    color: 'white'

  })
}

function inicioError() {

  Swal.fire({

    icon: 'error',
    title: 'Sus datos no son correctos.',
    background: 'rgb(116, 108, 108)',
    color: 'white'

  })

}

//Función filtro productos

let buscador = document.getElementById ("btnBusca")
let inpuBuscador = document.getElementById("inputBuscador")

buscador.addEventListener("click", filtrarEscritura)

function filtrarEscritura(){

    let filtradoEscritura = productos.filter (el => el.title.includes(inpuBuscador.value))

    rendeProducts(filtradoEscritura)

}

let confirmarCarrito = document.getElementById("Confirmar")
let vaciarCarrito = document.getElementById("vaciar")

confirmarCarrito.addEventListener("click", confirmar)
vaciarCarrito.addEventListener("click", vaciar)

//Función confirmar compra

function confirmar() {

    Toastify({

      text: "Tu compra ha sido confirmada",
      duration: 2000,
      close: false,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(90deg, rgba(3,6,98,1) 9%, rgba(4,15,156,1) 32%, rgba(14,27,207,1) 55%, rgba(37,51,233,1) 81%, rgba(61,71,242,1) 97%)",
        weight: "bold",
      }

    }).showToast(); 

    carritoIndex.innerHTML = "" 
    carrito = []
    localStorage.removeItem("carritoLStorage")

  }


// Función vaciar DOM

function vaciar() {

  Toastify({

    text: "Vaciaste el carrito.",
    duration: 2000,
    close: false,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "red",
    },
    
  }).showToast(); 

    carritoIndex.innerHTML = "" 
    carrito = []
    localStorage.removeItem("carritoLStorage")

  }

}


















/*let productos = [{
    id: 11,
    title: "flotador",
    nombre: "Flotador I Drink W.",
    categoria: "deportes",
    precio: 20000,
    stock: 5,
    color: "vinotinto",
    img: "https://cdn.shopify.com/s/files/1/0605/2551/0906/products/IDW-Floatie1_750x.png?v=1666634188"
  },
  {
    id: 12,
    title: "remera",
    nombre: "Remera I Drink W.",
    categoria: "indumentaria",
    precio: 6500,
    stock: 5,
    color: "vinotinto",
    img: "https://cdn.shopify.com/s/files/1/0605/2551/0906/products/T-shirt-Maroon-Front_750x.png?v=1666633728"
  },
  {
    id: 13,
    title: "gorra",
    nombre: "Gorra I Drink W.",
    categoria: "indumentaria",
    precio: 5000,
    stock: 5,
    color: "vinotinto",
    img: "https://cdn.shopify.com/s/files/1/0605/2551/0906/products/Hat-Maroon-Front-Detail_750x.png?v=1666671140"
  },
  {
    id: 14,
    title:"vinilo",
    nombre: "Vinilo 30",
    categoria: "vinilo",
    precio: 6000,
    stock: 5,
    color: "N/A",
    img: "https://cdn.shopify.com/s/files/1/0605/2551/0906/products/AA30-LP_750x.png?v=1634164889"
  },
  {
    id: 15,
    title: "cd",
    nombre: "CD 30",
    categoria: "disco",
    precio: 4500,
    stock: 5,
    color: "N/A",
    img: "https://cdn.shopify.com/s/files/1/0605/2551/0906/products/AA30-CD_750x.png?v=1634165117"
  },
  {
    id: 16,
    title: "cassette",
    nombre: "Cassette Easy on me",
    categoria: "cassette",
    precio: 6000,
    stock: 5,
    color: "negro",
    img: "https://cdn.shopify.com/s/files/1/0605/2551/0906/products/Easy-On-Me-Cassette_750x.png?v=1634238643"
  },
  {
    id: 17,
    title:"box",
    nombre: "Box 30",
    categoria: "disco",
    precio: 15000,
    stock: 5,
    img: "https://cdn.shopify.com/s/files/1/0605/2551/0906/products/Bundle-Group2-cassette_750x.jpg?v=1635708191"
  },
  {
    id: 18,
    title: "cd",
    nombre: "CD 19",
    categoria: "disco",
    precio: 3500,
    stock: 5,
    img: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Adele_19.webp"
  },
  {
    id: 19,
    title: "cd",
    nombre: "CD 21",
    categoria: "disco",
    precio: 4000,
    stock: 5,
    img: "https://upload.wikimedia.org/wikipedia/en/1/1b/Adele_-_21.png"
  },
  {
    id: 20,
    title: "cd",
    nombre: "CD 25",
    categoria: "disco",
    precio: 4000,
    stock: 5,
    img: "https://http2.mlstatic.com/D_NQ_NP_335111-MLA20497658446_112015-W.jpg"
  }
]*/
