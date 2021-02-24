Metadata Editor
===============

The Metadata Editor is a JavaScript library allowing to generate web forms and validate metadata in an intuitive and generic way with the help of [JSON Form Library](https://github.com/jsonform/jsonform/wiki). Moreover, it enables to list various resources given by the user as a JSON object. In addition, the editor offers the possibility to the developer to add different icons in order to perform CRUD (Create, Read, Update, Delete) operations.

Objectives
----------

- Intuitive and generic generation of forms based on given JSON Schemas provided by the developer.
- Validation of JSON resources.
- Listing of JSON resources.

Dependencies
------------

The developer should add the editor as a library (JS files) in his project. The editor library contains 2 folders:
- “dependencies”, which contains the JSON form dependencies, the “fontawesome” library, which enables the creation of different icons, and the “tabulator” library for the generation of tables.
- “lib”, which contains the main JS file of the library and CSS files used for the style of the editor.

Getting started
---------------

The metadata Editor offers the possibility to generate web forms and list JSON resources. How can the developer generate them and which inputs should be given? This will be explained in details in the next subsections.

1. List JSON resources:

The developer can generate a table, that lists all given JSON resources. The “Tabulator” library is used in order to generate the table. The developer has to call the method “metadataeditorTable()”, which takes as a parameter a JSON object. The object should contain different keys and values that are described in the following table.

| Key                    | Description                                                      | Mandatory/Optional                    | Default Value |
| ---------------------- | ---------------------------------------------------------------- |---------------------------------------|---------------|
| dataModel              | represents a JSON schema, which describes the structure of the data model that must be created when the form is submitted. The JSON schema should follow the properties definition of [the JSON Schema specification](https://tools.ietf.org/html/draft-zyp-json-schema-04#section-5.2). | Mandatory |- |
| uiForm                 | JSON user interface form, which describes the structure of the form layout. It should follow the properties definition specified in [the JSON Form library](https://github.com/jsonform/jsonform/wiki#fields)  . | Optional | "*" (Default form layout is generated) |
| resource               | represents an array of JSON resources. | Mandatory (in case Read, Update or Delete operations should be performed)   |     - |
| items                  | represents an array of JSON objects, which includes the table’s column definitions. Each JSON object should include the following keys:   *“title”: The title that will be displayed in the header for this column.   *“field”: This is the key for this column in the JSON resource. | Mandatory | -  |
| readOperation(value)   | is a callback function. The “value” attribute contains the JSON resource of the appropriate row, already selected by the user. The implementation of this method is project-specific and should be performed when the user clicks on the eye icon. In case the developer does not give this callback function, the eye icon will not be shown. | Optional | |
| editOperation(value)   | is a callback function. The “value” attribute contains the JSON resource of the appropriate row, already selected by the user. The implementation of this method is project-specific and should be performed when the user clicks on the edit icon. In case the developer does not give this callback function, the edit icon will not be shown. | Optional|  |
| deleteOperation(value) | is a callback function. The “value” attribute contains the JSON resource of the appropriate row, already selected by the user. The implementation of this method is project-specific and should be performed when the user clicks on the trash icon. In case the developer does not give this callback function, the trash icon will not be shown. | Optional | |
| listOperation(value) | is a callback function. The “value” attribute contains the JSON resource of the appropriate row, already selected by the user. The implementation of this method is project-specific and should be performed when the user clicks on the list icon. In case the developer does not give this callback function, the list icon will not be shown. This function is supposed to be performed in case the JSON resource contains in turn a list of other JSON objects. | Optional | |
| createOperation()      | represents a JSON Object, which include the two keys: * “callback”: This describes the callback function, which will be executed only when the user clicks on the Create button. In case the developer does not give this callback function, the create button will not be shown. *”buttonTitle”: This describes the button Name. The default value is “Create”.  |Optional |  |

1.1 Example

Below you can find an example how the library can be used, in case the user wants to generate a table and list JSON resources. In order to  display the table, the developer has to add a table tag as you can see in the example.

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Getting started with Metadata Editor</title>

        <link rel="stylesheet" style="text/css" href="/editor/dependencies/fontawesome/css/all.css" />
        <link href="/editor/dependencies/tabulator/css/tabulator_bootstrap4.min.css" rel="stylesheet">
        <link rel="stylesheet" style="text/css" href="/editor/dependencies/jsonform/deps/opt/bootstrap-v4.5.2.css"/>
        <link rel="stylesheet" style="text/css" href="/editor/lib/css/metadataeditor.style.default.css" />
    </head>

    <body>
        <div class="container">
            <div class="col-12">
                <div class="boxlist margin-top-30" id="training-box">
                    <div class="box-header bg-green-blue">
                        <h4 class="box-title">Table Example</h4>
                    </div>
                    <div class="box-body"><div id="table"></div></div>
                </div>
            </div>
        </div>
        <script type="text/javascript" src="/editor/dependencies/jsonform/deps/jquery-v3.5.1.min.js"></script>
        <script type="text/javascript" src="/editor/dependencies/bootstrap/js/bootstrap-v4.5.3.min.js"></script>
        <script type="text/javascript" src="/editor/dependencies/jsonform/deps/underscore.js"></script>
        <script type="text/javascript" src="/editor/dependencies/jsonform/deps/opt/jsv.js"></script>
        <script type="text/javascript" src="/editor/dependencies/jsonform/lib/jsonform.js"></script>
        <script type="text/javascript" src="/editor/dependencies/tabulator/js/tabulator.min.js"></script>
        <script type="text/javascript" src="/editor/lib/js/metadataeditor.js"></script>
        <script>
            var dataModel = {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "title": "id"
                    },
                    "description": {
                        "type": "string",
                        "title": "description"
                    }
                }
            }
            var items = [{title: "Identifier", field: "id", headerSort: false},
                {title: "Description", field: "description", headerSort: false}
            ];
            var resource = [
                {
                    "id": "1134-f53-67tr",
                    "description": "1st collection",
                },
                {
                    "id": "1104-fg73-zo92",
                    "description": "2nd colelction",
                }
            ]

            var inputs = {dataModel: dataModel, uiForm: "*", resource: resource, items: items, 
            readOperation: function (rowColumnvalue){
                //project-specific implementation.
                //rowColumnvalue is the appropriate JSON value and can be used by the developer.
            },
            updateOperation: function (rowColumnvalue){
                //project-specific implementation.
                //rowColumnvalue is the appropriate JSON value and can be used by the developer.
            },
            deleteOperation: function (rowColumnvalue){
                //project-specific implementation.
                //rowColumnvalue is the appropriate JSON value and can be used by the developer.
            },
            createOperation: { callback: function (){
                //project-specific implementation.
            }, buttonTitle: "Name of the Create button"},
            
            listOperation: function(rowColumnvalue){
                //project-specific implementation.
            }
            };

            $('#table').metadataeditorTable(inputs);
        </script>
    </body>
</html>
```

2. Generate Form:
    
In addition to the generation of the table, the library enables to generate web forms based on given JSON schemas. It allows adding, modifying or deleting metadata. Moreover, a validation of user-provided metadata is supported by the library. In order to generate a form, “metadataeditorForm()” method should be called. The method should contain the following attributes:

* “options”: a JSON variable which should include the following keys:

1. operation (Mandatory): the name of the operation, which should be executed. It can be “CREATE”, “DELETE” or “UPDATE”. If operation “CREATE” is chosen, then an empty HTML form will be generated. Otherwise, if operation "UPDATE" or "DELETE" is chosen, a form, filled with the given values, will be generated. If the “DELETE” operation is chosen, the fields will be shown as readOnly so that the user cannot change their content. To implement this feature, the JSON Form library has been extended.
2. dataModel (Mandatory): a JSON data model, which describes the structure of JSON data.

3. uiForm (Optional): the JSON user interface form, which describes the structure of the form layout. In case it is not given, a default form layout will be generated.

4. resource: a JSON resource used to initialize the generated form. This attribute is Mandatory in case the operation is “UPDATE” or “DELETE”.
        
* onSubmitValid(value): a Callback function. If the function was correctly executed, the “value” variable will include the result, which is a validated JSON resource. Otherwise, an exception will be thrown.

2.1 Example

Below you can find an example how can the library be used in case of form generation. In order to display the form, the developer has to  add  the form tag as you can see in the example.

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Getting started with Metadata Editor</title>

        <link rel="stylesheet" style="text/css" href="/editor/dependencies/fontawesome/css/all.css" />
        <link href="/editor/dependencies/tabulator/css/tabulator_bootstrap4.min.css" rel="stylesheet">
        <link rel="stylesheet" style="text/css" href="/editor/dependencies/jsonform/deps/opt/bootstrap-v4.5.2.css"/>
        <link rel="stylesheet" style="text/css" href="/editor/lib/css/metadataeditor.style.default.css" />
    </head>

    <body>
        <div class="container">
            <div class="row"><div class="col-sm-6"><form></form></div></div>
        </div>
        <script type="text/javascript" src="/editor/dependencies/jsonform/deps/jquery-v3.5.1.min.js"></script>
        <script type="text/javascript" src="/editor/dependencies/bootstrap/js/bootstrap-v4.5.3.min.js"></script>
        <script type="text/javascript" src="/editor/dependencies/jsonform/deps/underscore.js"></script>
        <script type="text/javascript" src="/editor/dependencies/jsonform/deps/opt/jsv.js"></script>
        <script type="text/javascript" src="/editor/dependencies/jsonform/lib/jsonform.js"></script>
        <script type="text/javascript" src="/editor/dependencies/tabulator/js/tabulator.min.js"></script>
        <script type="text/javascript" src="/editor/lib/js/metadataeditor.js"></script>
        <script>
            var dataModel = {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "title": "id"
                    },
                    "description": {
                        "type": "string",
                        "title": "description"
                    }
                }
            }
            var resource = [
                {
                    "id": "1134-f53-67tr",
                    "description": "1st collection",
                },
                {
                    "id": "1104-fg73-zo92",
                    "description": "2nd colelction",
                }
            ]

            var options = {operation: "CREATE", dataModel: dataModel, uiForm: "*"};

            $('#form').metadataeditorForm(options, function onSubmitValid(value) {
                //project-specific implementation.
                //value is the appropriate JSON value and can be used by the developer.
            });
            
            options = {operation: "UPDATE", dataModel: dataModel, uiForm: "*", resource: resource};

            $('#form').metadataeditorForm(options, function onSubmitValid(value) {
                //project-specific implementation.
                //value is the appropriate JSON value and can be used by the developer.
            });

            options = {operation: "DELETE", dataModel: dataModel, uiForm: "*", resource: resource};

            $('#form').metadataeditorForm(options, function onSubmitValid(value) {
                //project-specific implementation.
                //value is the appropriate JSON value and can be used by the developer.
            });
        </script>
    </body>
</html>
```

3. Management of the Metadata Editor style:

The metadata editor library gives the possibility to the developer to manage the style of the user interface. It enables to manage the style of the icons, the table or also to generate modal windows. This will be described in the next subsections.

3.1 Icons Style:

The developer can create icons and add them to the inputs of the “metadataeditorTable()” function as a JSON object. The icons should be created with the help of [the “fontawesome” library](https://fontawesome.com/) and can be added to the inputs as below:

| Key                    | Description                                                      | Mandatory/Optional                    | Default Value |
| ---------------------- | ---------------------------------------------------------------- |---------------------------------------|---------------|
| readIcon               | represents the Font awesome class name of the icon, which enables the creation of the eye icon. In case the user clicks on this icon, the readOperation() will be performed. | Optional |'fa fa-eye' |
| editIcon               | represents the Font awesome class name of the icon, which enables the creation of the edit icon. In case the user clicks on this icon, the updateOperation() will be performed. | Optional |'fa fa-edit' |
| deleteIcon             | represents the Font awesome class name of the icon, which enables the creation of the trash icon. In case the user clicks on this icon, the deleteOperation() will be performed. | Optional |'fa fa-trash' |
| listIcon               | represents the Font awesome class name of the icon, which enables the creation of the list icon. In case the user clicks on this icon, the listOperation() will be performed. | Optional |'fa fa-list' |

3.2 Table Style:

The developer has the possibility to customize the layout of the table. As the generation of the table is made with the help of the tabulator library, its configuration should follow [the tabulator specification](http://tabulator.info/docs/4.0/layout).
The layout can be given as a JSON object, which should be added to the inputs described in Section 1. The object should have the key “tableLayout”. In case it is not given, then a default table layout is assigned, which have the following value:

```html
{
    layout: "fitColumns",
    height: "100%",
    paginationSize: 10,
    pagination: "local",
    placeholder: "No Data Set"
};
```

3.3 Generation of Modals:

The Metadata editor enables the developer to generate modal windows with the help of the Bootstrap library. Two modal types are supported: success and failed. The “success” modal can be generated in case an operation is successfully executed. Otherwise, the “failed” modal can be generated. For that, the function “showModal(modalType, message, link)” should be called. The function has three mandatory inputs, which are:

•	modalType: represents the modal type. It can be “SUCCESS” or “FAILED”.

•	Message: represents the message, which should be shown in the modal body.

•	Link: represents the link of the page, where should be redirected after the modal is closed.






