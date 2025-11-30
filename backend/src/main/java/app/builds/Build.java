package app.builds;

import app.part.Part;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "build")
public class Build {

    @Id
    @SequenceGenerator(
            name = "build_id_seq",
            sequenceName = "build_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "build_id_seq"
    )
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 500)
    private String description;

    @ManyToOne
    @JoinColumn(name = "cpu_id", nullable = false)
    private Part cpu;

    @ManyToOne
    @JoinColumn(name = "motherboard_id", nullable = false)
    private Part motherboard;

    @ManyToOne
    @JoinColumn(name = "ram_id", nullable = false)
    private Part ram;

    @ManyToOne
    @JoinColumn(name = "storage_id", nullable = false)
    private Part storage;

    @ManyToOne
    @JoinColumn(name = "psu_id", nullable = false)
    private Part psu;

    @ManyToOne
    @JoinColumn(name = "case_id")
    private Part pcCase;

    @ManyToOne
    @JoinColumn(name = "gpu_id")
    private Part gpu;

    @ManyToOne
    @JoinColumn(name = "cpu_cooler_id")
    private Part cpuCooler;

    @ManyToMany
    @JoinTable(
            name = "build_accessories",
            joinColumns = @JoinColumn(name = "build_id"),
            inverseJoinColumns = @JoinColumn(name = "part_id")
    )
    private Set<Part> accessories = new HashSet<>();

    @Column(name = "build_image_link")
    private String buildImageLink;

    public Build() {
    }

    public Build(String name, String description, Part cpu, Part motherboard, 
                 Part ram, Part storage, Part psu) {
        this.name = name;
        this.description = description;
        this.cpu = cpu;
        this.motherboard = motherboard;
        this.ram = ram;
        this.storage = storage;
        this.psu = psu;
    }

    // Calculate total price
    public BigDecimal getTotalPrice() {
        BigDecimal total = BigDecimal.ZERO;
        if (cpu != null) total = total.add(cpu.getPrice());
        if (motherboard != null) total = total.add(motherboard.getPrice());
        if (ram != null) total = total.add(ram.getPrice());
        if (storage != null) total = total.add(storage.getPrice());
        if (psu != null) total = total.add(psu.getPrice());
        if (pcCase != null) total = total.add(pcCase.getPrice());
        if (gpu != null) total = total.add(gpu.getPrice());
        if (cpuCooler != null) total = total.add(cpuCooler.getPrice());
        if (accessories != null) {
            for (Part accessory : accessories) {
                total = total.add(accessory.getPrice());
            }
        }
        return total;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Part getCpu() {
        return cpu;
    }

    public void setCpu(Part cpu) {
        this.cpu = cpu;
    }

    public Part getMotherboard() {
        return motherboard;
    }

    public void setMotherboard(Part motherboard) {
        this.motherboard = motherboard;
    }

    public Part getRam() {
        return ram;
    }

    public void setRam(Part ram) {
        this.ram = ram;
    }

    public Part getStorage() {
        return storage;
    }

    public void setStorage(Part storage) {
        this.storage = storage;
    }

    public Part getPsu() {
        return psu;
    }

    public void setPsu(Part psu) {
        this.psu = psu;
    }

    public Part getPcCase() {
        return pcCase;
    }

    public void setPcCase(Part pcCase) {
        this.pcCase = pcCase;
    }

    public Part getGpu() {
        return gpu;
    }

    public void setGpu(Part gpu) {
        this.gpu = gpu;
    }

    public Part getCpuCooler() {
        return cpuCooler;
    }

    public void setCpuCooler(Part cpuCooler) {
        this.cpuCooler = cpuCooler;
    }

    public Set<Part> getAccessories() {
        return accessories;
    }

    public void setAccessories(Set<Part> accessories) {
        this.accessories = accessories;
    }

    public String getBuildImageLink() {
        return buildImageLink;
    }

    public void setBuildImageLink(String buildImageLink) {
        this.buildImageLink = buildImageLink;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Build build = (Build) o;
        return Objects.equals(id, build.id) && Objects.equals(name, build.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }

    @Override
    public String toString() {
        return "Build{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", totalPrice=" + getTotalPrice() +
                '}';
    }
}