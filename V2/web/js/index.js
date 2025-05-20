/*
	C.Arévalo
	index.js.  Control de vista index.html, Mayo/2025
*/
"use strict";						// Nivel elevado de control de errores
import { photoRenderer } from '/js/renderers/photos.js'; // Renderizador de fotos
import { messageRenderer } from '/js/renderers/messages.js'; // Renderizador de mensajes
import { photosAPI_auto } from './api/_photos.js'; // Controlador API de photos
import { photoswithtagsAPI_auto } from './api/_photoswithtags.js'; // Controlador API de la vista photosWithTags
import { sessionManager } from "/js/utils/session.js";
import { photostagsAPI_auto } from "/js/api/_photostags.js";
import { tagsAPI_auto } from "/js/api/_tags.js";

async function main() {//Punto de entrada principal, haciéndolo asíncrono para poder llamar AJAX
	try { // Acceso con éxito a las fotos
		pageName();
		let photos = await photosAPI_auto.getAll(); // Todos los pbjetos photo, tengan o no photoTags
		let photosTags = await photoswithtagsAPI_auto.getAll(); // photos con photoTags, incluyendo además datos de cada tag
		let photoContainer = document.querySelector("#divGallery"); /* Contenedor para photos */
		let allTags = await tagsAPI_auto.getAll();

		for (let photo of photos) {
			if (sessionManager.isLogged()) {
				if (photo.userId === sessionManager.getLoggedId() && photo.visibility === "Private"
				) {
					photoContainer.appendChild(photoRenderer.asCard(photo, photosTags, allTags));
				}
				else if (sessionManager.getLoggedUser().username === "root") {
					photoContainer.appendChild(photoRenderer.asCard(photo, photosTags, allTags));
				}
			}
			else {
				photoContainer.appendChild(photoRenderer.asCard(photo, photosTags, allTags));
			}
		}

		if (sessionManager.isLogged()) {
			document.addEventListener("click", function (event) {
				if (event.target && event.target.matches(".delete-tag")) {
					handleDelete(event);
				}
			});
		}
		
		document.addEventListener("submit", async function (event) {
			if (event.target.matches(".tag-form")) {
				event.preventDefault();
				const form = event.target;
				const photoId = form.getAttribute("data-photo-id");
				const tagId = form.elements["tagId"].value;

				try {
					await photostagsAPI_auto.create({
						photoId: photoId,
						tagId: tagId
					});
					location.reload(); // Refresca para mostrar el nuevo tag
				} catch (err) {
					messageRenderer.showErrorMessage("Error while adding tag", err);
				}
			}
		})

	}
	catch (err) { // Renderiza error
		console.log(err);
		messageRenderer.showErrorMessage(JSON.stringify(err.response.data));
	};
};

function pageName() {
	if (sessionManager.isLogged()) {
		let title = document.getElementById("pageTitle");
		if (sessionManager.getLoggedUser().username === "root") {
			title.innerText = "Tags. Admin Management as 'root'";
		}
		else {
			title.innerText = "My Tags' Management";
		}
	}
};

async function handleDelete(event) {
	let answer = confirm("Do you really want to delete this tag?");
	if (answer) {
		let photoTagId = event.target.getAttribute("photoTag-id");
		console.log(photoTagId);
		try {
			await photostagsAPI_auto.delete(photoTagId);
			location.reload();
		} catch (err) {
			messageRenderer.showErrorMessage("Error while deleting tag", err);
		}
	}
};

document.addEventListener("DOMContentLoaded", main); // Manejador de eventos para documento cargado