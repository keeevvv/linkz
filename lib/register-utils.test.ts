/**
 * Unit tests untuk register-utils.ts
 * Testing untuk semua function utility registrasi
 */

import {
    validatePasswordStrength,
    sanitizeUsername,
    generateUsernameSuggestions,
    isValidEmail,
    isCommonEmailProvider,
    formatName,
    isUsernameAllowed,
    getRegistrationEstimate,
    generateVerificationToken,
} from "@/lib/register-utils";

describe("Register Utils - Password Validation", () => {
    it("should validate strong password", () => {
        const result = validatePasswordStrength("MyP@ssw0rd123");
        expect(result.isStrong).toBe(true);
        expect(result.score).toBeGreaterThanOrEqual(5);
        expect(result.message).toBe("Password is strong");
    });

    it("should reject weak password", () => {
        const result = validatePasswordStrength("weak");
        expect(result.isStrong).toBe(false);
        expect(result.score).toBeLessThan(5);
    });

    it("should detect missing uppercase", () => {
        const result = validatePasswordStrength("password123");
        expect(result.message).toContain("uppercase letter");
    });

    it("should detect missing special character", () => {
        const result = validatePasswordStrength("Pass123"); // Lebih pendek, score < 5
        expect(result.message).toContain("special character");
    });
});

describe("Register Utils - Username Functions", () => {
    it("should sanitize username by removing invalid characters", () => {
        const result = sanitizeUsername("User@Name#123!");
        expect(result).toBe("username123");
    });

    it("should convert username to lowercase", () => {
        const result = sanitizeUsername("MyUserName");
        expect(result).toBe("myusername");
    });

    it("should limit username to 20 characters", () => {
        const longUsername = "a".repeat(30);
        const result = sanitizeUsername(longUsername);
        expect(result.length).toBe(20);
    });

    it("should generate username suggestions from name", () => {
        const suggestions = generateUsernameSuggestions("John Doe");
        expect(suggestions.length).toBeGreaterThan(0);
        expect(suggestions[0]).toBe("john_doe");
    });

    it("should check if username is allowed (not reserved)", () => {
        expect(isUsernameAllowed("admin")).toBe(false);
        expect(isUsernameAllowed("root")).toBe(false);
        expect(isUsernameAllowed("johndoe")).toBe(true);
    });
});

describe("Register Utils - Email Validation", () => {
    it("should validate correct email format", () => {
        expect(isValidEmail("user@example.com")).toBe(true);
        expect(isValidEmail("test.user@domain.co.id")).toBe(true);
    });

    it("should reject invalid email format", () => {
        expect(isValidEmail("notanemail")).toBe(false);
        expect(isValidEmail("missing@domain")).toBe(false);
        expect(isValidEmail("@nodomain.com")).toBe(false);
    });

    it("should detect common email providers", () => {
        expect(isCommonEmailProvider("user@gmail.com")).toBe(true);
        expect(isCommonEmailProvider("user@yahoo.com")).toBe(true);
        expect(isCommonEmailProvider("user@outlook.com")).toBe(true);
        expect(isCommonEmailProvider("user@customprovider.com")).toBe(false);
    });
});

describe("Register Utils - Name Formatting", () => {
    it("should format name to proper case", () => {
        expect(formatName("john doe")).toBe("John Doe");
        expect(formatName("JOHN DOE")).toBe("John Doe");
        expect(formatName("jOhN dOe")).toBe("John Doe");
    });

    it("should trim extra whitespace", () => {
        expect(formatName("  john   doe  ")).toBe("John Doe");
    });

    it("should handle single name", () => {
        expect(formatName("john")).toBe("John");
    });
});

describe("Register Utils - Helper Functions", () => {
    it("should return registration estimate", () => {
        const estimate = getRegistrationEstimate();
        expect(estimate).toBe("Less than 2 minutes");
    });

    it("should generate verification token with default length", () => {
        const token = generateVerificationToken();
        expect(token).toHaveLength(32);
    });

    it("should generate verification token with custom length", () => {
        const token = generateVerificationToken(16);
        expect(token).toHaveLength(16);
    });

    it("should generate unique verification tokens", () => {
        const token1 = generateVerificationToken();
        const token2 = generateVerificationToken();
        expect(token1).not.toBe(token2);
    });
});
