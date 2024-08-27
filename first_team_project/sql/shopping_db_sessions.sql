CREATE DATABASE  IF NOT EXISTS `shopping_db` ;
USE `shopping_db`;

DROP TABLE IF EXISTS `sessions`;

CREATE TABLE `sessions` (
  `sessionid` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`sessionid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `sessions` WRITE;

UNLOCK TABLES;