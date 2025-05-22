"use strict";

const albumValidator = {
    validateAlbum: function (formData) {
        let errors = [];
        let artist = formData.get("artist");
        let title = formData.get("title");
        let numTracks = formData.get("numTracks");


        if (artist.length < 3) {
            errors.push("The artist should have more than 3 characters");
        }

        if (artist.length === title.length) {
            errors.push("The artist and the title must have different length");
        }

        if (numTracks<=0 || numTracks>=20) {
            errors.push("The numTracks must be in range (0,20)");
        }

        return errors;
    }
};
export { albumValidator };