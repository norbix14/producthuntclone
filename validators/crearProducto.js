export default function validarCrearProducto(valores) {
	const regExpUrl = /^(ftp|http|https):\/\/[^ "]+$/
	let errores = {}
	if(!valores.nombre) {
		errores.nombre = 'Nombre obligatorio'
	}
	if(!valores.empresa) {
		errores.empresa = 'Empresa obligatoria'
	}
	if(!valores.url) {
		errores.url = 'La URL es obligatoria'
	} else if (!regExpUrl.test(valores.url)) {
		errores.url = 'La URL es inválida'
	}
	if(!valores.descripcion) {
		errores.descripcion = 'La descripcion es obligatoria'
	}
	return errores
}
