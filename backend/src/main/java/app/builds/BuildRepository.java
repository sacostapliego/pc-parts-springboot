package app.builds;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BuildRepository extends JpaRepository<Build, Long> {
    boolean existsBuildByName(String name);
}