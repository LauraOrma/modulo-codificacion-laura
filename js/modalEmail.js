document.addEventListener('DOMContentLoaded', () => {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailField = document.getElementById('email');
  const modal = document.getElementById('emailModal');
  const modalContent = modal.querySelector('.modal__content');
  const reviewBtn = document.getElementById('reviewEmail');
  const skipBtn = document.getElementById('skipEmail');

  let nextFocusable = null;

  function openModal() {
    modal.removeAttribute('hidden');
    modalContent.focus();
    document.addEventListener('keydown', trapFocus);
    document.addEventListener('keydown', escCloseModal);
  }

  function closeModal() {
    modal.setAttribute('hidden', 'true');
    document.removeEventListener('keydown', trapFocus);
    document.removeEventListener('keydown', escCloseModal);
  }

  function trapFocus(e) {
    const focusables = modal.querySelectorAll('button');
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function escCloseModal(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
      if (nextFocusable) nextFocusable.focus();
    }
  }

  modal.addEventListener('click', (e) => {
    if (!modalContent.contains(e.target)) {
      closeModal();
      if (nextFocusable) nextFocusable.focus();
    }
  });

  emailField.addEventListener('blur', () => {
    if (!regexEmail.test(emailField.value.trim())) {
      const focusables = Array.from(document.querySelectorAll('input, textarea, button'))
        .filter(el => !el.disabled && el.offsetParent !== null);
      const currentIndex = focusables.indexOf(emailField);
      nextFocusable = focusables[currentIndex + 1] || null;

      openModal();
    }
  });

  reviewBtn.addEventListener('click', () => {
    closeModal();
    emailField.focus();
  });

  skipBtn.addEventListener('click', () => {
    closeModal();
    if (nextFocusable) nextFocusable.focus();
  });
});
