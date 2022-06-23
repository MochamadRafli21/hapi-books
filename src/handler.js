const { nanoid } = require('nanoid');
const books = require('./books');

const addBooksHandler = (request,h) =>{
    const { 
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    const finished = pageCount === readPage ? true : false;
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt
    const id = nanoid(8);

    const newBooks = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt
    }
    let err = ""
    if(!name){
        err += "Gagal menambahkan buku. Mohon isi nama buku"
    }
    if(readPage > pageCount){
        err += "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount,\n"
    }

    if(err){
        const response = h.response({
            status: 'fail',
            message: err,
          });
          response.code(400);
          return response;
    }

    books.push(newBooks);

    const isSuccess = books.filter((books) => books.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
          status: 'success',
          message: 'Buku berhasil ditambahkan',
          data: {
            bookId: id,
          },
        });
        response.code(201);
        return response;
      }
      const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
      });
      response.code(500);
      return response;
}

module.exports  = {addBooksHandler};