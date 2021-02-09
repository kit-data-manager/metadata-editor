/**
 * operation type enumeration
 * @type type
 */
const operationType = {
    READ: "READ",
    CREATE: "CREATE",
    UPDATE: "UPDATE",
    DELETE: "DELETE"
};

/**
 * modal type enumeration
 * @type type
 */
const modalType = {
    ALERT: "ALERT",
    FAILED: "FAILED",
    SUCCESS: "SUCCESS"
};

/**
 * 
 * @type type
 */
var modal = {
    'success': {
        'type': modalType.SUCCESS,
        'id': 'success-modal',
        'icon': '<i class="fas fa-check"></i>'
    },
    'alert': {
        'type': modalType.ALERT,
        'id': 'alert-modal',
        'icon': '<i class="fas fa-exclamation"></i>'
    },
    'failed': {
        'type': modalType.FAILED,
        'id': 'failed-modal',
        'icon': '<i class="fas fa-exclamation"></i>'
    }
};

//icons
var iconEye = function (cell, formatterParams) {
    return "<i class='fa fa-eye'>\n\</i>";
};
var iconEdit = function (cell, formatterParams) {
    return "<i class='fa fa-edit'>\n\</i>";
};
var iconTrash = function (cell, formatterParams) {
    return "<i class='fa fa-trash'></i>";
};

//form element
var formElt = null;

/**
 * Based on the modalInput,a modal is generated.
 * @param {type} modalInput indicates if an alert, success or a failed modal has to be generated.
 * @returns {String} modal
 */
var modalTemplate = function (modalInput) {
    var modalId;
    var icon;
    var button;

    if (modalInput === modalType.ALERT) {
        modalId = modal.alert.id;
        icon = modal.alert.icon;
        button = '<button type="button" class="btn btn-default btn-alert" data-dismiss="modal">Close</button>';
    } else if (modalInput === modalType.SUCCESS) {
        modalId = modal.success.id;
        icon = modal.success.icon;
        button = '<button type="button" class="btn btn-default">Close</button>';
    } else if (modalInput === modalType.FAILED) {
        modalId = modal.failed.id;
        icon = modal.failed.icon;
        button = '<button type="button" class="btn btn-default btn-failed">Close</button>';
    }

    return '<div id="' + modalId + '" class="modal fade" data-keyboard="false" data-backdrop="static">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header justify-content-center">' +
            '<div class="icon-box">' +
            icon +
            '</div>' +
            '</div>' +
            '<div id="alert-modal-body" class="modal-body text-center">' +
            '<p></p>' +
            button +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
};

/**
 * describes the internal representation of the Editor in case a form will be generated.
 * @returns {editorDefinitionForm}
 */
var editorDefinitionForm = function () {
    /**
     * form element.
     */
    this.renderElt = null;
    /*
     *  operation
     */
    this.operation = null;
    /*
     * JSON data Model
     */
    this.dataModel = null;
    /*
     * JSON uiForm
     */
    this.uiForm = null;
    /*
     * JSON resource
     */
    this.resource = null;
};

/**
 * describes the internal representation of the Editor in case a table will be generated.
 * @returns {editorDefinitionTable}
 */
var editorDefinitionTable = function () {

    /*
     * table Element
     */
    this.renderElt = null;

    /*
     * identifer of the table, which will be created.
     */
    this.tableId = null;

    /*
     * JSON dataModel 
     */
    this.dataModel = null;

    /*
     * JSON resource
     */
    this.resource = null;

    /*
     * columns of the table 
     */
    this.items = null;

    /*
     * 
     */
    this.uiForm = null;
};

/**
 * shows an alert modal and throws an error message.
 * @param {type} errorMsg error message that should be shown in the modal
 * @returns {undefined}
 */
_throw = errorMsg => {
    showModal(modalType.ALERT, errorMsg, "");
    throw errorMsg;
};
/**
 * shows a modal.
 * @param {type} type represents the modal type. It can be an ALERT, FAILED or SUCCESS.
 * @param {type} message represents the message, which should be shown in the modal.
 * @param {type} link represents the link of the page, where should be redirected.
 * @returns {undefined}
 */
showModal = (type, message, link) => {
    var modelId;
    if (type === modalType.ALERT) {
        modelId = "#" + modal.alert.id;
    } else if (type === modalType.FAILED) {
        modelId = "#" + modal.failed.id;
        $(modelId + " .btn").on('click', function () {
            window.location.href = link;
        });
    } else if (type === modalType.SUCCESS) {
        modelId = "#" + modal.success.id;
        $(modelId + " .btn").on('click', function () {
            window.location.href = link;
        });
    } else {
        _throw(type + ": Unknown model type!");
        return;
    }
    $(modelId + " .modal-body>p").empty();
    $(modelId + " .modal-body>p").append(message);
    $(modelId).modal('show');
};

/**
 * main method in case a form will be generated.
 * 
 * @param {type} options
 * @param {type} callback
 * @returns {undefined}
 */
$.fn.metadataeditorForm = function (options, callback) {
    var renderElt = this;
    formElt = renderElt;
    var editor = new editorDefinitionForm();
    editor.initializeInputsForm(options, renderElt);
    editor.render(callback);
    return editor;
};
/**
 * main method in case a TABLE will be generated.
 * @param {type} options
 * @returns {editorDefinitionForTable|editorDefinitionTable|$.fn.metadataeditorTable.editor|window.$.fn.metadataeditorTable.editor}
 */
$.fn.metadataeditorTable = function (options) {
    var renderElt = this;
    var editor = new editorDefinitionTable();
    editor.initializeInputsTable(options, renderElt);
    editor.generateTable(options);
    return editor;
};
/**
 * Initializes the editor definition structure in case a table will be generated.
 *  
 * @param {type} options
 * @param {type} renderElt
 * @returns {undefined}
 */

editorDefinitionTable.prototype.initializeInputsTable = function (options, renderElt) {

    if (options.dataModel !== undefined && options.dataModel !== null && options.dataModel !== '') {
        this.dataModel = options.dataModel;
    } else {
        _throw("JSON Data Model is missing");
    }

    if (options.resource !== undefined && options.resource !== null && options.resource !== '') {
        this.resource = options.resource;
    } else if ((options.readOperation !== undefined) || (options.updateOperation !== undefined) || (options.deleteOperation !== undefined)){
        _throw("JSON resource is missing");
    }
    
    if (options.items !== undefined && options.items !== null && options.items !== '') {
        this.items = options.items;
    } else {
        _throw("JSON Items List is missing");
    }

    this.uiForm = options.uiForm || "*";
    this.tableId = "#" + renderElt.attr('id');
    this.renderElt = renderElt;


};
/**
 * Initializes the editor definition structure
 *  
 * @param {type} options
 * @param {type} renderElt
 * @returns {undefined}
 */
editorDefinitionForm.prototype.initializeInputsForm = function (options, renderElt) {

    this.operation = options.operation || _throw("Operation is missing");
    this.dataModel = options.dataModel || _throw("JSON Data Model is missing");
    this.uiForm = options.uiForm || "*";
    this.resource = options.resource || null;
    this.renderElt = renderElt;
};
/**
 * Based on the given operation, a form will be generated.
 * @param {type} callback callback function
 * @returns {undefined}
 */
editorDefinitionForm.prototype.render = function (callback) {

    (this.operation === operationType.READ) ? this.generateReadForm() : ((this.operation === operationType.CREATE) ? this.generateCreateForm(callback) :
            ((this.operation === operationType.UPDATE) ? this.generateUpdateForm(callback) : ((this.operation === operationType.DELETE) ?
                    this.generateDeleteForm(callback) : _throw("Unknown operation!"))));
};

/**
 *  generates and initializes the table as well as the icons. 
 *  
 * @param {type} readOperation callback function, which is executed when the user clicks on the eye icon.
 * @param {type} updateOperation callback function, which is executed when the user clicks on the edit icon.
 * @param {type} deleteOperation callback function, which is executed when the user clicks on the trash icon.
 * @param {type} createOperation callback function, which is executed when the user clicks on the create button.
 * @returns {undefined}
 */
editorDefinitionTable.prototype.generateTable = function (options) {

    if (options.readOperation !== undefined) {
        this.items.push({formatter: iconEye, hozAlign: "right", width: 60, headerSort: false, cellClick: function (e, cell) {
                emptyElt(formElt);
                options.readOperation(cell.getRow().getData());
            }});
    }

    if (options.updateOperation !== undefined) {
        this.items.push({formatter: iconEdit, hozAlign: "right", width: 60, headerSort: false, cellClick: function (e, cell) {
                emptyElt(formElt);
                options.updateOperation(cell.getRow().getData());
            }});
    }

    if (options.deleteOperation !== undefined) {
        this.items.push({formatter: iconTrash, hozAlign: "right", width: 60, headerSort: false, cellClick: function (e, cell) {
                emptyElt(formElt);
                options.deleteOperation(cell.getRow().getData());
            }});
    }

    var table = new Tabulator(this.tableId, {
        layout: "fitColumns",
        height: "100%",
        paginationSize: 10,
        pagination: "local",
        placeholder: "No Data Set",
        columns: this.items
    });
    table.setData(this.resource);
    if (options.createOperation !== undefined) {
        $("<div class=\"container\"><div class=\"row\"><div class=\"col-md-12 text-right\"><button type=\"button\" class=\"btn btn-primary\" style=\"margin-top:15px;\" id=\"editor-create-button\">Create</button></div></div></div>").insertAfter(this.tableId);
        $("#editor-create-button").click(function () {
            emptyElt(formElt);
            options.createOperation();

        });
    }
};

/**
 * resets an element.
 * 
 * @param {type} elt element
 * @returns {undefined}
 */
emptyElt = elt => {
    if (elt !== null)
        elt.empty();
};

/**
 * generates an empty form. 
 * @param {type} callback
 * @returns {undefined}
 */
editorDefinitionForm.prototype.generateCreateForm = function (callback) {
    this.renderElt.jsonForm({
        schema: this.dataModel,
        form: [
            this.uiForm,
            {
                "type": "submit",
                "title": this.operation
            }
        ],
        "onSubmitValid": function (values) {
            callback(JSON.stringify(values, null, '\t'));
        }
    });
};

/**
 * generates a form filled with values.
 * @param {type} callback
 * @returns {undefined}
 */

editorDefinitionForm.prototype.generateUpdateForm = function (callback) {

    if (!this.resource) {
        throw new Error('JSON resource is missing');
    }
    this.renderElt.jsonForm({
        schema: this.dataModel,
        form: [
            this.uiForm,
            {
                "type": "submit",
                "title": this.operation
            }
        ],
        value: this.resource,
        "onSubmitValid": function (values) {
            callback(JSON.stringify(values, null, '\t'));
        }
    });
};

/**
 * generates a form filled with values. It is used only to show the values, no button is generated.
 * @returns {undefined}
 */
editorDefinitionForm.prototype.generateReadForm = function () {

    if (!this.resource) {
        throw new Error('JSON resource is missing');
    }
    this.renderElt.jsonForm({
        schema: this.dataModel,
        form: [
            this.uiForm
        ],
        value: this.resource
    });
};

/**
 * generates a form filled with read-only values.
 * @param {type} callback
 * @returns {undefined}
 */
editorDefinitionForm.prototype.generateDeleteForm = function (callback) {
    var copyResource = this.resource;
    if (!this.resource) {
        throw new Error('JSON resource is missing');
    }
    this.renderElt.jsonForm({
        schema: this.dataModel,
        form: [
            this.uiForm,
            {
                "type": "submit",
                "title": this.operation
            }
        ],
        value: this.resource,
        readonly: "true",
        "onSubmit": function () {
            callback(JSON.stringify(copyResource, null, '\t'));
        }
    });
};