package com.icebear.mintBear.Controller;

import com.icebear.mintBear.Exception.CustomException;
import com.icebear.mintBear.Service.DeepLTranslate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalRestControllerAdvice {
    // log
    private static final Logger log = LoggerFactory.getLogger(DeepLTranslate.class);
    
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<?> application(CustomException e) {
        log.error("Error occurs {}", e.toString());

        return ResponseEntity.status(e.getHttpErrorCode().getHttpStatus()).body(e.getHttpErrorCode().name());
    }
}
