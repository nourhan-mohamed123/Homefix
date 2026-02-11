-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 11, 2026 at 01:25 PM
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
CREATE DATABASE IF NOT EXISTS `mslha` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `mslha`;

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `user_delete` (IN `p_user_id` INT)  BEGIN
    DELETE FROM users
    WHERE user_id = p_user_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `user_login` (IN `p_email` VARCHAR(100))  BEGIN
    SELECT user_id, full_name, email, password, account_type
    FROM users
    WHERE email = p_email;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `user_search` (IN `p_search_term` VARCHAR(100))  BEGIN
    SELECT user_id, full_name, email, city, address
    FROM users
    WHERE full_name LIKE CONCAT('%', p_search_term, '%');
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `user_signup` (IN `u_full_name` VARCHAR(100), IN `u_email` VARCHAR(100), IN `u_password` VARCHAR(100), IN `u_city` VARCHAR(100), IN `u_account_type` VARCHAR(10), IN `u_address` TEXT)  BEGIN
    INSERT INTO users (
        full_name, email, password, city, account_type, address
    ) VALUES (
        u_full_name, 
        u_email, 
        u_password, 
        u_city, 
        u_account_type, 
        IF(u_address IS NULL OR u_address = '', NULL, u_address)
    );
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `user_update` (IN `p_full_name` VARCHAR(50), IN `p_email` VARCHAR(100), IN `p_password` VARCHAR(255), IN `p_city` VARCHAR(100), IN `p_address` TEXT)  BEGIN
    UPDATE users
    SET 
        first_name = COALESCE(p_first_name, first_name),
        last_name = COALESCE(p_last_name, last_name),
        email = COALESCE(p_email, email),
        password = COALESCE(p_password, password),
        city = COALESCE(p_city, city),
        address = COALESCE(p_address, address)
    WHERE user_id = p_user_id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--
-- Creation: Feb 11, 2026 at 11:04 AM
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` text,
  `city` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `full_name` varchar(100) NOT NULL,
  `account_type` enum('customer','provider') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `password`, `email`, `address`, `city`, `created_at`, `full_name`, `account_type`) VALUES
(1, '12323434545', 'keroloshanna953@gmail.com', NULL, 'Assiut', '2026-02-11 12:11:33', 'Kerolos Hanna', 'customer'),
(2, '12323434545', 'kerolosahdy199@gmail.com', NULL, 'Cairo', '2026-02-11 12:14:42', 'Kerolos Ahdy', 'provider');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
