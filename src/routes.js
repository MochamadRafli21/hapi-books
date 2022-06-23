const {addBooksHandler, getAllBooks} = require('./handler');


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
  ];
   
  module.exports = routes;