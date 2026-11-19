package com.example.auth.controller;
import com.example.auth.entity.User;
import com.example.auth.repo.UserRepository;
import com.example.auth.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.*;
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins="http://localhost:5173")
public class AuthController {
    @Autowired UserRepository repo;
    @Autowired PasswordEncoder encoder;
    @Autowired JwtUtil jwtUtil;
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user){
        if(repo.findByEmail(user.getEmail()).isPresent())
            return ResponseEntity.badRequest().body(Map.of("message","Email already exists"));
        user.setPassword(encoder.encode(user.getPassword()));
        repo.save(user);
        return ResponseEntity.ok(Map.of("message","Registered successfully"));
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user){
        Optional<User> dbUser = repo.findByEmail(user.getEmail());
        if(dbUser.isEmpty() || !encoder.matches(user.getPassword(), dbUser.get().getPassword()))
            return ResponseEntity.status(401).body(Map.of("message","Invalid email or password"));
        String token = jwtUtil.generateToken(user.getEmail());
        return ResponseEntity.ok(Map.of("token", token, "name", dbUser.get().getName(), "email", dbUser.get().getEmail()));
    }
    @GetMapping("/me")
    public ResponseEntity<?> me(@RequestHeader("Authorization") String authHeader){
        String token = authHeader.replace("Bearer ","");
        if(!jwtUtil.validate(token)) return ResponseEntity.status(401).body(Map.of("message","Invalid token"));
        String email = jwtUtil.extractEmail(token);
        User u = repo.findByEmail(email).orElseThrow();
        return ResponseEntity.ok(Map.of("name",u.getName(),"email",u.getEmail()));
    }
}