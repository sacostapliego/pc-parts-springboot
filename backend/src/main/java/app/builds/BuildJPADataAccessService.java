package app.builds;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository("build-jpa")
public class BuildJPADataAccessService implements BuildDao {

    private final BuildRepository buildRepository;

    public BuildJPADataAccessService(BuildRepository buildRepository) {
        this.buildRepository = buildRepository;
    }

    @Override
    public List<Build> selectAllBuilds() {
        Page<Build> page = buildRepository.findAll(Pageable.ofSize(1000));
        return page.getContent();
    }

    @Override
    public Optional<Build> selectBuildById(Long buildId) {
        return buildRepository.findById(buildId);
    }

    @Override
    public void insertBuild(Build build) {
        buildRepository.save(build);
    }

    @Override
    public boolean existsBuildWithName(String name) {
        return buildRepository.existsBuildByName(name);
    }

    @Override
    public boolean existsBuildById(Long buildId) {
        return buildRepository.existsById(buildId);
    }

    @Override
    public void deleteBuildById(Long buildId) {
        buildRepository.deleteById(buildId);
    }

    @Override
    public void updateBuild(Build update) {
        buildRepository.save(update);
    }
}