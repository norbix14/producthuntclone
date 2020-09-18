import React, { useState } from 'react'
import Router from 'next/router'
import { FormBuscador } from '../../styles/forms/Buscador'
import { BtnSubmitBuscador } from '../../styles/buttons/Submit'
import { InputTextBuscador } from '../../styles/inputs/Text'
import { Toast } from '../../utils/SweetAlert'

const Buscador = () => {
	const [ busqueda, guardarBusqueda ] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		if(busqueda.trim() === '') {
			return Toast('warning', 'Ingresar un término de busqueda')
		}
		return Router.push({
			pathname: '/buscar',
			query: {
				q: busqueda
			}
		})
	}

	return (
		<FormBuscador onSubmit={handleSubmit}>
			<InputTextBuscador 
				type="search"
				placeholder="Buscar un producto"
				required
				onChange={(e) => guardarBusqueda(e.target.value)}
			/>
			<BtnSubmitBuscador type="submit"></BtnSubmitBuscador>
		</FormBuscador>
	)
}

export default Buscador
