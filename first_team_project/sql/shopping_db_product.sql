CREATE DATABASE IF NOT EXISTS `shopping_db`;

USE `shopping_db`;

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
    `productid` INT AUTO_INCREMENT NOT NULL,
    `title` text COLLATE utf8mb4_unicode_ci NOT NULL,
    `price` INT NOT NULL,
    `thumbnail` varchar(2000) COLLATE utf8mb4_unicode_ci NOT NULL,
    `description` varchar(200) COLLATE utf8mb4_unicode_ci,
    `category` INT NOT NULL,
    `starrating` INT NOT NULL,
    `detailimage` varchar(2000) COLLATE utf8mb4_unicode_ci NOT NULL,
    `date` datetime NOT NULL,
    primary key (`productid`),
    KEY `productid` (`productid`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
    `product`
VALUES (
        1,
        '멀티 비타민',
        18000,
        'http://localhost:8000/m_vitamin_00_00.png',
        '신체에 필요한 미량영양소를 제공하여 건강 증진
건강한 면역체계 촉진
건강한 모발과 피부뿐만 아니라 눈 건강에도 도움
기력 수준과 행복감 증가 및 스트레스 저하
특정 비타민과 무기질의 결핍으로 인해 발생하거나 악화된 질병 치료를 돕습니다.',
        1,
        3,
        'http://localhost:8000/m_vitamin_00_01.png',
        '2024-05-15 13:38:31'
    ),
    (
        2,
        '비타민 D',
        15000,
        'http://localhost:8000/vitamin_d_01_00.png',
        '골다공증 발생위험을 감소시키며 캄슘과 인 흡수를 조절하여 뼈의 형성과 유지에 도움을 줍니다. ',
        2,
        4,
        'http://localhost:8000/vitamin_d_01_01.jpg',
        '2024-05-15 13:41:00'
    ),
    (
        3,
        '오메가 3',
        23000,
        'http://localhost:8000/omega3_02_00.png',
        '오메가3는 불포화지방산으로 우리 몸에 꼭 필요한 필수지방산이지만 체내에서 합성되지 않아 식품 또는 보충제로 섭취해야 합니다. 
또한 혈중 중성지방을 감소시키며 혈전 생성과 죽상경화증을 억제하여 심혈관질환 예방에 도움이 됩니다. 
식약처에서 혈중 중성지질, 혈행개선, 기억력, 건조한 눈을 개선하여 눈 건강에 도움을 줄 수 있음이 인정되었습니다.',
        3,
        4,
        'http://localhost:8000/omega3_02_01.png',
        '2024-05-15 13:38:31'
    ),
    (
        4,
        '마그네슘 and 칼슘',
        22000,
        'http://localhost:8000/mag_cal_03_00.jpg',
        '뼈와 치아가 형성될 때 마그네슘이 칼슘을 돕기 때문에 반드시 필요합니다. 
또한 마그네슘이 세포막 안정 및 신경자극 전달을 통해 지방, 단백질, 핵산의 합성에 관여합니다.',
        4,
        5,
        'http://localhost:8000/mag_cal_03_01.jpg',
        '2024-05-15 13:38:31'
    ),
    (
        5,
        '비타민 C',
        23000,
        'http://localhost:8000/vitamin_c_04_00.png',
        '구내와 같은 점막 피부 회복에 도움
콜라겐 합성에 도움
항산화제로서 비타민 C는 체내의 활성산소가 세포 면역력을 향상시키는데 도움이 됩니다. ',
        5,
        3,
        'http://localhost:8000/vitamin_c_04_01.png',
        '2024-05-15 13:38:31'
    ),
    (
        6,
        '프로바이오틱스',
        25000,
        'http://localhost:8000/probio_05_00.png',
        '장 건강을 위한 특별한 13종 배합 유산균을 100억 CFU 함유하고 있습니다. 
복용자의 장 건강을 지켜주고 배변활동이 원활하도록 돕습니다.',
        6,
        5,
        'http://localhost:8000/probio_05_01.jpg',
        '2024-05-15 13:38:31'
    ),
    (
        7,
        'BB 멀티 비타민',
        30000,
        'http://localhost:8000/m_vitamin_00_02.png',
        '하루 한알로 채우는 비타민 B1, B2, B6, B12, 를 포함한 20가지 필수 영양소',
        1,
        4,
        'http://localhost:8000/m_vitamin_00_03.jpg',
        '2024-06-25 00:04:00'
    ),
    (
        8,
        'rTG 오메가',
        25000,
        'http://localhost:8000/omega3_02_02.png',
        '마리골드에서 추출한 루테인과 비타민 B1, B2, rTG오메가 3 함유로 눈건강, 혈행, 면역력에 도움을 줄 수 있습니다.',
        3,
        4,
        'http://localhost:8000/omega3_02_03.jpg',
        '2024-06-25 00:04:00'
    );

UNLOCK TABLES;