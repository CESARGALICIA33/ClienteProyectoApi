function togglePasswordVisibility() {
    const passwordInput = document.getElementById('contrasena');
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
}

async function submitForm(event) {
    event.preventDefault();

    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;
    const accountType = document.getElementById('accountType').value;

    try {
        const response = await fetch('http://localhost:82/APIproyectofinal/api-rest/Login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                correo,
                contrasena,
                accountType,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);

            if (data.success && data.token && data.userId) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                console.log(localStorage.getItem('token'));//borrar en la version final
                console.log(localStorage.getItem('userId'));//borrar en la version final


                
                    // Redirigir a otra página o realizar otras acciones después del inicio de sesión

                    // Agregar condición para redirigir según el tipo de cuenta
                    if (accountType === '1') {
                        window.location.href = 'Index.html'; // Cambiar a la URL correcta
                    } else if (accountType === '2') {
                        window.location.href = 'vistaEmpresa.html'; // Cambiar a la URL correcta
                    }
               
            } else {
                alert('Error de inicio de sesión: Credenciales incorrectas');
            }
        } else {
            //alert('Error en la solicitud: ' + response.statusText);
            Swal.fire({
                title: 'Correo electronico o contraseña incorrectas',
                text: response.statusText,
                icon: 'error',
            });
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error de red');
    }
}