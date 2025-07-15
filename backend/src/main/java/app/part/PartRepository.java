package app.part;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PartRepository extends JpaRepository<Part, Long> {
    boolean existsPartByName(String name);
    List<Part> findByType(PartType type);
}