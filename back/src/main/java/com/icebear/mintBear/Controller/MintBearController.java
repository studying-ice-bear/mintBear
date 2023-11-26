package com.icebear.mintBear.Controller;

import com.icebear.mintBear.Service.DeepLTranslate;
import com.icebear.mintBear.Service.GoogleVisionOCR;
import com.icebear.mintBear.Domain.Message;
import com.icebear.mintBear.Domain.imgVO;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/parse/*")
public class MintBearController {
    Message message = new Message();
    HttpHeaders headers = new HttpHeaders();

    @PostMapping("/img")
    public ResponseEntity<Message> parseImageByGoogleVision(@RequestBody imgVO img) throws Exception {
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
}