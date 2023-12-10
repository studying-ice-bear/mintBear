package com.icebear.mintBear.Service;
import com.icebear.mintBear.Domain.ApiKey;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StopWatch;
import com.deepl.api.*;

@Service
public class DeepLTranslate {
    // API-KEY
    private static String apiKey;

    // log
    private static final Logger log = LoggerFactory.getLogger(DeepLTranslate.class);

    @Autowired DeepLTranslate(ApiKey apiKeyClass){
        apiKey = apiKeyClass.getApiKey();
    }

    public static String execute(String text, String language) throws Exception {
        StopWatch totalTime = new StopWatch();
        totalTime.start();

        //Deepl Translator
        Translator translator = new Translator(apiKey);
        Usage usage = translator.getUsage();

        try {
            // Deepl usage limited
            if (usage.anyLimitReached()) {
                String message = "Translation limit reached.";
                log.error(message);
                throw new Exception(message);
            }
            // check Deepl usage
            if (usage.getCharacter() != null) {
                log.info("Character usage: "+usage.getCharacter().getCount() + "of " + usage.getCharacter().getLimit());
            }
            // check Deepl usage
            if (usage.getDocument() != null) {
                log.info("Character usage: "+usage.getDocument().getCount() + "of " + usage.getDocument().getLimit());
            }
            // Translate text into a target language, in this case, French:
            TextResult result =
                    translator.translateText(text, null, language);

            totalTime.stop();
            System.out.println("DeepL-API Total Time : " + totalTime.getTotalTimeMillis() + "ms");
            log.info("DeepL-API Total Time : {}",totalTime.getTotalTimeMillis() + "ms");

            return result.getText();
        }
        catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
