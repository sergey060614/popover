import Popover from '../popover';

describe('Тестирование виджета Popover', () => {
  let button;

  beforeEach(() => {
    document.body.innerHTML = '<button id="test-btn" data-popover>Кликни меня</button><div id="blank-space"></div>';
    button = document.getElementById('test-btn');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('Поповер изначально должен отсутствовать в DOM', () => {
    const popoverWidget = new Popover(button, { title: 'Заголовок', content: 'Текст' });
    popoverWidget.init();
    const popover = document.querySelector('.popover-container');
    
    expect(popover).toBeNull();
  });

  test('Поповер должен успешно добавляться в DOM при клике на кнопку', () => {
    const popoverWidget = new Popover(button, { title: 'Проверка', content: 'Тестовый текст' });
    popoverWidget.init();

    button.click();

    const popover = document.querySelector('.popover-container');
    expect(popover).not.toBeNull();
    expect(popover.classList.contains('active')).toBe(true);
    
    expect(popover.querySelector('.popover-title').textContent).toBe('Проверка');
    expect(popover.querySelector('.popover-content').textContent).toBe('Тестовый текст');
  });

  test('Поповер должен полностью удаляться из DOM при повторном клике на ту же кнопку', () => {
    const popoverWidget = new Popover(button, { title: 'Заголовок', content: 'Текст' });
    popoverWidget.init();

    button.click();
    expect(document.querySelector('.popover-container')).not.toBeNull();

    button.click();
    expect(document.querySelector('.popover-container')).toBeNull();
  });

  test('Поповер должен закрываться при клике в любое пустое место экрана (вне кнопки)', () => {
    const popoverWidget = new Popover(button, { title: 'Заголовок', content: 'Текст' });
    popoverWidget.init();

    button.click();
    expect(document.querySelector('.popover-container')).not.toBeNull();

    const blankSpace = document.getElementById('blank-space');
    blankSpace.click();
    
    expect(document.querySelector('.popover-container')).toBeNull();
  });
});
