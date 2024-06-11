package cloudweb.codefeedbackBE.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostModifyDTO {

    @NotBlank(message = "Title cannot be blank")
    private String title;

    private String content;

    @NotNull(message = "access는 null이 될 수 없음")
    private boolean access;
}
