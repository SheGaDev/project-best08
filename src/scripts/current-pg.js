const refs = {
    currentUrl: window.location.href,
    link: document.querySelectorAll('.header-list a'),
    currentHome: document.querySelector('#home-link'),
  };

refs.link.forEach(function (link) {
if (link.href === refs.currentUrl) {
link.classList.add('current');
} 
else {
      link.classList.remove('current');
    }
  });