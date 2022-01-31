export default class ListEditorController {
  constructor(listEditor, listEditorService) {
    this.listEditor = listEditor;
    this.listEditorService = listEditorService;
  }

  init() {
    this.listEditor.drawUi();
    this.listEditor.addNewClickListener(this.onNewClick.bind(this));
  }

  onNewClick(li) {
    this.listEditor.openModal();
  }
}
