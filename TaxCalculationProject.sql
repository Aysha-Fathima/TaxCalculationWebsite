--Scaffolding command:
--Scaffold-DbContext "Server=tcp:tax-project.database.windows.net,1433;Initial Catalog=UserTaxInfo;Persist Security Info=False;User ID=tax;Password=project@12;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;" -Provider Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models


--Database query:

create database TaxCalculationProjectDB;

--drop database TaxCalculationProjectDB;




CREATE TABLE userData
(
    userId INT PRIMARY KEY IDENTITY(100, 1), 
	caId INT ,
    userName VARCHAR(30),
    gender VARCHAR(7),
    email VARCHAR(30),
    userAddress VARCHAR(100),
    upassword VARCHAR(30),
	FOREIGN KEY (caId) REFERENCES charteredAccountant(caId) ON DELETE CASCADE

);

CREATE TABLE charteredAccountant
(
    caId INT PRIMARY KEY IDENTITY(1, 1),
    caName VARCHAR(30),
    email VARCHAR(30),
    cpassword VARCHAR(30), 
    gender VARCHAR(7),
    caAddress VARCHAR(100)
);

CREATE TRIGGER trgAssignRandomCaId
ON userData
AFTER INSERT
AS
BEGIN
    DECLARE @randomCaId INT;

   
    SELECT TOP 1 @randomCaId = caId 
    FROM charteredAccountant 
    ORDER BY NEWID();

    UPDATE userData
    SET caId = @randomCaId
    WHERE userId IN (SELECT userId FROM inserted);
END;


CREATE TABLE tableInfo
(
taxId INT PRIMARY KEY IDENTITY(1000,1),
userId INT,
caId INT,
assessmentYear VARCHAR(10) CHECK (assessmentYear IN ('2024-25')),
age VARCHAR(20) CHECK (age IN ('below60','between60and79','80above')),
totalAnnualIncome float,
totalDeductions float,
oldRegimeTax float,
newRegimeTax float,
FOREIGN KEY (userId) REFERENCES userData(userId) ON DELETE CASCADE,
FOREIGN KEY (caId) REFERENCES charteredAccountant(caId) 
);
ALTER TABLE tableInfo
DROP CONSTRAINT FK__tableInfo__caId__6A30C649;

ALTER TABLE tableInfo
DROP COLUMN caId;


INSERT INTO charteredAccountant ( caName, email, cpassword, gender, caAddress) VALUES
( 'CA Aarav Sharma', 'aarav.sharma@example.com', 'caPassword1', 'Male', '101 Birch St'),
( 'CA Priya Gupta', 'priya.gupta@example.com', 'caPassword2', 'Female', '202 Willow St'),
( 'CA Rahul Mehta', 'rahul.mehta@example.com', 'caPassword3', 'Male', '303 Ash St'),
( 'CA Neha Singh', 'neha.singh@example.com', 'caPassword4', 'Female', '404 Spruce St'),
( 'CA Vikram Patel', 'vikram.patel@example.com', 'caPassword5', 'Male', '505 Cherry St'),
( 'CA Riya Iyer', 'riya.iyer@example.com', 'caPassword6', 'Female', '606 Maple St'),
( 'CA Anil Verma', 'anil.verma@example.com', 'caPassword7', 'Male', '707 Oak St'),
( 'CA Kavita Joshi', 'kavita.joshi@example.com', 'caPassword8', 'Female', '808 Elm St'),
( 'CA Sanjay Rao', 'sanjay.rao@example.com', 'caPassword9', 'Male', '909 Pine St'),
( 'CA Meera Nair', 'meera.nair@example.com', 'caPassword10', 'Female', '1010 Cedar St');

INSERT INTO userData ( userName, gender, email, userAddress, upassword) VALUES
( 'Amit Sharma', 'Male', 'amit.sharma@example.com', '123 Main St', 'password123');
INSERT INTO userData ( userName, gender, email, userAddress, upassword) VALUES
( 'Sita Patel', 'Female', 'sita.patel@example.com', '456 High St', 'password456');
INSERT INTO userData ( userName, gender, email, userAddress, upassword) VALUES
( 'Rajesh Kumar', 'Male', 'rajesh.kumar@example.com', '789 Low St', 'password789');
INSERT INTO userData ( userName, gender, email, userAddress, upassword) VALUES
( 'Anjali Verma', 'Female', 'anjali.verma@example.com', '321 Oak St', 'password321');
INSERT INTO userData ( userName, gender, email, userAddress, upassword) VALUES
( 'Vikash Singh', 'Male', 'vikash.singh@example.com', '654 Pine St', 'password654');

--drop table tableInfo;
INSERT INTO tableInfo (userId, caId, assessmentYear, age, totalAnnualIncome, totalDeductions, oldRegimeTax, newRegimeTax) VALUES
(100, 7, '2024-25', 'below60', 700000, 50000, 10000, 8000),
(101, 2, '2024-25', 'between60and79', 800000, 60000, 12000, 9500),
(102, 2, '2024-25', '80above', 500000, 30000, 7000, 5000),
(103, 4, '2024-25', 'below60', 1200000, 150000, 25000, 22000),
(104, 1, '2024-25', 'between60and79', 900000, 100000, 18000, 15000);

insert into userData(userName,gender,email,userAddress,upassword) VALUES ('Daya','Male','daya@example.com', '654 Main St', 'password754');
select * from userData
select * from charteredAccountant
select * from tableInfo





--Scaffold-DbContext "server=550FEA1D28E459A;database=TaxCalculationProjectDB;integrated security=true;TrustServerCertificate=true" -Provider Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models
