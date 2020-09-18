import styled from '@emotion/styled'

export const Campo = styled.div`
	margin-bottom: 2rem;
	display: flex;
	align-items: center;
	label {
		flex: 0 0 150px;
		font-size: 1.8rem;
	}
	input, 
	textarea {
		flex: 1;
		padding: 1rem;
	}
	textarea {
		height: 400px;
	}
`
export const CampoProgress = styled.div`
	margin-bottom: 2rem;
	display: flex;
	align-items: center;
	label {
		flex: 0 0 150px;
		font-size: 1.8rem;
	}
	progress {
		flex: 1;
		padding: 1.5rem;
	}
	div {
		flex: 1 0 50px;
		max-width: 200px;
	}
`
