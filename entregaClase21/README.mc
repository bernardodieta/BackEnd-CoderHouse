Entrega Clase 21 PASSPORT CON LOCAL STRATEGY Y GITHUB LOGIN

Hola Alan aqui va la entrega, te comento pude hacerlo funcionar con mucho dolor de cabeza ajjaja, tengo que practicar mas esta parte para que no se me complique.
Logre hacer que funcione todo tanto en localstrategy como con Github, lo unico que no pude hacer funcionar es que cuando logeo con Github y me redirecciona a Profile 
no pude hacer que me muestre los datos, pero si lo hago con el localstrategy si me los muestra, te juro que probe mil cosas pero no me funciono.

Por lo demas que tiene el proyecto es lo mismo que tenia la anterior entrega.

En las pruebas en mi compu con postman y por las views todo me funciona pero ya sabes como es esto cuando uno entrega algo se rompe y te hace quedar mal jaja.

Cualquier duda estoy al pendiente.
Muchas gracias por todo


RESPUESTA DE GITHUB STRATEGY CUANDO INTENTO LOGEAR CON GITHUB(NO PUEDO VER EL EMAIL A PESAR DE TENER EL MAIL PUBLICO EN GITHUB Y TENER HABILITADO EL PERFIL EN LA PRIVACIDAD)
POR LO QUE NO ESTA GUARDANDO NADA EN LA BASE DE DATOS CUANDO USO ESTE MODO, SI USO localstrategy ANDA BIEN EL LOGIN.

EN el archivo passport.config.js te deje los comentarios donde esta fallando seguno yo.


TAMBIEN ME DOY CUENTA QUE 
Profile obtenido del usuario:
{
  id: '47125534',
  nodeId: 'MDQ6VXNlcjQ3MTI1NTM0',
  displayName: 'Bernardo Dieta',
  username: 'bernardodieta',
  profileUrl: 'https://github.com/bernardodieta',
  photos: [ { value: 'https://avatars.githubusercontent.com/u/47125534?v=4' } ],
  provider: 'github',
  _raw: '{"login":"bernardodieta","id":47125534,"node_id":"MDQ6VXNlcjQ3MTI1NTM0","avatar_url":"https://avatars.githubusercontent.com/u/47125534?v=4","gravatar_id":"","url":"https://api.github.com/users/bernardodieta","html_url":"https://github.com/bernardodieta","followers_url":"https://api.github.com/users/bernardodieta/followers","following_url":"https://api.github.com/users/bernardodieta/following{/other_user}","gists_url":"https://api.github.com/users/bernardodieta/gists{/gist_id}","starred_url":"https://api.github.com/users/bernardodieta/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/bernardodieta/subscriptions","organizations_url":"https://api.github.com/users/bernardodieta/orgs","repos_url":"https://api.github.com/users/bernardodieta/repos","events_url":"https://api.github.com/users/bernardodieta/events{/privacy}","received_events_url":"https://api.github.com/users/bernardodieta/received_events","type":"User","site_admin":false,"name":"Bernardo Dieta","company":null,"blog":"","location":"Mexico City","email":null,"hireable":null,"bio":null,"twitter_username":null,"public_repos":20,"public_gists":0,"followers":0,"following":0,"created_at":"2019-01-28T22:25:28Z","updated_at":"2024-03-26T18:52:30Z"}',
  _json: {
    login: 'bernardodieta',
    id: 47125534,
    node_id: 'MDQ6VXNlcjQ3MTI1NTM0',
    avatar_url: 'https://avatars.githubusercontent.com/u/47125534?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/bernardodieta',
    html_url: 'https://github.com/bernardodieta',
    followers_url: 'https://api.github.com/users/bernardodieta/followers',
    following_url: 'https://api.github.com/users/bernardodieta/following{/other_user}',
    gists_url: 'https://api.github.com/users/bernardodieta/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/bernardodieta/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/bernardodieta/subscriptions',
    organizations_url: 'https://api.github.com/users/bernardodieta/orgs',
    repos_url: 'https://api.github.com/users/bernardodieta/repos',
    events_url: 'https://api.github.com/users/bernardodieta/events{/privacy}',
    received_events_url: 'https://api.github.com/users/bernardodieta/received_events',
    type: 'User',
    site_admin: false,
    name: 'Bernardo Dieta',
    company: null,
    blog: '',
    location: 'Mexico City',
    email: null,
    hireable: null,
    bio: null,
    twitter_username: null,
    public_repos: 20,
    public_gists: 0,
    followers: 0,
    following: 0,
    created_at: '2019-01-28T22:25:28Z',
    updated_at: '2024-03-26T18:52:30Z'
  }
}
Usuario encontrado para login:
{
  _id: new ObjectId('6603081b9f6c6b5182475008'),
  email: null,
  password: '',
  __v: 0
}
{
  _id: new ObjectId('6603081b9f6c6b5182475008'),
  email: null,
  password: '',
  __v: 0
}