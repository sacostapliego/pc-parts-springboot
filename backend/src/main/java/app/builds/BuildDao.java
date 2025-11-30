package app.builds;

import java.util.List;
import java.util.Optional;

public interface BuildDao {
    List<Build> selectAllBuilds();
    Optional<Build> selectBuildById(Long buildId);
    void insertBuild(Build build);
    boolean existsBuildWithName(String name);
    boolean existsBuildById(Long buildId);
    void deleteBuildById(Long buildId);
    void updateBuild(Build update);
}