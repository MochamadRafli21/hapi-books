const {
    addBooksHandler,
    getAllBooks, 
    getBooksById, 
    updateBookById
} = require('./handler');


const routes = [
    {
      method: 'POST',
      path: '/books',
      handler: addBooksHandler,
    },

    {
        method: 'GET',
        path: '/books',
        handler: getAllBooks,
    },

    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBooksById,
    },

    {
        method: 'PUT',
        path: '/books/{id}',
        handler: updateBookById,
    },
  ];
   
  module.exports = routes;