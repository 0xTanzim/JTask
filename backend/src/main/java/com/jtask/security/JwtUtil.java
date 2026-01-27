package com.jtask.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import io.axiom.config.Config;

import java.util.Date;

public class JwtUtil {
    private static final String SECRET = Config.get("jwt.secret");
    private static final long EXPIRATION_MS = Config.get("jwt.expiration", 86400000);
    private static final Algorithm algorithm = Algorithm.HMAC256(SECRET);

    public static String generateToken(Long userId, String email) {
        return JWT.create()
            .withSubject(userId.toString())
            .withClaim("email", email)
            .withIssuedAt(new Date())
            .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_MS))
            .sign(algorithm);
    }

    public static DecodedJWT verifyToken(String token) throws JWTVerificationException {
        return JWT.require(algorithm)
            .build()
            .verify(token);
    }

    public static Long getUserId(String token) {
        DecodedJWT jwt = verifyToken(token);
        return Long.parseLong(jwt.getSubject());
    }
}
