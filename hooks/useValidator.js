import React, { useEffect, useState } from 'react'

const useValidator = (init, validateFunc, callback) => {
	const [ values, setValues ] = useState(init)
	const [ error, setError ] = useState({})
	const [ submit, setSubmit ] = useState(false)

	const handleChange = (e) => {
		setValues({
			...values,
			[e.target.name]: e.target.value
		})
	}

	const handleBlur = () => {
		const validationErr = validateFunc(values)
		setError(validationErr)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const validationErr = validateFunc(values)
		setError(validationErr)
		setSubmit(true)
	}

	useEffect(() => {
		if(submit) {
			const noError = Object.keys(error).length === 0
			if(noError) {
				callback()
			}
			setSubmit(false)
		}
	}, [error])

	return {
		values,
		error,
		handleChange,
		handleBlur,
		handleSubmit,
	}
}

export default useValidator
