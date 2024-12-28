package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.RegistrationRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class RegistrationService implements RegistrationRepository {


    @Autowired
    private UserRepository userRepository;

    // This check if the email already is present in the database.
    public String registerUser(String username, String password, String email) {
        Optional<User> existingUser = userRepository.findByEmail(email);

        if (existingUser.isPresent()) {
            return "User with email " + email + " already exists";
        }

        Optional<User>existingUserName = userRepository.findByUsername(username);

        if (existingUserName.isPresent()) {
            return "User with name " + username + " already exists";
        }

        User newUser = new User(username, password);
        newUser.setUsername(username);
        newUser.setPassword(password);


        userRepository.save(newUser);
    }
}
