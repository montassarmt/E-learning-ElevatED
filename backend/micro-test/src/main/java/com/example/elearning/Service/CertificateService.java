package com.example.elearning.Service;

import com.example.elearning.Entity.Certificate;
import com.example.elearning.Entity.Test;
import com.example.elearning.Repository.CertificateRepository;
import com.example.elearning.Repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CertificateService {
    @Autowired
    private CertificateRepository certificateRepository;

    @Autowired
    private TestRepository testRepository;

    public List<Certificate> getAllCertifs() {
        return certificateRepository.findAll();
    }

    public Certificate createCertif(Certificate certif) {
        if (certif.getTest() != null && certif.getTest().getId() != 0) {
            Test test = testRepository.findById(certif.getTest().getId())
                    .orElseThrow(() -> new RuntimeException("Test not found"));
            certif.setTest(test);
        }
        return certificateRepository.save(certif);
    }

    public void deleteCertif(int id) {
        certificateRepository.deleteById(id);
    }

    public Certificate updateCertif(int id, Certificate certifDetails) {
        Certificate certif = certificateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Certificate not found"));

        if (certifDetails.getTest() != null && certifDetails.getTest().getId() != 0) {
            Test test = testRepository.findById(certifDetails.getTest().getId())
                    .orElseThrow(() -> new RuntimeException("Test not found"));
            certif.setTest(test);
        }

        certif.setDate(certifDetails.getDate());
        certif.setNomCertificate(certifDetails.getNomCertificate());

        return certificateRepository.save(certif);
    }
}