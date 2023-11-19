document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registroForm');

    // Obtener el ID del usuario almacenado en localStorage
    const Iduser = localStorage.getItem('userId');
    console.log(localStorage.getItem('userId'));//borrar en la version final
    // Llamada a la API para obtener datos del candidato
    fetch(`http://localhost:82/APIproyectofinal/api-rest/MostrarCandidato.php?Iduser=${Iduser}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        // Puedes agregar otros encabezados según sea necesario
    },
    })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta de la API:', data);

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
            //document.getElementById('disponibilidad').value = data.Disponibilidad;
            const disponibilidadSelect = document.getElementById('disponibilidad');
            disponibilidadSelect.innerHTML = ''; // Limpiar opciones existentes
        
            // Crear opciones basadas en los datos del API
            const opcionesDisponibilidad = [
                { value: 'M', text: 'Medio turno' },
                { value: 'T', text: 'Turno completo' }
                // Agrega más opciones según sea necesario
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
            console.log('Respuesta del API de correo/contraseña:', data);

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
        const fechaNacimiento = document.getElementById('fecha_nacimiento').value;
        const disponibilidad = document.getElementById('disponibilidad').value;
        const salario = document.getElementById('salario').value;
        // Obtener archivos
        const curriculumFile = document.getElementById('curriculum').files[0];
        const constanciaFile = document.getElementById('constancia').files[0];

        // Obtener datos del usuario
        const correo = document.getElementById('correo').value;
        const contrasena = document.getElementById('contrasena').value;

        
            // Segunda solicitud a la API de registro de usuario
            const responseUsuario = await fetch(`http://localhost:82/APIproyectofinal/api-rest/ActualizarUsuario.php?correo=${correo}&contrasena=${contrasena}&Iduser=${Iduser}`, {
                method: 'PUT',
            });

            if (responseUsuario.ok) {
                const resultUsuario = await responseUsuario.json();
                console.log('Respuesta del servidor (Usuario):', resultUsuario);
            } else {
                console.error('Error: No se recibió un userId válido en la respuesta del servidor (Usuario)');
                alert('Error en el registro de usuario');
            }

                    
                    // Crear un objeto FormData y agregar datos y archivos
                    const formData = new FormData();
                    formData.append('Iduser', Iduser);
                    formData.append('nombre', nombre);
                    formData.append('apellido_paterno', apellido_paterno);
                    formData.append('apellido_materno', apellido_materno);
                    formData.append('genero', genero);
                    formData.append('telefono', telefono);
                    formData.append('calle', calle);
                    formData.append('colonia', colonia);
                    formData.append('num_int', num_int);
                    formData.append('num_ext', num_ext);
                    formData.append('codigoPostal', codigoPostal);
                    formData.append('experiencia', experiencia);
                    formData.append('educacion', educacion);
                    formData.append('habilidades', habilidades);
                    formData.append('fecha_nacimiento', fechaNacimiento);
                    formData.append('disponibilidad', disponibilidad);
                    formData.append('salario', salario);
                    formData.append('curriculum', curriculumFile);
                    formData.append('constancia', constanciaFile);

                    console.log('Contenido de formData:');
                    for (const entry of formData.entries()) {
                        console.log(entry[0], entry[1]);
                    }
                   /* const jsonData = {
                        Iduser,
                        nombre,
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
                        salario,
                        curriculum,
                        constancia
                    };
                    console.log('Contenido de jsonData:', jsonData);*/

                    // Primera solicitud a la API de registro de candidato
                    const responseCandidato = await fetch('http://localhost:82/APIproyectofinal/api-rest/ActualizarCandidato.php', {
                        method: 'PUT',
                        body: formData,
                    });
                    console.log('Respuesta del servidor (Candidato):', await responseCandidato.text());

                    if (responseCandidato.ok) {
                        const resultCandidato = await responseCandidato.json();
                        console.log('Respuesta del servidor (Candidato):', resultCandidato);//eliminar en la version final

                        // Puedes realizar acciones adicionales aquí según la respuesta de ambas APIs
                        alert('Registro exitoso');
                        //window.location.href = 'Index.html'; // Cambiar a la URL correcta

                    } else {
                        console.error('Error en la solicitud (Candidato):', responseCandidato.statusText);
                        alert('Error en el registro de candidato');
                    }
            

    };

    // Agregar el evento de envío al formulario
    form.addEventListener('submit', submitForm);
});
