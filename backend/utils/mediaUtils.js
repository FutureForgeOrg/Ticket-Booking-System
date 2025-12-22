import cloudinary from "../config/cloudinary.js";
//helper function to get public id from cloudinary url

export const getPublicIdFromUrl = (url) => {
    const parts = url.split('/');
    const fileName = parts[parts.length - 1];
    const publicId = fileName.split('.')[0];
    return `movies/posters/${publicId}`;
}



// function to upload buffer to cloudinary
export const uploadBufferToCloudinary = (buffer, folder) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );
        stream.end(buffer);
    })
}
