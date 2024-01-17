import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../config/firebase.js";
import sharp from "sharp";

export async function uploadFile(file) {
    let fileBuffer = await sharp(file.buffer)
        .resize({
            width: 616,
            height: 346,
            fit: "cover",
        })
        .toBuffer();

    const fileRef = ref(storage, `files/${Date.now()}-${file.originalname}`);

    const fileMetadata = {
        contentType: file.mimetype,
    };

    const fileUploadPromise = uploadBytesResumable(
        fileRef,
        fileBuffer,
        fileMetadata
    );

    await fileUploadPromise;

    const fileDownloadURL = await getDownloadURL(fileRef);

    return { ref: fileRef, downloadURL: fileDownloadURL };
}
