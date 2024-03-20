//package com.icebear.mintBear;
//
//import com.icebear.mintBear.Dto.MemberDto;
//import com.icebear.mintBear.Dto.SignInDto;
//import com.icebear.mintBear.Dto.SignUpDto;
//import com.icebear.mintBear.Service.MemberService;
//import com.icebear.mintBear.UtilClass.JwtToken;
//import lombok.extern.slf4j.Slf4j;
//import org.assertj.core.api.AbstractBigIntegerAssert;
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.BeforeEach;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.web.client.TestRestTemplate;
//import org.springframework.boot.test.web.server.LocalServerPort;
//import org.springframework.http.*;
//import org.junit.jupiter.api.Test;
//import org.assertj.core.api.Assertions;
//
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@Slf4j
//class MemberControllerTest {
//
//    @Autowired
//    DatabaseCleanUp databaseCleanUp;
//    @Autowired
//    MemberService memberService;
//    @Autowired
//    TestRestTemplate testRestTemplate;
//    @LocalServerPort
//    int randomServerPort;
//
//    private SignUpDto signUpDto;
//
//    @BeforeEach
//    void beforeEach() {
//        // Member 회원가입
//        signUpDto = SignUpDto.builder()
//                .username("member")
//                .password("12345678")
//                .nickname("닉네임")
//                .build();
//    }
//
//    @AfterEach
//    void afterEach() {
//        databaseCleanUp.truncateAllEntity();
//    }
//
//    @Test
//    public void signUpTest() {
//
//        // API 요청 설정
//        String url = "http://localhost:" + randomServerPort + "/members/sign-up";
//        ResponseEntity<MemberDto> responseEntity = testRestTemplate.postForEntity(url, signUpDto, MemberDto.class);
//
//        // 응답 검증
//        Assertions.assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
//        MemberDto savedMemberDto = responseEntity.getBody();
//        Assertions.assertThat(savedMemberDto.getUsername()).isEqualTo(signUpDto.getUsername());
//        Assertions.assertThat(savedMemberDto.getNickname()).isEqualTo(signUpDto.getNickname());
//    }
//
//    @Test
//    public void signInTest() {
//        memberService.signUp(signUpDto);
//
//        SignInDto signInDto = SignInDto.builder()
//                .username("member")
//                .password("12345678").build();
//
//        // 로그인 요청
//        JwtToken jwtToken = memberService.signIn(signInDto.getUsername(), signInDto.getPassword());
//
//        // HttpHeaders 객체 생성 및 토큰 추가
//        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.setBearerAuth(jwtToken.getAccessToken());
//        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
//
//        log.info("httpHeaders = {}", httpHeaders);
//
//        // API 요청 설정
//        String url = "http://localhost:" + randomServerPort + "/members/test";
//        ResponseEntity<String> responseEntity = testRestTemplate.postForEntity(url, new HttpEntity<>(httpHeaders), String.class);
//        Assertions.assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
//        Assertions.assertThat(responseEntity.getBody()).isEqualTo(signInDto.getUsername());
//
////        assertThat(SecurityUtil.getCurrentUsername()).isEqualTo(signInDto.getUsername()); // -> 테스트 코드에서는 인증을 위한 절차를 거치지 X. SecurityContextHolder 에 인증 정보가 존재하지 않는다.
//
//
//    }
//
//}
