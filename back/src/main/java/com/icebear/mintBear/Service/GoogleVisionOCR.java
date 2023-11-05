package com.icebear.mintBear.Service;
import com.google.cloud.vision.v1.AnnotateImageRequest;
import com.google.cloud.vision.v1.AnnotateImageResponse;
import com.google.cloud.vision.v1.BatchAnnotateImagesResponse;
import com.google.cloud.vision.v1.EntityAnnotation;
import com.google.cloud.vision.v1.Feature;
import com.google.cloud.vision.v1.Image;
import com.google.cloud.vision.v1.ImageAnnotatorClient;
import com.google.cloud.vision.v1.ImageSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.StopWatch;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class GoogleVisionOCR {
    private static final Logger log = LoggerFactory.getLogger(GoogleVisionOCR.class);
    public static String execute(String url) throws IOException {
        StopWatch totalTime = new StopWatch();
        totalTime.start();

        List<AnnotateImageRequest> requests = new ArrayList<>();

        // local image url
        ImageSource imgSource = ImageSource.newBuilder().setImageUri(url).build();


        // ###########Debag######## //
        // if Cloud Storage url
        // ImageSource imgSource = ImageSource.newBuilder().setGcsImageUri(url).build();

        // sample gs://cloud-samples-data/vision/ocr/sign.jpg
        // ###########Debag######## //

        Image img = Image.newBuilder().setSource(imgSource).build();
        Feature feat = Feature.newBuilder().setType(Feature.Type.TEXT_DETECTION).build();
        AnnotateImageRequest request =
                AnnotateImageRequest.newBuilder().addFeatures(feat).setImage(img).build();
        requests.add(request);

        try (ImageAnnotatorClient client = ImageAnnotatorClient.create()) {
            BatchAnnotateImagesResponse response = client.batchAnnotateImages(requests);
            List<AnnotateImageResponse> responses = response.getResponsesList();

            // ###########Debag######## //
            // {
            //  "requests": [
            //    {
            //      "features": [
            //        {
            //          "type": "TEXT_DETECTION"
            //        }
            //      ],
            //      "image": {
            //        "source": {
            //          "imageUri": "gs://cloud-samples-data/vision/ocr/sign.jpg"
            //        }
            //      }
            //    }
            //  ]
            //}
            // ###########Debag######## //

            StringBuilder result = new StringBuilder();
            for (AnnotateImageResponse res : responses) {
                if (res.hasError()) {
                    System.out.format("OCR-API Error: %s%n", res.getError().getMessage());
                    log.error("OCR-API Error log={}",res.getError().getMessage());
                    return null;
                }

                for (EntityAnnotation annotation : res.getTextAnnotationsList()) {
                    result.append(annotation.getDescription()).append(" ");
                }
            }

            totalTime.stop();
            System.out.println("OCR-API Total Time : " + totalTime.getTotalTimeMillis() + "ms");
            log.info("OCR-API Total Time : {}",totalTime.getTotalTimeMillis() + "ms");

            return result.toString();
        }
        catch (Exception exception) {
            return exception.getMessage();
        }
    }
}
