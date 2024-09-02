import { getPeliculas } from "./dataManager.js";


const urlImage = 'https://image.tmdb.org/t/p/w500'

export function displayPeliculas(){
    const peliculas = getPeliculas()
    let contenedor = ''
    if(peliculas && Array.isArray(peliculas)){
        peliculas.map(pelicula => {
            contenedor +=
            `
                <div class="pelicula">
                    <img class="poster" src="${urlImage}${pelicula.backdrop_path}" alt="${pelicula.title}"/>
                    <h3>${pelicula.title}</h3>
                    <div class="pelicula-texto">
                        <p class="voteAverage">⭐${pelicula.vote_average.toFixed(2)}</p>
                        <a data-id="${pelicula.id}" class="verMas">Ver más</a>
                    </div>
                </div>
            `
        })
    }else{
        contenedor = '<p>No hay películas disponibles</p>'
    }
    document.getElementById('principal').innerHTML = contenedor
    //Agregar event Listener a los enlaces
    const verMasLinks = document.querySelectorAll('.verMas')
    verMasLinks.forEach(link => {
        link.addEventListener('click', mostrarDetallesPelicula)
    })
}

function mostrarDetallesPelicula(event){
    const idPelicula = event.target.getAttribute('data-id')
    const peliculas = getPeliculas()
    const pelicula = peliculas.find(p => p.id.toString() === idPelicula)
    const detallesHtml = `
        <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${pelicula.title}</title>
            </head>
            <body>
                <div class="detalles-pelicula">
                    <h1>${pelicula.title}</h1>
                    <img src="peliculaPoster" alt="tituloPelicula">
                    <p>Fecha de lanzamiento: ${pelicula.release_date}</p>
                </div>
            </body>
            </html>
    `
    const blob = new Blob([detallesHtml], {type: 'text/html'})
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
}