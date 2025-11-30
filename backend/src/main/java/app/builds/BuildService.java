package app.builds;

import app.exception.DuplicateResourceException;
import app.exception.RequestValidationException;
import app.exception.ResourceNotFoundException;
import app.part.Part;
import app.part.PartDao;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class BuildService {

    private final BuildDao buildDao;
    private final PartDao partDao;

    public BuildService(@Qualifier("build-jpa") BuildDao buildDao,
                       @Qualifier("part-jpa") PartDao partDao) {
        this.buildDao = buildDao;
        this.partDao = partDao;
    }

    public List<Build> getAllBuilds() {
        return buildDao.selectAllBuilds();
    }

    public Build getBuild(Long id) {
        return buildDao.selectBuildById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "build with id [%s] not found".formatted(id)
                ));
    }

    public void addBuild(BuildRegistrationRequest request) {
        // Check if build name already exists
        if (buildDao.existsBuildWithName(request.name())) {
            throw new DuplicateResourceException(
                    "build with name [%s] already exists".formatted(request.name())
            );
        }

        // Fetch required parts
        Part cpu = getPartById(request.cpuId(), "CPU");
        Part motherboard = getPartById(request.motherboardId(), "Motherboard");
        Part ram = getPartById(request.ramId(), "RAM");
        Part storage = getPartById(request.storageId(), "Storage");
        Part psu = getPartById(request.psuId(), "PSU");

        // Create build
        Build build = new Build(
                request.name(),
                request.description(),
                cpu,
                motherboard,
                ram,
                storage,
                psu
        );

        // Set optional parts
        if (request.caseId() != null) {
            build.setPcCase(getPartById(request.caseId(), "Case"));
        }
        if (request.gpuId() != null) {
            build.setGpu(getPartById(request.gpuId(), "GPU"));
        }
        if (request.cpuCoolerId() != null) {
            build.setCpuCooler(getPartById(request.cpuCoolerId(), "CPU Cooler"));
        }

        // Set accessories
        if (request.accessoryIds() != null && !request.accessoryIds().isEmpty()) {
            Set<Part> accessories = new HashSet<>();
            for (Long accessoryId : request.accessoryIds()) {
                accessories.add(getPartById(accessoryId, "Accessory"));
            }
            build.setAccessories(accessories);
        }

        build.setBuildImageLink(request.buildImageLink());

        buildDao.insertBuild(build);
    }

    public void deleteBuildById(Long buildId) {
        if (!buildDao.existsBuildById(buildId)) {
            throw new ResourceNotFoundException(
                    "build with id [%s] not found".formatted(buildId)
            );
        }
        buildDao.deleteBuildById(buildId);
    }

    public void updateBuild(Long buildId, BuildUpdateRequest updateRequest) {
        Build build = buildDao.selectBuildById(buildId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "build with id [%s] not found".formatted(buildId)
                ));

        boolean changes = false;

        if (updateRequest.name() != null && !updateRequest.name().equals(build.getName())) {
            if (buildDao.existsBuildWithName(updateRequest.name())) {
                throw new DuplicateResourceException(
                        "build with name [%s] already exists".formatted(updateRequest.name())
                );
            }
            build.setName(updateRequest.name());
            changes = true;
        }

        if (updateRequest.description() != null && !updateRequest.description().equals(build.getDescription())) {
            build.setDescription(updateRequest.description());
            changes = true;
        }

        if (updateRequest.cpuId() != null && !updateRequest.cpuId().equals(build.getCpu().getId())) {
            build.setCpu(getPartById(updateRequest.cpuId(), "CPU"));
            changes = true;
        }

        if (updateRequest.motherboardId() != null && !updateRequest.motherboardId().equals(build.getMotherboard().getId())) {
            build.setMotherboard(getPartById(updateRequest.motherboardId(), "Motherboard"));
            changes = true;
        }

        if (updateRequest.ramId() != null && !updateRequest.ramId().equals(build.getRam().getId())) {
            build.setRam(getPartById(updateRequest.ramId(), "RAM"));
            changes = true;
        }

        if (updateRequest.storageId() != null && !updateRequest.storageId().equals(build.getStorage().getId())) {
            build.setStorage(getPartById(updateRequest.storageId(), "Storage"));
            changes = true;
        }

        if (updateRequest.psuId() != null && !updateRequest.psuId().equals(build.getPsu().getId())) {
            build.setPsu(getPartById(updateRequest.psuId(), "PSU"));
            changes = true;
        }

        if (updateRequest.buildImageLink() != null && !updateRequest.buildImageLink().equals(build.getBuildImageLink())) {
            build.setBuildImageLink(updateRequest.buildImageLink());
            changes = true;
        }

        if (!changes) {
            throw new RequestValidationException("no data changes found");
        }

        buildDao.updateBuild(build);
    }

    private Part getPartById(Long partId, String partTypeName) {
        return partDao.selectPartById(partId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        partTypeName + " with id [%s] not found".formatted(partId)
                ));
    }
}