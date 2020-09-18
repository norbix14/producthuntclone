import React from 'react'
import Router from 'next/router'
import firebase from '../firebase'
import Layout from '../components/layout/Layout'
import { Titulo } from '../styles/headings/Titulo'
import { Formulario } from '../styles/forms/Formulario'
import { Campo } from '../styles/divs/Campo'
import { Submit } from '../styles/inputs/Submit'
import { ErrorP } from '../styles/errors/ErrorMsg'
import useValidator from '../hooks/useValidator'
import validarCrearCuenta from '../validators/crearCuenta'
import { Toast } from '../utils/SweetAlert'
import { addAnimClass } from '../utils/AddAnimateClass'

const CrearCuenta = () => {
	const INIT = {
		nombre: '',
		email: '',
		password: ''
	}

	const {
		values,
		error,
		handleChange,
		handleBlur,
		handleSubmit,
	} = useValidator(INIT, validarCrearCuenta, crearCuenta)

	const { nombre, email, password } = values

	async function crearCuenta() {
		try {
			await firebase.registrar(nombre, email, password)
			Toast('success', 'Usuario creado')
			return Router.push('/login')
		} catch(e) {
			// console.table(e)
			if(e.message) return Toast('error', e.message)
			return Toast('error', 'Error al crear usuario')
		}
	}

  return (
    <>
      <Layout>
      	<div>
	        <Titulo>Crear cuenta</Titulo>
	        <Formulario
	        	noValidate
	        	className={addAnimClass('fadeInUp')}
	        	onSubmit={handleSubmit}
	        >
	        	<Campo>
	        		<label htmlFor="nombre">Nombre</label>
	        		<input 
	        			type="text" 
	        			name="nombre" 
	        			id="nombre" 
	        			placeholder="Tu nombre"
	        			autoComplete="true"
	        			value={nombre}
	        			onChange={handleChange}
	        			onBlur={handleBlur}
	        		/>
	        	</Campo>
	        	{
	        		error?.nombre && <ErrorP>{error?.nombre}</ErrorP>
	        	}
	        	<Campo>
	 		       	<label htmlFor="email">Email</label>
	 		       	<input 
	 		       		type="email" 
	 		       		name="email" 
	 		       		id="email" 
	 		       		placeholder="Tu email"
	 		       		autoComplete="true"
	 		       		value={email}
	 		       		onChange={handleChange}
	 		       		onBlur={handleBlur}
	 		       	/>
	        	</Campo>
	        	{
	        		error?.email && <ErrorP>{error?.email}</ErrorP>
	        	}
	        	<Campo>
	 		       	<label htmlFor="password">Contraseña</label>
	 		       	<input 
	 		       		type="password" 
	 		       		name="password" 
	 		       		id="password" 
	 		       		placeholder="Tu contraseña"
	 		       		autoComplete="true"
	 		       		value={password}
	 		       		onChange={handleChange}
	 		       		onBlur={handleBlur}
	 		       	/>
	        	</Campo>
	        	{
	        		error?.password && <ErrorP>{error?.password}</ErrorP>
	        	}
	        	<Submit type="submit" value="Crear cuenta" />
	        </Formulario>
	      </div>
      </Layout>
    </>
  )
}

export default CrearCuenta
