package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.ProfileRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

public class UserService implements UserRepository {


    //note: The authentication will occur here in this user service logic class.

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProfileRepository profileRepository;


    public boolean authenticateUser(String username, String password) {
        //Ask questions about this code ????
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            User userOption = user.get();
            return userOption.getPassword().equals(password);
        }
    }
}
