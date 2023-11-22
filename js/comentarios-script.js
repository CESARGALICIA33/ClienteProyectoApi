// Script que manda los datos del formulario de comentarios al api que realiza su insersion en la base de datos

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const experiencia = document.querySelector('input[name="experiencia"]:checked').value;// retorna el valor del input seleccionado para almacenarse en la base de datos
        const motivos = document.getElementById('motivos').value;//obtenemos los valores del campo motivos

        try {
            const url = `http://localhost:82/APIproyectofinal/api-rest/InsertarComentarios.php?experiencia=${experiencia}&motivos=${motivos}`;// enviamos los datos por el url
            const response = await fetch(url, {
                method: 'POST',
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result); 

                window.location.href = 'login.html';// redireccionamos al login una vez se envien los datos
            } else {
                console.error('Error en la solicitud:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
