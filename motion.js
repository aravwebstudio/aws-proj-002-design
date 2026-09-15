(function () {
  'use strict';

  function initialiseSiteMotion() {

  var root = document.documentElement;
  var menuButton = document.querySelector('.nav-toggle');
  var navigation = document.getElementById('site-nav');

  if (menuButton && navigation) {
    menuButton.addEventListener('click', function handleMenuToggle() {
      var open = navigation.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) return;

  var revealItems = [];
  var maximumDelay = 280;

  function mark(element, type, delay) {
    if (!element || element.hasAttribute('data-reveal')) return;
    if (element.parentElement && element.parentElement.closest('[data-reveal]')) return;

    element.setAttribute('data-reveal', type || 'up');
    element.style.setProperty('--reveal-delay', Math.min(delay || 0, maximumDelay) + 'ms');
    revealItems.push(element);
  }

  function markChildren(selector, type, stagger) {
    document.querySelectorAll(selector).forEach(function (parent) {
      Array.prototype.forEach.call(parent.children, function (child, index) {
        mark(child, type, index * stagger);
      });
    });
  }

  function markSplitColumns() {
    document.querySelectorAll('.split').forEach(function (split) {
      Array.prototype.forEach.call(split.children, function (child, index) {
        mark(child, index % 2 === 0 ? 'left' : 'right', index * 70);
      });
    });
  }

  markChildren('.hero-copy', 'up', 65);
  mark(document.querySelector('.hero-art'), 'right', 90);
  markChildren('.page-hero > .container', 'up', 70);
  markSplitColumns();

  document.querySelectorAll('.section-head').forEach(function (heading) {
    mark(heading, 'up', 0);
  });

  [
    '.checklist',
    '.ladder',
    '.stickers',
    '.steps',
    '.notice-list',
    '.quote-grid',
    '.contact-grid',
    '.facility-grid',
    '.album-grid',
    '.news-grid',
    '.eligibility-cards',
    '.contact-list',
    '.footer-grid'
  ].forEach(function (selector) {
    markChildren(selector, 'up', 55);
  });

  document.querySelectorAll('.program > .container, .vm-grid, .form-layout').forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, index) {
      mark(child, index % 2 === 0 ? 'left' : 'right', index * 70);
    });
  });

  document.querySelectorAll('.data-table, .consent-note, .fee-note, .alert-band, .footer-bottom').forEach(function (item) {
    mark(item, 'up', 0);
  });

  var scribbles = Array.prototype.slice.call(document.querySelectorAll('.scribble'));
  scribbles.forEach(function (scribble) {
    scribble.setAttribute('data-draw', '');
  });

  function reveal(element) {
    element.classList.add('is-visible');
  }

  function draw(scribble) {
    scribble.classList.add('is-drawn');
  }

  function revealItemsInView() {
    var revealLine = window.innerHeight * 0.94;

    revealItems.forEach(function (item) {
      if (item.classList.contains('is-visible')) return;
      var bounds = item.getBoundingClientRect();
      if (bounds.top <= revealLine && bounds.bottom >= 0) reveal(item);
    });

    scribbles.forEach(function (scribble) {
      if (scribble.classList.contains('is-drawn')) return;
      var bounds = scribble.getBoundingClientRect();
      if (bounds.top <= revealLine && bounds.bottom >= 0) draw(scribble);
    });
  }

  var visibilityTimer;

  function handleViewportChange() {
    window.clearTimeout(visibilityTimer);
    visibilityTimer = window.setTimeout(revealItemsInView, 32);
  }

  if (!('IntersectionObserver' in window)) {
    revealItems.forEach(reveal);
    scribbles.forEach(draw);
    return;
  }

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      reveal(entry.target);
      revealObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -6% 0px'
  });

  var drawObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      draw(entry.target);
      drawObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.35
  });

  revealItems.forEach(function (item) {
    revealObserver.observe(item);
  });
  scribbles.forEach(function (scribble) {
    drawObserver.observe(scribble);
  });

    root.classList.add('motion-ready');
    window.addEventListener('scroll', handleViewportChange, { passive: true });
    window.addEventListener('resize', handleViewportChange);
    window.setTimeout(revealItemsInView, 40);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialiseSiteMotion, { once: true });
  } else {
    initialiseSiteMotion();
  }
}());
