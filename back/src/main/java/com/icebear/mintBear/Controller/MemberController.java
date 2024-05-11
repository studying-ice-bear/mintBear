package com.icebear.mintBear.Controller;

import com.icebear.mintBear.Dto.MemberDto;
import com.icebear.mintBear.Dto.SignUpDto;
import com.icebear.mintBear.UtilClass.JwtToken;
import com.icebear.mintBear.Dto.SignInDto;
import com.icebear.mintBear.Service.MemberService;
import com.icebear.mintBear.UtilClass.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/sign-in")
    public JwtToken signIn(@RequestBody SignInDto signInDto) {
        String username = signInDto.getUsername();
        String password = signInDto.getPassword();
        JwtToken jwtToken = memberService.signIn(username, password);
        log.info("request sing-in username = {}, password = {}", username, password);
        log.info("jwtToken accessToken = {}, refreshToken = {}", jwtToken.getAccessToken(), jwtToken.getRefreshToken());
        return jwtToken;
    }

    @PostMapping("/sign-up")
    public ResponseEntity<MemberDto> signUp(@RequestBody SignUpDto signUpDto) {
        MemberDto savedMemberDto = memberService.signUp(signUpDto);
        log.info("request sing-up username = {}, nickname = {}", savedMemberDto.getUsername(), savedMemberDto.getNickname());
        return ResponseEntity.ok(savedMemberDto);
    }

    @PostMapping("/delete-member")
    public ResponseEntity<Boolean> deleteMember(@RequestBody SignInDto signInDto) {
        String username = signInDto.getUsername();
        String password = signInDto.getPassword();
        memberService.deleteMember(username);
        log.info("request delete username = {}, password = {}", username, password);
        return ResponseEntity.ok(true);
    }

    @PostMapping("/test")
    public String test() {
        return SecurityUtil.getCurrentUsername();
    }

}