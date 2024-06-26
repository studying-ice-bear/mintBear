package com.icebear.mintBear.Service;
import com.icebear.mintBear.UtilClass.ApiKey;
import com.icebear.mintBear.Exception.CustomException;
import com.icebear.mintBear.Exception.HttpErrorCode;
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
            // check text
            if(text.isEmpty()){
                return "";
            }

            // check language
            if(language.isEmpty()){
                throw new CustomException(HttpErrorCode.OPTION_NOT_FOUND);
            }

            // Deepl usage limited
            if (usage.anyLimitReached()) {
                throw new CustomException(HttpErrorCode.TOO_MANY_REQUESTS);
            }

            // check Deepl usage
            if (usage.getCharacter() != null && usage.getDocument() != null) {
                log.info("Character usage: "+usage.getCharacter().getCount() + "of " + usage.getCharacter().getLimit());
                log.info("Document usage: "+usage.getDocument().getCount() + "of " + usage.getDocument().getLimit());
            }

            // Translate text into a target language
            TextResult result = translator.translateText(text, null, language);
            totalTime.stop();

            log.info("DeepL-API Total Time : {}",totalTime.getTotalTimeMillis() + "ms");

            return result.getText();
        }
        catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
