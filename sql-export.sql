-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 03, 2024 at 03:46 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `reminder-obat`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `coins_log`
--

CREATE TABLE `coins_log` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `coins` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coins_log`
--

INSERT INTO `coins_log` (`id`, `user_id`, `title`, `coins`, `created_at`, `updated_at`) VALUES
(1, 10, 'Mengundang teman', 100, '2024-10-29 07:03:21', '2024-10-29 07:03:21'),
(2, 10, 'Memulai masa pengobatan', 50, '2024-10-29 07:03:21', '2024-10-29 07:03:21'),
(3, 10, 'Mengonsumsi obat', 30, '2024-10-29 07:03:59', '2024-10-29 07:03:59'),
(13, 10, 'Mengonsumsi obat', 30, '2024-11-02 16:38:37', '2024-11-02 16:38:37');

-- --------------------------------------------------------

--
-- Table structure for table `email_verifications`
--

CREATE TABLE `email_verifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pin` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expired_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `email_verifications`
--

INSERT INTO `email_verifications` (`id`, `email`, `pin`, `expired_at`, `used_at`, `created_at`, `updated_at`) VALUES
(3, 'jagadraya377@gmail.com', '370833', '2024-10-27 10:10:36', '2024-10-27 10:10:36', '2024-10-27 10:01:36', '2024-10-27 10:10:36'),
(4, 'jagadraya377@gmail.com', '567147', '2024-10-27 11:05:05', NULL, '2024-10-27 10:05:05', '2024-10-27 10:05:05');

-- --------------------------------------------------------

--
-- Table structure for table `fcm_tokens`
--

CREATE TABLE `fcm_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `fcm_tokens`
--

INSERT INTO `fcm_tokens` (`id`, `user_id`, `token`, `created_at`, `updated_at`) VALUES
(26, 10, 'eNYaoZPSWRm-cDvrz5JYD6:APA91bG3EtZVWiAZEOhOWjgee7QMIESG8OMxagxFvcyZxch5hKTmXaBa7FZkjZe39I09xM3VpKmWj5OJg0XI2vKUT-d0JOqL_rVe4u6ZJ4PV5emt5W0X7BA', '2024-11-02 15:17:38', '2024-11-02 15:17:38');

-- --------------------------------------------------------

--
-- Table structure for table `forget_password`
--

CREATE TABLE `forget_password` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expired_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `forget_password`
--

INSERT INTO `forget_password` (`id`, `email`, `token`, `expired_at`, `used_at`, `created_at`, `updated_at`) VALUES
(1, 'jagadraya377@gmail.com', '5e2ba4af-9877-4fc5-8705-9e0215376f58', '2024-10-27 11:29:41', NULL, '2024-10-27 10:29:41', '2024-10-27 10:29:41'),
(2, 'jagadraya377@gmail.com', '529612e3-6706-4926-96e7-ebe4e2427ccf', '2024-10-27 10:42:15', '2024-10-27 10:42:15', '2024-10-27 10:29:59', '2024-10-27 10:42:15');

-- --------------------------------------------------------

--
-- Table structure for table `instansis`
--

CREATE TABLE `instansis` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `instansis`
--

INSERT INTO `instansis` (`id`, `name`, `address`, `created_at`, `updated_at`) VALUES
(1, 'RSUP Dr. Sardjito', 'Jl. Kesehatan No.1, Sekip, Sinduadi, Mlati, Sleman, Yogyakarta 55284', '2024-10-27 01:29:31', '2024-10-27 01:29:31'),
(2, 'RS Bethesda Yogyakarta', 'Jl. Jend. Sudirman No.70, Cokrodiningratan, Jetis, Yogyakarta 55224', '2024-10-27 01:29:31', '2024-10-27 01:29:31'),
(3, 'RS Panti Rapih', 'Jl. Cik Di Tiro No.30, Terban, Gondokusuman, Yogyakarta 55223', '2024-10-27 01:29:31', '2024-10-27 01:29:31'),
(4, 'RS PKU Muhammadiyah Yogyakarta', 'Jl. KH. Ahmad Dahlan No.20, Notoprajan, Ngampilan, Yogyakarta 55262', '2024-10-27 01:29:31', '2024-10-27 01:29:31'),
(5, 'RSUD Kota Yogyakarta', 'Jl. Ki Ageng Pemanahan No.1, Warungboto, Umbulharjo, Yogyakarta 55163', '2024-10-27 01:29:31', '2024-10-27 01:29:31'),
(6, 'RS Ludira Husada Tama', 'Jl. Wiratama No.5, Tegalrejo, Yogyakarta 55244', '2024-10-27 01:29:31', '2024-10-27 01:29:31'),
(7, 'RS Queen Latifa Yogyakarta', 'Jl. Wates Km. 3,5 No.99, Gamping, Sleman, Yogyakarta 55293', '2024-10-27 01:29:31', '2024-10-27 01:29:31'),
(8, 'RS Happy Land Medical Centre', 'Jl. Ipda Tut Harsono No.6, Muja Muju, Umbulharjo, Yogyakarta 55165', '2024-10-27 01:29:31', '2024-10-27 01:29:31'),
(9, 'RS Bhayangkara Yogyakarta', 'Jl. Raya Solo - Yogyakarta No.16, Kalasan, Sleman, Yogyakarta 55571', '2024-10-27 01:29:31', '2024-10-27 01:29:31'),
(10, 'RS Pratama Kota Yogyakarta', 'Jl. Gondosuli, Muja Muju, Umbulharjo, Yogyakarta 55165', '2024-10-27 01:29:31', '2024-10-27 01:29:31');

-- --------------------------------------------------------

--
-- Table structure for table `inventories`
--

CREATE TABLE `inventories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `item_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `equipped` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `inventories`
--

INSERT INTO `inventories` (`id`, `item_id`, `user_id`, `equipped`, `created_at`, `updated_at`) VALUES
(2, 3, 10, 0, '2024-10-30 09:21:53', '2024-11-01 11:23:36'),
(5, 4, 10, 0, '2024-10-30 09:24:44', '2024-11-01 11:55:33'),
(12, 5, 10, 0, '2024-11-02 11:40:41', '2024-11-02 16:39:32'),
(17, 11, 10, 1, '2024-11-02 16:39:19', '2024-11-02 16:39:32');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_type_id` bigint(20) UNSIGNED NOT NULL,
  `price` int(11) NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `name`, `item_type_id`, `price`, `description`, `image`, `created_at`, `updated_at`) VALUES
(3, 'Border 1', 1, 500, 'default border for testing purpose only', 'http://127.0.0.1:8000/storage/cosmetics/borders/border1.png', '2024-10-30 08:21:30', '2024-10-30 08:21:30'),
(4, 'Border 2', 1, 400, 'default border for testing purpose only', 'http://127.0.0.1:8000/storage/cosmetics/borders/border2.png', '2024-10-30 08:21:30', '2024-10-30 08:21:30'),
(5, 'Border 3', 1, 800, 'default border for testing purpose only', 'http://127.0.0.1:8000/storage/cosmetics/borders/border3.png', '2024-10-30 08:21:30', '2024-10-30 08:21:30'),
(6, 'Border 4', 1, 800, 'default border for testing purpose only', 'http://127.0.0.1:8000/storage/cosmetics/borders/border4.png', '2024-10-30 08:21:30', '2024-10-30 08:21:30'),
(7, 'Border 5', 1, 800, 'default border for testing purpose only', 'http://127.0.0.1:8000/storage/cosmetics/borders/border5.png', '2024-10-30 08:21:30', '2024-10-30 08:21:30'),
(8, 'Border 6', 1, 800, 'default border for testing purpose only', 'http://127.0.0.1:8000/storage/cosmetics/borders/border6.png', '2024-10-30 08:21:30', '2024-10-30 08:21:30'),
(9, 'Border 7', 1, 800, 'default border for testing purpose only', 'http://127.0.0.1:8000/storage/cosmetics/borders/border7.png', '2024-10-30 08:21:30', '2024-10-30 08:21:30'),
(10, 'Border 8', 1, 800, 'default border for testing purpose only', 'http://127.0.0.1:8000/storage/cosmetics/borders/border8.png', '2024-10-30 08:21:30', '2024-10-30 08:21:30'),
(11, 'Border 9', 1, 800, 'default border for testing purpose only', 'http://127.0.0.1:8000/storage/cosmetics/borders/border9.png', '2024-10-30 08:21:30', '2024-10-30 08:21:30'),
(12, 'Border 10', 1, 800, 'default border for testing purpose only', 'http://127.0.0.1:8000/storage/cosmetics/borders/border10.png', '2024-10-30 08:21:30', '2024-10-30 08:21:30'),
(13, 'Border 11', 1, 800, 'default border for testing purpose only', 'http://127.0.0.1:8000/storage/cosmetics/borders/border11.png', '2024-10-30 08:21:30', '2024-10-30 08:21:30'),
(14, 'Border 12', 1, 800, 'default border for testing purpose only', 'http://127.0.0.1:8000/storage/cosmetics/borders/border12.png', '2024-10-30 08:21:30', '2024-10-30 08:21:30');

-- --------------------------------------------------------

--
-- Table structure for table `item_types`
--

CREATE TABLE `item_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `item_types`
--

INSERT INTO `item_types` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Border', '2024-10-30 08:21:14', '2024-10-30 08:21:14'),
(2, 'Name Tag', '2024-10-30 08:42:32', '2024-10-30 08:42:32');

-- --------------------------------------------------------

--
-- Table structure for table `laporans`
--

CREATE TABLE `laporans` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `prescription_detail_id` bigint(20) UNSIGNED NOT NULL,
  `status` enum('sembuh','sakit') COLLATE utf8mb4_unicode_ci NOT NULL,
  `photo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `laporans`
--

INSERT INTO `laporans` (`id`, `prescription_detail_id`, `status`, `photo`, `description`, `created_at`, `updated_at`) VALUES
(14, 1, 'sakit', 'http://127.0.0.1:8000/storage/bukti/5C9BwOPF2ScmA9HIeEc0.png', NULL, '2024-11-02 07:47:30', '2024-11-02 07:47:30'),
(15, 2, 'sakit', 'http://127.0.0.1:8000/storage/bukti/Cu9elaV8wF7CsVtGi283.png', NULL, '2024-11-02 07:47:54', '2024-11-02 07:47:54'),
(16, 4, 'sakit', 'http://localhost:8000/storage/bukti/5AXZrGUbCdFpYDCoOGZs.jpg', NULL, '2024-11-02 12:42:19', '2024-11-02 12:42:19'),
(17, 3, 'sakit', 'http://localhost:8000/storage/bukti/tb5s8UPdblbjAW9tdrk9.png', NULL, '2024-11-02 12:44:09', '2024-11-02 12:44:09'),
(18, 2, 'sakit', 'http://127.0.0.1:8000/storage/bukti/tPQMgS3JCSTzp9RJ1vPL.jpg', NULL, '2024-11-02 16:38:37', '2024-11-02 16:38:37');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(26, '0001_01_01_000000_create_users_table', 1),
(27, '0001_01_01_000001_create_cache_table', 1),
(28, '2024_10_25_132818_create_instansis_table', 1),
(29, '2024_10_25_132948_create_nakes_table', 1),
(30, '2024_10_25_133049_create_prescriptions_table', 1),
(31, '2024_10_25_133210_create_prescription_details_table', 1),
(32, '2024_10_25_133409_create_laporans_table', 1),
(33, '2024_10_25_133613_create_item_types_table', 1),
(34, '2024_10_25_133635_create_items_table', 1),
(35, '2024_10_25_133740_create_inventories_table', 1),
(36, '2024_10_26_061838_add_diagnosis_column_to_prescriptions', 1),
(37, '2024_10_26_065742_add_bpjs_number_to_users', 1),
(38, '2024_10_27_082654_add_email_to_users', 1),
(42, '2024_10_27_091808_create_email_verifications_table', 2),
(43, '2024_10_27_094741_add_email_verified_at_to_users', 2),
(44, '2024_10_27_171639_create_forget_password_table', 3),
(45, '2024_10_27_180905_edit_column_prescription_details', 4),
(46, '2024_10_29_134231_create_coins_logs_table', 5),
(47, '2024_10_30_153822_add_icon_column_to_item_types', 6),
(48, '2024_10_30_144925_create_fcm_tokens_table', 7),
(49, '2024_11_02_143454_create_notification_table', 8);

-- --------------------------------------------------------

--
-- Table structure for table `nakes`
--

CREATE TABLE `nakes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `instansi_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `nakes`
--

INSERT INTO `nakes` (`id`, `user_id`, `instansi_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2024-10-27 01:29:31', '2024-10-27 01:29:31'),
(2, 2, 1, '2024-10-27 01:29:31', '2024-10-27 01:29:31');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `title`, `description`, `is_read`, `created_at`, `updated_at`) VALUES
(3, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 07:50:21', '2024-11-02 15:10:46'),
(4, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 08:04:41', '2024-11-02 15:10:46'),
(5, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 08:07:43', '2024-11-02 15:10:46'),
(6, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 08:17:25', '2024-11-02 15:10:46'),
(7, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 08:19:43', '2024-11-02 15:10:46'),
(8, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 11:16:14', '2024-11-02 15:10:46'),
(9, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 12:37:07', '2024-11-02 15:10:46'),
(10, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 12:38:33', '2024-11-02 15:10:46'),
(11, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 12:40:17', '2024-11-02 15:10:46'),
(12, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 12:44:20', '2024-11-02 15:10:46'),
(13, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 12:44:20', '2024-11-02 12:44:20'),
(14, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 12:44:28', '2024-11-02 15:10:46'),
(15, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 12:44:28', '2024-11-02 12:44:28'),
(16, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 12:46:01', '2024-11-02 15:10:46'),
(17, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 12:46:01', '2024-11-02 12:46:01'),
(18, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 12:46:05', '2024-11-02 15:10:46'),
(19, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 12:46:05', '2024-11-02 12:46:05'),
(20, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 12:46:36', '2024-11-02 15:10:46'),
(21, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 12:46:36', '2024-11-02 12:46:36'),
(22, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 12:46:48', '2024-11-02 15:10:46'),
(23, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 12:46:48', '2024-11-02 12:46:48'),
(24, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 12:47:50', '2024-11-02 15:10:46'),
(25, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 12:47:50', '2024-11-02 12:47:50'),
(26, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 12:50:39', '2024-11-02 15:10:46'),
(27, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 12:50:39', '2024-11-02 12:50:39'),
(28, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 12:56:27', '2024-11-02 15:10:46'),
(29, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 12:56:27', '2024-11-02 12:56:27'),
(30, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 12:56:43', '2024-11-02 15:10:46'),
(31, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 12:56:43', '2024-11-02 12:56:43'),
(32, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 12:57:27', '2024-11-02 15:10:46'),
(33, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 12:57:27', '2024-11-02 12:57:27'),
(34, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 12:57:31', '2024-11-02 15:10:46'),
(35, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 12:57:31', '2024-11-02 12:57:31'),
(36, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 13:00:21', '2024-11-02 15:10:46'),
(37, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 13:00:21', '2024-11-02 13:00:21'),
(38, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 13:00:28', '2024-11-02 15:10:46'),
(39, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 13:00:28', '2024-11-02 13:00:28'),
(40, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 13:00:30', '2024-11-02 15:10:46'),
(41, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 13:00:30', '2024-11-02 13:00:30'),
(42, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 13:00:59', '2024-11-02 15:10:46'),
(43, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 13:00:59', '2024-11-02 13:00:59'),
(44, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 13:01:15', '2024-11-02 15:10:46'),
(45, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 13:01:15', '2024-11-02 13:01:15'),
(46, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 13:01:18', '2024-11-02 15:10:46'),
(47, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 13:01:18', '2024-11-02 13:01:18'),
(48, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 13:01:51', '2024-11-02 15:10:46'),
(49, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 13:01:51', '2024-11-02 13:01:51'),
(50, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 13:03:34', '2024-11-02 15:10:46'),
(51, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 13:03:34', '2024-11-02 13:03:34'),
(52, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 13:33:55', '2024-11-02 15:10:46'),
(53, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 13:33:55', '2024-11-02 13:33:55'),
(54, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 13:34:55', '2024-11-02 15:10:46'),
(55, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 13:34:55', '2024-11-02 13:34:55'),
(56, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 13:40:05', '2024-11-02 15:10:46'),
(57, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 13:40:05', '2024-11-02 13:40:05'),
(58, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 13:40:11', '2024-11-02 15:10:46'),
(59, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 13:40:11', '2024-11-02 13:40:11'),
(60, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 13:41:21', '2024-11-02 15:10:46'),
(61, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 13:41:21', '2024-11-02 13:41:21'),
(62, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 13:41:24', '2024-11-02 15:10:46'),
(63, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 13:41:24', '2024-11-02 13:41:24'),
(64, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 13:41:27', '2024-11-02 15:10:46'),
(65, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 13:41:27', '2024-11-02 13:41:27'),
(66, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 13:41:50', '2024-11-02 15:10:46'),
(67, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 13:41:50', '2024-11-02 13:41:50'),
(68, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 13:43:29', '2024-11-02 15:10:46'),
(69, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 13:43:29', '2024-11-02 13:43:29'),
(70, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 13:44:03', '2024-11-02 15:10:46'),
(71, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 13:44:03', '2024-11-02 13:44:03'),
(72, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 13:45:54', '2024-11-02 15:10:46'),
(73, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 13:45:54', '2024-11-02 13:45:54'),
(74, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 13:45:58', '2024-11-02 15:10:46'),
(75, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 13:45:58', '2024-11-02 13:45:58'),
(76, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 13:46:05', '2024-11-02 15:10:46'),
(77, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 13:46:05', '2024-11-02 13:46:05'),
(78, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 13:49:42', '2024-11-02 15:10:46'),
(79, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 13:49:42', '2024-11-02 13:49:42'),
(80, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 14:12:01', '2024-11-02 15:10:46'),
(81, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 14:12:01', '2024-11-02 14:12:01'),
(82, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 14:12:44', '2024-11-02 15:10:46'),
(83, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 14:12:44', '2024-11-02 14:12:44'),
(84, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 14:12:52', '2024-11-02 15:10:46'),
(85, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 14:12:52', '2024-11-02 14:12:52'),
(86, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 14:12:59', '2024-11-02 15:10:46'),
(87, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 14:12:59', '2024-11-02 14:12:59'),
(88, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 14:13:06', '2024-11-02 15:10:46'),
(89, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 14:13:06', '2024-11-02 14:13:06'),
(90, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 14:14:01', '2024-11-02 15:10:46'),
(91, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 14:14:01', '2024-11-02 14:14:01'),
(92, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 14:24:08', '2024-11-02 15:10:46'),
(93, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 14:24:08', '2024-11-02 14:24:08'),
(94, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 14:24:45', '2024-11-02 15:10:46'),
(95, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 14:24:45', '2024-11-02 14:24:45'),
(96, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 14:26:19', '2024-11-02 15:10:46'),
(97, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 14:26:19', '2024-11-02 14:26:19'),
(98, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 14:30:49', '2024-11-02 15:10:46'),
(99, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 14:30:49', '2024-11-02 14:30:49'),
(100, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 14:32:30', '2024-11-02 15:10:46'),
(101, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 14:32:30', '2024-11-02 14:32:30'),
(102, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 15:09:20', '2024-11-02 15:10:46'),
(103, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 15:09:20', '2024-11-02 15:09:20'),
(104, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 15:09:49', '2024-11-02 15:10:46'),
(105, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 15:09:49', '2024-11-02 15:09:49'),
(106, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 1, '2024-11-02 15:09:56', '2024-11-02 15:10:46'),
(107, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 15:09:56', '2024-11-02 15:09:56'),
(108, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 15:11:32', '2024-11-02 15:11:32'),
(109, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 15:11:32', '2024-11-02 15:11:32'),
(110, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 15:12:23', '2024-11-02 15:12:23'),
(111, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 15:12:23', '2024-11-02 15:12:23'),
(112, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 15:15:54', '2024-11-02 15:15:54'),
(113, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 15:15:54', '2024-11-02 15:15:54'),
(114, 10, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 15:17:34', '2024-11-02 15:17:34'),
(115, 3, 'Pengingat konsumsi obat', 'Halo! Saatnya minum obat ya, biar cepat pulih 😊', 0, '2024-11-02 15:17:34', '2024-11-02 15:17:34');

-- --------------------------------------------------------

--
-- Table structure for table `prescriptions`
--

CREATE TABLE `prescriptions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `pasien_id` bigint(20) UNSIGNED NOT NULL,
  `nakes_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `diagnosis` text COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `prescriptions`
--

INSERT INTO `prescriptions` (`id`, `pasien_id`, `nakes_id`, `created_at`, `updated_at`, `diagnosis`) VALUES
(1, 10, 1, '2024-10-28 12:16:43', '2024-10-28 12:16:43', 'Demam disertai batuk'),
(4, 3, 1, '2024-10-28 12:16:43', '2024-10-28 12:16:43', 'Demam disertai batuk');

-- --------------------------------------------------------

--
-- Table structure for table `prescription_details`
--

CREATE TABLE `prescription_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `prescription_id` bigint(20) UNSIGNED NOT NULL,
  `medicine` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `dosage` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `aturan_konsumsi` int(11) NOT NULL DEFAULT 1,
  `total_konsumsi` int(11) NOT NULL DEFAULT 1,
  `instructions` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('wajib habis','conditional') COLLATE utf8mb4_unicode_ci NOT NULL,
  `time_before_after_meal` enum('before','after','anytime') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `prescription_details`
--

INSERT INTO `prescription_details` (`id`, `prescription_id`, `medicine`, `quantity`, `dosage`, `aturan_konsumsi`, `total_konsumsi`, `instructions`, `status`, `time_before_after_meal`, `created_at`, `updated_at`) VALUES
(1, 1, 'Paracetamol', 10, '1 tablet', 2, 10, 'test', 'conditional', 'after', '2024-10-28 12:17:16', '2024-11-01 12:51:23'),
(2, 1, 'Amoxicillin', 12, '1 tablet', 2, 10, 'test', 'wajib habis', 'before', '2024-10-28 12:17:16', '2024-11-01 12:51:23'),
(3, 4, 'Paracetamol', 10, '1 tablet', 2, 10, 'test', 'conditional', 'after', '2024-10-28 12:17:16', '2024-11-01 12:51:23'),
(4, 4, 'Amoxicillin', 12, '1 tablet', 2, 10, 'test', 'wajib habis', 'before', '2024-10-28 12:17:16', '2024-11-01 12:51:23');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('mWgP2lqFlItJPY2PrNqzZ8HVqmZE8A1nxvkPz0GI', 10, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:132.0) Gecko/20100101 Firefox/132.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiZDQxMG8xcEoyckRmTXZkNXJUUUhQSTl2VUd5MXp0SEtkWTlocTllbiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zdG9yZSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjEwO30=', 1730565615);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `gender` enum('Pria','Wanita') COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('nakes','pasien','admin') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pasien',
  `coins` int(11) NOT NULL DEFAULT 0,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `bpjs_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `email`, `password`, `address`, `phone`, `birth_date`, `gender`, `avatar`, `role`, `coins`, `remember_token`, `email_verified_at`, `created_at`, `updated_at`, `bpjs_number`) VALUES
(1, 'Naufal Hady AJ', 'naufaljr', 'naufaljr@gmail.com', '$2y$12$m.lPeDhfsqUiZAa.l/t5WebtOLsIuruTzAc4o6w5d.VDyq/.UPZuO', 'Jl. Kesehatan No.1, Sekip, Sinduadi, Mlati, Sleman, Yogyakarta 55284', '081234567890', '1990-01-01', 'Pria', NULL, 'nakes', 0, NULL, '2024-11-01 12:20:07', '2024-10-27 01:29:31', '2024-10-27 01:29:31', NULL),
(2, 'Rizky Kurniawan', 'rizkykurniawan', 'rizkykurniawan@gmail.com', '$2y$12$XuIL4cFRs52LgDmV6n3GQeOuQ9kblr6jqLZQnfuUbKqWH0DfftduC', 'Jl. Kesehatan No.1, Sekip, Sinduadi, Mlati, Sleman, Yogyakarta 55284', '081234567890', '1990-01-01', 'Pria', NULL, 'nakes', 0, NULL, '2024-11-01 12:20:10', '2024-10-27 01:29:31', '2024-10-27 01:29:31', NULL),
(3, 'Rafino Ramdhaniar PP', 'rafino', 'rafino@gmail.com', '$2y$12$eKDnHnJ6t/RfGjo0y1suO.PDaycVWiWACZB54mcZprICQ.MBOQspO', 'Jl. Kesehatan No.1, Sekip, Sinduadi, Mlati, Sleman, Yogyakarta 55284', '081234567890', '1990-01-01', 'Pria', 'https://models.readyplayer.me/6723575dd330fdf3531406e4.png', 'pasien', 60, NULL, '2024-10-31 10:07:53', '2024-10-27 01:29:31', '2024-11-02 12:44:09', '262220859298'),
(10, 'Jagad Raya', 'zenthic', 'jagadraya377@gmail.com', '$2y$12$yPNoLR.Omj3ck3VMWqxDt.y3a3V5MBqskhVDcZa/C94FmaDvAw69a', 'Prambanan', '85155347714', '2003-06-12', 'Pria', 'https://models.readyplayer.me/67265548417e27813e1d61dc.png', 'pasien', 4230, 'pxDa2jA44R9qRqkTSOylD4dNhnJHL7aYkRVsgH1DiMpYTDOlpTLt3UCb16wm', '2024-10-27 10:45:33', '2024-10-27 10:05:05', '2024-11-02 16:39:19', '56532323');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `coins_log`
--
ALTER TABLE `coins_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `coins_log_user_id_foreign` (`user_id`);

--
-- Indexes for table `email_verifications`
--
ALTER TABLE `email_verifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fcm_tokens`
--
ALTER TABLE `fcm_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `fcm_tokens_token_unique` (`token`),
  ADD KEY `fcm_tokens_user_id_foreign` (`user_id`);

--
-- Indexes for table `forget_password`
--
ALTER TABLE `forget_password`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `instansis`
--
ALTER TABLE `instansis`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventories`
--
ALTER TABLE `inventories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `inventories_item_id_foreign` (`item_id`),
  ADD KEY `inventories_user_id_foreign` (`user_id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `items_item_type_id_foreign` (`item_type_id`);

--
-- Indexes for table `item_types`
--
ALTER TABLE `item_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `laporans`
--
ALTER TABLE `laporans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `laporans_prescription_detail_id_foreign` (`prescription_detail_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nakes`
--
ALTER TABLE `nakes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nakes_user_id_foreign` (`user_id`),
  ADD KEY `nakes_instansi_id_foreign` (`instansi_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_user_id_foreign` (`user_id`);

--
-- Indexes for table `prescriptions`
--
ALTER TABLE `prescriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `prescriptions_pasien_id_foreign` (`pasien_id`),
  ADD KEY `prescriptions_nakes_id_foreign` (`nakes_id`);

--
-- Indexes for table `prescription_details`
--
ALTER TABLE `prescription_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `prescription_details_prescription_id_foreign` (`prescription_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username_unique` (`username`),
  ADD UNIQUE KEY `users_bpjs_number_unique` (`bpjs_number`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `coins_log`
--
ALTER TABLE `coins_log`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `email_verifications`
--
ALTER TABLE `email_verifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `fcm_tokens`
--
ALTER TABLE `fcm_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `forget_password`
--
ALTER TABLE `forget_password`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `instansis`
--
ALTER TABLE `instansis`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `inventories`
--
ALTER TABLE `inventories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `item_types`
--
ALTER TABLE `item_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `laporans`
--
ALTER TABLE `laporans`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `nakes`
--
ALTER TABLE `nakes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- AUTO_INCREMENT for table `prescriptions`
--
ALTER TABLE `prescriptions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `prescription_details`
--
ALTER TABLE `prescription_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `coins_log`
--
ALTER TABLE `coins_log`
  ADD CONSTRAINT `coins_log_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `fcm_tokens`
--
ALTER TABLE `fcm_tokens`
  ADD CONSTRAINT `fcm_tokens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `inventories`
--
ALTER TABLE `inventories`
  ADD CONSTRAINT `inventories_item_id_foreign` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `inventories_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `items_item_type_id_foreign` FOREIGN KEY (`item_type_id`) REFERENCES `item_types` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `laporans`
--
ALTER TABLE `laporans`
  ADD CONSTRAINT `laporans_prescription_detail_id_foreign` FOREIGN KEY (`prescription_detail_id`) REFERENCES `prescription_details` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `nakes`
--
ALTER TABLE `nakes`
  ADD CONSTRAINT `nakes_instansi_id_foreign` FOREIGN KEY (`instansi_id`) REFERENCES `instansis` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `nakes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `prescriptions`
--
ALTER TABLE `prescriptions`
  ADD CONSTRAINT `prescriptions_nakes_id_foreign` FOREIGN KEY (`nakes_id`) REFERENCES `nakes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `prescriptions_pasien_id_foreign` FOREIGN KEY (`pasien_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `prescription_details`
--
ALTER TABLE `prescription_details`
  ADD CONSTRAINT `prescription_details_prescription_id_foreign` FOREIGN KEY (`prescription_id`) REFERENCES `prescriptions` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
