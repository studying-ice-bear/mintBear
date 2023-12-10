package com.icebear.mintBear.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//@Slf4j
@RestController
@RequestMapping("/test/*")
public class LogController {

    // Testing Controller

    // @Slf4j
    private final Logger log = LoggerFactory.getLogger(getClass());

    @GetMapping("/log")
    public String logTest(){
        String name = "loggingTest";

        log.error("error log={}",name);
        log.warn("warn log={}",name);
        log.info("info log={}",name);
        log.debug("debug log={}",name);
        log.trace("trace log={}",name);
        log.trace("trace log " + name);

        return "ok";
    }
}