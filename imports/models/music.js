import { FilesCollection } from 'meteor/ostrio:files';

const Music = new FilesCollection({
    collectionName: 'Music',

    permissions: 0o774,
    parentDirPermissions: 0o774,
    allowClientCode: false, // Disallow remove files from Client
    onBeforeUpload(file) {
        // Allow upload files under 10MB, and only in png/jpg/jpeg formats
        if (file.size <= 20485760 && /mp3|waw|ogg/i.test(file.extension)) {
            return true;
        }
        return 'Please upload image, with size equal or less than 20MB';
    }
});

export default Music;