package cloudweb.codefeedbackBE.repository;

import cloudweb.codefeedbackBE.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    public void deleteByEmail(String email);

    public User findByEmailAndPassword(String email, String password);

    public User findByEmail(String email);
}
