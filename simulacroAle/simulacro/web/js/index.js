/*
	IISSI2
	index.js.  Controlador de index.html
	Mayo/2025
*/
"use strict";						// Nivel elevado de control de errores
// Renderizadores necesarios 
// Controladores de API necesarios para accesos Ajax a la BD
// Gestión del Login/Logout y de la Sesión y Local Storage en Cliente

// Manejadores de eventos y/o listeners para satisfacer requisitos
// Accesos a la BD mediante controladores API Rest
// Presentación mediante módulos de renderización
// Captura de errores y renderización en contenedor de errores

import { messageRenderer } from "/js/renderers/messages.js";
import { photoswithtagsAPI_auto } from "/js/api/_photoswithtags.js";
import { galleryRenderer } from "/js/renderers/gallery.js";
import { photosAPI_auto } from "/js/api/_photos.js";
import { tagsAPI_auto } from "/js/api/_tags.js";
import { sessionManager } from "/js/utils/session.js";
import { photostagsAPI_auto } from "/js/api/_photostags.js";

async function main() {
	loadPhotos();

	if (sessionManager.isLogged()) {
		changeHeader();
	}

	document.addEventListener("click", function(event) {
		if (event.target && event.target.matches(".delete-btn")) {
			handleDelete(event);
		}
	});
}

async function loadPhotos() {
	try {
		let galleryContainer = document.getElementById("divGallery");
		galleryContainer.innerHTML = "";

		let photosTags = await photoswithtagsAPI_auto.getAll();
		let photos = await photosAPI_auto.getAll();
		let tags = await tagsAPI_auto.getAll();

		let cardGallery = galleryRenderer.asCardGallery(photosTags, photos, tags);

		galleryContainer.appendChild(cardGallery);
	} catch(err) {
		messageRenderer.showErrorMessage("Error while loading photos", err);
	}
}

function changeHeader() {
	try {
		let titleContainer = document.getElementById("pageTitle");
		titleContainer.innerHTML = "My Tags’ Management";
	} catch(err) {
		messageRenderer.showErrorMessage("Error while changing title", err);
	}
}

async function handleDelete(event) {
	let answer = confirm("Do you really want to delete this comment?");
	if (answer) {
		let photoTagId = event.target.getAttribute("photoTag-id");

		try {
			await photostagsAPI_auto.delete(photoTagId);
			loadPhotos();
		} catch(err) {
			messageRenderer.showErrorMessage("Error while deleting tag", err);
		}
	}
}

document.addEventListener("DOMContentLoaded", main);