create database Pet_shop;

CREATE TABLE categories (
    id_category SERIAL PRIMARY KEY,          
    name_category VARCHAR(255) NOT NULL,
	status boolean NULL
);
select * from categories;
drop table categories
CREATE TABLE pets (
    id SERIAL PRIMARY KEY,                
    name VARCHAR(255) NOT NULL,            
    type boolean, 
    gender boolean ,
    price VARCHAR(50) NOT NULL,         
    image VARCHAR(255),                   
    status boolean ,
    description TEXT,                      
    category_id INT REFERENCES categories(id_category) ON DELETE SET NULL
	
);
select * from pets;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY, 
    username VARCHAR(255) NOT NULL UNIQUE,
	sex boolean,
    password VARCHAR(255) NOT NULL,       
    email VARCHAR(255) NOT NULL UNIQUE,   
    phone VARCHAR(20),  
    address TEXT                         
);
INSERT INTO users(username, sex, password, email, phone, address) VALUES('Sang ni lo', true, 'sang123', 'hoangsanglangtu@gmail.com', 0241098932, 'tỉnh Đồng Tháp')
select * from users;

create table admin (
    admin_id SERIAL PRIMARY KEY, 
    adminname VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,       
    email VARCHAR(255) NOT NULL UNIQUE,   
    phone VARCHAR(20),  
    address TEXT 
);
INSERT INTO admin(adminname, password, email, phone, address) VALUES('admin', 'loi123', 'meo19092004@gmail.com', 0707070707, 'tỉnh Đồng Tháp')
select * from orders;
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,                 
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE, 
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    total NUMERIC(10),                  
    order_status INT REFERENCES orderstatus(status_id) ON DELETE SET NULL
	)
CREATE TABLE orderstatus(
	status_id SERIAL PRIMARY KEY,
	status_name VARCHAR(20)
)
CREATE TABLE order_details (
    id SERIAL PRIMARY KEY,                 
    order_id INT NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE, 
    pet_id INT NOT NULL REFERENCES pets(id) ON DELETE CASCADE,     
    quantity INT NOT NULL CHECK (quantity > 0), 
    price NUMERIC(10) NOT NULL         
);
select * from order_details;

INSERT INTO order_details (order_id, pet_id, quantity, price)
VALUES 
    (1, 1, 1, 5000000);

CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,                
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE, 
    pet_id INT NOT NULL REFERENCES pets(id) ON DELETE CASCADE,   
    rating INT CHECK (rating BETWEEN 1 AND 5), -- Đánh giá (1-5 sao)
    comment TEXT,                           
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Ngày đánh giá
);
select * from reviews;

INSERT INTO reviews (user_id, pet_id, rating, comment)
VALUES 
    (2, 1, 5, 'Nó rất đáng yêu trừ việc.., nhưng mình rất hài lòng!'),
    (2, 2, 5, 'Mèo này rất dễ thương, nhưng hơi nhút nhát.');

CREATE TABLE payments (
    id SERIAL PRIMARY KEY,                 
    order_id INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE, 
    payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('Tiền mặt', 'Thẻ tín dụng', 'Chuyển khoản')), 
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    payment_status VARCHAR(50) DEFAULT 'Chưa thanh toán' CHECK (payment_status IN ('Chưa thanh toán', 'Đã thanh toán', 'Hoàn tiền')) 
);

INSERT INTO payments (order_id, payment_method, payment_status)
VALUES 
    (1, 'Thẻ tín dụng', 'Đã thanh toán');

CREATE TABLE suppliers (
    id SERIAL PRIMARY KEY,      
    name VARCHAR(255) NOT NULL, 
    contact_name VARCHAR(255),  
    phone VARCHAR(20),          
    email VARCHAR(255) UNIQUE,  
    address TEXT                
);

INSERT INTO suppliers (name, contact_name, phone, email, address)
VALUES 
    ('Nhà cung cấp 1', 'Nguyễn Văn An', '0123456789', 'supplier1@gmail.com', 'Cà Mau'),
    ('Nhà cung cấp 2', 'Trần Thị Bé Tư', '0987654321', 'supplier2@gmail.com', 'TP.HCM');
	
CREATE TABLE supplier_pets (
    id SERIAL PRIMARY KEY,                 
    supplier_id INT NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE, 
    pet_id INT NOT NULL REFERENCES pets(id) ON DELETE CASCADE,           
    supply_date DATE DEFAULT CURRENT_DATE  
);

INSERT INTO supplier_pets (supplier_id, pet_id)
VALUES 
    (1, 1), 
    (2, 2); 

select * from payments;
select * from suppliers;
select * from supplier_pets;
