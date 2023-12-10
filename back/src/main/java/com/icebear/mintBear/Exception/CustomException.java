package com.icebear.mintBear.Exception;

import lombok.Getter;

@Getter
public class CustomException extends RuntimeException {

    private HttpErrorCode httpErrorCode;
    private String message;

    public CustomException(HttpErrorCode httpErrorCode) {
        this.httpErrorCode = httpErrorCode;
        this.message = httpErrorCode.getMessage();
    }
}