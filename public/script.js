bodyOnClick = function(event) {
    if(!event.target.classList.contains("actionButton")) {
        hideActionDropdown();
    }
};

/**
 *  - Clients list page -
 * Hide action dropdown on click outside of them
 */
hideActionDropdown = function () {
    let displayedDropdown = document.getElementsByClassName("actionDropdown");
    for(var i = 0; i < displayedDropdown.length; i++) {
        if(displayedDropdown[i].classList.contains("displayBlock")) {
            displayedDropdown[i].classList.remove("displayBlock");
        }
    }
};