export default class Popover {
  constructor(triggerElement, options = {}) {
    this.trigger = triggerElement;
    this.title = options.title || 'Заголовок';
    this.content = options.content || 'Текст подсказки';

    this.isShown = false;
    this.popoverContainer = null;

    this.showBound = this.show.bind(this);
    this.documentClickBound = this.handleDocumentClick.bind(this);
  }

  init() {
    this.trigger.setAttribute('data-popover-instance', 'true');
    this.trigger.addEventListener('click', this.showBound);
    document.addEventListener('click', this.documentClickBound);
  }

  calculatePosition() {
    const rect = this.trigger.getBoundingClientRect();
    const { scrollX, scrollY } = window;
    
    const popoverWidth = this.popoverContainer.offsetWidth;
    const popoverHeight = this.popoverContainer.offsetHeight;

    const left = scrollX + rect.left + rect.width / 2 - popoverWidth / 2;
    const top = scrollY + rect.top - popoverHeight - 8;

    return { top, left };
  }

  show() {
    if (this.isShown) {
      this.hide();
      return;
    }

    if (!this.popoverContainer) {
      const container = document.createElement('div');
      container.className = 'popover-container';

      container.innerHTML = `
        <div class="popover-arrow"></div>
        <h3 class="popover-title"></h3>
        <div class="popover-content"></div>
      `;

      document.body.append(container);

      this.popoverContainer = container;
      container.querySelector('.popover-title').textContent = this.title;
      container.querySelector('.popover-content').textContent = this.content;
    }

    const coords = this.calculatePosition();
    this.popoverContainer.style.left = `${coords.left}px`;
    this.popoverContainer.style.top = `${coords.top}px`;
    
    this.popoverContainer.classList.add('active');
    this.isShown = true;
  }

  hide() {
    if (!this.isShown) return;

    if (this.popoverContainer) {
      this.popoverContainer.remove();
      this.popoverContainer = null;
    }
    
    this.isShown = false;
  }

  handleDocumentClick(event) {
    const { target } = event;

    if (this.isShown) {
      if (this.trigger.contains(target)) {
        return;
      }

      if (this.popoverContainer && !this.popoverContainer.contains(target)) {
        this.hide();
      }
    }
  }

  destroy() {
    this.hide();
    this.trigger.removeAttribute('data-popover-instance');
    this.trigger.removeEventListener('click', this.showBound);
    document.removeEventListener('click', this.documentClickBound);
  }
}
