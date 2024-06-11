package cloudweb.codefeedbackBE.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostDTO {

    @NotBlank(message = "Title cannot be blank")
    private String title;

    private String content;

    @NotNull(message = "access는 null이 될 수 없음")
    private boolean access;

    @NotNull(message = "Messages list cannot be null")
    private List<MessageDTO> messages = new ArrayList<>();
}
