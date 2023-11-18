async function submitForm(event) {
    event.preventDefault();

    // Obtener datos del formulario
    const nombre = document.getElementById('nombre').value;
    const apellidoPaterno = document.getElementById('apellido_paterno').value;
    const apellidoMaterno = document.getElementById('apellido_materno').value;
    const genero = document.getElementById('genero').value;
    const telefono = document.getElementById('telefono').value;
    const calle = document.getElementById('calle').value;
    const colonia = document.getElementById('colonia').value;
    const numInt = document.getElementById('num_int').value;
    const numExt = document.getElementById('num_ext').value;
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

    try {
        // Segunda solicitud a la API de registro de usuario
        const responseUsuario = await fetch(`http://localhost:82/APIproyectofinal/api-rest/insertarUsuario.php?correo=${correo}&contrasena=${contrasena}`, {
            method: 'POST',
        });

        if (responseUsuario.ok) {
            const resultUsuario = await responseUsuario.json();
            console.log('Respuesta del servidor (Usuario):', resultUsuario);

            if (resultUsuario && resultUsuario.userId) {
                // Obtener el userId de la respuesta de la segunda API
                const userId = resultUsuario.userId;

                // Crear un objeto FormData y agregar datos y archivos
                const formData = new FormData();
                formData.append('idusuario', userId);
                formData.append('nombre', nombre);
                formData.append('apellido_paterno', apellidoPaterno);
                formData.append('apellido_materno', apellidoMaterno);
                formData.append('genero', genero);
                formData.append('telefono', telefono);
                formData.append('calle', calle);
                formData.append('colonia', colonia);
                formData.append('num_int', numInt);
                formData.append('num_ext', numExt);
                formData.append('codigoPostal', codigoPostal);
                formData.append('experiencia', experiencia);
                formData.append('educacion', educacion);
                formData.append('habilidades', habilidades);
                formData.append('fecha_nacimiento', fechaNacimiento);
                formData.append('disponibilidad', disponibilidad);
                formData.append('salario', salario);
                formData.append('curriculum', curriculumFile);
                formData.append('constancia', constanciaFile);

                // Primera solicitud a la API de registro de candidato
                const responseCandidato = await fetch('http://localhost:82/APIproyectofinal/api-rest/InsertarCandidato.php', {
                    method: 'POST',
                    body: formData,
                });

                if (responseCandidato.ok) {
                    const resultCandidato = await responseCandidato.json();
                    console.log('Respuesta del servidor (Candidato):', resultCandidato);//eliminar en la version final

                    // Puedes realizar acciones adicionales aquí según la respuesta de ambas APIs
                    alert('Registro exitoso');
                    window.location.href = 'Login.html'; // Cambiar a la URL correcta

                } else {
                    console.error('Error en la solicitud (Candidato):', responseCandidato.statusText);
                    alert('Error en el registro de candidato');
                }
            } else {
                console.error('Error: No se recibió un userId válido en la respuesta del servidor (Usuario)');
                alert('Error en el registro de usuario');
            }
        } else {
            console.error('Error en la solicitud (Usuario):', responseUsuario.statusText);
            alert('Error en el registro de usuario');
        }
    } catch (error) {
        console.error('Error Documentos mayores a 1 MB:', error);
        Swal.fire({
            title: 'Ambos archivos exceden 1MB de espacio',
            text: responseCandidato.statusText,
            icon: 'error',
        });
        alert('Error de red');
    }
}
