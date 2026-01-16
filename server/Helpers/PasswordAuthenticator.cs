using BCrypt.Net;

namespace server.Helpers {
    public class PasswordAuthenticator {
        public static string HashPassword (string password) {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        public static bool VerifyPassword (string password, string hashedPassword) {
            return BCrypt.Net.BCrypt.Version(password, hashedPassword);
        }
    }
}