package com.eliascardona.books_sample.core.springbootconfig;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = "com.eliascardona.books_sample")
@EntityScan(basePackages = "com.eliascardona.books_sample")
@EnableJpaAuditing
public class JpaConfig {}
