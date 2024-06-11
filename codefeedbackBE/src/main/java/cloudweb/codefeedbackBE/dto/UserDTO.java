package cloudweb.codefeedbackBE.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class UserDTO {

    @NotBlank
    @Email
    private String email;

    @NotEmpty
    private String password;

    @NotEmpty
    private String nickname;
}
