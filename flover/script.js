// Wait for the document to load
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.remove('not-loaded');
  }, 100);
}); 