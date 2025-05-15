"use strict";
import { photoswithtagsAPI_auto } from "/js/api/_photoswithtags.js";
import { parseHTML } from "/js/utils/parseHTML.js";

const photoRenderer = {
    asCard: async function (photo) {
        let phototags = await photoswithtagsAPI_auto.getAll();
        let tags = [];

        for (let pt of phototags) {
            if (pt.photoId == photo.photoId) {
                // Asegurarse de que tenemos el tagId, no solo el nombre
                tags.push({ id: pt.tagId, name: pt.name });
            }
        }

        let html = `<div class="col-md-4">
            <div class="card">
                <a href="photo_detail.html?photoId=${photo.photoId}">
                    <img src="${photo.url}" class="card-img-top">
                </a>
                <div class="card-body">
                    <h5 class="card-title text-center">${photo.title}</h5>
                    <div class="text-end">
                        ${tags.map(tag => {
                            console.log(`Asignando tag: ${tag.name}, tagId: ${tag.id}, photoId: ${photo.photoId}`);
                            return `<button class="tnbtn btn-sm b-secondary m-1 tag-delete" data-tagid="${tag.id}" data-photoid="${photo.photoId}">#${tag.name}</button>`;
                        }).join("")}
                    </div>
                </div>
            </div>
        </div>`;

        let card = parseHTML(html);
        return card;
    },

    asDetails: function (photo) {
        let html = `<div class="photo-details">
            <h3>${photo.title}</h3>
            <h6>${photo.description}</h6>
            <p>Uploaded by <a href="user_profile.html" class="user-link">User ${photo.userId}
            </a> on ${photo.date}</p>
            <hr>
            <img src="${photo.url}" class="img-fluid">
        </div>`;
        let photoDetails = parseHTML(html);
        return photoDetails;
    },
};

export { photoRenderer };