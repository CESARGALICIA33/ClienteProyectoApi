document.addEventListener("DOMContentLoaded", function () {
    var tabla = document.querySelector("table tbody");
    //se obtienen elementos con los ids correspondientes
    var generoMasculino = document.getElementById("MASCULINO");
    var generoFemenino = document.getElementById("FEMENINO");
    var disponibilidadMedio = document.getElementById("MEDIO");
    var disponibilidadCompleto = document.getElementById("COMPLETO");
    var salarioMayor = document.getElementById("MAYOR");
    var salarioMenor = document.getElementById("MENOR");


    if (generoMasculino) {
        generoMasculino.addEventListener("click", function () {
            if (generoMasculino.checked) {
                // Si el checkbox está marcado, filtra por género masculino
                llamarAPI('http://localhost:82/APIproyectofinal/api-rest/VisualizarGeneroM.php');
            } else {
                // Si el checkbox está desmarcado, muestra todos los datos
                obtenerDatosYActualizarTabla();
            }
        });
    }

    if (generoFemenino) {
        generoFemenino.addEventListener("click", function () {
            if (generoFemenino.checked) {
                // Si el checkbox está marcado, filtra por género Femenino
                llamarAPI('http://localhost:82/APIproyectofinal/api-rest/VisualizarGeneroF.php');
            } else {
                // Si el checkbox está desmarcado, muestra todos los datos
                obtenerDatosYActualizarTabla();
            }
        });
    }

    if (disponibilidadMedio) {
        disponibilidadMedio.addEventListener("click", function () {
            if (disponibilidadMedio.checked) {
                // Si el checkbox está marcado, filtra por disponibilidad
                llamarAPI('http://localhost:82/APIproyectofinal/api-rest/VisualizarDisponibilidadM.php');
            } else {
                // Si el checkbox está desmarcado, muestra todos los datos
                obtenerDatosYActualizarTabla();
            }
        });
    }
    if (disponibilidadCompleto) {
        disponibilidadCompleto.addEventListener("click", function () {
            if (disponibilidadCompleto.checked) {
                // Si el checkbox está marcado, filtra por disponibilidad
                llamarAPI('http://localhost:82/APIproyectofinal/api-rest/VisualizarDisponibilidadC.php');
            } else {
                // Si el checkbox está desmarcado, muestra todos los datos
                obtenerDatosYActualizarTabla();
            }
        });
    }

    if (salarioMayor) {
        salarioMayor.addEventListener("click", function () {
            if (salarioMayor.checked) {
                // Si el checkbox está marcado, filtra por salario
                llamarAPI('http://localhost:82/APIproyectofinal/api-rest/VisualizarSalarioMayor.php');
            } else {
                // Si el checkbox está desmarcado, muestra todos los datos
                obtenerDatosYActualizarTabla();
            }
        });
    }


    if (salarioMenor) {
        salarioMenor.addEventListener("click", function () {
            if (salarioMenor.checked) {
                // Si el checkbox está marcado, filtra por salario
                llamarAPI('http://localhost:82/APIproyectofinal/api-rest/VisualizarSalarioMenor.php');
            } else {
                // Si el checkbox está desmarcado, muestra todos los datos
                obtenerDatosYActualizarTabla();
            }
        });
    }

    function llamarAPI(apiUrl) {// funcion que recibe el link del api que fue seleccionado para realizar la peticion
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                actualizarTabla(data);
            })
            .catch(error => {
                console.error('Error al obtener datos de la API:', error);
            });
    }

    function actualizarTabla(data) {// funcion que recibe los datos de la api para mostrarlos en la tabla
        tabla.innerHTML = "";

        // Lógica para actualizar la tabla con los datos recibidos
        data.forEach(function (elemento) {
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
                            <!-- Agrega más columnas según tus necesidades -->
                        </tr>`;
            tabla.innerHTML += fila;
        });
    }
    
});
