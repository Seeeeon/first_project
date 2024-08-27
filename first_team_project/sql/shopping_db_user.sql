CREATE DATABASE IF NOT EXISTS `shopping_db`;
USE `shopping_db`;

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
	`userid` INT NOT NULL,
	`username` VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `email` VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
	`password` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
	`address` VARCHAR(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
	`phonenumber` VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `usertype` VARCHAR(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `terms` VARCHAR(20) NOT NULL,
	PRIMARY KEY (`userid`),
    KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

UNLOCK TABLES;
