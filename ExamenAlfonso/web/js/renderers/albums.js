"use strict";
import { parseHTML } from "/js/utils/parseHTML.js";

const albumRenderer = {
    asRow: function (albumwithuser) {
        let html = 
        `<div class="row align-items-center">
            <div class="col mb-5">
                <img src="${albumwithuser.imageUrl}" class="img-fluid">
                <button type="button" class="btn-outline-primary" id="${albumwithuser.albumId}">Edit</button>
            </div>

            <div class="col">
                <p class="text-center">${albumwithuser.username}</p>
            </div>

            <div class="col">
                <p class="text-center">${albumwithuser.artist}</p>
            </div>

            <div class="col">
                <p class="text-center">${albumwithuser.title}</p>
            </div>
        </div>`;
        let card = parseHTML(html);
        return card;
    },
}

export { albumRenderer };