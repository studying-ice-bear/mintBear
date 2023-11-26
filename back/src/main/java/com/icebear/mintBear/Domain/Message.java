package com.icebear.mintBear.Domain;
import lombok.*;

@Data
@NoArgsConstructor
@Getter
@Setter
@NonNull
public class Message {

    private StatusEnum status;
    private String message;
    private Object data;
    public enum StatusEnum {

        OK(200, "OK"),
        BAD_REQUEST(400, "BAD_REQUEST"),
        NOT_FOUND(404, "NOT_FOUND"),
        INTERNAL_SERER_ERROR(500, "INTERNAL_SERVER_ERROR"),
        EMPTY_RETURN(404, "Character recognition failed. Please check the image.");

        final int statusCode;
        final String code;

        StatusEnum(int statusCode, String code) {
            this.statusCode = statusCode;
            this.code = code;
        }

    }
}