package com.icebear.mintBear.Controller;

import com.icebear.mintBear.Service.DeepLTranslate;
import com.icebear.mintBear.Service.GoogleVisionOCR;
import com.icebear.mintBear.Domain.Message;
import com.icebear.mintBear.Domain.imgVO;
import io.github.bucket4j.Bucket;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ocr/*")
public class MintBearController {
    Message message = new Message();
    HttpHeaders headers = new HttpHeaders();

    private final Bucket bucket;

    @PostMapping("/translate")
    public ResponseEntity<Message> parseImageByGoogleVision(@RequestBody imgVO img) throws Exception {

        if (bucket.tryConsume(1)) {
            // Set header content
            headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));

            // Execute GoogleVisionOCR
            String parsed = GoogleVisionOCR.execute(img.getUrl());

            // Execute DeepLTranslate
            String result = DeepLTranslate.execute(parsed, img.getOption());

            message.setStatus(Message.StatusEnum.OK);
            message.setMessage("Your request imageUrl : "+ img.getUrl());
            message.setData(result);

            return new ResponseEntity<>(message, headers, HttpStatus.OK);
        }

        message.setStatus(Message.StatusEnum.Too_Many_Requests);
        message.setMessage("too many requests please try again later");
        message.setData(null);

        return new ResponseEntity<>(message, headers, HttpStatus.TOO_MANY_REQUESTS);
    }
}