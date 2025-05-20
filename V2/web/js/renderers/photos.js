/*
	C.Arévalo, Mayo/2025
	photos.js.  Renderización de Fotos y photosTags (Solución de partida, en bruto)
*/
"use strict";
import { parseHTML } from "/js/utils/parseHTML.js"; // Crea elementos del DOM a partir de fuente html
import { sessionManager } from "/js/utils/session.js";

const photoRenderer = {
	asCard: function (photo, photosTags, allTags) {
		let thisPhoto_photosTags = photosTags.filter(item => item.photoId == photo.photoId);
		let html = `<div class="card col-sm-3 p-1 mb-1 text-center">
		<h5>#${photo.photoId} ${photo.title}</h5>
		<h8>${photo.visibility}</h8>
		<img src="${photo.url}" class="img-fluid w-100">
	`;

		let htmlTags = ``;
		for (let tag of thisPhoto_photosTags) {
			htmlTags += `<span class="badge bg-secondary delete-tag" photoTag-id="${tag.photoTagId}">
			<span class="badge rounded-pill bg-light text-dark"> ${tag.tagId} </span> ${tag.name}
		</span> `;
		}

		let htmlNewTagForm = ``;
		if (sessionManager.isLogged()) {
			htmlNewTagForm = `
			<form class="tag-form mt-2" data-photo-id="${photo.photoId}">
				<select class="form-select form-select-sm d-inline w-75" name="tagId" required>
					${allTags.map(tag => `<option value="${tag.tagId}">${tag.name}</option>`).join("")}
				</select>
				<button type="submit" class="btn btn-sm btn-success">+</button>
			</form>
		`;
		}

		html += `<div class="fw-light photosTags mt-1">` + htmlTags + htmlNewTagForm + `</div></div>`;

		return parseHTML(html);
	},
	
};
export { photoRenderer };