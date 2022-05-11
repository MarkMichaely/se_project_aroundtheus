const popupOverlays =Array.from( document.querySelectorAll(".popup"));
popupOverlays.forEach(popup => {
    const form = popup.querySelector(".form");
    const popupBox = popup.querySelector(".popup__box");
    popup.addEventListener("click", function(evt){
        if(evt.target.classList.contains("popup_opened")){
            closePopup(popup);
        }
    });
    window.addEventListener("keydown", function(evt){
        if(evt.key === "Escape"){
            closePopup(popup);
        }
    });
});