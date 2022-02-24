// ---- Communication to python ---- \\
var $ = require("jquery")

$.getScript("communication.js", function() {
    function RunSQL(x){
        var v = ExecutePythonFunction("http://127.0.0.1:5000", "/SQL/", [x]);

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
        v = RunSQL("SELECT_*_FROM_matches")
        for (const i in v) {
            console.log(v[i])

            for (const i2 in v[i]){
                console.log(v[i][i2]);

                const h1 = document.createElement("H1");
                const textNode = document.createTextNode(v[i][i2]);
                h1.appendChild(textNode);
                document.body.appendChild(h1);
            }
        }
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