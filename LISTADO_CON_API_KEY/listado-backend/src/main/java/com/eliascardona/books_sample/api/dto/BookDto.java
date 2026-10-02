package com.eliascardona.books_sample.api.dto;

import java.util.UUID;

public record BookDto(
    UUID bookId,
    String title,
    String description
) {}
