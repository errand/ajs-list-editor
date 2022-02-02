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

  openModal(name = '', price = '', id = '') {
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

    modalContainer.querySelector('[data-id="saveButton"]').addEventListener('click', evt => this.saveForm(evt, id));
    modalContainer.querySelector('[data-id="cancelButton"]').addEventListener('click', () => this.closeModal());

    document.querySelector('body').appendChild(modalContainer);
  }

  saveForm(evt, id) {
    evt.preventDefault();
    console.log(id);
    const name = document.querySelector('[data-id="inputName"');
    const price = document.querySelector('[data-id="inputPrice"');
    name.classList.remove('invalid');
    price.classList.remove('invalid');
    if (name.value && price.value) {
      if (id) {
        this.updateLi(id, name.value, price.value);
      } else {
        this.addLi(name.value, price.value);
      }
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

    row.dataset.rowId = `row${this.getRandomInt()}`;

    row.innerHTML = `
        <td data-id="tableName">${name}</td>
        <td data-id="tablePrice">${price}</td>
        <td>
          <button type="button" data-id="buttonEdit"><i class="fas fa-pencil-alt"></i></button>
          <button type="button" data-id="buttonDelete"><i class="fas fa-times"></i></button>
        </td>
        `;
    this.tasksTable.querySelector('tbody').appendChild(row);
    row.querySelector('[data-id="buttonEdit"]').addEventListener('click', () => this.editTask(row.dataset.rowId));
    row.querySelector('[data-id="buttonDelete"]').addEventListener('click', () => this.deleteTask(row.dataset.rowId));
    this.saveToLocalStorage();
  }

  updateLi(id, name, price) {
    const row = this.tasksTable.querySelector(`[data-row-id="${id}"]`);
    row.querySelector('[data-id="tableName"]').innerHTML = name;
    row.querySelector('[data-id="tablePrice"]').innerHTML = price;
    this.saveToLocalStorage();
  }

  editTask(id) {
    const tr = this.tasksTable.querySelector(`[data-row-id="${id}"]`);

    const name = tr.querySelector('[data-id="tableName"]').innerHTML;
    const price = tr.querySelector('[data-id="tablePrice"]').innerHTML;

    this.openModal(name, price, id);
  }

  deleteTask(id) {
    this.tasksTable.querySelector(`[data-row-id="${id}"]`).remove();
    this.saveToLocalStorage();
  }

  closeModal() {
    document.querySelector('.modal').remove();
  }

  saveToLocalStorage() {
    const rows = this.tasksTable.querySelectorAll('tbody tr');
    console.log([...rows]);
    [...rows].reduce((acc, tr) => {
      console.log(acc);
    }, {});
    const fields = [...rows].map(({ id, value }) => ({ id, value }));
    console.log(fields);
    // localStorage.setItem('rows', JSON.stringify(fields));
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

  getRandomInt() {
    return Math.floor(1000 + Math.random() * 99999);
  }
}
