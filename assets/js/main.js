// Navigation toggle for mobile
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', function () {
    var expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('open', !expanded);
  });
})();

// Highlight current doc nav item
(function () {
  var links = document.querySelectorAll('.doc-nav a');
  links.forEach(function (link) {
    if (link.getAttribute('href') === window.location.pathname || link.getAttribute('href') === window.location.pathname + '/') {
      link.classList.add('active');
    }
  });
})();
