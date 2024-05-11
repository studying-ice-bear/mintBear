package com.icebear.mintBear.Controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

//@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/test")
public class LogController {
    // Testing Health Check Api
    private final Logger log = LoggerFactory.getLogger(getClass());
    @GetMapping("/log")
    public ResponseEntity<?> logTest(){
        String name = "loggingTest";

//        log.error("error log={}",name);
//        log.warn("warn log={}",name);
//        log.info("info log={}",name);
//        log.debug("debug log={}",name);
//        log.trace("trace log={}",name);
//        log.trace("trace log " + name);

        return ResponseEntity.ok(true);
    }
}