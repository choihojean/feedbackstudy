package cloudweb.codefeedbackBE.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserDTO {

    @NotEmpty
    private String nickname;

    @NotEmpty
    private String password;
}
