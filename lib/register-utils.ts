/**
 * Utility functions untuk fitur registrasi
 * Dibuat untuk memenuhi requirement CI/CD - Penambahan Function
 */

/**
 * Validasi kekuatan password
 * @param password - Password yang akan divalidasi
 * @returns Object dengan status dan pesan
 */
export function validatePasswordStrength(password: string): {
    isStrong: boolean;
    message: string;
    score: number;
} {
    let score = 0;
    const messages: string[] = [];

    // Minimal 6 karakter
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;

    // Mengandung huruf kecil
    if (/[a-z]/.test(password)) {
        score++;
    } else {
        messages.push("lowercase letter");
    }

    // Mengandung huruf besar
    if (/[A-Z]/.test(password)) {
        score++;
    } else {
        messages.push("uppercase letter");
    }

    // Mengandung angka
    if (/[0-9]/.test(password)) {
        score++;
    } else {
        messages.push("number");
    }

    // Mengandung karakter special
    if (/[^A-Za-z0-9]/.test(password)) {
        score++;
    } else {
        messages.push("special character");
    }

    const isStrong = score >= 5;
    const message = isStrong
        ? "Password is strong"
        : `Password should contain: ${messages.join(", ")}`;

    return { isStrong, message, score };
}

/**
 * Sanitize username - menghapus karakter yang tidak diizinkan
 * @param username - Username yang akan disanitize
 * @returns Username yang sudah dibersihkan
 */
export function sanitizeUsername(username: string): string {
    return username
        .toLowerCase()
        .replace(/[^a-z0-9_]/g, "") // Hapus karakter selain huruf, angka, underscore
        .slice(0, 20); // Maksimal 20 karakter
}

/**
 * Generate username suggestion dari nama
 * @param name - Nama lengkap user
 * @returns Array username suggestions
 */
export function generateUsernameSuggestions(name: string): string[] {
    const baseName = name.toLowerCase().replace(/\s+/g, "_");
    const randomNum = Math.floor(Math.random() * 9999);

    return [
        baseName,
        `${baseName}${randomNum}`,
        `${baseName}_${new Date().getFullYear()}`,
        `user_${baseName}`,
        `${baseName}_${Math.floor(Math.random() * 999)}`,
    ].map((username) => sanitizeUsername(username));
}

/**
 * Validasi format email
 * @param email - Email yang akan divalidasi
 * @returns Boolean apakah email valid
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Cek apakah email menggunakan provider yang umum
 * @param email - Email yang akan dicek
 * @returns Boolean apakah menggunakan provider umum
 */
export function isCommonEmailProvider(email: string): boolean {
    const commonProviders = [
        "gmail.com",
        "yahoo.com",
        "outlook.com",
        "hotmail.com",
        "icloud.com",
    ];
    const domain = email.split("@")[1]?.toLowerCase();
    return commonProviders.includes(domain || "");
}

/**
 * Format nama dengan proper case
 * @param name - Nama yang akan diformat
 * @returns Nama dengan huruf kapital di awal setiap kata
 */
export function formatName(name: string): string {
    return name
        .trim()
        .split(/\s+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

/**
 * Validasi username terhadap daftar reserved words
 * @param username - Username yang akan dicek
 * @returns Boolean apakah username diperbolehkan
 */
export function isUsernameAllowed(username: string): boolean {
    const reservedWords = [
        "admin",
        "root",
        "system",
        "api",
        "dashboard",
        "login",
        "register",
        "auth",
        "user",
        "profile",
        "settings",
    ];
    return !reservedWords.includes(username.toLowerCase());
}

/**
 * Hitung estimasi waktu untuk membuat akun
 * @returns String waktu estimasi
 */
export function getRegistrationEstimate(): string {
    return "Less than 2 minutes";
}

/**
 * Generate token verifikasi email
 * @param length - Panjang token (default 32)
 * @returns Random token string
 */
export function generateVerificationToken(length: number = 32): string {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";
    for (let i = 0; i < length; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
}
