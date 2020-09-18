import React from 'react'
import Head from 'next/head'
import Header from './Header'

const Layout = (props) => {
	return (
	  <div>
	  	<Head>
	  		<meta charSet="utf-8" />
	  		<title>Product Hunt Clone</title>
				<link 
					rel="stylesheet" 
					href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" 
					integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" 
					crossOrigin="anonymous" 
				/>
				<link 
					href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Roboto+Slab:wght@400;700&display=swap" 
					rel="stylesheet"
				/>
				<link
			    rel="stylesheet"
			    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
			  />
				<link
					href="/static/css/app.css"
					rel="stylesheet"
				/>
			</Head>
		  <Header />
			<main>{ props.children }</main>
		</div>
	)
}

export default Layout
