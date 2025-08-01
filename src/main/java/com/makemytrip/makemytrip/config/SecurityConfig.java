package com.makemytrip.makemytrip.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public WebMvcConfigurer configurer(){
        return new WebMvcConfigurer() {
           @Override
            public void addCorsMappings(CorsRegistry registry){
               registry.addMapping("/**")
                       .allowedOrigins("*")
                       .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                       .allowedHeaders("*")
                       .allowCredentials(false);
           }
        };
    }

}