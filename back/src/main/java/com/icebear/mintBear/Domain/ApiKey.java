package com.icebear.mintBear.Domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
public class ApiKey {
    @Value("${DeepL_APY_KEY}")
    private String apiKey;

}
