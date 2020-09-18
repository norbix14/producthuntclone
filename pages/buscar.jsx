import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useProductos from '../hooks/useProductos'
import Layout from '../components/layout/Layout'
import DetallesProducto from '../components/layout/DetallesProducto'
import { Subtitulo } from '../styles/headings/Subtitulo'

const Buscar = () => {
	const router = useRouter()
	const { query: { q } } = router

	const { productos } = useProductos('creado')
	const [ resultados, guardarResultados ] = useState([])

	useEffect(() => {
		const busqueda = q?.toLowerCase() || ''
		const regExpAcentos = /[\u0300-\u036f]/g
		const productosFiltrados = productos.filter(producto => {
			return (
				producto.nombre.toLowerCase().normalize('NFD').replace(regExpAcentos, '').includes(busqueda) ||
				producto.descripcion.toLowerCase().normalize('NFD').replace(regExpAcentos, '').includes(busqueda)
			)
		})
		guardarResultados(productosFiltrados)
	}, [q, productos])

  return (
     <>
      <Layout>
        <div className="listado-productos">
        	<div className="contenedor">
        		{
        			resultados.length > 0 ? 
		        		<ul className="bg-white">
		        			{
	        					resultados.map(resultado => (
											<DetallesProducto
												key={resultado.id}
												producto={resultado}
											/>
										))
		        			}
		        		</ul>
        			: <Subtitulo>Sin productos por ahora...</Subtitulo>
        		}
        	</div>
        </div>
      </Layout>
    </>
  )
}

export default Buscar
