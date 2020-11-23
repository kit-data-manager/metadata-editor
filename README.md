Metadata Editor
===============

The Metadata Editor is a JavaScript library allowing to generate web forms and validate metadata using JSON schemas. As an input, the library takes structured JSON schemas (data model, UI Form and resource). As a result, a HTML form, that matches the given schemas, will be generated. Moreover, the generated form provides the validation of the user inputs based on the given schemas. If the values are valid, a JSON object is submitted back to the developer.

Objectives
----------

- Generate form from JSON Data Model and UI Form given by the developer.
- Validate JSON resources based on given JSON Data Model.
- Return a validated JSON resource, which can be used by the developer.

Dependencies
------------

Developer should add the editor as a library (JS files) in his project. The editor library contains 2 folders:
- “dependencies”, which contains the JSON form dependencies and an extended version of the main JS file.
- “lib”, which contains the main JS file of the library.

Getting started
---------------

Below you can find an example how can the library be used.

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Getting started with Metadata Editor</title>
        <link rel="stylesheet" style="text/css" href="/dependencies/jsonform/deps/opt/bootstrap-v4.css" />
    </head>
    <body>
        <div class="container">
           <form id="form"></form>
        </div>

        <script type="text/javascript" src="/dependencies/jsonform/deps/jquery.min.js"></script>
        <script type="text/javascript" src="/dependencies/jsonform/deps/underscore.js"></script>
        <script type="text/javascript" src="/dependencies/jsonform/deps/opt/jsv.js"></script>
        <script type="text/javascript" src="/dependencies/jsonform/lib/jsonform.js"></script>
        <script type="text/javascript" src="/lib/metadataeditor.js"></script>
        
        <script>
            var dataModel =
                    {
                        "name": {
                            "type": "string",
                            "title": "Name"
                        },
                        "age": {
                            "type": "number",
                            "title": "Age"
                        }
                    }
            var uiForm =
                    {
                        "type": "fieldset",
                        "title": "Example Layout",
                        "items": [
                            "name",
                            "age"
                        ]
                    }

            var resource =
                    {
                        "name": "max",
                        "age": 20
                    }
                    
            var options = {
                "renderType": "FORM",
                "operation" : "CREATE",
                "dataModel": dataModel,
                "uiForm": uiForm,
            };
            
            /**
             * An empty form is generated as the "CREATE" operation is chosen.
             */
            $('#form').metadataeditor(options, function onSubmitValid(value) {
                //project-specific implementation.
               //value is the validated json model and can be used by the developer.
            });
            
            var options = {
                "renderType": "FORM",
                "operation" : "UPDATE",
                "dataModel": dataModel,
                "uiForm": uiForm,
                "resource": resource
            };
            /**
             * A form filled with values of "resource" key is generated.
             */
            $('#form').metadataeditor(options, function onSubmitValid(value) {
                //project-specific implementation.
               //value is the validated json model and can be used by the developer.
            });
        </script>
    </body>
</html>
```

