import React from 'react'
import useProductos from '../hooks/useProductos'
import Layout from '../components/layout/Layout'
import { Subtitulo } from '../styles/headings/Subtitulo'
import DetallesProducto from '../components/layout/DetallesProducto'

const Populares = () => {
	const { productos } = useProductos('votos')

  return (
    <>
      <Layout>
        <div className="listado-productos">
        	<div className="contenedor">
        		{
        			productos.length > 0 ? 
		        		<ul className="bg-white">
		        			{
	        					productos.map(producto => (
											<DetallesProducto
												key={producto.id}
												producto={producto}
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

export default Populares
