package com.icebear.mintBear.Repository;


import com.icebear.mintBear.Domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByUsername(String username);

    boolean existsByUsername(String username);

    void deleteByUsername(String username);
}