package com.icebear.mintBear.Controller;

import com.icebear.mintBear.Service.GoogleVisionOCR;
import com.icebear.mintBear.UtilClass.Message;
import com.icebear.mintBear.Domain.imgVO;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/parse/*")
public class MintBearController {
    Message message = new Message();
    HttpHeaders headers = new HttpHeaders();

    @PostMapping("/img")
    public ResponseEntity<Message> parseImageByGoogleVision(@RequestBody imgVO img) throws IOException {
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
        String parsed = GoogleVisionOCR.execute(img.getUrl());

        message.setStatus(Message.StatusEnum.OK);
        message.setMessage("request-url :"+ img.getUrl());
        message.setData(parsed);


        return new ResponseEntity<>(message, headers, HttpStatus.OK);

    }
}