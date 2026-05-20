import { useEffect, useState } from 'react';
import apiFetch from '@wordpress/api-fetch';

let cache = null;
export default function useCurrentUser() {
	const [ user, setUser ] = useState( cache );
	const [ isLoading, setIsLoading ] = useState( ! cache );

	useEffect( () => {
		if ( cache ) {
			setIsLoading( false );
			return;
		}
		apiFetch( { path: '/wp/v2/users/me' } ).then( ( user ) => {
			setUser( user );
			cache = user;
			setIsLoading( false );
		} );
	}, [] );

	return {
		data: user,
		isLoading: isLoading,
	};
}
