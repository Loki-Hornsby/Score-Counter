// ---- Communication to python ---- \\
var $ = require("jquery")

$.getScript("communication.js", function() {
    // Find key for python web server to verify
    function Decode(){
        var key = ExecutePythonFunction("http://127.0.0.1:5000", "/GetKey/", [])
        var decoded = key.toString().replace(/\D/g,'');

        return decoded.toString();
    }

    // Toggle Key
    function ToggleAuth(x){
        var state = ExecutePythonFunction("http://127.0.0.1:5000", "/ToggleKey/"+x, [])
        console.log("State toggled")

        return state
    }

    function RunSQL(x){
        ToggleAuth(Decode()); // Open Key
        console.log("Key opened!");
        console.log("Data = ");
        let v = ExecutePythonFunction("http://127.0.0.1:5000", "/Test/", [Decode(), 10, 20]);
        console.log(v);
        ToggleAuth(Decode()); // Shut Key
        console.log("Key closed!");

        return v
    }

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

    // ---- Add Player! ---- \\
    var add_id = "#commit-btn"

    document.querySelector(add_id).addEventListener("click", function(element) {
        console.log("Added Player!");
        console.log(RunSQL("SELECT_*_FROM_matches"));
    });

    // ---- Open Modals! ---- \\
    var btn = document.querySelectorAll("button.modal-button");
    var modals = document.querySelectorAll('.modal');
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
                if (typeof modals[index].style !== 'undefined'){
                    modals[index].style.display = "none";    
                }
            }
        }
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            for (var index in modals) {
                if (typeof modals[index].style !== 'undefined'){
                    modals[index].style.display = "none";    
                }
            }
        }
    }
});