package com.example.elearning.Controllers;

import com.example.elearning.Entity.Certificate;
import com.example.elearning.Service.CertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/certifs")
public class CertificateController {
    @Autowired
    private CertificateService certificateService;

    @GetMapping
    public List<Certificate> getAllCertifs() {
        return certificateService.getAllCertifs();
    }

    @PostMapping
    public Certificate createCertif(@RequestBody Certificate certif) {
        return certificateService.createCertif(certif);
    }

    @DeleteMapping("/{id}")
    public void deleteCertif(@PathVariable int id) {
        certificateService.deleteCertif(id);
    }

    @PutMapping("/{id}")
    public Certificate updateCertif(@PathVariable int id, @RequestBody Certificate certifDetails) {
        return certificateService.updateCertif(id, certifDetails);
    }
}