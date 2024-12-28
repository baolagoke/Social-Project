package com.example.demo.model;


import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name= "login")
public class Login {

    //requires a collect to associate the registration table
    @OneToMany(mappedBy = "login",fetch = FetchType.LAZY)  //fetch registration will be fetched when accessed
    List <Registration> registrations;



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //This automatically generates a primary key value and auto increments it
    private Long id;

    @Column(name="username", nullable = false)// Maps this field to a column in the database, and ensures it cannot be null
    private String username;

    @Column(name="password", nullable = false)
    private String password;


    public Login() {
    }

    public Login(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
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
}
