export default class ListEditorController {
  constructor(listEditor) {
    this.listEditor = listEditor;
  }

  init() {
    this.listEditor.drawUi();
    this.listEditor.loadFromLocalStorage();
    this.listEditor.addNewClickListener(this.onNewClick.bind(this));
  }

  onNewClick(li) {
    this.listEditor.openModal();
  }
}
