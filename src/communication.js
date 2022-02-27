// Jquery
var $ = require("jquery")

// Get Data
function GetHttpData(_url){
    var data = null;

    var request = $.ajax({ 
        url: _url, 
        async: false,
    })

    .done(function(response) {
        data = response;
    })
    
    .fail(function(err) {
        console.log(err);
    })

    // Split String into table
    var table;

    // Split after *
    // This resembles multiple SQL columns
    table = data.split('*');

    // Split after comma
    // This resembles the seperate values in each SQL column
    for (let index = 0; index < table.length; index++) {
        table[index] = table[index].split(",");
    }

    // Remove Empty values
    for (let index = 0; index < table.length; index++) {
        for (let index2 = 0; index2 < table[index].length; index2++) {
            if (table[index][index2] == ""){
                table[index].splice(index2, 1);
            }
        }
    }

    return table;
}

function GetSpace(url){
    return GetHttpData(url + "/Opcode/space");
}

function GetJoiner(url){
    return GetHttpData(url + "/Opcode/joiner");
}

// Js to Python
function ExecutePythonFunction(_url = "http://127.0.0.1:5000", _function = "/Test/", _inputs = []){
    // Opcodes
    var space = GetSpace(_url)
    var joiner = GetJoiner(_url)
    
    var built_url = ""

    // Add _function and _url together
    built_url = built_url.concat(_url, _function);

    // Add joiner to parameters (_inputs) where needed
    for (let index = 0; index < _inputs.length; index++) {
        var element = _inputs[index];

        built_url += element;
        
        if (index < _inputs.length - 1 && _inputs.length > 1){
            built_url += joiner;
        }
    }

    // Change spaces into defined space
    built_url = built_url.replace(/ /g, space)
    
    return GetHttpData(built_url);
}
