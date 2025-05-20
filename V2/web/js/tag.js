"use strict"


function handleSubmitTag(event) {
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);

    // Añadir los datos que le faltan al form
    formData.append("userId", sessionManager.getLoggedId());    
    formData.append("photoId", photoId);

    sendComment(formData);
}