package app.part;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Objects;

@Entity
@Table(name = "part")
public class Part {

    @Id
    @SequenceGenerator(
            name = "part_id_seq",
            sequenceName = "part_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "part_id_seq"
    )
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private PartType type;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(name = "part_image_link")
    private String partImageLink;

    public Part() {
    }

    public Part(Long id, String name, PartType type, String brand, BigDecimal price,  String partImageLink) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.brand = brand;
        this.price = price;
        this.partImageLink = partImageLink;
    }

    public Part(String name, PartType type, String brand, BigDecimal price, String partImageLink) {
        this.name = name;
        this.type = type;
        this.brand = brand;
        this.price = price;
        this.partImageLink = partImageLink;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public PartType getType() {
        return type;
    }

    public void setType(PartType type) {
        this.type = type;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getPartImageLink() {
        return partImageLink;
    }

    public void setPartImageLink(String partImageLink) {
        this.partImageLink = partImageLink;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Part part = (Part) o;
        return Objects.equals(id, part.id) && Objects.equals(name, part.name) && type == part.type && Objects.equals(brand, part.brand) && Objects.equals(price, part.price) && Objects.equals(partImageLink, part.partImageLink);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, type, brand, price, partImageLink);
    }

    @Override
    public String toString() {
        return "Part{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", type=" + type +
                ", brand='" + brand + '\'' +
                ", price=" + price +
                ", partImageLink='" + partImageLink + '\'' +
                '}';
    }
}