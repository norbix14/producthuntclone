import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FirebaseContext } from '../../firebase/'
import Layout from '../../components/layout/Layout'
import Error404 from '../../components/layout/Error404'
import { addAnimClass } from '../../utils/AddAnimateClass'
import {
	fechaPublicacion,
	cantidadComentarios,
	cantidadVotantes,
	datosCreador,
	esCreador,
	esAutorizado,
	descripcionProducto
} from '../../utils/Productos'
import { Toast, SwalDelete } from '../../utils/SweetAlert'
import { Titulo  } from '../../styles/headings/Titulo'
import {
	ContenedorProducto,
	VotosProducto,
	VotantesProducto,
	FormComment
} from '../../styles/divs/Producto'
import { Campo } from '../../styles/divs/Campo'
import { Submit } from '../../styles/inputs/Submit'
import { LinkTo } from '../../styles/anchors/Links'
import { ListaComentarios } from '../../styles/lists/Producto'
import { Creador } from '../../styles/paragraphs/Paragraphs'

const Producto = () => {
	const { usuario, firebase } = useContext(FirebaseContext)

	const [ consultadb, guardarConsultadb ] = useState(true)
	const [ hidebtn, setHideBtn ] = useState(false)
	const [ hidediv, setHideDiv ] = useState(false)
	const [ producto, guardarProducto ] = useState({})
	const [ error, guardarError ] = useState(false)
	const [ comentario, guardarComentario ] = useState({
		mensaje: '',
		usuarioId: '',
		displayName: '',
	})

	const router = useRouter()
	
	const { query: { id } } = router

	const {
		comentarios,
		creado,
		descripcion,
		empresa,
		nombre, 
		url,
		votos,
		creador,
		imagen,
		votantes,
	} = producto

	const votarProducto = async () => {
		if(!usuario) return router.push('/login')
		try {
			if(votantes.includes(usuario.uid)) {
				return Toast('warning', 'Ya has votado este producto')
			}
			const nuevoTotal = votos + 1
			const nuevoVotante = [...votantes, usuario.uid]
			await firebase.db.collection('productos').doc(id).update({
				votos: nuevoTotal, 
				votantes: nuevoVotante 
			})
			guardarProducto({
				...producto,
				votos: nuevoTotal
			})
			guardarConsultadb(true)
			setHideBtn(true)
			return Toast('success', 'Gracias por tu voto!')
		} catch(e) {
			// console.log(e)
			return Toast('error', 'No se ha podido votar')
		}
	}

	const eliminarProducto = () => {
		if(!usuario) return router.push('/login')
		if(esAutorizado(creador?.id, usuario?.uid) === false) {
			Toast('warning', 'Acción no válida')
			return router.push('/')
		}
		SwalDelete(async () => {
			try {
				await firebase.storage.collection('productos').doc(imagen.id).delete()
				await firebase.db.collection('productos').doc(id).delete()
				Toast('success', 'Producto eliminado')
				return router.push('/')
			} catch(e) {
				// console.log(e)
				return Toast('error', 'No se ha podido eliminar')
			}
		})
	}

	const handleChangeComment = (e) => {
		guardarComentario({
			...comentario,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmitComment = async (e) => {
		e.preventDefault()
		const { mensaje } = comentario
		if(mensaje.trim() === '') {
			return Toast('warning', 'No dejar el campo vacío')
		}
		try {
			comentario.usuarioId = usuario.uid
			comentario.usuarioNombre = usuario.displayName
			const nuevosComentarios = [...comentarios, comentario]
			await firebase.db.collection('productos').doc(id).update({
				comentarios: nuevosComentarios
			})
			guardarProducto({
				...producto,
				comentarios: nuevosComentarios
			})
			guardarConsultadb(true)
			setHideDiv(true)
			return Toast('success', 'Gracias por tu comentario!')
		} catch(e) {
			// console.log(e)
			return Toast('error', 'No se ha podido comentar')
		}
	}
	
	const obtenerProducto = async () => {
		try {
			const query = await firebase.db.collection('productos').doc(id)
			const resultado = await query.get()
			if(resultado.exists) {
				guardarProducto(resultado.data())
			} else {
				guardarError(true)
			}
		} catch(e) {
			// console.log(e)
			guardarError(true)
		}
	}

	useEffect(() => {
		if(id && consultadb) {
			obtenerProducto()
			return () => guardarConsultadb(false)
		}
	}, [id])

	return (
	  <Layout>
	  	<>
	  		{
	  			error ? (
	  				<Error404 titulo="Este producto no existe" />
	  			) : (
			  		<div className={addAnimClass('fadeInRight') + "contenedor"}>
			  			<Titulo>{nombre}</Titulo>
			  			<ContenedorProducto>
			  				<div>
			  					<p>{fechaPublicacion(creado)}</p>
			  					<p>Empresa: {empresa}</p>
			  					<p>{datosCreador(creador)}</p>
			  					<img 
			  						alt="Imagen producto"
			  						src={imagen?.url}
			  					/>
			  					<p>{descripcionProducto(descripcion)}</p>
			  					{
			  						usuario && (
				  					<FormComment hideDiv={hidediv}>
					  					<h2>Agregar un comentario</h2>
					  					<form onSubmit={handleSubmitComment}>
					  						<Campo>
					  							<input 
					  								type="text" 
					  								name="mensaje" 
					  								placeholder="Tu comentario"
					  								required
					  								onChange={handleChangeComment}
					  							/>
					  						</Campo>
				  							<Submit 
				  								type="submit"
				  								value="Comentar"
				  							/>
					  					</form>
				  					</FormComment>
			  						)
			  					}
			  					<h2>Comentarios</h2>
			  					<p>{cantidadComentarios(comentarios)}</p>
			  					{
			  						comentarios &&
				  					<ul>
				  						{
				  							comentarios.map((comentario, i) => (
													<ListaComentarios
														key={`${comentario.usuarioId}-${i}`}
													>
														<p>{comentario.mensaje}</p>
														<p>
															Escrito por <span>{comentario.usuarioNombre}</span>
														</p>
														{
															esCreador(creador?.id, comentario.usuarioId) &&
															<Creador>Quien creó el producto</Creador>
														}
													</ListaComentarios>
												))
				  						}
				  					</ul>
			  					}
			  					{
					  				esAutorizado(creador?.id, usuario?.uid) &&
					  				<LinkTo
					  					bgColor="true"
					  					onClick={eliminarProducto}
					  				>Eliminar producto</LinkTo>
					  			}
			  				</div>
			  				<aside>
			  					<VotantesProducto>
			  						<p>{cantidadVotantes(votantes)}</p>
			  					</VotantesProducto>
			  					<LinkTo
			  						bgColor="true"
			  						target="_blank"
			  						href={url}
			  					>Visitar URL</LinkTo>
			  					<VotosProducto>
										<div>&#9650;</div>
										<p>{votos} votos</p>
										{
											usuario &&
											<LinkTo
												dNone={hidebtn}
												onClick={votarProducto}
											>Votar</LinkTo>
										}
									</VotosProducto>
			  				</aside>
			  			</ContenedorProducto>
			  		</div>
	  			)
	  		}
	  	</>
	  </Layout>
	)
}

export default Producto
