-- 创建CATEGORY表
CREATE TABLE CATEGORY (
  CATEGORY_ID INT PRIMARY KEY AUTO_INCREMENT,
  NAME VARCHAR(100) NOT NULL
);
-- 创建FUNDRAISER表
CREATE TABLE FUNDRAISER (
  FUNDRAISER_ID INT PRIMARY KEY AUTO_INCREMENT,
  ORGANIZER VARCHAR(255) NOT NULL,
  CAPTION VARCHAR(255),
  TARGET_FUNDING DECIMAL(10, 2),
  CURRENT_FUNDING DECIMAL(10, 2) DEFAULT 0,
  CITY VARCHAR(100),
  ACTIVE BOOLEAN DEFAULT TRUE,
  CATEGORY_ID INT,
  FOREIGN KEY (CATEGORY_ID) REFERENCES CATEGORY(CATEGORY_ID)
);
-- 添加CATEGORY数据
INSERT INTO CATEGORY (NAME) VALUES ('Medical'), ('Education'), ('Crisis Relief');
-- 添加FUNDRAISER数据
INSERT INTO FUNDRAISER (ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID) 
VALUES 
  ('Aiden', 'Help Aiden Rebuild His Home After Fire', 12000, 9500, 'Byron Bay', TRUE, 3),
  ('Amelia', 'Support Amelia\'s Cancer Treatment', 8000, 5400, 'Sydney', TRUE, 1),
  ('Elijah', 'Books for Rural Schools', 6000, 4200, 'Melbourne', TRUE, 2),
  ('James', 'Medical Equipment for Refugee Camps', 22000, 17800, 'Canberra', TRUE, 1),
  ('Benjamin', 'Repairing Flood Damaged School', 9000, 6100, 'Darwin', TRUE, 3),
  ('Henry', 'Support Henry\'s Heart Surgery', 11000, 7800, 'Byron Bay', TRUE, 1),
  ('Samuel', 'Educational Workshops for Kids', 5000, 3500, 'Melbourne', TRUE, 2),
  ('Mila', 'School Renovation Project', 14000, 11000, 'Perth', TRUE, 2),
  ('Jack', 'Healthcare for Displaced Families', 25000, 19200, 'Canberra', TRUE, 1),
  ('Michael', 'Flood Recovery for Coastal Town', 10000, 7400, 'Darwin', TRUE, 3);
