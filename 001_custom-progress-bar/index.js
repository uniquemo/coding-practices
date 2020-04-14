window.addEventListener('load', () => {
  const progress = document.querySelector('.progress-done');
  progress.style.width = progress.getAttribute('data-done') + '%';
  progress.style.opacity = 1;
})
