package cloudweb.codefeedbackBE.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MessageDTO {

    private String role;
    private Long createdAt;
    private String content;
}
