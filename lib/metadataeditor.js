/**
 * Editor definition class.
 *
 * describes the internal representation of the Editor.
 *
 * @class
 */
var editorDefinition = function () {
    this.renderElt = null;
    this.renderType = null;
    this.operation = null;
    this.dataModel = null;
    this.uiForm = null;
    this.resource = null;
};

/**
 * render type enumeration
 * @type type
 */
const renderTypeEnum = {
    FORM: "FORM",
    TABLE: "TABLE"
};

/**
 * operation type enumeration
 * @type type
 */
const operationEnum = {
    CREATE: "CREATE",
    UPDATE: "UPDATE",
    DELETE: "DELETE"
};

/**
 * Initializes the editor definition structure
 *  
 * @param {type} options
 * @param {type} renderElt
 * @returns {undefined}
 */
editorDefinition.prototype.initialize = function (options, renderElt) {

    if (options.renderType) {
        this.renderType = options.renderType;
    } else {
        throw new Error('Render Type is missing');
    }

    if (options.operation) {
        this.operation = options.operation;
    } else {
        throw new Error('Operation is missing');
    }

    if (options.dataModel) {
        this.dataModel = options.dataModel;
    } else {
        throw new Error('JSON Data Model is missing');
    }

    if (options.uiForm) {
        this.uiForm = options.uiForm;
    } else {
        throw new Error('JSON UI Form is missing');
    }

    if (options.resource) {
        this.resource = options.resource;
    }

    this.renderElt = renderElt;
};

/**
 * main method 
 * 
 * @param {type} options
 * @param {type} callback
 * @returns {undefined}
 */
$.fn.metadataeditor = function (options, callback) {
    var renderElt = this;

    var editor = new editorDefinition();

    editor.initialize(options, renderElt);
    editor.render(callback);

    return editor;
};

/**
 * 
 * @param {type} callback
 * @returns {undefined}
 */
editorDefinition.prototype.render = function (callback) {
    if (this.renderType === renderTypeEnum.FORM && this.operation === operationEnum.CREATE) {
        this.generateFormWithoutValues(callback);
    }
    if (this.renderType === renderTypeEnum.FORM && this.operation === operationEnum.UPDATE) {
        this.generateFormForUpdate(callback);
    }
    if (this.renderType === renderTypeEnum.FORM && this.operation === operationEnum.DELETE) {
        this.generateFormForDelete(callback);
    }
};

/**
 * generates an empty form. 
 * @param {type} callback
 * @returns {undefined}
 */
editorDefinition.prototype.generateFormWithoutValues = function (callback) {
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
 * generates form filled with values.
 * @param {type} callback
 * @param {type} readonly
 * @returns {undefined}
 */
editorDefinition.prototype.generateFormForUpdate = function (callback) {
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

        //submit without validation
        "onSubmitValid": function (values) {
            callback(JSON.stringify(values, null, '\t'));
        }
    });
}

editorDefinition.prototype.generateFormForDelete = function (callback) {
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

        //submit without validation
        "onSubmit": function () {
            callback(copyResource);
        }
    });
}