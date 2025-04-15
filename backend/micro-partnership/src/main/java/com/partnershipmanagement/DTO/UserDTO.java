package com.partnershipmanagement.DTO;

import lombok.Data;
import java.util.Set;

@Data
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String specialty;
    private String status;
    private Set<RoleDTO> roles;
}
