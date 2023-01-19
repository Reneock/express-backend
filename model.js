let booksDb = require('./db');

class BookModel {
  constructor({title, author, description}){
    this.title = title;
    this.author = author;
    this.description = description;
  }

  save(){
    booksDb.push(this);
    return this;
  }

  static all(){
    return booksDb;
  }

  static update(updateInfo = {}){
    booksDb = booksDb.map(book => {
      if(book.title === updateInfo.title){
        return {...book, ...updateInfo};
      }
      return book;
    });
  }

  static delete({title}){

    let deletedBook = null;

    booksDb = booksDb.filter(book => {
      if (book.title !== title) {
        return true;
      }
      deletedBook = book;
      return false;
    });

    return deletedBook;
  }

}

module.exports = BookModel;