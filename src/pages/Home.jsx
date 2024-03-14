import React, { useEffect, useRef, useState } from 'react'
import FileUploader from '../components/FileUploader'
// import EditProfileIcon from ""


const Home = () => {
    const fileInputRef = useRef()
    const [file, setFile] = useState(null)
    const [cropper, setCropper] = useState(null)
    const [uploadComplete, setUploadComplete] = useState(false);
    const [openUpload, setOpenUpload] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [loadingCrop, setLoadingCrop] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState('');



    const handleFileInputClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const closeUploadModal = () => {
        setFile(null);
        setCropper(null)
        setOpenUpload(false);
    }

    useEffect(() => {
        if (uploadComplete) {
            const timeout = setTimeout(() => {
                setUploadComplete(false);
                setCropper(null);
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [uploadComplete])

    return (
        <>
            <div className='main-div' onClick={handleFileInputClick}>
                hello tinku
                <img src={avatarUrl} alt="" />
            </div>


            <FileUploader
                setFile={setFile}
                file={file}
                setCropper={setCropper}
                cropper={cropper}
                closeUploadModal={closeUploadModal}
                openUpload={openUpload}
                uploadProgress={uploadProgress}
                setUploadProgress={setUploadProgress}
                loadingCrop={loadingCrop}
                setLoadingCrop={setLoadingCrop}
                // message={message}
                setUploadComplete={setUploadComplete}
                fileInputRef={fileInputRef}
                setAvatarUrl={setAvatarUrl}
            />
        </>
    )
}

export default Home