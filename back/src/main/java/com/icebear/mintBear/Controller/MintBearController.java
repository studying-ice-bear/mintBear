package com.icebear.mintBear.Controller;

import com.icebear.mintBear.Exception.HttpErrorCode;
import com.icebear.mintBear.Exception.CustomException;
import com.icebear.mintBear.Service.DeepLTranslate;
import com.icebear.mintBear.Service.GoogleVisionOCR;
import com.icebear.mintBear.Domain.imgVO;
import io.github.bucket4j.Bucket;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

import java.nio.charset.StandardCharsets;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/ocr/*", method = RequestMethod.POST)
public class MintBearController {
    HttpHeaders headers = new HttpHeaders();

    private final Bucket bucket;

    @PostMapping("/translate")
    public ResponseEntity<?> parseImageByGoogleVision(@RequestBody imgVO img) throws Exception {
        // Set header content
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));

        String url = img.getUrl();
        String language = img.getOption();

        // Check Bucket Tokens
        if(bucket.getAvailableTokens() == 0){
            throw new CustomException(HttpErrorCode.TOO_MANY_REQUESTS);
        }

        // Consume Token 1
        bucket.tryConsume(1);

        // Execute GoogleVisionOCR
        String text = GoogleVisionOCR.execute(url);

        // Execute DeepLTranslate
        String result = DeepLTranslate.execute(text, language);

        return ResponseEntity.status(HttpStatus.OK).headers(headers).body(result);

    }

}