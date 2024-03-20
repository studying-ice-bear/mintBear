package com.icebear.mintBear.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.method.HandlerTypePredicate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.util.UrlPathHelper;

@Configuration
public class WebConfig implements WebMvcConfigurer {

//    @Override
//    public void addCorsMappings(CorsRegistry registry){
//        registry.addMapping("/**")
//                .allowedOrigins("http://localhost:8080", "https://mint-bear.monster/",
//                        "https://www.mint-bear.monster",
//                        "http://localhost:3000",
//                        "https://localhost:3000",
//                        "https://127.0.0.1:3000"
//                )
//                .allowedMethods("GET", "POST", "PUT", "DELETE")
//                .allowedHeaders("Authorization", "Content-Type")
//                .allowCredentials(true)
//                .maxAge(3600);
//
//    }
    @Override
    public void configurePathMatch(PathMatchConfigurer configure) {
        configure
                // @RestController setting PathPrefix v1
                .addPathPrefix("/v1", HandlerTypePredicate.forAnnotation(RestController.class))
                .setPathMatcher(new AntPathMatcher())
                .setUrlPathHelper(new UrlPathHelper());
    }

}
