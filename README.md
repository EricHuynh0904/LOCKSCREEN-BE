Một API xác thực cơ bản:

POST /auth/register: đăng ký tài khoản (lưu DB, hash password).

POST /auth/login: đăng nhập, trả về access_token (JWT).

GET /auth/profile: lấy thông tin người dùng từ JWT (Bearer token).
