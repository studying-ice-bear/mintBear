package com.icebear.mintBear.Dto;


import com.icebear.mintBear.Domain.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignUpDto {

    private String username;
    private String password;
    private String nickname;
    private List<String> roles = new ArrayList<>();

    public Member toEntity(String encodedPassword, List<String> roles) {

        return Member.builder()
                .username(username)
                .password(encodedPassword)
                .nickname(nickname)
                .roles(roles)
                .build();
    }
}
