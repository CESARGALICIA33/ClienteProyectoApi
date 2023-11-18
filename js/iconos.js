  // Obtén todas las imágenes en el grupo
  var images = document.querySelectorAll('.custom-form-group img');
    
  // Agrega un evento de clic a cada imagen
  images.forEach(function (img) {
      img.addEventListener('click', function () {
          // Quita la clase 'selected' de todas las imágenes
          images.forEach(function (otherImg) {
              otherImg.classList.remove('selected');
          });

          // Agrega la clase 'selected' solo a la imagen clicada
          img.classList.add('selected');
      });
  });