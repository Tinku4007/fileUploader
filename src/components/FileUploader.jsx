import { Box, Button, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Cropper } from 'react-cropper';
import { UploadImage } from '../utils/api';
import "cropperjs/dist/cropper.css";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const FileUploader = ({
    openUpload,
    file,
    setFile,
    cropper,
    setCropper,
    uploadProgress,
    setUploadProgress,
    loadingCrop,
    setLoadingCrop,
    setUploadComplete,
    closeUploadModal,
    fileInputRef,
    changeImageState
}) => {
    const [open, setOpen] = useState(false);
    const getNewAvatarUrl = (e) => {
        if (e.target.files) {
            setFile(URL.createObjectURL(e.target.files[0]));
            setOpen(true)
        }
    };

    const getCropData = async () => {
        setFile(null)
        setLoadingCrop(true);
        if (cropper) {
            const croppedFile = await fetch(cropper.getCroppedCanvas().toDataURL())
                .then((res) => res.blob())
                .then((blob) => {
                    return new File([blob], file.name, { type: "image/png" });
                });
            if (file) {
                const formData = new FormData();
                formData.append('media', croppedFile);
                try {
                    const response = await UploadImage(formData, (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(percentCompleted);
                    });
                    if (response?.isSuccess) {
                        changeImageState(response?.data?.url);
                        setUploadProgress(0);
                        setLoadingCrop(false);
                        setUploadComplete(true);
                        closeUploadModal();
                    } else {
                        message.error("Error while uplading image");
                        setUploadProgress(0);
                        setLoadingCrop(false);
                        closeUploadModal();
                    }
                } catch (error) {
                    setUploadProgress(0);
                    setLoadingCrop(false);
                }
            }
        }
    }

    useEffect(() => {
        console.log(file)
    }, [file])

    return (
        <>
            {
                !file && !cropper &&
                <form className='flex flex-col items-center'>
                    <input type="file" accept="image/png, image/jpeg, image/jpg" name="file" hidden ref={fileInputRef} onChange={getNewAvatarUrl} />
                </form>
            }

            {
                file &&
                <Modal open={open} onClose={() => setOpen(false)}>
                    <Box sx={style}>
                        <Cropper
                            src={file}
                            style={{ height: "200px", width: "100%" }}
                            initialAspectRatio={NaN}
                            minCropBoxHeight={50}
                            minCropBoxWidth={50}
                            guides={false}
                            background={false}
                            checkOrientation={false}
                            viewMode={1}
                            dragMode='move'
                            onInitialized={(instance) => {
                                setCropper(instance);
                            }}
                        />
                        <div className='flex justify-center gap-x-4 pt-4 poppins'>
                            <button onClick={getCropData} className="bg-primary-900 text-white rounded-md px-4 py-1">Upload</button>
                            <button onClick={() => { setFile(null); setCropper(null) }} className="text-primary-900 border border-primary-900 rounded-md px-4 py-1 hover:bg-primary-900 hover:text-white hover:border-transparent transition-all">Cancel</button>
                        </div>


                        <div className='flex justify-center'>
                            {
                                loadingCrop &&
                                uploadProgress <= 100 && (
                                    <div className='flex justify-center items-center mt-5'>
                                        <span className="uploading-img"></span>
                                    </div>
                                )
                            }
                        </div>
                    </Box>
                </Modal>
            }

        </>
    );
};

export default FileUploader;
