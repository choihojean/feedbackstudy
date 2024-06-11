package cloudweb.codefeedbackBE.service;

import cloudweb.codefeedbackBE.dto.LoginUserDTO;
import cloudweb.codefeedbackBE.dto.UpdateUserDTO;
import cloudweb.codefeedbackBE.dto.UserDTO;
import cloudweb.codefeedbackBE.dto.UserDTO2;
import cloudweb.codefeedbackBE.entity.User;
import cloudweb.codefeedbackBE.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;

    public void userSignUp(UserDTO userDTO) {

        User user = User.builder()
                .email(userDTO.getEmail())
                .password(userDTO.getPassword())
                .nickname(userDTO.getNickname())
                .build();

        userRepository.save(user);
    }

    public void deleteUserByEmailAndPassword(String email, String password) {

        User user = userRepository.findByEmailAndPassword(email, password);
        if (user != null) {
            userRepository.delete(user);
        } else {
            throw new RuntimeException("이메일 또는 비밀번호가 올바르지 않습니다.");
        }
    }


    @Transactional(readOnly = true)
    public UserDTO2 userSignIn(HashMap<String, String> loginUser) {

        User loginedUser = userRepository.findByEmailAndPassword(loginUser.get("email"), loginUser.get("password"));
        return UserDTO2.builder()
                .email(loginedUser.getEmail())
                .nickname(loginedUser.getNickname())
                .build();
    }

    public UserDTO2 findUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return null;
        }
        return UserDTO2.builder()
                .email(user.getEmail())
                .nickname(user.getNickname())
                .build();
    }

    public User updateUserByEmail(String email, UpdateUserDTO updateUserDTO) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            user.setNickname(updateUserDTO.getNickname());
            user.setPassword(updateUserDTO.getPassword());
            return userRepository.save(user);
        } else {
            throw new RuntimeException("사용자를 찾을 수 없습니다.");
        }
    }
}

