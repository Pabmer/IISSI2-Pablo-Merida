"use strict";

import { messageRenderer } from "/js/renderers/messages.js";
import { commentsAPI_auto } from "/js/api/_comments.js";
import { commentswithusersAPI_auto } from "/js/api/_commentswithusers.js";
import { commentRenderer } from "/js/renderers/comments.js";
import { sessionManager } from "/js/utils/session.js";


let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");

function main() {
    let commentForm = document.getElementById("comment-form");
    commentForm.onsubmit = handleSubmitComment;
}

function handleSubmitComment(event) {
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);

    // Añadir los datos que le faltan al form
    formData.append("date", new Date().toISOString().slice(0, 19).replace('T', ' ')); 
    formData.append("userId", sessionManager.getLoggedId());    
    formData.append("photoId", photoId);

    sendComment(formData);
}

async function sendComment(formData) {
    try {
        // Crear el comentario
        let newComment = await commentsAPI_auto.create(formData);

        // Obtener el comentario enriquecido
        let enrichedComment = await commentswithusersAPI_auto.getByCommentId(newComment.lastId);

        // Asegúrate de que enrichedComment sea un array y tomar el primer elemento
        if (Array.isArray(enrichedComment) && enrichedComment.length > 0) {
            enrichedComment = enrichedComment[0]; // Usamos el primer comentario
        }

        const commentElement = commentRenderer.asComment(enrichedComment);
        document.getElementById("comments").appendChild(commentElement);

        // Cerrar el modal y limpiar el formulario
        let modalElement = document.getElementById("commentModal");
        let modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
        document.getElementById("comment-form").reset();

    } catch (err) {
        messageRenderer.showErrorMessage("Error loading the new comment");
        console.error("Error adding comment:", err); // Para saber más detalles sobre el error
    }
}




document.addEventListener("DOMContentLoaded", main);