package com.example.elearning.repositories;

import com.example.elearning.entities.User;
import com.example.elearning.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u JOIN u.skills s WHERE u.role = :role AND s = :skill AND u.status = :status")
    List<User> findByRoleAndSkillAndStatus(@Param("role") Role role, @Param("skill") String skill, @Param("status") String status);
    /**
     * Trouve un utilisateur par son email.
     *
     * @param email L'email de l'utilisateur.
     * @return L'utilisateur correspondant à l'email.
     */
    Optional<User> findByEmail(String email);

    /**
     * Trouve tous les utilisateurs ayant un rôle spécifique.
     *
     * @param role Le rôle des utilisateurs à rechercher (TUTOR ou STUDENT).
     * @return Une liste d'utilisateurs ayant le rôle spécifié.
     */
    List<User> findByRole(Role role);

    /**
     * Trouve tous les tuteurs en ligne ayant une compétence spécifique.
     *
     * @param role   Le rôle des utilisateurs à rechercher (TUTOR).
     * @param skill  La compétence recherchée (ex: "Java").
     * @param status Le statut des utilisateurs à rechercher ("online").
     * @return Une liste de tuteurs en ligne ayant la compétence spécifiée.
     */
    List<User> findByRoleAndSkillsContainingAndStatus(Role role, String skill, String status);

    /**
     * Trouve tous les utilisateurs ayant un statut spécifique.
     *
     * @param status Le statut des utilisateurs à rechercher ("online" ou "offline").
     * @return Une liste d'utilisateurs ayant le statut spécifié.
     */
    List<User> findByStatus(String status);
}