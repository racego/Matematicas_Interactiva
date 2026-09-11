const botonMenu = document.getElementById("boton-menu");
const menuLateral = document.getElementById("menu-lateral");
const botonComenzar = document.getElementById("comenzar");

// Abrir y cerrar menú lateral en pantallas pequeñas
botonMenu.addEventListener("click", () => {
    menuLateral.classList.toggle("abierto");
});

// Desplazarse hasta las unidades
botonComenzar.addEventListener("click", () => {
    document
        .querySelector(".seccion-unidades")
        .scrollIntoView({
            behavior: "smooth"
        });
});