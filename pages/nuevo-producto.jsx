import React, { useContext, useState } from 'react'
import Router from 'next/router'
import FileUploader from 'react-firebase-file-uploader'
import { FirebaseContext } from '../firebase/'
import useFileUploader from '../hooks/useFileUploader'
import useValidator from '../hooks/useValidator'
import validarCrearProducto from '../validators/crearProducto'
import Layout from '../components/layout/Layout'
import Error404 from '../components/layout/Error404'
import { Subtitulo } from '../styles/headings/Subtitulo'
import { Formulario } from '../styles/forms/Formulario'
import { Campo, CampoProgress } from '../styles/divs/Campo'
import { Submit } from '../styles/inputs/Submit'
import { ErrorP } from '../styles/errors/ErrorMsg'
import { SweetAlert, SwalConfirmUpload } from '../utils/SweetAlert'
import { addAnimClass } from '../utils/AddAnimateClass'

const NuevoProducto = () => {
	const { usuario, firebase } = useContext(FirebaseContext)

	const INIT = {
		nombre: '',
		empresa: '',
		url: '',
		descripcion: ''
	}

	const {
		uploading,
		progress,
		urlimagen,
		imagename,
		handleUploadStart,
		handleProgress,
		handleUploadError,
		handleUploadSuccess
	} = useFileUploader(firebase)

	const {
		values,
		error,
		handleChange,
		handleBlur,
		handleSubmit,
	} = useValidator(INIT, validarCrearProducto, crearProducto)

	const { nombre, empresa, url, descripcion } = values

	async function crearProducto() {
		if(!usuario) return Router.push('/login')
		const producto = {
			nombre, 
			empresa, 
			url, 
			descripcion, 
			votos: 0,
			comentarios: [],
			creado: Date.now(),
			creador: {
				id: usuario.uid,
				nombre: usuario.displayName
			},
			imagen: {
				id: imagename,
				url: urlimagen,
			},
			votantes: [],
		}
		try {
			await firebase.db.collection('productos').add(producto)
			SweetAlert('success', 'Producto agregado')
			return Router.push('/')
		} catch(e) {
			// console.log(e)
			if(e.message) return SweetAlert('error', e.message)
			return SweetAlert('error', 'Error al crear producto')
		}
	}

  return (
    <>
      <Layout>
      	<div>
	      	{
	      		!usuario ? (
	      			<Error404 titulo="Página no disponible" />
	      		) : (
			      <>
			        <Subtitulo>Nuevo producto</Subtitulo>
			        <Formulario
			        	noValidate
			        	className={addAnimClass('fadeInUp')}
			        	onSubmit={handleSubmit}
			        >
			        	<fieldset>
			        		<legend>Información general</legend>
					      	<Campo>
					      		<label htmlFor="nombre">Nombre</label>
					      		<input 
					      			type="text" 
					      			name="nombre" 
					      			id="nombre" 
					      			placeholder="Nombre del producto"
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
					      		<label htmlFor="empresa">Empresa</label>
					      		<input 
					      			type="text" 
					      			name="empresa" 
					      			id="empresa" 
					      			placeholder="Empresa"
					      			autoComplete="true"
					      			value={empresa}
					      			onChange={handleChange}
					      			onBlur={handleBlur}
					      		/>
					      	</Campo>
				        	{
				        		error?.empresa && <ErrorP>{error?.empresa}</ErrorP>
				        	}
				        	<Campo>
					      		<label htmlFor="imagen">Imagen</label>
					      		<FileUploader 
					      			accept="image/*" 
					      			name="imagen" 
					      			id="imagen" 
					      			randomizeFilename
					            storageRef={firebase.storage.ref('productos')}
					            onUploadStart={handleUploadStart}
					            onUploadError={handleUploadError}
					            onUploadSuccess={handleUploadSuccess}
					            onProgress={handleProgress}
					      		/>
					      	</Campo>
				      		{ 
				      			uploading && 
				      			<CampoProgress>
				      				<label htmlFor="progress">Estado</label>
					      			<progress 
					      				id="progress"
					      				title={Number(progress === 100) ? 'Imagen cargada' : 'Cargando imagen...'}
					      				value={progress}
					      				max="100"
					      			></progress>
					      			{
					      				progress === 100 &&	
						      			<div>
							      			<img 
							      				alt="Imagen producto" 
							      				title="Imagen que será del producto" 
							      				src={urlimagen} 
							      			/>
						      			</div>
					      			}
				      			</CampoProgress>
				      		}
				        	<Campo>
					      		<label htmlFor="url">URL</label>
					      		<input 
					      			type="url" 
					      			name="url" 
					      			id="url" 
					      			placeholder="URL del producto"
					      			autoComplete="true"
					      			value={url}
					      			onChange={handleChange}
					      			onBlur={handleBlur}
					      		/>
					      	</Campo>
				        	{
				        		error?.url && <ErrorP>{error?.url}</ErrorP>
				        	}
			        	</fieldset>
			        	<fieldset>
			        		<legend>Sobre tu producto</legend>
			        		<Campo>
					      		<label htmlFor="descripcion">Descripción</label>
					      		<textarea 
					      			name="descripcion" 
					      			id="descripcion" 
					      			cols="30" 
					      			rows="10"
					      			placeholder="Descripción del producto"
					      			autoComplete="true"
					      			value={descripcion}
					      			onChange={handleChange}
					      			onBlur={handleBlur}
					      		></textarea>
					      	</Campo>
				        	{
				        		error?.descripcion && <ErrorP>{error?.descripcion}</ErrorP>
				        	}
			        	</fieldset>
				       	<Submit type="submit" value="Crear producto" />
				      </Formulario>
			      </>
	      		)
	      	}
      	</div>
      </Layout>
    </>
  )
}

export default NuevoProducto
