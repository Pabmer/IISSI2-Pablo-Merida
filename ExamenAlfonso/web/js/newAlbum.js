"use strict";

import { albumValidator } from '/js/validators/album.js';
import { albumsAPI_auto } from '/js/api/_albums.js';
import { messageRenderer } from "/js/renderers/messages.js";

async function main() {

    let albumForm = document.getElementById("form-album-upload");
    albumForm.onsubmit = handleSubmitAlbum;
}

async function handleSubmitAlbum(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    formData.append("userId", 1);

    let errors = albumValidator.validateAlbum(formData);

    if (errors.length > 0) {
        let errorsDiv = document.getElementById("errors");
        errorsDiv.innerHTML = "";

        for (let error of errors) {
            messageRenderer.showErrorMessage(error);
        }
    } else {
        try {
            await albumsAPI_auto.create(formData);
            window.location.href = `index.html`;
        } catch (err) {
            messageRenderer.showErrorAsAlert(err.response.data.message);
        }
    }

}

document.addEventListener("DOMContentLoaded", main);