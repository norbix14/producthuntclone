import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import {
	cantidadComentarios,
	fechaPublicacion
} from '../../utils/Productos'
import {
	addAnimClass
} from '../../utils/AddAnimateClass'
import {
	ListaProducto
} from '../../styles/lists/Producto'
import {
	ImgProducto
} from '../../styles/imgs/Producto'
import {
	LinkToProducto
} from '../../styles/anchors/Links'
import {
	DescripcionProducto,
	ComentariosProducto,
	VotosProducto
} from '../../styles/divs/Producto'
import {
	TextoDescripcionProducto
} from '../../styles/paragraphs/Paragraphs'

const DetallesProducto = ({producto}) => {
	if(producto === null || producto === undefined) {
		return (
			<h2>Sin productos...</h2>
		)
	}
	
	const {
		id,
		comentarios,
		creado,
		descripcion,
		empresa,
		nombre, 
		url,
		imagen,
		votos
	} = producto

	return (
		<ListaProducto className={addAnimClass('fadeInUp')}>
			<DescripcionProducto>
				<div>
					<ImgProducto 
						alt="Imagen producto" 
						src={imagen.url} 
					/>
				</div>
				<div>
					<Link 
						href="/productos/[id]"
						as={`/productos/${id}`}
					>
						<LinkToProducto>{nombre}</LinkToProducto>
					</Link>
					<TextoDescripcionProducto>
						{descripcion}
					</TextoDescripcionProducto>
					<ComentariosProducto>
						<div>
							<img 
								src="/static/img/comentario.png"
								alt="Comentarios"
							/>
							<p>{cantidadComentarios(comentarios)}</p>
						</div>
					</ComentariosProducto>
					<p>{fechaPublicacion(creado)}</p>
				</div>
			</DescripcionProducto>
			<VotosProducto>
				<div>&#9650;</div>
				<p>{votos} votos</p>
			</VotosProducto>
		</ListaProducto>
	)
}

DetallesProducto.propTypes = {
	producto: PropTypes.object.isRequired
}

export default DetallesProducto
