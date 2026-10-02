package com.eliascardona.books_sample.api.controller;

import com.eliascardona.books_sample.api.command.CreateBookCommand;
import com.eliascardona.books_sample.api.dto.BookCreatedDto;
import com.eliascardona.books_sample.api.dto.BookDto;
import com.eliascardona.books_sample.api.service.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    public BookController(
        BookService bookService
    ) {
        this.bookService = bookService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createBook(
        @Validated @RequestBody CreateBookCommand command
    ) {
        try {
            BookCreatedDto response = bookService.createBook(command);

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping()
    public ResponseEntity<?> findAllBooks() {
        try {
            List<BookDto> response = bookService.findAll();

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }
}
