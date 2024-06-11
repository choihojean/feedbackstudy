package cloudweb.codefeedbackBE.repository;

import cloudweb.codefeedbackBE.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("select p from Post p where p.user.email = :email")
    List<Post> findMyPost(String email);

    @Query("select p from Post p where p.access = true")
    List<Post> findAccessPosts();
}
