package app.part;

import java.math.BigDecimal;

public record PartUpdateRequest(
        String name,
        PartType type,
        String brand,
        BigDecimal price
) {
}