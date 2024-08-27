CREATE DATABASE IF NOT EXISTS `shopping_db`;

USE `shopping_db`;

DROP TABLE IF EXISTS `reviews`;

CREATE TABLE `reviews` (
    `reviewid` INT AUTO_INCREMENT NOT NULL,
    `productid` INT NOT NULL,
    `userid` INT NOT NULL,
    `starrating` INT NOT NULL,
    `reviewtitle` VARCHAR(40) COLLATE utf8mb4_unicode_ci NOT NULL,
    `reviewtext` VARCHAR(500) COLLATE utf8mb4_unicode_ci NOT NULL,
    `date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`reviewid`),
    KEY `productid` (`productid`),
    KEY `userid` (`userid`),
    CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`productid`) REFERENCES `product` (`productid`),
    CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

UNLOCK TABLES;