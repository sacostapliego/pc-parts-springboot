package app.part;

import app.exception.DuplicateResourceException;
import app.exception.RequestValidationException;
import app.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PartService {

    private final PartDao partDao;

    public PartService(@Qualifier("part-jpa") PartDao partDao) {
        this.partDao = partDao;
    }

    public List<Part> getAllParts() {
        return partDao.selectAllParts();
    }

    public Part getPart(Long id) {
        return partDao.selectPartById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "part with id [%s] not found".formatted(id)
                ));
    }

    public void addPart(PartRegistrationRequest partRegistrationRequest) {
        String name = partRegistrationRequest.name();
        if (partDao.existsPartWithName(name)) {
            throw new DuplicateResourceException("part with name [%s] already exists".formatted(name));
        }
        Part part = new Part(
                partRegistrationRequest.name(),
                partRegistrationRequest.type(),
                partRegistrationRequest.brand(),
                partRegistrationRequest.price()
        );
        partDao.insertPart(part);
    }

    public void deletePartById(Long partId) {
        if (!partDao.existsPartById(partId)) {
            throw new ResourceNotFoundException("part with id [%s] not found".formatted(partId));
        }
        partDao.deletePartById(partId);
    }

    public void updatePart(Long partId, PartUpdateRequest updateRequest) {
        Part part = getPart(partId);
        boolean changes = false;

        if (updateRequest.name() != null && !updateRequest.name().equals(part.getName())) {
            if (partDao.existsPartWithName(updateRequest.name())) {
                throw new DuplicateResourceException("part with name [%s] already exists".formatted(updateRequest.name()));
            }
            part.setName(updateRequest.name());
            changes = true;
        }
        if (updateRequest.type() != null && !updateRequest.type().equals(part.getType())) {
            part.setType(updateRequest.type());
            changes = true;
        }
        if (updateRequest.brand() != null && !updateRequest.brand().equals(part.getBrand())) {
            part.setBrand(updateRequest.brand());
            changes = true;
        }
        if (updateRequest.price() != null && !updateRequest.price().equals(part.getPrice())) {
            part.setPrice(updateRequest.price());
            changes = true;
        }

        if (!changes) {
            throw new RequestValidationException("no data changes found");
        }

        partDao.updatePart(part);
    }
}