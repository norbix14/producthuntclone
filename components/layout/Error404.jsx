import React from 'react'
import PropTypes from 'prop-types'
import { Subtitulo } from '../../styles/headings/Subtitulo'

const Error404 = ({titulo}) => (
	<Subtitulo>{titulo}</Subtitulo>
)

Error404.propTypes = {
	titulo: PropTypes.string.isRequired
}

export default Error404
