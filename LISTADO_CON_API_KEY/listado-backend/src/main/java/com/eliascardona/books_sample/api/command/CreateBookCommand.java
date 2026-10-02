package com.eliascardona.books_sample.api.command;

public record CreateBookCommand(
    String title,
    String description
) {}
