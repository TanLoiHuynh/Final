package com.example.pet.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve ảnh từ thư mục images nằm ở thư mục gốc của project
        registry
            .addResourceHandler("/images/**")
            .addResourceLocations("file:image/");
    }
}
