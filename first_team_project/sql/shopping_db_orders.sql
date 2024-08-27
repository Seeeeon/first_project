CREATE DATABASE IF NOT EXISTS `shopping_db`;
USE `shopping_db`;

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
   `orderid` int AUTO_INCREMENT NOT NULL,
   `ordernumber` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
   `userid` int DEFAULT NULL,
   `productcode` int NOT NULL,
   `status` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT '주문완료',
   `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
   `ordername` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
   `postcode` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
   `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
   `detailedaddress` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
   `phonenumber` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
   `reqmessage` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
   `count` int NOT NULL,
   `totalcount` int NOT NULL,
   `totalamount` int NOT NULL,
   `payment` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
   `paymentamount` int DEFAULT '0',
   `imageurl` varchar(600) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
   `isReviewed` BOOLEAN DEFAULT FALSE,
   PRIMARY KEY (`orderid`),
   KEY `userid` (`userid`),
   CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

UNLOCK TABLES;