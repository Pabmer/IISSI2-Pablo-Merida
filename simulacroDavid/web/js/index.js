/*
    IISSI2
    index.js.  Controlador de index.html
    Mayo/2025
*/
"use strict";
import { galleryRenderer } from '/js/renderers/gallery.js';
import { messageRenderer } from '/js/renderers/messages.js';
import { photosAPI_auto } from "/js/api/_photos.js";
import { sessionManager } from "/js/utils/session.js";
import { photoswithtagsAPI_auto } from "/js/api/_photoswithtags.js";

async function loadAllPhotos() {
    let galleryContainer = document.getElementById("divGallery");

    try {
        let photos = await photosAPI_auto.getAll();
        let gallery = await galleryRenderer.asCardGallery(photos);
        galleryContainer.appendChild(gallery);

        // Asignar los listeners una vez que los botones estén en el DOM
        let deleteButtons = document.querySelectorAll(".tag-delete")
        deleteButtons.forEach(button => {
            button.onclick = handleDelete;
        });

        if (sessionManager.isLogged()) {
            let title = document.getElementById("pageTitle");
            title.innerText = "My Tags' Management";
        }
    } catch (err) {
        messageRenderer.showErrorMessage("Error while loading photos", err);
    }
}
async function handleDelete(event) {
    let answer = confirm("Do you really want to delete this tag from this photo?");
    if (answer) {
        try {
            // Ocultar el botón de eliminación en el frontend
            event.target.style.display = 'none';  // O también puedes usar `event.target.remove()` para eliminarlo completamente.

            // Si no necesitas llamar a la API, simplemente termina aquí.
            // Si deseas, puedes agregar lógica adicional aquí si quieres hacer otras acciones sin borrar.

        } catch (err) {
            messageRenderer.showErrorMessage(err.response?.data?.message || "Unknown error");
        }
    }
}


async function main() {
    await loadAllPhotos();
}

document.addEventListener("DOMContentLoaded", main);