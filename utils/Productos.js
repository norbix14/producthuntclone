import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { es } from 'date-fns/locale'

export const fechaPublicacion = (date, locale = es) => {
	if(date === null || date === undefined) {
		return 'No hay fecha que mostrar'
	}
	const fecha = Number(date)
	if(isNaN(fecha)) {
		return 'Publicado hace un tiempo'
	}
	const formatDate = formatDistanceToNow(new Date(fecha), { locale })
	return `Publicado hace ${formatDate}`
}

export const cantidadComentarios = (comentarios) => {
	if(comentarios === null || comentarios === undefined) {
		return 'No hay comentarios que mostrar'
	}
	const len = comentarios?.length
	return len > 0 ? `${len} comentarios` : 'Sin comentarios aún'
}

export const cantidadVotantes = (votantes) => {
	if(votantes === null || votantes === undefined) {
		return 'No hay votantes para mostrar'
	}
	const len = votantes?.length
	return len > 0 ? `${len} votantes hasta el momento` : 'Sin votantes por el momento'
}

export const descripcionProducto = (description) => {
	if(description === null || description === undefined) {
		return 'La descripción no está disponible'
	}
	return `Descripción: ${description}`
}

export const datosCreador = (creador) => {
	if(creador === null || creador === undefined) {
		return 'Este producto no tiene creador'
	}
	return `Por: ${creador?.nombre}`
}

export const esCreador = (user, comentarioId) => {
	if(user === null || 
	   user === undefined ||
	   comentarioId === null || 
	   comentarioId === undefined) {
		return false
	}
	if(user.toString() === comentarioId.toString()) {
		return true
	}
	return false
}

export const esAutorizado = (creador, usuario) => {
	if(creador === null || 
	   creador === undefined ||
	   usuario === null || 
	   usuario === undefined) {
		return false
	}
	if(creador.toString() === usuario.toString()) {
		return true
	}
	return false
}
