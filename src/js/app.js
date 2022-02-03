import ListEditor from './ListEditor';
import ListEditorController from './ListEditorController';

const listEditor = new ListEditor();

listEditor.bindToDOM(document.querySelector('#list-editor'));

const listEditorCtrl = new ListEditorController(listEditor);

listEditorCtrl.init();
