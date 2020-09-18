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
import validarIniciarSesion from '../validators/iniciarSesion'
import { Toast } from '../utils/SweetAlert'
import { addAnimClass } from '../utils/AddAnimateClass'

const Login = () => {
	const INIT = {
		email: '',
		password: ''
	}

	const {
		values,
		error,
		handleChange,
		handleBlur,
		handleSubmit,
	} = useValidator(INIT, validarIniciarSesion, iniciarSesion)

	const { email, password } = values

	async function iniciarSesion() {
		try {
			await firebase.login(email, password)
			Toast('success', 'Sesión iniciada')
			return Router.push('/')
		} catch(e) {
			// console.table(e)
			if(e.message) return Toast('error', e.message)
			return Toast('error', 'Error al iniciar sesión')
		}
	}

  return (
    <>
      <Layout>
      	<div>
	        <Titulo>Iniciar sesión</Titulo>
	        <Formulario 
	        	noValidate
	        	className={addAnimClass('fadeInUp')}
	        	onSubmit={handleSubmit}
	        >
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
	        	<Submit type="submit" value="Iniciar sesión" />
	        </Formulario>
      	</div>
      </Layout>
    </>
  )
}

export default Login
