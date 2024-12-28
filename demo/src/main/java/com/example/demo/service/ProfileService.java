package com.example.demo.service;


import com.example.demo.model.Profile;
import com.example.demo.model.User;
import com.example.demo.repository.ProfileRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private UserRepository userRepository;


    @Transactional
    public void updateProfile(Long userId, String filePath) {
        User user = userRepository.findById(userId).orElseThrow(()->new RuntimeException("User Not Found"));


        Profile profile = user.getProfile();
        if (profile == null) {
            throw new RuntimeException("Profile not found for the user");
        }



        // Update the profile picture file path
        profile.setProfilePicturePath(filePath);

        // Save the updated profile
        profileRepository.save(profile);
    }


    // Update other profile details like name, etc.
    @Transactional
    public Profile updateProfileDetails(Long userId, String firstName, String lastName, String email) {
        // Fetch the user and profile
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Profile profile = user.getProfile();
        if (profile == null) {
            throw new RuntimeException("Profile not found for the user");
        }

        // Update profile details
        profile.setFirstName(firstName);
        profile.setLastName(lastName);
        profile.setEmail(email);

        // Save and return updated profile
        return profileRepository.save(profile);
    }


    // Delete Profile Picture
    @Transactional
    public void deleteProfilePicture(Long userId) {
        // Fetch the user and profile
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Profile profile = user.getProfile();
        if (profile != null) {
            profile.setProfilePicturePath(null); // Remove the picture path
            profileRepository.save(profile);
        } else {
            throw new RuntimeException("Profile not found for the user");
        }
    }
}
