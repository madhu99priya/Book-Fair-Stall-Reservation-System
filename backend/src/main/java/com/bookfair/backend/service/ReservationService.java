package com.bookfair.backend.service;

import com.bookfair.backend.domain.Reservation;
import com.bookfair.backend.domain.Stall;
import com.bookfair.backend.domain.User;
import com.bookfair.backend.domain.enums.ReservationStatus;
import com.bookfair.backend.repository.ReservationRepository;
import com.bookfair.backend.util.DateUtil;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.time.Instant;
import java.util.List;
import java.util.Set;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final EmailService emailService;

    public ReservationService(ReservationRepository reservationRepository,
            EmailService emailService) {
        this.reservationRepository = reservationRepository;
        this.emailService = emailService;
    }

    @Transactional
    public Reservation createConfirmedReservation(User user, Set<Stall> stalls) {
        Reservation reservation = Reservation.builder()
                .user(user)
                .stalls(stalls)
                .status(ReservationStatus.CONFIRMED)
                .createdAt(Instant.now())
                .emailSent(false)
                .qrCode(generateQrBytes(user, stalls))
                .build();
        return reservationRepository.save(reservation);
    }

    public List<Reservation> listAllForUserOrAdmin(String username, boolean isAdmin) {
        if (isAdmin) {
            return reservationRepository.findAll();
        }
        // fetch reservations by user
        // (could optimize by joining once)
        return reservationRepository.findAll().stream()
                .filter(r -> r.getUser().getUsername().equals(username))
                .toList();
    }

    public Reservation getById(Long id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));
    }

    public Reservation sendConfirmationEmail(Long id) {
        Reservation res = getById(id);
        if (!res.isEmailSent()) {
            emailService.sendReservationEmail(res);
            res.setEmailSent(true);
            reservationRepository.save(res);
        }
        return res;
    }

    private byte[] generateQrBytes(User user, Set<Stall> stalls) {
        try {
            String payload = "RESV|" + user.getUsername() + "|"
                    + stalls.stream().map(Stall::getName).reduce((a, b) -> a + "," + b).orElse("")
                    + "|" + DateUtil.isoNow();
            QRCodeWriter writer = new QRCodeWriter();
            var matrix = writer.encode(payload, BarcodeFormat.QR_CODE, 250, 250);
            BufferedImage img = new BufferedImage(250, 250, BufferedImage.TYPE_INT_RGB);
            for (int x = 0; x < 250; x++) {
                for (int y = 0; y < 250; y++) {
                    img.setRGB(x, y, matrix.get(x, y) ? 0x000000 : 0xFFFFFF);
                }
            }
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(img, "png", baos);
            return baos.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("QR generation failed", e);
        }
    }
}