package app.builds;

import java.util.Set;

public record BuildUpdateRequest(
        String name,
        String description,
        Long cpuId,
        Long motherboardId,
        Long ramId,
        Long storageId,
        Long psuId,
        Long caseId,
        Long gpuId,
        Long cpuCoolerId,
        Set<Long> accessoryIds,
        String buildImageLink
) {
}