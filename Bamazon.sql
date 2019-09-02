DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;
USE bamazon_db;
CREATE TABLE products (
item_id INT AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price INT NOT NULL,
stock_quantity INT
);

INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES ("GXL ElectricScooter", "electric transportation", 400, 30 );

INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES ("XLS HoverBoard", "electric transportation", 300, 20);

INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES ("Lenovo x360 PC", "electronics", 1000, 15);

INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES ("Samsumg_50in-OLED TV", "electronics", 2500, 15);

INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES ("OXO 17 piece Culinary Set", "kitchen", 50, 30);

INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES ("Williams Sonoma Kcup CoffeeMaker", "kitchen", 80, 25);

INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES ("GE SmartFridge", "kitchen", 2000, 10);

INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES ("Ninja Pro Blender", "kitchen", 100, 20);

INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES ("Ninebot Electric Unicycle", "electric transportation", 1500, 20);

INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES ("Oculus VR Gaming Headset", "electronics", 500, 15);
