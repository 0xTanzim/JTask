package com.jtask.dto.response;

import com.jtask.domain.User;

public record AuthResponse(
    UserDto user,
    String token
) {
    public record UserDto(
        String id,
        String email,
        String name,
        String avatar
    ) {
        public static UserDto from(User user) {
            return new UserDto(
                user.id().toString(),
                user.email(),
                user.name(),
                user.avatar()
            );
        }
    }

    public static AuthResponse from(User user, String token) {
        return new AuthResponse(UserDto.from(user), token);
    }
}
