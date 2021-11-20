import { useCallback } from 'react'


export const useUpload = () => {
    const CLOUDINARY_NAME = process.env.REACT_APP_CLOUDINARY_NAME
    const UNSIGNED_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UNSIGNED_UPLOAD_PRESET

    const uploadFile = useCallback(
        async (file) => {
            try {
                const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/upload`
                const fd = new FormData()

                fd.append('upload_preset', UNSIGNED_UPLOAD_PRESET)
                fd.append('folder', 'uploads')
                fd.append('tags', 'browser_upload')
                fd.append('file', file)
                const response = await fetch(url, {
                    method: 'POST',
                    body: fd
                })
                const result = await response.json()

                return result
            } catch (error) {
                console.error(error)
            }

        }, [CLOUDINARY_NAME, UNSIGNED_UPLOAD_PRESET])

    return { uploadFile }
}