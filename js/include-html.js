document.addEventListener("DOMContentLoaded", function() {
    includeHTML();
  });
  
  function includeHTML() {
    let elements = document.querySelectorAll('[w3-include-html]');
    elements.forEach(elmnt => {
      let file = elmnt.getAttribute("w3-include-html");
      if (file) {
        fetch(file)
          .then(response => {
            if (response.ok) return response.text();
            throw new Error("Fichier non trouvé.");
          })
          .then(data => {
            elmnt.innerHTML = data;
            elmnt.removeAttribute("w3-include-html");
            includeHTML(); // appel récursif si des includes sont dans les includes
          })
          .catch(() => {
            elmnt.innerHTML = "Fichier non trouvé.";
          });
      }
    });
  }
  