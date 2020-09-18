import React, { useState } from 'react'

const useFileUploader = (FirebaseContext) => {
	const firebase = FirebaseContext

	const [ imagename, setImageName ] = useState('')
	const [ uploading, setUploading ] = useState(false)
	const [ progress, setProgress ] = useState(0)
	const [ urlimagen, setUrlImagen ] = useState('')

	const handleUploadStart = () => {
		// setProgress(0)
		setUploading(true)
	}

	const handleProgress = (progress) => setProgress(progress)

	const handleUploadError = (error) => setUploading(error)

	const handleUploadSuccess = (filename) => {
		// setProgress(100)
		// setUploading(false)
		setImageName(filename)
		firebase
		.storage
		.ref('productos')
		.child(filename)
		.getDownloadURL()
		.then((url) => setUrlImagen(url))
	}

	return {
		uploading,
		progress,
		imagename,
		urlimagen,
		handleUploadStart,
		handleProgress,
		handleUploadError,
		handleUploadSuccess,
	}
}

export default useFileUploader
