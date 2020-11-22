 $.fn.metadataeditor = function (inputs, callback) {
    var renderElt = this;
    console.log(inputs.renderType);
    switch (inputs.renderType) {
        case "FORM":
            validateInputs(inputs.dataModel);
            validateInputs(inputs.uiForm);
            if (inputs.resource !== null && validateInputs(inputs.resource)) {
                generateFormFilledWithValues(inputs.dataModel, inputs.uiForm, inputs.resource, renderElt, callback);
            } else {
                generateForm(inputs.dataModel, inputs.uiForm, renderElt, callback);
            }
             break;
        case "TABLE":
            generateTable();
        default:
            console.log("unknown Type");
    }
}

function validateInputs(file) {
    if (!checkFileExistence(file)) {
        throw "File '" + file + "' does not exist";
    }else{
        return true;
    }
}

function generateForm(dataModel, uIForm, formElt, callback) {
    $.getJSON(dataModel, function (jsonDataModel) {
        $.getJSON(uIForm, function (jsonUIForm) {
            formElt.jsonForm({
                schema: jsonDataModel,
                form: [
                    jsonUIForm,
                    {
                        "type": "submit",
                        "title": "Create"
                    }
                ],
                "onSubmitValid": function (values) {
                    callback(JSON.stringify(values, null, '\t'));
                }
            });
        });
    });
}
function generateFormFilledWithValues(dataModel, uIForm, resource, formElt, callback) {
    $.getJSON(dataModel, function (jsonDataModel) {
        $.getJSON(uIForm, function (jsonUIForm) {
            $.getJSON(resource, function (jsonresource) {
                formElt.jsonForm({
                    schema: jsonDataModel,
                    form: [
                        jsonUIForm,
                        {
                            "type": "submit",
                            "title": "Update"
                        },
                        {
                            "type": "submit",
                            "title": "Delete"
                        }
                    ],
                    value: jsonresource,
                    "onSubmitValid": function (values) {
                        callback(JSON.stringify(values, null, '\t'));
                    }
                });
            });
        });
    });
}

checkFileExistence = function (file) {
    var fileFound = false;
    $.ajax({
        url: file,
        type: 'GET',
        async: false,
        success: function ()
        {
            fileFound = true;
        }
    });
    return fileFound;
}