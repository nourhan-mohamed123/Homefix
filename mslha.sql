-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 15, 2026 at 12:27 PM
-- Server version: 8.0.17
-- PHP Version: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mslha`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_category` (IN `p_name` VARCHAR(50), IN `p_color` VARCHAR(50), IN `p_status` ENUM('Active','inActive'), IN `p_image` VARCHAR(100), IN `p_description` TEXT)  BEGIN 
INSERT INTO categories(name, color, status, image, description) 
VALUES(p_name, p_color, p_status, p_image, p_description);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_category` (IN `p_id` INT)  BEGIN
   
    IF EXISTS (SELECT 1 FROM sub_categories WHERE category_id = p_id) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot delete category: Sub-Categories exist';
    ELSE
        DELETE FROM categories
        WHERE category_id = p_id;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_categories` ()  BEGIN
    SELECT name, color, image
    FROM categories
    WHERE status = 'Active'
    ORDER BY name;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_category_by_name` (IN `p_id` INT)  BEGIN
    SELECT name, color, image, description
    FROM categories
    WHERE category_id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_category` (IN `p_id` INT, IN `p_name` VARCHAR(50), IN `p_color` VARCHAR(50), IN `p_status` ENUM('Active','Inactive'), IN `p_image` VARCHAR(100), IN `p_description` TEXT)  BEGIN
	IF EXISTS(SELECT 1 FROM categories WHERE category_id = p_id) THEN
    	
        UPDATE categories
    SET
        name = COALESCE(p_name, name),
        color = COALESCE(p_color, color),
        status = COALESCE(p_status, status),
        image = COALESCE(p_image, image),
        description = COALESCE(p_description, description)
    WHERE id = p_id;
    
    ELSE
    	SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Category not found';
    END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `user_delete` (IN `p_user_id` INT)  BEGIN
	DELETE FROM user_cities
    WHERE user_id = p_user_id;
    UPDATE users 
    SET users.isActive = 0
    WHERE users.user_id = p_user_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `user_login` (IN `p_email` VARCHAR(100))  BEGIN
    SELECT 
        u.user_id,
        u.first_name,
        u.last_name,
        u.email,
        u.password,
        u.address,
        IF(COUNT(c.city_id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(c.name)) AS cities
    FROM users u
    LEFT JOIN user_cities uc ON u.user_id = uc.user_id
    LEFT JOIN cities c ON uc.city_id = c.city_id
    WHERE u.email = p_email AND isActive = 1
    GROUP BY u.user_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `user_search` (IN `u_id` INT)  BEGIN
    SELECT 
    u.first_name, 
    u.last_name, 
    u.email, 
    u.address,
     IF(COUNT(c.city_id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(c.name)) AS cities
    FROM users AS u
    LEFT JOIN user_cities AS uc ON u_id = uc.user_id
    LEFT JOIN cities AS c ON c.city_id = uc.city_id
    WHERE u.user_id = u_id AND isActive = 1
    GROUP BY u.user_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `user_signup` (IN `u_first_name` VARCHAR(100), IN `u_last_name` VARCHAR(100), IN `u_email` VARCHAR(100), IN `u_password` VARCHAR(255), IN `u_account_type` ENUM('customer','provider','admin'), IN `u_address` VARCHAR(255), IN `u_cities` JSON)  BEGIN
    DECLARE new_user_id BIGINT;

    INSERT INTO users (first_name, last_name, email, password, account_type, address)
    VALUES (u_first_name, u_last_name, u_email, u_password, u_account_type,
            IF(u_address IS NULL OR u_address = '', NULL, u_address));

    SET new_user_id = LAST_INSERT_ID();

    IF u_cities IS NOT NULL AND JSON_LENGTH(u_cities) > 0 THEN
        INSERT INTO user_cities(user_id, city_id)
        SELECT new_user_id, c.city_id
        FROM JSON_TABLE(u_cities, '$[*]' COLUMNS(city_name VARCHAR(100) PATH '$')) AS jt
        JOIN cities c ON c.name COLLATE utf8mb4_0900_ai_ci = jt.city_name;
    END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `user_update` (IN `p_user_id` INT, IN `p_first_name` VARCHAR(100), IN `p_last_name` VARCHAR(100), IN `p_email` VARCHAR(100), IN `p_password` VARCHAR(255), IN `p_address` VARCHAR(255), IN `p_cities` TEXT)  BEGIN
       DECLARE cities_json JSON;
       
    IF p_cities IS NULL OR TRIM(p_cities) = '' THEN
        SET cities_json = NULL;
    ELSE
        SET cities_json = CAST(p_cities AS JSON);
    END IF;

    UPDATE users
    SET 
        first_name = COALESCE(p_first_name, first_name),
        last_name  = COALESCE(p_last_name, last_name),
        email      = COALESCE(p_email, email),
        password   = COALESCE(p_password, password),
        address    = COALESCE(p_address, address)
    WHERE user_id = p_user_id;

    IF cities_json IS NOT NULL AND JSON_LENGTH(cities_json) > 0 THEN
        DELETE FROM user_cities WHERE user_id = p_user_id;

        INSERT INTO user_cities(user_id, city_id)
        SELECT p_user_id, c.city_id
        FROM JSON_TABLE(cities_json, '$[*]' COLUMNS(city_name VARCHAR(100) PATH '$')) AS jt
        JOIN cities c 
          ON c.name COLLATE utf8mb4_unicode_ci = jt.city_name COLLATE utf8mb4_unicode_ci;
    END IF;

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `color` varchar(50) DEFAULT NULL,
  `status` enum('Avtive','inActive') NOT NULL,
  `image` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `city_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`city_id`, `name`, `country`, `created_at`) VALUES
(1, 'Assiut', 'Egypt', '2026-02-15 10:54:53'),
(2, 'Cairo', 'Egypt', '2026-02-15 10:54:53'),
(3, 'Minya', 'Egypt', '2026-02-15 10:54:53');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `service_id` int(11) NOT NULL,
  `name` varchar(225) NOT NULL,
  `category_id` int(11) NOT NULL,
  `sub_category` int(11) NOT NULL,
  `commission_type` enum('percentage','fixed') NOT NULL,
  `commission_value` decimal(10,2) NOT NULL,
  `status` enum('Active','inActive') DEFAULT 'Active',
  `discount` decimal(5,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `service_pricing`
--

CREATE TABLE `service_pricing` (
  `id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `pricing_type` enum('hourly','fixed','free') NOT NULL,
  `price` decimal(10,2) DEFAULT '0.00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sub_categories`
--

CREATE TABLE `sub_categories` (
  `sub_category_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `category_id` int(11) NOT NULL,
  `status` enum('Active','inActive') NOT NULL,
  `descrition` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `account_type` enum('customer','provider','admin') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `password`, `email`, `address`, `created_at`, `account_type`, `isActive`, `first_name`, `last_name`) VALUES
(9, '234567', 'kero@gmail.com', 'Ballout', '2026-02-15 12:11:05', 'provider', 0, 'Kyrillos', 'Hanna'),
(10, 'we34453532', 'hady@gmail.com', 'Ballout', '2026-02-15 12:22:32', 'customer', 1, 'Kyrillos', 'Ahdy');

-- --------------------------------------------------------

--
-- Table structure for table `user_cities`
--

CREATE TABLE `user_cities` (
  `user_id` int(11) NOT NULL,
  `city_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_cities`
--

INSERT INTO `user_cities` (`user_id`, `city_id`, `created_at`) VALUES
(10, 1, '2026-02-15 12:22:32'),
(10, 2, '2026-02-15 12:22:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `unique_category_name` (`name`),
  ADD UNIQUE KEY `color` (`color`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`city_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`service_id`);

--
-- Indexes for table `service_pricing`
--
ALTER TABLE `service_pricing`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_id` (`service_id`);

--
-- Indexes for table `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD PRIMARY KEY (`sub_category_id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_cities`
--
ALTER TABLE `user_cities`
  ADD PRIMARY KEY (`user_id`,`city_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `service_pricing`
--
ALTER TABLE `service_pricing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sub_categories`
--
ALTER TABLE `sub_categories`
  MODIFY `sub_category_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `service_pricing`
--
ALTER TABLE `service_pricing`
  ADD CONSTRAINT `service_pricing_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`) ON DELETE CASCADE;

--
-- Constraints for table `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD CONSTRAINT `sub_categories_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
