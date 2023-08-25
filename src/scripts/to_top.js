const btnUp = {
  el: document.querySelector('.to_top'),
  addEventListener() {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      if (scrollY > 300) {
        document.querySelector('.to_top').style.display = 'flex'
      } else {
        document.querySelector('.to_top').style.display = 'none'
      }
    });
    document.querySelector('.to_top').onclick = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
}

btnUp.addEventListener();
