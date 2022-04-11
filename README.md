Metadata Editor
===============

The Metadata Editor is a JavaScript library allowing to generate web forms and validate metadata in an intuitive and generic way with the help of [JSON Form Library](https://github.com/jsonform/jsonform/wiki). Moreover, it enables to list various resources given by the user as a JSON object or fetched from a remote service making use of the [Tabulator Library](http://tabulator.info/). To interact with the data, different operations can be optionally defined and associated with callback functions. In order to support newer JSON schema specifications, [Ajv JSON Schema Validator](https://ajv.js.org/) has been integrated in the JSON Form Library. 

Objectives
----------

- Intuitive and generic generation of forms based on given JSON Schemas provided by the developer.
- Validation of JSON resources.
- Listing of JSON resources.

Dependencies
------------

For using the Metadata Editor, different dependencies must be added depending on the envisioned use case. In any case, three dependecies are required:

* lib/js/metadataeditor.js
* lib/css/metadataeditor.style.basic.css
* deps/jsonform/jsonform.js

The Metadata Editor comes with a slightly adapted version of the JSON Form Library, currently based on version 2.2.5. In comparison to the official release, our custom version used the Ajv library for schema validation as this library supports more recent specification versions than JSV, which is the default library used by JSON Schema Form.  

In addition, if you just want to render a single form for a given resource, you will need:

| Dependency             | Version |
|------------------------|---------|
| JQuery JS              | 3.5.1   |
| Bootstrap CSS          | 3.3.7   |
| Bootstrap-Theme CSS    | 3.3.7   |
| Bootstrap JS           | 3.3.7   |
| Font-Awesome CSS       | 6.1.1   |
| Ajv 2019 JS            | 8.11.0  |
| Ajv 2020 JS (Optional) | 8.11.0  |
| Underscore JS          | 1.8.3   |

Regarding Ajv you an choose which versions you want to include based on the JSON schema specification you are planning to use. However, especially for schema draft 2020-12 there is only limited support by JSON Schema Form, which is why this dependecy is markes as optional.

In case you also want to show listings of multiple resources, you'll additionally need the following Tabulator dependencies:

| Dependency               | Version |
|--------------------------|---------|
| Tabulator Bootstrap4 CSS | 4.8.1   |
| Tabulator JS             | 4.8.1   |

All external dependencies can be included from external providers and are therefore not part of this repository. 
Please refer to the examples in the `examples` folder to find out from where to include a certain dependency.

Getting started
---------------

A good start on how to use the Metadata Editor can be found in the `examples` folder. Here you find simple examples, i.e., on how to work with single forms, but also complex examples, i.e. how to list resources using the Tabulator library.

In principle, everything evolves around two main functions:

* metadataeditorTable() 
* metadataeditorForm()

Both take a rather big number of arguments, which we want to explain in the following. 

1. metadataeditorTable() 

In one of the enhanced examples, the following parameter object if provided to `metadataeditorTable()`:

```
var columnsMovies = [{title: "", field: "image", headerSort: false, formatter:"image", formatterParams:{width:"50px"}, frozen:true, width: 70}, 
                        {title: "Title", field: "title", headerSort: false},
                        {title: "Release Date", field: "release_date", headerSort: false}
            ];
var tableConfigMovies = {
				layout: "fitColumns",
				pagination: "local",
				ajaxURL: "https://ghibliapi.herokuapp.com/films",
				paginationSize: 6,
				minHeight: 300,
				paginationSizeSelector: [3, 6, 8, 10, 15, 20],
			}; 
var paramsMovies = {
				dataModel: this.dataModelMovies,
				uiForm: this.uiSchemaMovies,
				items: columnsMovies,
				tableLayout: tableConfigMovies,
				readIcon: 'fa fa-eye',
				editIcon: 'fa fa-edit',
				deleteIcon: 'fa fa-trash',
				listIcon: 'fa fa-list',
				readOperation: (selection) => {
					var optionsMovies = {
                		operation: "READ",
                		dataModel: this.dataModelMovies,
                		uiForm: this.uiSchemaMovies,
                		resource: selection,
                		buttonTitle: "Close"
             		};
                    $("#titleImage").attr("src", selection.image);
                    $('#movie-form').metadataeditorForm(optionsMovies, (value) => {
                    	var resource = optionsMovies.resource;
                        JSON.parse(JSON.stringify(resource));
                        console.log(resource);
                        $("#formModalMovies").modal('hide');
                    	}
                    );
                    $("#formModalMovies").modal('show');
				},
				updateOperation: undefined,
				deleteOperation: undefined,
				createOperation: undefined,
				listOperation: undefined
			};
```

Those arguments have the following name, description, obligation, and defaults:


| Key                    | Description                                                      | Mandatory/Optional                    | Default Value |
| ---------------------- | ---------------------------------------------------------------- |---------------------------------------|---------------|
| dataModel              | Represents a JSON schema, which describes the JSON schema used to render an editor form. The JSON schema should follow the properties definition of the JSON Schema draft-2019-09 specification. | Mandatory |- |
| uiForm                 | JSON user interface form, which describes the structure of the form layout. It should follow the properties definition specified in [the JSON Form library](https://github.com/jsonform/jsonform/wiki#fields). | Optional | "*" (Default form layout is generated) |
| data                   | Represents an array of JSON resources used to fill the table if not loaded from a remote location. | Mandatory if resources are not loaded remotely  |- |
| items                  | Represents an array of JSON objects, which define the table’s columns. Each JSON object should include a `title` property, which will be the caption of the according column, and a `key` property, defining the property according to the `dataModel` which is used as value for the column. Please refer to the [Column Setup](http://tabulator.info/docs/5.1/columns) section of the Tabulator documentation.| Mandatory | -  |
| tableLayout            | Parameters for the Tabulator library defining the table properties. Please refer to [the tabulator specification](http://tabulator.info/docs/4.0/layout) for details.| Optional | - |
| readIcon               | The Font awesome class name shown in the cell triggering the read operation. | Optional | 'fa fa-eye' |
| editIcon               | The Font awesome class name shown in the cell triggering the edit operation. | Optional | 'fa fa-edit' |
| deleteIcon             | The Font awesome class name shown in the cell triggering the delete operation. | Optional | 'fa fa-trash' |
| listIcon               | The Font awesome class name shown in the cell triggering the list operation. | Optional | 'fa fa-list' |
| readOperation(value)   | Takes a callback function. The “value” argument holds the JSON resource of the selected row. The implementation of this method is project-specific and is triggered when the user clicks on the read icon, i.e., the 'eye'. In case the developer does not give this callback function, the read icon will not be shown. | Optional |- |
| editOperation(value)   | Takes a callback function. The “value” argument holds the JSON resource of the selected row. The implementation of this method is project-specific and is triggered when the user clicks on the edit icon, i.e., the 'pen'. In case the developer does not give this callback function, the read icon will not be shown. | Optional|-  |
| deleteOperation(value) | Takes a callback function. The “value” argument holds the JSON resource of the selected row. The implementation of this method is project-specific and is triggered when the user clicks on the delete icon, i.e., the 'trash bin'. In case the developer does not give this callback function, the delete icon will not be shown. | Optional|-  |
| listOperation(value) | Takes a callback function. The “value” argument holds the JSON resource of the selected row. The implementation of this method is project-specific and is triggered when the user clicks on the list icon, i.e., the 'element list'. In case the developer does not give this callback function, the list icon will not be shown. | Optional|-  |
| createOperation()      | Takes a JSON Object, which include the two properties: * “callback”: This denotes the callback function, which will be triggered  when the user clicks on the Create button. In case the developer does not provide this callback function, the create button will not be shown. *”buttonTitle”: This defines the button label. The default value is “Create”.  |Optional | "Create"  |

2. metadataeditorForm()

In one of the simple examples, the following parameter object if provided to `metadataeditorForm()`:

```
var options = {
		operation: "READ",
		dataModel: this.dataModel,
		uiForm: this.uiSchema,
		resource: this.resource,
		buttonTitle: "OK"
	};
	
$('#with-data').metadataeditorForm(options, () => {});
```

The options object provides basic properties, which have the following name, description, obligation, and defaults:

| Key                    | Description                                                      | Mandatory/Optional                    | Default Value |
| ---------------------- | ---------------------------------------------------------------- |---------------------------------------|---------------|
| operation              | The operation the form should be responsible to perform. Valid operations are `CREATE`, `READ`, `UPDATE`, and `DELETE`. `READ`, `UPDATE`, and `DELETE` operations require the resource parameter to be provided, `CREATE` will start off with an empty form. Furthermore, in case of `DELETE` forms all fields will be read-only.| Mandatory |- |
| dataModel              | The JSON schema used to obtain the fields in the form. | Mandatory |- |
| uiForm                 | JSON object defining the layout of the resulting form. For details, please refer to the [Reference Documentation](https://github.com/jsonform/jsonform/wiki) of the JSON Form Library. | Optional |- |
| resource               | A resource following `dataModel`, which is used to pre-fill the fields of the resulting form. | Optional only for `CREATE` operation, Mandatory otherwise |- |
| buttonTitle            | The title of the submit button. If no title is provided, either the operation name will be used (`CREATE`,`UPDATE`, and `DELETE`) or no button will be rendered (`READ`)  | Optional | Operation name or none |

Furthermore, a callback is provided to `metadataeditorForm()` which takes a single parameter representing the resulting JSON resource. In case of `CREATE`, `UPDATE`, and `DELETE` operations, the JSON resource representing the form content is returned, for a `READ` operation nothing is returned.

3.3 Generation of Modals:

The Metadata editor enables the developer to generate modal windows with the help of the Bootstrap library. Two modal types are supported: `success` and `failed`. The `success` modal can be generated in case an operation is successfully executed. Otherwise, the `failed` modal may be generated. For that, the function `showModal(modalType, message, link)` can be used. The function has three mandatory inputs, which are:

•	modalType: represents the modal type. It can be `SUCCESS` or `FAILED`.

•	Message: represents the message, which should be shown in the modal body.

•	Link: represents the link of the page, where should be redirected after the modal is closed.






