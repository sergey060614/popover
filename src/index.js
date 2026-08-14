import './css/style.css';
import Popover from './js/popover';

document.addEventListener('DOMContentLoaded', () => {
  const triggers = document.querySelectorAll('[data-popover]');

  triggers.forEach((el) => {
    const configText = el.dataset.popoverConfig || '{}';
    let config = {};

    try {
      config = JSON.parse(configText);
    } catch (e) {
      config = {};
    }

    const popover = new Popover(el, config);
    popover.init();
  });
});
