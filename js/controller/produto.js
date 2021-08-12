async function connect() {

    if ( global.connection && global.connection.state !== 'disconnected' )
        return global.connection;
        
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection( { host:'remotemysql.com', user: 'IN7WRuXzdL', password:'jqGfPNC49P', database: 'IN7WRuXzdL' } );
  
    console.log( "Conectou no MySQL!" );
    global.connection = connection;
    return connection;
  
};

exports.post = async (req, res) => {
    const conn = await connect();
    const sql = 'INSERT INTO produto (image, descricao, info, grupo, valor, estoque) VALUES (?, ?, ?, ?, ?, ?);';
    const values = [ req.body.image, req.body.descricao, req.body.info, req.body.grupo, req.body.valor, req.body.estoque ];

    await conn.query(sql, values);
    res.status( 201 ).send( 'Produto cadastrado com sucesso' );
};

exports.put = async ( req, res, next ) => {
    let id = req.params.id;
    const conn = await connect();
    const sql = 'UPDATE produto SET image=?, descricao=?, info=?, grupo=?, valor=?, estoque=? WHERE id = ?;';
    const values = [ req.body.image, req.body.descricao, req.body.info, req.body.grupo, req.body.valor, req.body.estoque, id ];

    await conn.query( sql, values );
    res.status(201).send( 'Produto alterado com sucesso!' );
};

exports.delete = async ( req, res, next ) => {

    let id = req.params.id;
    const conn = await connect();
    const sql = 'DELETE FROM produto WHERE id = ?;';
    const values = [ id ];

    await conn.query( sql, values );
    res.status(200).send( 'Produto deletado com sucesso!' );
};

exports.get = async ( req, res, next ) => {
    const conn = await connect();
    const [ rows ] = await conn.query( 'SELECT * FROM produto;' );

    res.status(200).send( rows );
};

exports.getById = async ( req, res, next ) => {
    const conn = await connect();
    const [ rows ] = await conn.query( 'SELECT * FROM produto WHERE id = ' + req.params.id );

    if ( rows.length > 0 ) {
        res.status( 200 ).send( rows[0] );
    } 
    else {
        res.status(404).send( "Produto não encontrado" );
    }
  
};