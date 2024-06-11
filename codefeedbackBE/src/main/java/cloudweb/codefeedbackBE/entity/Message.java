package cloudweb.codefeedbackBE.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    @Setter(AccessLevel.NONE)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @Column(length = 10, nullable = false)
    private String role;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Long createdAt;

    @Column(columnDefinition = "text")
    private String content;
}
