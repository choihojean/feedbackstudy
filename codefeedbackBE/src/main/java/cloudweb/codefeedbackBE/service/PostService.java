package cloudweb.codefeedbackBE.service;

import cloudweb.codefeedbackBE.dto.MessageDTO;
import cloudweb.codefeedbackBE.dto.PostDTO;
import cloudweb.codefeedbackBE.dto.PostDTO2;
import cloudweb.codefeedbackBE.dto.PostModifyDTO;
import cloudweb.codefeedbackBE.entity.Message;
import cloudweb.codefeedbackBE.entity.Post;
import cloudweb.codefeedbackBE.entity.User;
import cloudweb.codefeedbackBE.repository.PostRepository;
import cloudweb.codefeedbackBE.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {

    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public void savePost(PostDTO postDTO, String userEmail) {

        User foundUser = userRepository.findByEmail(userEmail);
        Post post = new Post();
        post.setUser(foundUser);
        post.setTitle(postDTO.getTitle());
        post.setContent(postDTO.getContent());
        post.setAccess(postDTO.isAccess());

        for (MessageDTO messageDTO : postDTO.getMessages()) {
            Message message = new Message();
            message.setRole(messageDTO.getRole());
            message.setCreatedAt(messageDTO.getCreatedAt());
            message.setContent(messageDTO.getContent());

            post.addMessage(message);
        }

        postRepository.save(post);
    }

    public void modifyPost(Long postId, PostModifyDTO postModifyDTO) {

        Post foundPost = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("아이디가 " + postId + "인 post 찾을 수 없음."));

        foundPost.setTitle(postModifyDTO.getTitle());
        foundPost.setContent(postModifyDTO.getContent());
        foundPost.setAccess(postModifyDTO.isAccess());
    }

    public PostDTO2 postDetail(Long postId, String loggedInUserEmail) {

        Post foundPost = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("아이디가 " + postId + "인 post 찾을 수 없음."));

        if (!foundPost.isAccess()) {
            if (!foundPost.getUser().getEmail().equals(loggedInUserEmail)) {
                throw new RuntimeException("비공개 게시글 입니다.");
            }
        }
        List<Message> messages = foundPost.getMessages();
        List<MessageDTO> messageDTOS = messages.stream()
                .map(message -> MessageDTO.builder()
                        .role(message.getRole())
                        .createdAt(message.getCreatedAt())
                        .content(message.getContent()).build())
                .toList();

        return PostDTO2.builder()
                .id(foundPost.getId())
                .nickname(foundPost.getUser().getNickname())
                .title(foundPost.getTitle())
                .content(foundPost.getContent())
                .messages(messageDTOS)
                .access(foundPost.isAccess())
                .build();
    }

    public void deletePost(Long postId){
        Post foundPost = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("아이디가 " + postId + "인 post 찾을 수 없음."));
        postRepository.delete(foundPost);
    }

    public List<PostDTO2> findMyPost(String email) {
        return postRepository.findMyPost(email).stream()
                .map(post -> {
                    List<MessageDTO> messageDTOS = post.getMessages().stream()
                            .map(message -> MessageDTO.builder()
                                    .role(message.getRole())
                                    .createdAt(message.getCreatedAt())
                                    .content(message.getContent())
                                    .build()).toList();

                    return
                        PostDTO2.builder()
                        .id(post.getId())
                        .nickname(post.getUser().getNickname())
                        .title(post.getTitle())
                        .content(post.getContent())
                        .access(post.isAccess())
                        .messages(messageDTOS).build();
                }).collect(Collectors.toList());
    }

    public List<PostDTO2> findAccessPosts() {
        return postRepository.findAccessPosts().stream()
                .map(post -> {
                    List<MessageDTO> messageDTOS = post.getMessages().stream()
                            .map(message -> MessageDTO.builder()
                                    .role(message.getRole())
                                    .createdAt(message.getCreatedAt())
                                    .content(message.getContent())
                                    .build()).toList();

                    return PostDTO2.builder()
                                    .id(post.getId())
                                    .nickname(post.getUser().getNickname())
                                    .title(post.getTitle())
                                    .content(post.getContent())
                                    .access(post.isAccess())
                                    .messages(messageDTOS).build();
                }).collect(Collectors.toList());
    }
}
