package com.bookfair.backend.service;

import jakarta.activation.DataSource;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Async;

@Service
public class MailService {

    @Autowired
    private JavaMailSender mailSender;

    /**
     * Send an email with QR code attachment.
     *
     * @param toEmail Recipient email
     * @param subject Email subject
     * @param text    Email body
     * @param qrBytes QR code as byte array (PNG)
     * @throws MessagingException
     */
    @Async
    public void sendEmailWithQRCode(String toEmail, String subject, String text, byte[] qrBytes) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        // true = multipart
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(toEmail);
        helper.setSubject(subject);
        helper.setText(text, true);

        if (qrBytes != null && qrBytes.length > 0) {
            DataSource dataSource = new jakarta.mail.util.ByteArrayDataSource(qrBytes, "image/png");
            helper.addAttachment("QR_Pass.png", dataSource);
        }

        mailSender.send(message);
    }
}
