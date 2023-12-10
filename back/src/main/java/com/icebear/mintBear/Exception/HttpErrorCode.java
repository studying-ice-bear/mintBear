package com.icebear.mintBear.Exception;
import lombok.*;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum HttpErrorCode {
    URL_NOT_FOUND(HttpStatus.BAD_REQUEST, "url not found"),
    OPTION_NOT_FOUND(HttpStatus.BAD_REQUEST, "Option-Language not found"),
    INVALID_PERMISSION(HttpStatus.UNAUTHORIZED, "Permission is invalid"),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error"),
    TOO_MANY_REQUESTS(HttpStatus.TOO_MANY_REQUESTS, "Too many requests please try again later")
    ;

    private HttpStatus httpStatus;
    private String message;
}