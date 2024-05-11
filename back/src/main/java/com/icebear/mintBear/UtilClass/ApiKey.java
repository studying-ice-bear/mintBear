package com.icebear.mintBear.UtilClass;

import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
public class ApiKey {
    @Value("${DeepL_API_KEY}")
    private String apiKey;

    @Value("${JWT_KEY}")
    private String jwtKey;

    @Value("${AWS_ACCESS_KEY_ID}")
    private String awsAccessKey;

    @Value("${AWS_SECRET_ACCESS_KEY}")
    private String awsSecretKey;
}
