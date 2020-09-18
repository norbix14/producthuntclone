import React, { useContext } from 'react'
import { FirebaseContext } from '../../firebase/'
import Link from 'next/link'
import { NavTag } from '../../styles/navs/Navs'

const Navigation = () => {
	const { usuario } = useContext(FirebaseContext)
	return (
		<NavTag>
			<Link href="/">
				<a>Inicio</a>
			</Link>
			<Link href="/populares">
				<a>Populares</a>
			</Link>
			{
				usuario && 
				<Link href="/nuevo-producto">
					<a>Nuevo producto</a>
				</Link>
			}
		</NavTag>
	)
}

export default Navigation
