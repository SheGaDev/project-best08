const refs = {
    currentUrl: window.location.href,
    links: document.querySelectorAll('.header-list a, .mobile-menu-list a'),
    currentHome: document.querySelector('#home-link'),
    currentMobileHome: document.querySelector('#home-link-mobile'),
  };

  
  refs.links.forEach(function (link) {
    if (link.href === refs.currentUrl) {
      link.classList.add('current');
    } else {
      link.classList.remove('current');
    }
  });