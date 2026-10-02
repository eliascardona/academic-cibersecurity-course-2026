package com.eliascardona.books_sample.api.service;

import com.eliascardona.books_sample.api.command.CreateBookCommand;
import com.eliascardona.books_sample.api.dto.BookCreatedDto;
import com.eliascardona.books_sample.api.dto.BookDto;
import com.eliascardona.books_sample.api.entity.Book;
import com.eliascardona.books_sample.api.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class BookService {
    private final BookRepository bookRepository;

    public BookService(
        BookRepository bookRepository
    ) {
        this.bookRepository = bookRepository;
    }

    public BookCreatedDto createBook(
        CreateBookCommand command
    ) {
        Book newBook = new Book();
        newBook.setId(UUID.randomUUID());
        newBook.setTitle(command.title());
        newBook.setDescription(command.description());
        Book createdBook = bookRepository.save(newBook);

        return new BookCreatedDto(createdBook.getId());
    }

    public List<BookDto> findAll() {
        List<Book> books = bookRepository.findAll();

        return books.stream()
                .map((book) -> new BookDto(
                        book.getId(),
                        book.getTitle(),
                        book.getDescription()
                )).toList();
    }
}