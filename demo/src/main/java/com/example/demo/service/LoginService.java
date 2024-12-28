package com.example.demo.service;


import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {



    @Autowired
    private UserRepository userRepository;


    public boolean validateLogin(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isEmpty() || !user.get().getPassword().equals(password))
            return false;

        return true;
    }
}
