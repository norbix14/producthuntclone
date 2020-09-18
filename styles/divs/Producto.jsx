import styled from '@emotion/styled'

export const ContenedorProducto = styled.div`
	@media (min-width: 768px) {
		display: grid;
		grid-template-columns: 2fr 1fr;
		column-gap: 2rem;
	}
`
export const DescripcionProducto = styled.div`
	flex: 0 1 600px;
	display: grid;
	grid-template-columns: 1fr 3fr;
	column-gap: 2rem;
`
export const ComentariosProducto = styled.div`
	margin-top: 2rem;
	display: flex;
	align-items: center;
	div {
		display: flex;
		align-items: center;
		border: 1px solid var(--gris3);
		padding: 0.3rem 1rem;
		margin-right: 2rem;
	}
	img {
		width: 2rem;
		margin-right: 2rem;
	}
	p {
		font-size: 1.6rem;
		margin-right: 1rem;
		font-weight: 700;
		&:last-of-type {
			margin: 0;
		}
	}
`
export const VotosProducto = styled.div`
	flex: 0 0 auto;
	text-align: center;
	border: 1px solid var(--gris3);
	padding: 1rem 3rem;
	div {
		font-size: 2rem;
	}
	p {
		margin: 0;
		font-size: 2rem;
		font-weight: 700;
	}
`
export const VotantesProducto = styled.div`
	flex: 0 0 auto;
	text-align: center;
	border: 1px solid var(--gris3);
	padding: 1rem 3rem;
	p {
		margin: 0;
		font-size: 2rem;
		font-weight: 700;
	}
`
export const FormComment = styled.div`
	display: ${props => props.hideDiv ? 'none' : 'block'};
`
