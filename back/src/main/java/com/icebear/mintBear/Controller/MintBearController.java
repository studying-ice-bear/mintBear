package com.icebear.mintBear.Controller;

import com.icebear.mintBear.Service.GoogleVisionOCR;
import com.icebear.mintBear.utilClass.Message;
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

    @PostMapping("/img")
    public ResponseEntity<Message> parseImageByGoogleVision(@RequestBody String url) throws IOException {
        Message message = new Message();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));

        String parsed = GoogleVisionOCR.execute(url);

        message.setStatus(Message.StatusEnum.OK);
        message.setMessage("OCR-API");
        message.setData(parsed);


        return new ResponseEntity<>(message, headers, HttpStatus.OK);

    }
}