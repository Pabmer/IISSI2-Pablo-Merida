"use strict";
import { galleryRenderer } from '/js/renderers/gallery.js';
import { messageRenderer } from '/js/renderers/messages.js';

import { photoswithusersAPI_auto } from "/js/api/_photoswithusers.js";


async function wait(){
    console.log("Comienzan los 3 segundos")
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log("3 segundos completados")
}

async function loadAllPhotos() {
    let galleryContainer = document.getElementById("gallery");
    
    try{
        wait();
        let photos = await photoswithusersAPI_auto.getAll();
        let gallery = galleryRenderer.asCardGallery(photos);
        galleryContainer.appendChild(gallery);
    } catch(err) {
        messageRenderer.showErrorMessage("Error while loading photos", err);
    }
}

async function main() {
    loadAllPhotos();
}

document.addEventListener("DOMContentLoaded", main);