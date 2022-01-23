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
            console.log(element.target.id);  

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

// ---- Games UI ---- \\
