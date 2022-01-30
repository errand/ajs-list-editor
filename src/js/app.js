import ListEditor from './ListEditor';
import ListEditorController from './ListEditorController';
import ListEditorService from './ListEditorService';

const listEditor = new ListEditor();

listEditor.bindToDOM(document.querySelector('#list-editor'));

const listEditorService = new ListEditorService(localStorage);

const listEditorCtrl = new ListEditorController(listEditor, listEditorService);

listEditorCtrl.init();
