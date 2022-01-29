/*
var commit_id = '#button_commit'
var edit_id = '#button_edit'

function getData() {
    console.log("Commit Button Pressed")
}

document.querySelector(commit_id).addEventListener('click', () => {
    getData()
})
*/

// ---- Toggle Tabs! ---- \\
var tab_id = "#Tabs"
var selected = null

document.querySelector(tab_id).addEventListener("click", function(element) {
    if (element.target !== this && this.contains(element.target)) { 
        // Select Button
        if (selected != element.target){
            // Remove Clicked state from previous button
            if (selected != null){
                selected.classList.remove("clicked")
            }

            // Add New
            selected = element.target

            // Sett Current to clicked
            element.target.classList.add("clicked")
        } else {
            // Already clicked
        }
    }
});

// ---- Open Modals! ---- \\
// Get the modal
// Get the button that opens the modal
var btn = document.querySelectorAll("button.modal-button");

// All page modals
var modals = document.querySelectorAll('.modal');

// Get the element that closes the modal
var spans = document.getElementsByClassName("close");

// When the user clicks the button, open the modal
for (var i = 0; i < btn.length; i++) {
 btn[i].onclick = function(e) {
    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute("href"));
    modal.style.display = "block";
 }
}

// When the user clicks on (x), close the modal
for (var i = 0; i < spans.length; i++) {
 spans[i].onclick = function() {
    for (var index in modals) {
      if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";    
    }
 }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
     for (var index in modals) {
      if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";    
     }
    }
}

// Jquery
var $ = require("jquery")

// Get Data
function GetHttpData(url){
    fetch(url).then(function(response) {
        return response.json();
      }).then(function(data) {
        console.log(data);
      }).catch(function() {
        console.log("Error!");
      });
}

// Js to Python
function ExecutePythonFunction(_url = "http://127.0.0.1:5000", _function = "/Test/", _inputs = [1,2]){
    var joinparam = "+"
    var built_url = ""

    built_url = built_url.concat(_url, _function);

    for (let index = 0; index < _inputs.length; index++) {
        var element = _inputs[index];

        element = element.replace(" ", "_")
        built_url += element;
        
        if (index < _inputs.length - 1 && _inputs.length > 1){
            built_url += joinparam;
        }
    }

    console.log(built_url)
    console.log(GetHttpData(built_url))
}

ExecutePythonFunction("http://127.0.0.1:5000", "/SQL/", ["SELECT * FROM matches"])
ExecutePythonFunction("http://127.0.0.1:5000", "/SQL/", ["SELECT games FROM matches"])