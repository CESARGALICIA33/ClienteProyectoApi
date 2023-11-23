
// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    // Llama a la función para obtener y mostrar los datos al cargar la página
    obtenerDatosYActualizarTabla();
});

// Función para realizar una solicitud GET a la API y actualizar la tabla
function obtenerDatosYActualizarTabla() {
    // URL de la api que retorna los datos para llenar la tabla al recargarla
    var apiUrl = "http://localhost:82/APIproyectofinal/api-rest/Visualizar.php";

    // Realiza la solicitud GET a la API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Llama a la función para actualizar la tabla con los datos recibidos
            actualizarTablaDatos(data);
        })
        .catch(error => {
            console.error('Error al obtener datos de la API:', error);
        });
}

// Función para actualizar la tabla con los datos obtenidos de la API
function actualizarTablaDatos(datos) {
    // Obtén la referencia a la tabla y su cuerpo
    var tabla = document.querySelector("table tbody");

    // Limpia el contenido actual de la tabla
    tabla.innerHTML = "";

    // Verifica que datos sea un array
    if (Array.isArray(datos)) {
        // Itera sobre los datos y agrega filas a la tabla
        datos.forEach(function (elemento) {
            var fila = `<tr>
                            <th scope="row">${elemento.IdCandidato}</th>
                            <td>${elemento.Nombre}</td>
                            <td>${elemento.ApellidoPaterno}</td>
                            <td>${elemento.ApellidoMaterno}</td>
                            <td>${elemento.Género}</td>
                            <td>${elemento.Teléfono}</td>
                            <td>${elemento.Calle}</td>
                            <td>${elemento.Colonia}</td>
                            <td>${elemento.NumInt}</td>
                            <td>${elemento.NumExt}</td>
                            <td>${elemento.CódigoPostal}</td>
                            <td>${elemento.ExperienciaLaboral}</td>
                            <td>${elemento.Educación}</td>
                            <td>${elemento.Habilidades}</td>
                            <td>${elemento.FechaNacimiento}</td>
                            <td>${elemento.Disponibilidad}</td>
                            <td>${elemento.Salario}</td>
                        </tr>`;
            tabla.innerHTML += fila;
        });
    } else {
        console.error('El formato de datos no es válido:', datos);
    }
}
