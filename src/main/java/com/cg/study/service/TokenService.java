package com.cg.study.service;


import com.cg.study.model.Token;

public interface TokenService {

    Token createToken(Token token);

    Token findByToken(String token);
}
