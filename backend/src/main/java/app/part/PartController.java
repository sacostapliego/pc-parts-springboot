package app.part;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/parts")
public class PartController {

    private final PartService partService;

    public PartController(PartService partService) {
        this.partService = partService;
    }

    @GetMapping
    public List<Part> getParts() {
        return partService.getAllParts();
    }

    @GetMapping("{partId}")
    public Part getPart(@PathVariable("partId") Long partId) {
        return partService.getPart(partId);
    }

    @PostMapping
    public ResponseEntity<?> registerPart(@RequestBody PartRegistrationRequest request) {
        partService.addPart(request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("{partId}")
    public void deletePart(@PathVariable("partId") Long partId) {
        partService.deletePartById(partId);
    }

    @PutMapping("{partId}")
    public void updatePart(
            @PathVariable("partId") Long partId,
            @RequestBody PartUpdateRequest updateRequest) {
        partService.updatePart(partId, updateRequest);
    }
}