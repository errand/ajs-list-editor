export default class ListEditorController {
  constructor(listEditor, listEditorService) {
    this.listEditor = listEditor;
    this.listEditorService = listEditorService;
  }

  init() {
    this.listEditor.drawUi();
    this.listEditor.editClickListeners(this.onEditClick.bind(this));
    this.listEditor.deleteClickListeners(this.onDeleteClick.bind(this));
  }

  onEditClick(li) {
    console.log(li)
  }

  onDeleteClick(li) {
    console.log(li)
  }
}
