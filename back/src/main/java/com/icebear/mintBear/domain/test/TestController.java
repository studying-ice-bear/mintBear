package com.icebear.mintBear.domain.test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class TestController {
    @GetMapping("test-logging")
    public String logTest() {
        log.info("Info Log from {}", this.getClass());
        log.error("Error Log from {}", this.getClass());
        return "hello!";
    }
}
