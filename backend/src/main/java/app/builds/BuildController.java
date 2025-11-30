package app.builds;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/builds")
public class BuildController {

    private final BuildService buildService;

    public BuildController(BuildService buildService) {
        this.buildService = buildService;
    }

    @GetMapping
    public List<Build> getBuilds() {
        return buildService.getAllBuilds();
    }

    @GetMapping("{buildId}")
    public Build getBuild(@PathVariable("buildId") Long buildId) {
        return buildService.getBuild(buildId);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> registerBuild(@RequestBody BuildRegistrationRequest request) {
        buildService.addBuild(request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("{buildId}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteBuild(@PathVariable("buildId") Long buildId) {
        buildService.deleteBuildById(buildId);
    }

    @PutMapping("{buildId}")
    @PreAuthorize("hasRole('ADMIN')")
    public void updateBuild(
            @PathVariable("buildId") Long buildId,
            @RequestBody BuildUpdateRequest updateRequest) {
        buildService.updateBuild(buildId, updateRequest);
    }
}