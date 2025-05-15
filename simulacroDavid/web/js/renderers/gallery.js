"use strict";
import { parseHTML } from "/js/utils/parseHTML.js";
import { photoRenderer } from "/js/renderers/photos.js";
import { sessionManager } from "/js/utils/session.js";


const galleryRenderer = {
    asCardGallery: async function (photos) {
        let galleryContainer = parseHTML('<div class="photo-gallery"></div>');
        let row = parseHTML('<div class="row"></div>');
        galleryContainer.appendChild(row);
        let counter = 0;
        for (let photo of photos) {
            if (sessionManager.isLogged()) {
                if (sessionManager.getLoggedId() === photo.userId || sessionManager.getLoggedUser().username === "root") {
                    let card = await photoRenderer.asCard(photo);
                    row.appendChild(card);
                    counter += 1;
                    if (counter % 3 === 0) {
                        row = parseHTML('<div class="row"></div>');
                        galleryContainer.appendChild(row);
                    }
                }
            }
            else if (photo.visibility === "Public") {
                let card = await photoRenderer.asCard(photo);
                row.appendChild(card);
                counter += 1;
                if (counter % 3 === 0) {
                    row = parseHTML('<div class="row"></div>');
                    galleryContainer.appendChild(row);
                }

            }
        }
        return galleryContainer;
    }
};

export { galleryRenderer };