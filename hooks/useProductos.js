import React, { useContext, useEffect, useRef, useState } from 'react'
import { FirebaseContext } from '../firebase/'

const useProductos = (order = 'creado') => {
	const isMounted = useRef(true)
	const [ productos, guardarProductos ] = useState([])

	const { firebase } = useContext(FirebaseContext)

	useEffect(() => {
		return () => isMounted.current = false
	}, [])

	useEffect(() => {
		guardarProductos([])
		if(isMounted.current) {
			try {
				const handleSnapshot = (snapshot) => {
					const products = snapshot.docs.map(doc => {
						return {
							id: doc.id,
							...doc.data()
						}
					})
					guardarProductos(products)
				}
				firebase.db.collection('productos').orderBy(order, 'desc').onSnapshot(handleSnapshot)
			} catch(e) {
				// console.log(e)
				guardarProductos([])
			}
		}
	}, [])
	
	return { productos }
}

export default useProductos
