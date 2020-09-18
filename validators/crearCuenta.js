export default function validarCrearCuenta(valores) {
	const regExpEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
	let errores = {}
	if(!valores.nombre) {
		errores.nombre = 'Nombre obligatorio'
	}
	if(!valores.email) {
		errores.email = 'Email obligatorio'
	} else if (!regExpEmail.test(valores.email)) {
		errores.email = 'Email no válido'
	}
	if(!valores.password) {
		errores.password = 'Contraseña obligatoria'
	} else if (valores.password.length < 6) {
		errores.password = 'Contraseña mínima de 6 caracteres'
	}
	return errores
}
