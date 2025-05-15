"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";

const photoRenderer = {
    asCard: function (photosTags, photo, tags) {
        let htmlTags = ``;

        for (let photoTag of photosTags) {
            if (photoTag.photoId === photo.photoId) {
                for (let tag of tags) {
                    if (tag.tagId === photoTag.tagId) {
                        htmlTags += `  ${tag.name}  `;
                    }
                }
            }
        }

        let html = `<div class="col-md-4">
 <div class="card">
 <img src="${photo.url}" class="card-img-top">
 <div class="card-body">
 <h5 class="card-title text-center">${photo.title}</h5>
 <p class="text-start">${htmlTags}</p>
 <p class="text-end">${photo.photoId}</p>
 </div>
 </div>
 </div>`;

        let card = parseHTML(html);
        return card;
    },

    asCardAdmin: function (photosTags, photo, tags) {
        let htmlTags = ``;

        for (let photoTag of photosTags) {
            if (photoTag.photoId === photo.photoId) {
                for (let tag of tags) {
                    if (tag.tagId === photoTag.tagId) {
                        htmlTags += `<button class="btn btn-danger delete-btn m-1" photoTag-id="${photoTag.photoTagId}">${tag.name}</button>`;
                    }
                }
            }
        }

        let html = `<div class="col-md-4">
 <div class="card">
 <img src="${photo.url}" class="card-img-top">
 <div class="card-body">
 <h5 class="card-title text-center">${photo.title}</h5>
 <p class="text-start">${htmlTags}</p>
 <p class="text-end">${photo.photoId}</p>
 </div>
 </div>
 </div>`;

        let card = parseHTML(html);
        return card;
    }
};

export { photoRenderer };