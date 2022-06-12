class User {
  constructor(firstName, lastName, books, pets) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.books = books;
    this.pets = pets;
  }
  getFullName() {
    let fullName = this.firstName + " " + this.lastName;
    return fullName;
  }
  addPet(newPet) {
    this.pets.push(newPet);
  }
  countPets() {
    let petsQuantity = `pets: ${this.pets.length} - `;
    return petsQuantity;
  }

  addBook(newBook, author) {
    this.books.push({
      bookName: newBook,
      author: author
    });
  }
  getBookNames() {
    let booksNames = this.books.map((book) => book.bookName);
    return booksNames;
  }
}

const newUser = new User(
  "Frany",
  "Rodríguez Gerzovich",
  [{
      bookName: "Ulysses",
      author: "James Joyce"
    },
    {
      bookName: "Don Quixote",
      author: "Miguel de Cervantes",
    },
  ],
  ["Dog", "Cat"]
);

console.log("________________USER INFO_________________")
console.log("User: " + newUser.getFullName());
newUser.addPet("Rabbit");
console.log(newUser.countPets() + newUser.pets);
newUser.addBook("In Search of Lost Time ", "Marcel Proust");
console.log("Titles: " + newUser.getBookNames());