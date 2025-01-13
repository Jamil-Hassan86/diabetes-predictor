CREATE DATABASE IF NOT EXISTS diabetes_db;

USE DATABASE diabetes_db;

CREATE TABLE IF NOT EXISTS users(
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    hashedPassword VARCHAR(255) NOT NULL,
    ethnicity VARCHAR(50) NOT NULL    
);


CREATE TABLE IF NOT EXISTS predictions(
    predictions_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    risk_score VARCHAR(50) NOT NULL,
    health_data JSON NOT NULL,
    prediction_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(user_id)
)

