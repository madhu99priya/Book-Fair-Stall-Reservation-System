package com.bookfair.backend.util;

import java.time.Instant;

public class DateUtil {
    public static String isoNow() {
        return Instant.now().toString();
    }
}