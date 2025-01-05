import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

const addFile = async (file, folderName, filename) => {
    const storageRef = ref(storage, `${folderName}/${filename}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Gérer la progression du téléchargement si nécessaire
            },
            (error) => {
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            }
        );
    });
};

const updateFile = async (oldFileURL, newFile, folderName, filename) => {
    // Supprimer l'ancien fichier
    const oldFileRef = ref(storage, oldFileURL);
    await deleteObject(oldFileRef);

    // Ajouter le nouveau fichier
    return addFile(newFile, folderName, filename);
};


const deleteFile = async (fileURL) => {
    const fileRef = ref(storage, fileURL);
    await deleteObject(fileRef);
};

export { addFile, updateFile, deleteFile };