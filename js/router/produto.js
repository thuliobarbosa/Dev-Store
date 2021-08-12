const produto = require( '../controller/produto' );

module.exports = ( app ) => {
   app.post( '/produto', produto.post );
   app.put( '/produto/:id', produto.put );
   app.delete( '/produto/:id', produto.delete );
   app.get( '/produto', produto.get );
   app.get( '/produto/:id', produto.getById );
}