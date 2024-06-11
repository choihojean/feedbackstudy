package cloudweb.codefeedbackBE.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class UserDTO2 {

    private String email;
    private String nickname;
}
