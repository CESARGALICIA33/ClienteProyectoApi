// comentarios-script.js

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const experiencia = document.querySelector('input[name="experiencia"]:checked').value;
        const motivos = document.getElementById('motivos').value;

        try {
            const url = `http://localhost:82/APIproyectofinal/api-rest/InsertarComentarios.php?experiencia=${experiencia}&motivos=${motivos}`;
            const response = await fetch(url, {
                method: 'POST',
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result); // Puedes hacer algo con la respuesta si es necesario

                window.location.href = 'login.html';
            } else {
                console.error('Error en la solicitud:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
