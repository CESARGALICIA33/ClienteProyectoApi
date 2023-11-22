function togglePasswordVisibility() {// funcion para ocultar o visualizar el password en el login
    const passwordInput = document.getElementById('contrasena');
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
}

async function submitForm(event) {
    event.preventDefault();

    const correo = document.getElementById('correo').value;// se obtienen valores del formulario de login
    const contrasena = document.getElementById('contrasena').value;
    const accountType = document.getElementById('accountType').value;

    try {
        const response = await fetch('http://localhost:82/APIproyectofinal/api-rest/Login.php', {//Api No.3 envia los datos del correo y contrasela para que sean validados por medio de una funcion de jwt
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
                localStorage.setItem('token', data.token);//almacena en el locasStorage los datos correspondientes que devuelve el api de generacion de token
                localStorage.setItem('userId', data.userId);
               
                // condicion que evalua el tipo de cuento y lo envia al sitio correspondiente
                    if (accountType === '1') {
                        window.location.href = 'Index.html'; // Redirige a Index en caso de ser cuenta candidato
                    } else if (accountType === '2') {
                        window.location.href = 'vistaEmpresa.html'; // redirige a vistaEmpresa en caso de ser cuenta de empresa
                    }
               
            } else {
                alert('Error de inicio de sesión: Credenciales incorrectas');
            }
        } else {
            Swal.fire({
                title: 'Correo electronico o contraseña incorrectas',
                //text: response.statusText,
                icon: 'error',
            });
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error de red');
    }
}