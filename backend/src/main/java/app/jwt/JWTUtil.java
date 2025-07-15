package app.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.time.temporal.ChronoUnit.DAYS;

@Service
public class JWTUtil {

    private final String secretKey;
    private final Key signingKey;

    public JWTUtil(@Value("${jwt.secret}") String secretKey) { // Read from application.properties/yml or env var
        if (secretKey == null || secretKey.isBlank()) {
            // Fallback or throw an error if not configured - for production, this should be a fatal error.
            throw new IllegalStateException("JWT Secret Key is not configured. Please set jwt.secret property or JWT_SECRET_KEY environment variable.");
        }
        this.secretKey = secretKey;
        this.signingKey = Keys.hmacShaKeyFor(this.secretKey.getBytes());
    }

    public String issueToken(String subject) {
        return issueToken(subject, Map.of());
    }

    public String issueToken(String subject, List<String> scopes) {
        return issueToken(subject, Map.of("scopes", scopes));
    }

    public String issueToken(String subject, List<String> scopes, Map<String, Object> otherClaims) {
        Map<String, Object> claims = new HashMap<>();
        claims.putAll(otherClaims);
        claims.put("scopes", scopes);
        return issueToken(subject, claims);
    }

    public String issueToken(
            String subject,
            Map<String, Object> claims) {
        String token = Jwts
                .builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuer("https://sacostapliego.github.io/online-portfolio/")
                .setIssuedAt(Date.from(Instant.now()))
                .setExpiration(
                        Date.from(
                                Instant.now().plus(15, DAYS)
                        )
                )
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
        return token;
    }

    public String getSubject(String token) {
        return getClaims(token).getSubject();
    }

    private Claims getClaims(String token) {
        Claims claims = Jwts
                .parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims;
    }

    private Key getSigningKey() {
        return this.signingKey;
    }

    public boolean isTokenValid(String jwt, String username) {
        String subject = getSubject(jwt);
        return subject.equals(username) && !isTokenExpired(jwt);
    }

    private boolean isTokenExpired(String jwt) {
        Date today = Date.from(Instant.now());
        return getClaims(jwt).getExpiration().before(today);
    }
}
