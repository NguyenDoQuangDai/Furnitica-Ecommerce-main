# Furnitica Web Application

# 🧩 User Management Component Integration

## 📌 Giới thiệu
`UserManagementComponent` là phần tích hợp giữa **React Frontend** và microservice **[userManagement-ms](https://github.com/NguyenDoQuangDai/userManagement-ms)** trong hệ thống **Furnitica-Ecommerce**.  
Thành phần này cung cấp giao diện trực quan cho người dùng để thực hiện các chức năng quản lý tài khoản, đồng thời kết nối trực tiếp với microservice để xử lý dữ liệu và xác thực.

## ⚙️ Chức năng chính
- **Đăng ký / Đăng nhập** thông qua giao diện React, kết nối API từ `userManagement-ms`.  
- **Quản lý thông tin cá nhân**: cập nhật hồ sơ, mật khẩu, email.  
- **Phân quyền & vai trò**: hiển thị và kiểm soát quyền truy cập dựa trên dữ liệu từ microservice.  
- **Danh sách người dùng**: hiển thị bảng dữ liệu người dùng, hỗ trợ CRUD.  

## 🏗️ Kiến trúc tích hợp
- **Frontend**: ReactJS, sử dụng Axios/Fetch để gọi API.  
- **Backend**: `userManagement-ms` (Java Spring Boot, Spring Security JWT, MySQL).  
- **Kết nối**: REST API endpoints từ microservice được sử dụng trong `UserManagementComponent`.  
- **Triển khai**: có thể chạy độc lập cùng các microservice
  

## 🧐 About
* Furniture Online Store Built Using Angular 13 and .NET Core 6 Web API


## ⚙ Features

- [1] You can login/Register as Customer or Vendor
- [2] Customer/Vendor Can Update His Profile Information
- [3] Customers Can See All Products or Specific Product Without Login
- [4] Customers Can Search For a Specific Product Without Login
- [5] Customers Can fliter Products to certain criteria like (Color, Categoryies, Price Range)
- [6] Customers Can Sort Products by (A-Z, Z-A, High to low price, Low to high price)
- [7] Customers Can Add/Remove/Update Products in Cart
- [8] Customers Can Add/Remove Their Favorite Products
- [9] Customers Can see all his previous Orders and it's details 
- [10] Customer Can Add Only One Review For a Product With Evaluation. 
- [11] Vendors Can Add/Remove/Update/Delete Products.
- [12] Vendors Can Manage Order

## 📱 Some Screenshots 
<img width="400" height="200" alt="Log In" src="/images/0.jpeg"> <img width="400" height="200" alt="Registration" src="/images/00.jpeg">
<img width="400" alt="Screen Shot 2020-09-04 at 2 48 55 PM" src="/images/1.jpeg">
<img width="400" height="243" alt="Screen Shot 2020-09-04 at 2 48 55 PM" src="/images/2.jpeg">
<img width="400" height="230" alt="Screen Shot 2020-09-04 at 2 48 55 PM" src="/images/3.jpeg">
<img width="400" alt="Screen Shot 2020-09-04 at 2 48 55 PM" src="/images/4.jpeg">
<img width="400" alt="Screen Shot 2020-09-04 at 2 48 55 PM" src="/images/5.jpeg">
<img width="400" alt="Screen Shot 2020-09-04 at 2 48 55 PM" src="/images/6.jpeg">
<img width="400" alt="Screen Shot 2020-09-04 at 2 48 55 PM" src="/images/7.jpeg">
<img width="400" alt="Screen Shot 2020-09-04 at 2 48 55 PM" src="/images/8.jpeg">
<img width="400" height="243" alt="Screen Shot 2020-09-04 at 2 48 55 PM" src="/images/9.jpeg">
<img width="400" height="243" alt="Screen Shot 2020-09-04 at 2 48 55 PM" src="/images/10.jpeg">
<img width="400" alt="Screen Shot 2020-09-04 at 2 48 55 PM" src="/images/11.jpeg">

## 🏛 Requirements
 * .Net Core 6 Runtime Env.
 * Sql server installed and Tsql.
 * Visual Studio To Run API.
 * Visual Studio Code to Run Angular App.
 
## 🛠 How To Run 

Clone the project

```bash
  git clone https://github.com/SamehSerag/Examination-System.git
```

Restore database

```bash
  DbBackup/AngularDb.bak
```

Run API

```bash
  cd DotNetWebAPI/DotNetWebAPI
```
Run Angular Project

```bash
  cd AngularProject/client
```

Log in wtih Vendor

```bash
  username: alaa, password: @Asd1234
```
Or Log in wtih Customer

```bash
  username: omnia, password: @Asd1234
```

You can also start your own journey by registering as a new customer or owner


## ⚡ Technologies and Libraries 
* Angular 13
* Angular Material
* .NET Core 6 Web API
* Entity Framework Core
* Sql Server
* Html/Css
* JQuery
* BootStrap
* AutoMappers 
* Dependancy injection 
* Repository Design Pattern
* .NET Core Identity


# 👷🏽 Contributors
* [Sameh Serag](https://github.com/SamehSerag)
* [Mohamed Alaa](https://github.com/mohamedalaa1305)
* [Omnia Fathy](https://github.com/omnia-fathy)
* [Samaa Khaled](https://github.com/SamaaKH99)
* [Noha Mostafa](https://github.com/NohaMostafa)
