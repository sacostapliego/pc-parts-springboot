package app.part;

import java.math.BigDecimal;

public record PartRegistrationRequest(
        String name,
        PartType type,
        String brand,
        BigDecimal price
) {
}