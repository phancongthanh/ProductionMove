# ProductionMove
BTL Web INT3306 20 2022-2023
## Công nghệ sử dụng
- ReactJS 18
- ASP.Net Core 7
- Entity framework 7
- MySQL 8.0.31
## Cách xây dựng và chạy ứng dụng
1. Tải code
2. Build ứng dụng: Trên windows chạy file build.windows.bat
3. Cấu hình môi trường
- Thư mục sau build: /build
- Cấu hình lại các tham số trong file: build/appsettings.Development.json (build/appsettings.Production.json với trường hợp ở môi trường Production)
- "UseInMemoryDatabase": false Cấu hình sử dụng MySQL Database (Để true nếu muốn chạy database trên RAM trong trường hợp MySQL có vấn đề)
- “DbContextMySQL”: “...” Kết nối tới MySQL database
- "SecurityKey": “...” Mã bảo mật để sinh token ở backend
5. Chạy ứng dụng: Trên windows chạy file run.development.windows.bat (WebAPI.exe/WebAPI.dll trong thư mục build với trường hợp ở môi trường Production)
