package com.icebear.mintBear.Dto;

import lombok.*;

@Data
@Builder
public class SignInDto {
    private String username;
    private String password;
}
