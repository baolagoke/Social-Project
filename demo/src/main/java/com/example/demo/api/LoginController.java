package com.example.demo.api;


import com.example.demo.model.User;
import com.example.demo.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;


@Controller
@RequestMapping("/login")
public class LoginController {


    private LoginService loginService;

    @Autowired //auto dependency injection
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    // a controller is a collection of handlers - two type requests and exception handlers  8080/login server port
    @ResponseStatus(HttpStatus.ACCEPTED) //require for response -----
    @PostMapping
    public void login(@RequestBody User user) {
        //calling method to transition between class layers
        // return to exit the class layers


    }
}
