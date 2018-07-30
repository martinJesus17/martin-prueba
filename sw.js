//asignar nombre y vercion de la cache

const CACHE_NAME = 'v1_cache_martin_pwa';

//ficheros que se guadaran en la cache

var urlsToCache =[
	'./',
	'./css/estilos.css',
	'./imagenes/favicon.png',
	'./imagenes/favicon-96.png',
	'./imagenes/favicon-64.png',
	'./imagenes/favicon-512.png',
	'./imagenes/favicon-384.png',
	'./imagenes/favicon-32.png',
	'./imagenes/favicon-256.png',
	'./imagenes/favicon-192.png',
	'./imagenes/favicon-144.png',
	'./imagenes/favicon-16.png',
	'./imagenes/favicon-128.png',
	'./imagenes/favicon-1024.png',
	'./imagenes/facebook.png',
	'./imagenes/6.png',
	'./imagenes/5.png',
	'./imagenes/4.png',
	'./imagenes/3.png',
	'./imagenes/2.png',
	'./imagenes/1.png',
	'./imagenes/instagram.png',
	'./imagenes/twitter.png',
];

//Evento install

self.addEventListener('install', e => {
	e.waitUntil(
			caches.open(CACHE_NAME)
				  .then(cache => {
				  	return cache.addAll(urlsToCache)
				  				.then(() =>{
				  					self.skipWaiting();
				  				});
				  			
				   })
		.catch(err => console.log('No se ha registrado el ache',err))
		);
});

//Evento activate

self.addEventListener('activate', e =>{
	const cacheWhitelist = [CACHE_NAME];

	e.waitUntil(
		caches.keys()
			  .then(cacheNames => {
			  	return Promise.all(
			  			cacheNames.map(cacheName => {

			  				if(cacheWhitelist.indexOf(cacheName) === -1){
			  					return caches.delete(cacheName);
			  				}
			  			})
			  		);
			  })
			  .then(() => {
			  	self.clients.claim();
			  })
	);
});

//Evento fech 

self.addEventListener('fetch', e => {

	e.respondWith(
		caches.match(e.request)
			  .then(res => {
			  		if(res){
			  			return res;
			  		}
			  		return fetch(e.request);
			  })
	);

});