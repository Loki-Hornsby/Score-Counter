// ---- Communication to python server ---- \\
var $ = require("jquery")

$.getScript("communication.js", function() {
    function RunSQL(x){
        var v = ExecutePythonFunction("http://127.0.0.1:5000", "/SQL/", [x]);

        return v
    }

    // ---- Dark Mode ---- \\
    var darkSwitch = document.getElementById("darkSwitch");

    function resetTheme() {
        var tables = document.getElementsByTagName("table")

        for (let index = 0; index < tables.length; index++) {
            const element = tables[index];

            if (darkSwitch.checked) {
                element.classList.remove("table-light")
                element.classList.add("table-dark")
            } else {
                element.classList.remove("table-dark")
                element.classList.add("table-light")
            }
        }

        if (darkSwitch.checked) {
            document.body.setAttribute("data-theme", "dark");
            localStorage.setItem("darkSwitch", "dark");
        } else {
            document.body.setAttribute("data-theme", "light");
            localStorage.setItem("darkSwitch", "light");
        }
    }

    resetTheme();
    
    darkSwitch.addEventListener("change", function(event) {
        console.log(localStorage.getItem("darkSwitch"));
        
        resetTheme();
    });

    // ---- Add Player ---- \\
    var add_id = "#test-btn"

    /*
    document.querySelector(add_id).addEventListener("click", function(element) {
        console.log("Added Player!");
        v = RunSQL("SELECT_*_FROM_matches")

        for (const i in v) {
            console.log(v[i])

            for (const i2 in v[i]){
                console.log(v[i][i2]);

                const h1 = document.createElement("H5");
                const textNode = document.createTextNode(v[i][i2] + " " + [i] + " " + [i2]);
                h1.appendChild(textNode);
                document.body.appendChild(h1);
            }
        }
    });*/
});

