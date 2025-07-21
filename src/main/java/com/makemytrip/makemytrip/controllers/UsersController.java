package com.makemytrip.makemytrip.controllers;
import com.makemytrip.makemytrip.models.Users;
import com.makemytrip.makemytrip.repositories.UserRepository;
import com.makemytrip.makemytrip.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UsersController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

//    @PostMapping("/login")
//    public Users login(@RequestParam String email, @RequestParam String password){
//        return userService.login(email,password);
//    }
@PostMapping("/login")
public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
    Users user = userService.login(email, password);

    if (user == null) {
        // User not found or wrong password
        if (userRepository.findByEmail(email) == null) {
            return ResponseEntity
                    .status(404)
                    .body("❌ User not registered with this email.");
        } else {
            return ResponseEntity
                    .status(401)
                    .body("❌ Invalid password.");
        }
    }

    return ResponseEntity.ok(user);
}

    @PostMapping("/signup")
    public ResponseEntity<Users> signup(@RequestBody Users user){
        return ResponseEntity.ok(userService.Signup(user));
    }

    @GetMapping("/email")
    public ResponseEntity<Users> getuserbyemail(@RequestParam String email){
        Users user = userService.getUserByEmail(email);
        if(user != null){
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }
    @PostMapping("/edit")
    public Users editprofile(@RequestParam String id ,@RequestBody Users updatedUser){
        return userService.editprofile(id,updatedUser);
    }


}