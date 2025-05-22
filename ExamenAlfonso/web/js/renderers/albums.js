"use strict";
import { parseHTML } from "/js/utils/parseHTML.js";

const albumRenderer = {
    asRow: function (albumwithuser) {
        let html = 
        `<div class="row align-items-center">
            <div class="col mb-5">
                <img src="${albumwithuser.imageUrl}" class="img-fluid">
                <a href="newAlbum.html?albumId=${albumwithuser.albumId}">
            <button class="btn btn-primary">Edit Album</button></a>
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