1) Source này là gì?
Dự án backend viết bằng NestJS kết nối PostgreSQL qua TypeORM. Cung cấp API đăng ký, đăng nhập bằng JWT, và API /auth/profile để lấy thông tin user từ token.

 -POST /auth/register: đăng ký tài khoản (lưu trên Neon DB, hash password).

 -POST /auth/login: đăng nhập, trả về access_token (JWT).

2) Cách chạy
  **Chạy SERVER:**
  npm run start:dev

  -Server hoạt động ở http://localhost:3000

3) Yêu cầu môi trường
   -Node.js >= 18
   -PostgreSQL (Neon DB)

4. Yêu cầu code
  -Cấu trúc chuẩn NestJS: Module, Controller, Service
  -Entity UserEntity gồm: id, name, email, password


5. Lưu ý
   -Swagger đã setup và hoàn thiện (http://localhost:3000/api)
   -Không trả password trong response
   
