import styled from '@emotion/styled'

export const LinkTo = styled.a`
	display: ${props => props.dNone ? 'none' : 'block'};
	font-weight: 700;
	text-transform: uppercase;
	border: 1px solid #d1d1d1;
	padding: 0.8rem 2rem;
	margin: 2rem auto;
	text-align: center;
	background-color: ${props => props.bgColor ? '#da552f' : '#fff'};
	color: ${props => props.bgColor ? '#fff' : '#000'};
	&:last-of-type {
		margin-right: 0;
	}
	&:hover {
		cursor: pointer;
	}
`
export const LinkToProducto = styled.a`
	font-size: 2rem;
	font-weight: 700;
	margin: 0;
	&:hover {
		cursor: pointer;
	}
`
