package app;

import org.springframework.beans.factory.annotation.Value;
// import s3.S3Buckets;
// import s3.S3Service;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import app.customer.Customer;
import app.customer.CustomerRepository;
import app.customer.Gender;
import app.customer.Role;

// import java.util.UUID;

@SpringBootApplication
public class Main {

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
        
    }

    @Bean
    CommandLineRunner runner(
            CustomerRepository customerRepository,
            PasswordEncoder passwordEncoder,
            /* S3Service s3Service,
            S3Buckets s3Buckets */
            @Value("${app.initial-admin.email:}") String initialAdminEmail,
            @Value("${app.initial-admin.password:}") String initialAdminPassword) {
        return args -> {
            // testBucketUploadAndDownload(s3Service, s3Buckets);

            // This code will run on startup
            if (initialAdminEmail.isBlank() || initialAdminPassword.isBlank()) {
                System.out.println("Initial admin credentials not set. Skipping admin creation.");
                return;
            }

            // Check if the admin user already exists
            if (customerRepository.existsCustomerByEmail(initialAdminEmail)) {
                System.out.println("Admin user already exists.");
            } else {
                // Create the first admin user
                Customer admin = new Customer(
                        "Admin",
                        initialAdminEmail,
                        passwordEncoder.encode(initialAdminPassword),
                        99, // dummy age
                        Gender.MALE
                );
                admin.setRole(Role.ADMIN); // Explicitly set the role to ADMIN
                customerRepository.save(admin);
                System.out.println("Initial admin user created successfully!");
            }

        };
    }

    /* 
    private void testBucketUploadAndDownload(S3Service s3Service, S3Buckets S3Buckets) {
        s3Service.putObject(
            S3Buckets.getCustomer(), 
            "foo/bar/jamila-" + UUID.randomUUID(), 
            "Hello World".getBytes()
        );

        byte[] obj = s3Service.getObject(
            S3Buckets.getCustomer(), 
            "foo/bar/jamila"
        );

        System.out.println("Hello: " + new String(obj));
    } 
    */
}
