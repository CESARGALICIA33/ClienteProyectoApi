// Guarda este contenido en un archivo llamado script.js

// Función para realizar la búsqueda y actualizar la tabla
function buscar() {
    // Obtén el valor de la barra de búsqueda
    var nombre = document.getElementById("barraBusqueda").value;

    // Realiza la solicitud a la API con el nombre como parámetro
    fetch(`http://localhost:82/APIproyectofinal/api-rest/VisualizarCandidato.php?nombre=${nombre}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            // Llama a la función para actualizar la tabla con los datos recibidos
            actualizarTabla(data);
        })
        .catch(error => {
            console.error('Error al obtener datos de la API:', error);
        });
}

// Función para actualizar la tabla con los datos obtenidos de la API
function actualizarTabla(datos) {
    // Obtén la referencia a la tabla y su cuerpo
    var tabla = document.querySelector("table tbody");

    // Limpia el contenido actual de la tabla
    tabla.innerHTML = "";

    // Verifica que datos sea un objeto
    if (typeof datos === 'object' && datos !== null) {
        // Agrega una fila a la tabla con los datos del objeto
        var fila = `<tr>
                        <th scope="row">${datos.IdCandidato}</th>
                        <td>${datos.Nombre}</td>
                        <td>${datos.ApellidoPaterno}</td>
                        <td>${datos.ApellidoMaterno}</td>
                        <td>${datos.Teléfono}</td>
                        <td>${datos.Calle}</td>
                        <td>${datos.Colonia}</td>
                        <td>${datos.NumInt}</td>
                        <td>${datos.NumExt}</td>
                        <td>${datos.CódigoPostal}</td>
                        <td>${datos.ExperienciaLaboral}</td>
                        <td>${datos.Educación}</td>
                        <td>${datos.Habilidades}</td>
                        <td>${datos.FechaNacimiento}</td>
                        <td>${datos.Disponibilidad}</td>
                        <td>${datos.Salario}</td>
                        <!-- Agrega más columnas según tus necesidades -->
                    </tr>`;
        tabla.innerHTML += fila;
    } else {
        console.error('El formato de datos no es válido:', datos);
    }
}


// Función para limpiar la búsqueda
function limpiarBusqueda() {
    document.getElementById("barraBusqueda").value = "";
    // Recargar la tabla llamando a la función para obtener y mostrar los datos
    obtenerDatosYActualizarTabla();
}

// Asigna la función de búsqueda al botón correspondiente
document.querySelector(".input-group-append button.btn-outline-primary").addEventListener("click", buscar);
