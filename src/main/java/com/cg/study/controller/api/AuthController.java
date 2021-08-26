package com.cg.study.controller.api;

import com.cg.study.model.JwtResponse;
import com.cg.study.model.User;
import com.cg.study.security.JwtUtil;
import com.cg.study.security.UserPrincipal;
import com.cg.study.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
public class AuthController {


    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        return userService.createUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(HttpServletRequest request, @RequestBody User user) {

        UserPrincipal userPrincipal = userService.findByUsername(user.getUsername());
        if (!new BCryptPasswordEncoder().matches(user.getPassword(), userPrincipal.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("tài khoản hoặc mật khẩu không chính xác");
        }

        UserDetails userDetails = userService.loadUserByUsername(user.getUsername());
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                userDetails,
                userDetails.getUsername(),
                userDetails.getAuthorities());
        auth.setDetails(userDetails);
        SecurityContext securityContext = SecurityContextHolder.getContext();
        securityContext.setAuthentication(auth);

        String jwt = jwtUtil.generateToken(userPrincipal);
        UserPrincipal currentUser = userService.findByUsername(userPrincipal.getUsername());
        JwtResponse jwtResponse = new JwtResponse(
                jwt,
                currentUser.getUserId(),
                userDetails.getUsername(),
                userDetails.getAuthorities()
        );

        ResponseCookie springCookie = ResponseCookie.from("JWT", jwt)
                .httpOnly(false)
                .secure(false)
                .path("/")
                .maxAge(60 * 60 * 60 * 1000)
                .domain("localhost")
                .build();
        System.out.println("***************");
        System.out.println(currentUser.getUserId());

        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, springCookie.toString())
                .body(jwtResponse);
    }

    @GetMapping("/users")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public ResponseEntity<Iterable<User>> getAllUser() {
        return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/technicians")
    public ResponseEntity<Iterable<User>> getTechnicians(){
        return new ResponseEntity<>(userService.selectTechnicans(), HttpStatus.OK);
    }
}