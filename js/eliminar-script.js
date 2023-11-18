document.addEventListener('DOMContentLoaded', function () {
    const eliminarBtn = document.getElementById('eliminarBtn');

    eliminarBtn.addEventListener('click', function () {
        // Obtener el iduser del localStorage
        const Iduser = localStorage.getItem('userId');
        console.log(localStorage.getItem('userId'));
        if (Iduser) {
            // Llamar a la función para eliminar el usuario en ambas APIs
            eliminarUsuarioEnAmbasAPIs(Iduser);
        } else {
            console.error('Error: No se encontró el iduser en el localStorage');
        }
    });

    async function eliminarUsuarioEnAmbasAPIs(Iduser) {
        try {
            // Realizar solicitud a la primera API para eliminar el usuario
            const responseApi1 = await fetch('http://localhost:82/APIproyectofinal/api-rest/EliminarCorreo.php', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Iduser: Iduser,
                }),
            });


            // Verificar el resultado de ambas solicitudes
            if (responseApi1.ok) {
                console.log('Usuario eliminado correctamente en ambas APIs');
                window.location.href = 'login.html'; // Cambiar a la URL correcta
            } else {
                console.error('Error al eliminar el usuario en al menos una de las APIs');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
});
