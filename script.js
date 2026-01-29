// script.js - separado
// Uso de 'defer' no HTML faz com que este script rode após o parsing do HTML.
// Se preferir, use `document.addEventListener('DOMContentLoaded', ...)`.

// Seleção de elementos — ids e classes feitos no HTML servem como "âncoras"
const form = document.getElementById('contactForm');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = form.elements['name'].value.trim();
    const email = form.elements['email'].value.trim();

    // validação simples
    if (!name || !email) {
      alert('Preencha nome e email.');
      return;
    }

    // Aqui você pode enviar via fetch para um endpoint ou apenas demonstrar
    alert('Obrigado, ' + name + '! Formulário enviado (exemplo).');

    // reset do form
    form.reset();
  });
}

// Exemplo: melhorar links de navegação (links com hash)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (evt) {
    // Se quiser comportamento extra, adicionar aqui.
    // Com CSS `scroll-behavior: smooth` geralmente já resolve.
  });
});
