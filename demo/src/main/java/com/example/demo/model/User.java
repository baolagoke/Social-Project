package com.example.demo.model;


import jakarta.persistence.*;

@Entity
@Table(name="user")
public class User {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name="username", nullable = false)// Maps this field to a column in the database, and ensures it cannot be null
    private String username;

    @Column(name="password", nullable = false)
    private String password;

    @OneToOne(mappedBy = "profile", fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_id")
    private Profile profile;

    @OneToOne(mappedBy = "registration", fetch = FetchType.LAZY)
    @JoinColumn(name="registration_id")
    private Registration registration;

    public User() {
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }



    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Profile getProfile() {

        return profile;
    }
}
