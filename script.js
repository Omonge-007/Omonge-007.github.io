(function () {
  var strip = document.getElementById('strip');
  var panels = Array.prototype.slice.call(document.querySelectorAll('.panel'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
  var ids = panels.map(function (p) { return p.id; });
  var current = 0;

  // Progress dots
  var progress = document.getElementById('progress');
  ids.forEach(function () { progress.appendChild(document.createElement('span')); });
  var dots = Array.prototype.slice.call(progress.children);

  function isDesktop() {
    return window.matchMedia('(min-width: 861px)').matches;
  }

  function show(index, updateHash) {
    if (index < 0 || index >= panels.length) return;
    current = index;

    if (isDesktop()) {
      strip.style.transform = 'translateX(' + (-index * 16.6667) + '%)';
    } else {
      panels[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    navLinks.forEach(function (link, i) {
      link.classList.toggle('active', i === index);
      link.setAttribute('aria-current', i === index ? 'true' : 'false');
    });

    dots.forEach(function (dot, i) { dot.classList.toggle('on', i === index); });

    var indicator = document.getElementById('navIndicator');
    if (indicator && navLinks[index]) {
      indicator.style.transform = 'translateY(' + navLinks[index].offsetTop + 'px)';
      indicator.style.opacity = '1';
    }

    // Keep off-screen panels out of tab order and away from screen readers
    if (isDesktop()) {
      panels.forEach(function (panel, i) {
        var off = i !== index;
        panel.inert = off;
        panel.setAttribute('aria-hidden', off ? 'true' : 'false');
      });
    } else {
      panels.forEach(function (panel) {
        panel.inert = false;
        panel.removeAttribute('aria-hidden');
      });
    }

    if (updateHash !== false) {
      var hash = '#' + ids[index];
      if (location.hash !== hash) history.pushState(null, '', hash);
    }

    setMenu(false);
  }

  function indexFromHash() {
    var id = (location.hash || '').replace('#', '');
    var i = ids.indexOf(id);
    return i === -1 ? 0 : i;
  }

  navLinks.forEach(function (link, i) {
    link.addEventListener('click', function () { show(i); });
  });

  Array.prototype.slice.call(document.querySelectorAll('[data-goto]')).forEach(function (btn) {
    btn.addEventListener('click', function () {
      show(ids.indexOf(btn.getAttribute('data-goto')));
    });
  });

  window.addEventListener('popstate', function () { show(indexFromHash(), false); });

  document.addEventListener('keydown', function (e) {
    if (!isDesktop()) return;
    if (e.target.closest('input, textarea')) return;
    if (e.key === 'ArrowRight') show(Math.min(current + 1, panels.length - 1));
    if (e.key === 'ArrowLeft') show(Math.max(current - 1, 0));
  });

  // Mobile menu
  var menuToggle = document.getElementById('menuToggle');

  function setMenu(open) {
    document.body.classList.toggle('nav-open', open);
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      setMenu(!document.body.classList.contains('nav-open'));
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  window.addEventListener('resize', function () { show(current, false); });

  // Work cards: reveal the rest of the write-up
  Array.prototype.slice.call(document.querySelectorAll('.read-more')).forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = btn.closest('.work-card');
      var open = card.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? 'Show less' : 'Read more';
    });
  });

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Contact form opens the visitor's email app
  var CONTACT_EMAIL = 'wycliffeomonge1@gmail.com';
  var contactForm = document.getElementById('contactForm');
  var formNote = document.getElementById('formNote');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = contactForm.elements.name.value.trim();
      var email = contactForm.elements.email.value.trim();
      var message = contactForm.elements.message.value.trim();
      var subject = 'Portfolio message from ' + name;
      var body = message + '\n\nFrom: ' + name + '\nReply to: ' + email;
      window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      if (formNote) {
        formNote.textContent = 'Your email app should be opening now. If it does not, write to ' + CONTACT_EMAIL + ' directly.';
      }
    });
  }

  show(indexFromHash(), false);
})();
