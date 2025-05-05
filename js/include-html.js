document.addEventListener("DOMContentLoaded", function () {
    const includes = document.querySelectorAll('[include-html]');
    includes.forEach(el => {
      const file = el.getAttribute('include-html');
      fetch(file)
        .then(response => {
          if (!response.ok) throw new Error('Erreur de chargement');
          return response.text();
        })
        .then(data => {
          el.innerHTML = data;
        })
        .catch(err => {
          el.innerHTML = "Fichier non trouvé.";
          console.error(`Erreur en chargeant ${file}:`, err);
        });
    });
  });
  