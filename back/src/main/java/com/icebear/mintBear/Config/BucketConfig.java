package com.icebear.mintBear.Config;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;

@Configuration
public class BucketConfig {

    @Bean
    public Bucket bucket() {

        // Recharge 5 tokens every 10 seconds
        final Refill refill = Refill.intervally(5, Duration.ofSeconds(10));

        // Bucket Limit 20
        final Bandwidth limit = Bandwidth.classic(20, refill);

        return Bucket.builder()
                .addLimit(limit)
                .build();
    }
}