package app.part;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository("part-jpa")
public class PartJPADataAccessService implements PartDao {

    private final PartRepository partRepository;

    public PartJPADataAccessService(PartRepository partRepository) {
        this.partRepository = partRepository;
    }

    @Override
    public List<Part> selectAllParts() {
        Page<Part> page = partRepository.findAll(Pageable.ofSize(1000));
        return page.getContent();
    }

    @Override
    public Optional<Part> selectPartById(Long partId) {
        return partRepository.findById(partId);
    }

    @Override
    public void insertPart(Part part) {
        partRepository.save(part);
    }

    @Override
    public boolean existsPartWithName(String name) {
        return partRepository.existsPartByName(name);
    }

    @Override
    public boolean existsPartById(Long partId) {
        return partRepository.existsById(partId);
    }

    @Override
    public void deletePartById(Long partId) {
        partRepository.deleteById(partId);
    }

    @Override
    public void updatePart(Part update) {
        partRepository.save(update);
    }
}