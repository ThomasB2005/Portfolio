/*document.addEventListener("DOMContentLoaded", function () {
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
  });*/

document.addEventListener("DOMContentLoaded", function() {
  const includes = document.querySelectorAll('[include-html]');
  
  includes.forEach(el => {
    const file = el.getAttribute('include-html');
    fetch(file)
      .then(response => {
        if (!response.ok) throw new Error(`Failed to load ${file}: ${response.status}`);
        return response.text();
      })
      .then(data => {
        el.innerHTML = data;
        // Ré-exécute les scripts inclus
        Array.from(el.querySelectorAll('script')).forEach(oldScript => {
          const newScript = document.createElement('script');
          Array.from(oldScript.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
          });
          newScript.appendChild(document.createTextNode(oldScript.innerHTML));
          oldScript.parentNode.replaceChild(newScript, oldScript);
        });
      })
      .catch(err => {
        console.error(err);
        el.innerHTML = `<span style="color:red">Erreur de chargement: ${file}</span>`;
      });
  });
});
  