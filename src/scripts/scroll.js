export { onTop, onScroll };

window.addEventListener('scroll', onScroll);
const scrollUpButton = document.getElementById('scrollUp');
scrollUpButton.addEventListener('click', onTop);

function onScroll() {
  scrollUpButton.classList.toggle('active', window.scrollY > 500);
}

function onTop() {
  if (window.pageYOffset > 0) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
