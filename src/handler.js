/* eslint-disable max-len */
const {v4: uuidv4} = require('uuid');
const books = require('./books');

const addBooksHandler = (request, h) =>{
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
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const id = uuidv4();

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
    updatedAt,
  };

  let err = '';
  if (!name) {
    err += 'Gagal menambahkan buku. Mohon isi nama buku';
  }
  if (readPage > pageCount) {
    // eslint-disable-next-line max-len
    err += 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount';
  }

  if (err) {
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
};

const getAllBooks =(request, h) => {
  const {name, reading, finished} = request.query;
  let book = books;
  if (name !== undefined) {
    book = book.filter((b) => {
      return b.name.toUpperCase().includes(name.toUpperCase());
    });
  }

  if (reading !== undefined) {
    const value = reading === '1' ? true:false;
    book = book.filter((b) => {
      return b.reading === value;
    });
  }

  if (finished !== undefined) {
    const value = finished === '1' ? true:false;
    book = book.filter((b) => {
      return b.finished === value;
    });
  }

  if (book !== undefined) {
    book = book.map((book) => {
      const container = {};
      container.id = book.id;
      container.name = book.name;
      container.publisher = book.publisher;

      return container;
    });
    return {
      status: 'success',
      data: {
        books: book,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const getBooksById = (request, h) => {
  const {id} = request.params;

  const book = books.filter((b) => b.id === id)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book: book,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const updateBookById = (request, h) => {
  const {id} = request.params;

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

  const finished = pageCount === readPage;
  const updatedAt = new Date().toISOString();

  let err = '';
  const index = books.findIndex((book) => book.id === id);

  if (!name) {
    err += 'Gagal memperbarui buku. Mohon isi nama buku';
  }

  if (readPage > pageCount) {
    err += 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount';
  }

  if (err !== '') {
    const response = h.response({
      status: 'fail',
      message: err,
    });
    response.code(400);
    return response;
  }

  if ( index !== -1 ) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }
};

const deleteBookById = (request, h) =>{
  const {id} = request.params;

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBooksHandler,
  getAllBooks,
  getBooksById,
  updateBookById,
  deleteBookById,
};
