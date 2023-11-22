document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registroForm');

    // Obtener el ID del usuario almacenado en localStorage
    const Iduser = localStorage.getItem('userId');
    
    // Llamada a la API para obtener datos del candidato
    fetch(`http://localhost:82/APIproyectofinal/api-rest/MostrarCandidato.php?Iduser=${Iduser}`, {// manda el id usuarios para que este realice la consulta
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        // encabezado de la solicitud
    },
    })
        .then(response => response.json())
        .then(data => {

            // Llenar el formulario con los datos del candidato
            document.getElementById('nombre').value = data.Nombre;
            document.getElementById('apellido_paterno').value = data.ApellidoPaterno;
            document.getElementById('apellido_materno').value = data.ApellidoMaterno;
            document.getElementById('genero').value = data.Género;
            document.getElementById('telefono').value = data.Teléfono;
            document.getElementById('calle').value = data.Calle;
            document.getElementById('colonia').value = data.Colonia;
            document.getElementById('num_int').value = data.NumInt;
            document.getElementById('num_ext').value = data.NumExt;
            document.getElementById('codigoPostal').value = data.CódigoPostal;
            document.getElementById('experiencia').value = data.ExperienciaLaboral;
            document.getElementById('educacion').value = data.Educación;
            document.getElementById('habilidades').value = data.Habilidades;
            document.getElementById('salario').value = data.Salario;
            const disponibilidadSelect = document.getElementById('disponibilidad');
            disponibilidadSelect.innerHTML = ''; // Limpiar opciones existentes
        
            // Crear opciones basadas en los datos del API
            const opcionesDisponibilidad = [
                { value: 'M', text: 'Medio turno' },
                { value: 'T', text: 'Turno completo' }
            ];
        
            opcionesDisponibilidad.forEach(opcion => {
                const optionElement = document.createElement('option');
                optionElement.value = opcion.value;
                optionElement.text = opcion.text;
                disponibilidadSelect.appendChild(optionElement);
            });
        
            // Establecer el valor seleccionado según lo recibido del API
            disponibilidadSelect.value = data.Disponibilidad;

            // Convertir la fecha de nacimiento a formato ISO 8601
            if (data.FechaNacimiento) {
                const fechaNacimiento = new Date(data.FechaNacimiento);
                const fechaNacimientoISO = fechaNacimiento.toISOString().split('T')[0];
                document.getElementById('fecha_nacimiento').value = fechaNacimientoISO;
            }
             
        })
        .catch(error => {
            console.error('Error al obtener datos del candidato:', error);
            // Manejar el error, por ejemplo, mostrando un mensaje al usuario
        });

    // Llamada a la API para obtener datos del correo/contraseña
    fetch(`http://localhost:82/APIproyectofinal/api-rest/MostrarCorreo.php?Iduser=${Iduser}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Puedes agregar otros encabezados según sea necesario
        },
        })
        .then(response => response.json())
        .then(data => {

            // Llenar el formulario con los datos del correo/contraseña
            document.getElementById('correo').value = data.Correo;
            document.getElementById('contrasena').value = data.Contraseña;
            // No hay más campos para llenar en este caso
        })
        .catch(error => console.error('Error al obtener datos del correo/contraseña:', error));

    // Función para manejar el envío del formulario
    const submitForm = async function (event) {
        event.preventDefault();
        // Obtener datos del formulario
        const nombre = document.getElementById('nombre').value;
        const apellido_paterno = document.getElementById('apellido_paterno').value;
        const apellido_materno = document.getElementById('apellido_materno').value;
        const genero = document.getElementById('genero').value;
        const telefono = document.getElementById('telefono').value;
        const calle = document.getElementById('calle').value;
        const colonia = document.getElementById('colonia').value;
        const num_int = document.getElementById('num_int').value;
        const num_ext = document.getElementById('num_ext').value;
        const codigoPostal = document.getElementById('codigoPostal').value;
        const experiencia = document.getElementById('experiencia').value;
        const educacion = document.getElementById('educacion').value;
        const habilidades = document.getElementById('habilidades').value;
        const fecha_nacimiento = document.getElementById('fecha_nacimiento').value;
        const disponibilidad = document.getElementById('disponibilidad').value;
        const salario = document.getElementById('salario').value;       

        // Obtener datos del usuario
        const correo = document.getElementById('correo').value;
        const contrasena = document.getElementById('contrasena').value;

        
            // Segunda solicitud a la API de registro de usuario
            const responseUsuario = await fetch(`http://localhost:82/APIproyectofinal/api-rest/ActualizarUsuario.php?correo=${correo}&contrasena=${contrasena}&Iduser=${Iduser}`, {// esta api envia lo datos para que realice el update en la tabla Usuario
                method: 'PUT',
            });

            if (responseUsuario.ok) {
                const resultUsuario = await responseUsuario.json();
                console.log('Respuesta del servidor (Usuario):', resultUsuario);
                window.location.href = 'Index.html'; // direcciona al index en caso de una actualizacion en la cuenta del candidato

            } else {
                
                window.location.href = 'Index.html';//redirecciona a index en caso de que no haya algun cambio en el correo y contraseña

            }

            
                  
                    // Primera solicitud a la API de registro de candidato
                    const responseCandidato = await fetch('http://localhost:82/APIproyectofinal/api-rest/ActualizarCandidatoSin.php', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({// envia lo datos para realizar el update del candidato
                            nombre,
                            Iduser,
                            apellido_paterno,
                            apellido_materno,
                            genero,
                            telefono,
                            calle,
                            colonia,
                            num_int,
                            num_ext,
                            codigoPostal,
                            experiencia,
                            educacion,
                            habilidades,
                            fecha_nacimiento,
                            disponibilidad,
                            salario
                        }),
                    });

                    try {
                        const resultCandidato = await responseCandidato.json();
                        console.log('Respuesta del servidor (Candidato):', resultCandidato);

                        // Puedes realizar acciones adicionales aquí según la respuesta de ambas APIs
                        alert('Registro exitoso');
                        window.location.href = 'Index.html'; // Cambiar a la URL correcta
                    } catch (error) {
                        /*console.error('Error al intentar parsear la respuesta como JSON:', error);
                        alert('Error en el registro de candidato');*/
                        window.location.href = 'Index.html'; // Cambiar a la URL correcta

                    }

            

    };
    form.addEventListener('submit', submitForm);

});
