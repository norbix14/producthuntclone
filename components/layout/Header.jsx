import React, { useContext } from 'react'
import Link from 'next/link'
import { FirebaseContext } from '../../firebase/'
import Buscador from '../ui/Buscador'
import Navigation from './Nav'
import { HeaderTag } from '../../styles/headers/Headers'
import { ContenedorHeader } from '../../styles/divs/Contenedores'
import { Panel } from '../../styles/divs/Panel'
import { Logo, Usuario } from '../../styles/paragraphs/Paragraphs'
import { LinkTo } from '../../styles/anchors/Links'

const Header = () => {
	const { usuario, firebase } = useContext(FirebaseContext)

	return (
		<HeaderTag>
			<ContenedorHeader>
				<Panel>
					<Link href="/">
						<Logo>
							<a>P</a>
						</Logo>
					</Link>
					<Buscador />
					<Navigation />
				</Panel>
				<Panel>
					{
						usuario ? (
						<>
							<Usuario>
								Hola <span>{usuario.displayName}</span>
							</Usuario>
							<LinkTo 
								bgColor="true"
								onClick={() => firebase.cerrarSesion()}
							>Cerrar sesión</LinkTo>
						</>
						) : (
						<>	
							<Link href="/login">
								<LinkTo bgColor="true">Login</LinkTo>
							</Link>
							<Link href="/crear-cuenta">
								<LinkTo>Crear cuenta</LinkTo>
							</Link>
						</>
						)
					}
				</Panel>
			</ContenedorHeader>
		</HeaderTag>
	)
}

export default Header
