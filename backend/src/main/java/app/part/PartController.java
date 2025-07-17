// filepath: c:\Users\mrboo\Documents\Code\Full Stack Projects\pc-parts-springboot\backend\src\main\java\app\part\PartController.java
package app.part;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    public List<Part> getParts(@RequestParam(required = false) String type) {
        return partService.getAllParts(type);
    }

    @GetMapping("{partId}")
    public Part getPart(@PathVariable("partId") Long partId) {
        return partService.getPart(partId);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> registerPart(@RequestBody PartRegistrationRequest request) {
        partService.addPart(request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("{partId}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deletePart(@PathVariable("partId") Long partId) {
        partService.deletePartById(partId);
    }

    @PutMapping("{partId}")
    @PreAuthorize("hasRole('ADMIN')")
    public void updatePart(
            @PathVariable("partId") Long partId,
            @RequestBody PartUpdateRequest updateRequest) {
        partService.updatePart(partId, updateRequest);
    }
}