/* eslint-disable class-methods-use-this */
export default class ListEditor {
  constructor(container) {
    this.container = null;
    this.newButton = null;
    this.editClickListeners = [];
    this.deleteClickListeners = [];
    this.newClickListeners = [];
    this.tasksTable = null;
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  /**
   * Draws UI with buttons
   *
   * @param theme
   */
  drawUi() {
    this.checkBinding();

    this.container.innerHTML = `
      <header class="editor-header">
        <h2>Задачи</h2>
        <button data-id="action-add" class="btn"><i class="fas fa-plus"></i></button>
      </header>
      <div class="list-editor-container">
        <table data-id="list-editor" class="list-editor">
          <thead>
            <th>Название</th>
            <th>Стоимость</th>
            <th>Действия</th>
          </thead>
          <tbody>
            <tr id="empty-row"><td colspan="3">Задач не найдено</td></tr>
          </tbody>
        </table>
      </div>
    `;
    this.newButton = this.container.querySelector('[data-id="action-add"]');
    this.newButton.addEventListener('click', e => this.onNewClick(e));
    this.tasksTable = document.querySelector('[data-id="list-editor"]');
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('Element not bind to DOM');
    }
  }

  openModal(name = '', price = '') {
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal');
    modalContainer.classList.add('show');
    modalContainer.innerHTML = `
    <div class="modal--inner">
      <form>
        <div class="form-group">
          <label for="inputName" class="form-label">Название</label>
          <input value="${name}" data-id="inputName" type="text" class="form-control" id="inputName" aria-describedby="inputName">
        </div>
        <div class="form-group">
          <label for="inputPrice" class="form-label">Стоимость</label>
          <input value="${price}" data-id="inputPrice" type="text" class="form-control" id="inputPrice">
        </div>
        <div class="form-group d-flex">
          <button type="button" data-id="saveButton" class="btn btn-primary">Сохранить</button>
          <button type="button" data-id="cancelButton" class="btn btn-primary">Отмена</button>
        </div>  
      </form>
  </div>
    `;

    modalContainer.querySelector('[data-id="saveButton"]').addEventListener('click', evt => this.saveForm(evt));
    modalContainer.querySelector('[data-id="cancelButton"]').addEventListener('click', evt => this.closeModal());

    document.querySelector('body').appendChild(modalContainer);
  }

  saveForm(evt) {
    evt.preventDefault();
    const name = document.querySelector('[data-id="inputName"');
    const price = document.querySelector('[data-id="inputPrice"');
    name.classList.remove('invalid');
    price.classList.remove('invalid');
    if (name.value && price.value) {
      this.addLi(name.value, price.value);
      this.closeModal();
    } else if (!name.value) {
      name.classList.add('invalid');
    } else if (!price.value) {
      price.classList.add('invalid');
    }
  }

  addLi(name, price) {
    if (this.tasksTable.querySelector('#empty-row')) {
      this.tasksTable.querySelector('#empty-row').remove();
    }
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${name}</td>
        <td>${price}</td>
        <td>
          <button type="button" data-id="inputEdit"><i class="fas fa-pencil-alt"></i></button>
          <button type="button" data-id="inputDelete"><i class="fas fa-times"></i></button>
        </td>
        `;
    this.tasksTable.querySelector('tbody').appendChild(row);
  }

  closeModal() {
    document.querySelector('.modal').remove();
  }

  /**
   * Add listener to New button
   *
   * @param callback
   */
  addNewClickListener(callback) {
    this.newClickListeners.push(callback);
  }

  onNewClick(event) {
    this.newClickListeners.forEach(o => o.call(null, event));
  }
}
