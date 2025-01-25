document.addEventListener('DOMContentLoaded', function() {
  // Sélectionner tous les éléments avec la classe "petit-carre"
  const petitcarres = document.querySelectorAll('.petit-carre');

  // Options pour l'Intersection Observer (observer quand l'élément est à 50% visible)
  const observerOptions = {
    threshold: 0.5
  };

  // Fonction de rappel pour l'Intersection Observer
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        entry.target.classList.add('visible');
      }
    });
  };

  // Créer l'observer
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observer chaque carré
  petitcarres.forEach(petitcarre => {
    observer.observe(petitcarre);
  });
});



// Gestion de l'envoi du formulaire
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const messageDiv = document.getElementById('formMessage');
  
  if (!form || !messageDiv) {
    console.error('Éléments du formulaire non trouvés');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Réinitialiser le message
    messageDiv.className = 'form-message';
    messageDiv.textContent = '';
    
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value
    };

    try {
      const response = await fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json(); // Ajout pour vérifier la réponse

      if (response.ok) {
        messageDiv.textContent = 'Message envoyé avec succès !';
        messageDiv.classList.add('success');
        form.reset(); // Assurons-nous que cette ligne s'exécute
        console.log('Formulaire réinitialisé'); // Debug
      } else {
        throw new Error(result.message || 'Erreur lors de l\'envoi du message.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      messageDiv.textContent = 'Erreur de connexion au serveur.';
      messageDiv.classList.add('error');
    }
  });
});