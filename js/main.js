import { showLoading, hideLoading } from "./loadingManager.js";
import { cargarPeliculasAsync, getTotalPages } from "./dataManager.js";
import { displayPeliculas } from "./renderPeliculas.js";
import { toggleMenu } from "./menuManager.js";

document.getElementById('boton').addEventListener('click', toggleMenu)

let pagina = 1
const botonAnterior = document.getElementById('btnAnterior')
const botonSiguiente = document.getElementById('btnSiguiente')

botonSiguiente.addEventListener('click', () => {
  if(pagina < getTotalPages()){
    pagina++
    mostrarPeliculas()
    botonAnterior.style.display = 'block'
  }
  if(pagina === getTotalPages()){
    botonSiguiente.style.display = 'none'
  }

})

botonAnterior.addEventListener('click', () => {
  if(pagina > 1){
    pagina--
    mostrarPeliculas()
    botonSiguiente.style.display = 'block'
  }
  if(pagina === 1){
    botonAnterior.style.display = 'none'
  }
})

async function mostrarPeliculas(){
  showLoading()
  await cargarPeliculasAsync(pagina)
  displayPeliculas()
  hideLoading()
}


//asegurarse de llamar a mostrarPeliculas cuando se cargue la página
document.addEventListener('DOMContentLoaded', mostrarPeliculas)
