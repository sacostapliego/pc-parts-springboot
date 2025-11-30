CREATE TABLE build (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    cpu_id BIGINT NOT NULL,
    motherboard_id BIGINT NOT NULL,
    ram_id BIGINT NOT NULL,
    storage_id BIGINT NOT NULL,
    psu_id BIGINT NOT NULL,
    case_id BIGINT,
    gpu_id BIGINT,
    cpu_cooler_id BIGINT,
    build_image_link TEXT,
    CONSTRAINT fk_cpu FOREIGN KEY (cpu_id) REFERENCES part(id),
    CONSTRAINT fk_motherboard FOREIGN KEY (motherboard_id) REFERENCES part(id),
    CONSTRAINT fk_ram FOREIGN KEY (ram_id) REFERENCES part(id),
    CONSTRAINT fk_storage FOREIGN KEY (storage_id) REFERENCES part(id),
    CONSTRAINT fk_psu FOREIGN KEY (psu_id) REFERENCES part(id),
    CONSTRAINT fk_case FOREIGN KEY (case_id) REFERENCES part(id),
    CONSTRAINT fk_gpu FOREIGN KEY (gpu_id) REFERENCES part(id),
    CONSTRAINT fk_cpu_cooler FOREIGN KEY (cpu_cooler_id) REFERENCES part(id)
);

CREATE TABLE build_accessories (
    build_id BIGINT NOT NULL,
    part_id BIGINT NOT NULL,
    PRIMARY KEY (build_id, part_id),
    CONSTRAINT fk_build_accessories_build FOREIGN KEY (build_id) REFERENCES build(id) ON DELETE CASCADE,
    CONSTRAINT fk_build_accessories_part FOREIGN KEY (part_id) REFERENCES part(id) ON DELETE CASCADE
);

CREATE INDEX idx_build_name ON build(name);
CREATE INDEX idx_build_cpu ON build(cpu_id);
CREATE INDEX idx_build_gpu ON build(gpu_id);