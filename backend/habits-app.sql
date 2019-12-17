-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 17 Gru 2019, 05:56
-- Wersja serwera: 10.3.16-MariaDB
-- Wersja PHP: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `habits-app`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `habits`
--

CREATE TABLE `habits` (
  `id` int(11) NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Zrzut danych tabeli `habits`
--

INSERT INTO `habits` (`id`, `content`) VALUES
(1, 'first'),
(2, 'second');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `log`
--

CREATE TABLE `log` (
  `id` int(11) NOT NULL,
  `habitId` int(11) NOT NULL,
  `date` date NOT NULL,
  `checkedAtTime` datetime NOT NULL DEFAULT current_timestamp(),
  `checkType` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Zrzut danych tabeli `log`
--

INSERT INTO `log` (`id`, `habitId`, `date`, `checkedAtTime`, `checkType`) VALUES
(1, 1, '0000-00-00', '2019-12-15 10:20:31', 1),
(2, 1, '0000-00-00', '2019-12-15 10:20:38', 1),
(3, 1, '0000-00-00', '2019-12-15 18:49:39', 1),
(4, 1, '0000-00-00', '2019-12-15 18:51:16', 1),
(5, 2, '0000-00-00', '2019-12-16 19:21:54', 1),
(6, 1, '0000-00-00', '2019-12-16 19:50:53', 1),
(7, 2, '0000-00-00', '2019-12-16 19:51:22', 1),
(8, 2, '2019-12-17', '2019-12-16 19:52:06', 1),
(9, 2, '2019-12-16', '2019-12-16 19:52:47', 1);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `habits`
--
ALTER TABLE `habits`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `habits`
--
ALTER TABLE `habits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT dla tabeli `log`
--
ALTER TABLE `log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
