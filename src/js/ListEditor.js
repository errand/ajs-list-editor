/* eslint-disable class-methods-use-this */
export default class ListEditor {
  constructor(container) {
    this.container = null;
    this.editClickListeners = [];
    this.deleteClickListeners = [];
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
        <button data-id="action-restart" class="btn"><i class="fas fa-plus"></i></button>
      </header>
      <div class="list-editor-container">
        <div data-id="list-editor" class="list-editor"></div>
      </div>
    `;
  }

  checkBinding() {
    if (this.element === null) {
      throw new Error('Element not bind to DOM');
    }
  }

  /**
   * Add listener to input
   *
   * @param callback
   */
  addEditClickListener(callback) {
    this.editClickListeners.push(callback);
  }

  onEditClick(event) {
    const input = this.formInput.value;
    this.editClickListeners.forEach(o => o.call(null, input));
  }

}
