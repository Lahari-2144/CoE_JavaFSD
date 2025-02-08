package com.practice.tm;

import java.io.*;
import java.util.*;

class Book implements Serializable {
    private String title, author, ISBN;
    private boolean isBorrowed, isReserved;

    public Book(String title, String author, String ISBN) {
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
        this.isBorrowed = false;
        this.isReserved = false;
    }

    public String getTitle() { return title; }
    public String getISBN() { return ISBN; }
    public boolean isBorrowed() { return isBorrowed; }
    
    public void borrow() { this.isBorrowed = true; }
    public void returnBook() { this.isBorrowed = false; }

    @Override
    public String toString() { return title + " by " + author + " (ISBN: " + ISBN + ")"; }
}

class User implements Serializable {
    private String name, userID;
    private List<Book> borrowedBooks = new ArrayList<>();

    public User(String name, String userID) { 
        this.name = name;
        this.userID = userID; 
    }

    public String getUserID() { return userID; }
    public List<Book> getBorrowedBooks() { return borrowedBooks; }

    public void borrowBook(Book book) { borrowedBooks.add(book); }
    public void returnBook(Book book) { borrowedBooks.remove(book); }

    @Override
    public String toString() { return "User: " + name + " (ID: " + userID + ")"; }
}

class BookNotFoundException extends Exception { public BookNotFoundException(String msg) { super(msg); } }
class UserNotFoundException extends Exception { public UserNotFoundException(String msg) { super(msg); } }
class MaxBooksAllowedException extends Exception { public MaxBooksAllowedException(String msg) { super(msg); } }

interface ILibrary {
    void borrowBook(String ISBN, String userID) throws BookNotFoundException, UserNotFoundException, MaxBooksAllowedException;
    void returnBook(String ISBN, String userID) throws BookNotFoundException, UserNotFoundException;
    Book searchBook(String title);
}

abstract class LibrarySystem implements ILibrary {
    protected List<Book> books = new ArrayList<>();
    protected List<User> users = new ArrayList<>();

    public abstract void addBook(Book book);
    public abstract void addUser(User user);

    public void saveLibraryData() throws IOException {
        try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("library.dat"))) {
            out.writeObject(books);
            out.writeObject(users);
        }
    }

    public void loadLibraryData() throws IOException, ClassNotFoundException {
        try (ObjectInputStream in = new ObjectInputStream(new FileInputStream("library.dat"))) {
            books = (List<Book>) in.readObject();
            users = (List<User>) in.readObject();
        }
    }
}

class LibraryManager extends LibrarySystem {
    private static final int MAX_BORROWED_BOOKS = 3;

    public void addBook(Book book) { books.add(book); }
    public void addUser(User user) { users.add(user); }

    public Book searchBook(String title) {
        return books.stream().filter(b -> b.getTitle().equalsIgnoreCase(title)).findFirst().orElse(null);
    }

    public void borrowBook(String ISBN, String userID) throws BookNotFoundException, UserNotFoundException, MaxBooksAllowedException {
        User user = users.stream().filter(u -> u.getUserID().equals(userID)).findFirst().orElseThrow(() -> new UserNotFoundException("User not found"));
        Book book = books.stream().filter(b -> b.getISBN().equals(ISBN)).findFirst().orElseThrow(() -> new BookNotFoundException("Book not found"));

        if (user.getBorrowedBooks().size() >= MAX_BORROWED_BOOKS)
            throw new MaxBooksAllowedException("User has already borrowed max allowed books");

        if (!book.isBorrowed()) {
            book.borrow();
            user.borrowBook(book);
            System.out.println(user.getUserID() + " borrowed " + book.getTitle());
        } else {
            System.out.println("Book is already borrowed.");
        }
    }

    public void returnBook(String ISBN, String userID) throws BookNotFoundException, UserNotFoundException {
        User user = users.stream().filter(u -> u.getUserID().equals(userID)).findFirst().orElseThrow(() -> new UserNotFoundException("User not found"));
        Book book = user.getBorrowedBooks().stream().filter(b -> b.getISBN().equals(ISBN)).findFirst().orElseThrow(() -> new BookNotFoundException("Book not borrowed by user"));

        book.returnBook();
        user.returnBook(book);
        System.out.println(user.getUserID() + " returned " + book.getTitle());
    }
}

public class LibrarySystemApp {
    public static void main(String[] args) {
        LibraryManager libManager = new LibraryManager();

        libManager.addBook(new Book("Harry Potter", "JK Rowling", "123"));
        libManager.addBook(new Book("Verity", "Colleen Hoover", "456"));
        libManager.addUser(new User("Alex", "001"));
        libManager.addUser(new User("Rhys", "U002"));

        Thread user1 = new Thread(() -> {
            try {
                libManager.borrowBook("123", "001");
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        });

        Thread user2 = new Thread(() -> {
            try {
                libManager.borrowBook("123", "002");
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        });

        user1.start();
        user2.start();

        try {
            libManager.saveLibraryData();
            System.out.println("Library data saved.");
        } catch (IOException e) {
            System.out.println("Error saving data: " + e.getMessage());
        }

        try {
            libManager.loadLibraryData();
            System.out.println("Library data loaded.");
        } catch (IOException | ClassNotFoundException e) {
            System.out.println("Error loading data: " + e.getMessage());
        }
    }
}