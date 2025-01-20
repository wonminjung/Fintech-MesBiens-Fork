package mesbiens.member.controller;

import mesbiens.member.dto.MemberDTO;
import mesbiens.member.dto.MemberResponseDTO;
import mesbiens.member.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    // 사용자 등록
    @PostMapping("/register")
    public ResponseEntity<MemberResponseDTO> registerMember(@RequestBody MemberDTO memberDTO) {
        MemberResponseDTO registeredMember = memberService.registerMember(memberDTO);
        return ResponseEntity.ok(registeredMember);
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String memberId, @RequestParam String password) {
        String token = memberService.login(memberId, password);
        return ResponseEntity.ok(token);
    }

    // 사용자 정보 조회
    @GetMapping("/{id}")
    public ResponseEntity<MemberResponseDTO> getMemberById(@PathVariable int id) {
        return ResponseEntity.ok(memberService.findById(id));
    }
}