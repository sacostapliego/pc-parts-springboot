package app.part;

import java.util.List;
import java.util.Optional;

public interface PartDao {
    List<Part> selectAllParts();
    Optional<Part> selectPartById(Long partId);
    void insertPart(Part part);
    boolean existsPartWithName(String name);
    boolean existsPartById(Long partId);
    void deletePartById(Long partId);
    void updatePart(Part update);
}