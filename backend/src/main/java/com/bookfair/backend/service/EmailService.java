package com.bookfair.backend.service;

import com.bookfair.backend.domain.Reservation;
import org.springframework.stereotype.Service;

/*
  Stub implementation: Replace with JavaMailSender logic once SMTP credentials are set.
  Frontend only needs the endpoint to succeed to reflect emailSent=true.
*/
@Service
public class EmailService {

    public void sendReservationEmail(Reservation reservation) {
        // TODO: Implement JavaMailSender and optionally attach QR PNG.
        // For now, log or simulate.
        System.out.println("Sending email confirmation for reservation #" + reservation.getId());
    }
}