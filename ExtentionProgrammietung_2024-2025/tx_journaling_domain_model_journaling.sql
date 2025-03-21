-- phpMyAdmin SQL Dump
-- version 4.9.6
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 14, 2025 at 06:49 PM
-- Server version: 10.3.39-MariaDB-0+deb10u2
-- PHP Version: 7.3.31-1~deb10u7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `typo3_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `tx_journaling_domain_model_journaling`
--

CREATE TABLE `tx_journaling_domain_model_journaling` (
  `uid` int(10) UNSIGNED NOT NULL,
  `pid` int(11) NOT NULL DEFAULT 0,
  `tstamp` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `crdate` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `deleted` smallint(5) UNSIGNED NOT NULL DEFAULT 0,
  `hidden` smallint(5) UNSIGNED NOT NULL DEFAULT 0,
  `titel` varchar(255) NOT NULL DEFAULT '',
  `text` text NOT NULL,
  `image` varchar(255) NOT NULL DEFAULT '',
  `emotion` varchar(255) NOT NULL DEFAULT '',
  `tags` varchar(255) NOT NULL DEFAULT '',
  `date` varchar(255) NOT NULL DEFAULT '',
  `time` varchar(255) NOT NULL DEFAULT '',
  `cruser_id` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `starttime` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `endtime` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `sys_language_uid` int(11) NOT NULL DEFAULT 0,
  `l10n_parent` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `l10n_state` text DEFAULT NULL,
  `l10n_diffsource` mediumblob DEFAULT NULL,
  `t3ver_oid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `t3ver_wsid` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `t3ver_state` smallint(6) NOT NULL DEFAULT 0,
  `t3ver_stage` int(11) NOT NULL DEFAULT 0,
  `t3ver_count` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `t3ver_tstamp` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `t3ver_move_id` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `tag` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tx_journaling_domain_model_journaling`
--

INSERT INTO `tx_journaling_domain_model_journaling` (`uid`, `pid`, `tstamp`, `crdate`, `deleted`, `hidden`, `titel`, `text`, `image`, `emotion`, `tags`, `date`, `time`, `cruser_id`, `starttime`, `endtime`, `sys_language_uid`, `l10n_parent`, `l10n_state`, `l10n_diffsource`, `t3ver_oid`, `t3ver_wsid`, `t3ver_state`, `t3ver_stage`, `t3ver_count`, `t3ver_tstamp`, `t3ver_move_id`, `tag`) VALUES
(15, 0, 1739294503, 1739554096, 0, 0, 'Der große Sprung des Tages', 'Heute Morgen habe ich unter meinem Schreibtisch einen alten Flummi gefunden. Keine Ahnung, wie lange der da schon lag, aber natürlich musste ich ihn sofort testen. Erst ein paar vorsichtige Sprünge – dann wurde es zum Experiment: Wie hoch kann er wirklich fliegen? Fazit: Sehr hoch. Leider hat er sich danach irgendwo im Bücherregal verirrt. Neue Mission für morgen: Wiederfinden. 🚀\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n', 'happy.jpg', '5', '', '02.02.2025', '18:28', 0, 0, 0, 0, 0, NULL, '', 0, 0, 0, 0, 0, 0, 0, '#Smile'),
(16, 0, 1739554200, 1739554200, 0, 0, 'Kopfrechnen vs. Taschenrechner', 'Heute musste ich mich wieder mit Mathe rumschlagen – eigentlich nichts Wildes, nur ein paar Berechnungen für ein Projekt. Aber dann kam der Moment der Wahrheit: Kopfrechnen oder doch schnell den Taschenrechner zücken? Ich habe es zuerst selbst versucht und lag… naja, knapp daneben. Der Taschenrechner hat mich dann gnadenlos korrigiert. Man könnte sagen, ich habe heute etwas gelernt – oder einfach akzeptiert, dass Technik manchmal der bessere Freund ist. 🤓\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n', 'math.jpg', '3', '', '05.02.2025', '18:30', 0, 0, 0, 0, 0, NULL, '', 0, 0, 0, 0, 0, 0, 0, '#school'),
(17, 0, 1739554283, 1739554283, 0, 0, 'Ein ganz normaler Schultag', 'Heute war einer dieser Tage, die harmlos anfangen und dann irgendwie aus dem Ruder laufen. Erst verschlafen, dann Mathe-Test (den ich natürlich vergessen hatte), und in der Pause gab’s eine hitzige Diskussion darüber, ob Ananas auf Pizza gehört. Nachmittags noch eine Gruppenarbeit, bei der keiner wusste, was genau zu tun ist. Fazit: Typischer Schultag mit unerwarteten Wendungen. 🍕📚😅', '', '3', '', '05.02.2025', '18:31', 0, 0, 0, 0, 0, NULL, '', 0, 0, 0, 0, 0, 0, 0, '#school'),
(18, 0, 1739554435, 1739554398, 1, 0, 'Tee – Retter des Tages', 'Heute war einer dieser Tage, an denen einfach nichts funktioniert. Kalt, müde, unmotiviert – bis ich mir eine Tasse Tee gemacht habe. Plötzlich sah die Welt ein bisschen besser aus. Der erste Schluck? Perfekt. Der zweite? Noch besser. Dann, natürlich, das unvermeidliche: Ich vergesse den Tee, er wird kalt. Aber egal, die Mission war erfüllt. Manchmal braucht es nur ein bisschen warmes Wasser mit Geschmack, um den Tag zu retten. 🍵✨', '', '4', '', '08.02.2025', '18:33', 0, 0, 0, 0, 0, NULL, '', 0, 0, 0, 0, 0, 0, 0, '#food #smile'),
(19, 0, 1739554454, 1739554454, 0, 0, 'Tee – Retter des Tages', 'Heute war einer dieser Tage, an denen einfach nichts funktioniert. Kalt, müde, unmotiviert – bis ich mir eine Tasse Tee gemacht habe. Plötzlich sah die Welt ein bisschen besser aus. Der erste Schluck? Perfekt. Der zweite? Noch besser. Dann, natürlich, das unvermeidliche: Ich vergesse den Tee, er wird kalt. Aber egal, die Mission war erfüllt. Manchmal braucht es nur ein bisschen warmes Wasser mit Geschmack, um den Tag zu retten. 🍵✨\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n', '', '4', '', '11.02.2025', '18:34', 0, 0, 0, 0, 0, NULL, '', 0, 0, 0, 0, 0, 0, 0, '#food #Smile'),
(20, 0, 1739554536, 1739554536, 0, 0, 'Regenromantik oder nur nass?', 'Heute hat es geregnet. Richtig stark. Erst nervig, dann irgendwie schön. Der Sound der Tropfen, das Gefühl, wenn die Luft plötzlich frischer riecht – fast schon meditativ. Natürlich hatte ich keinen Schirm dabei und wurde komplett durchnässt. Aber als ich nach Hause kam, in trockene Klamotten geschlüpft bin und mir einen Tee gemacht habe (ja, schon wieder Tee), war alles perfekt. Manchmal muss man einfach im Regen stehen, um den Sonnenschein danach zu genießen. ☔✨', 'rain.jpg', '2', '', '11.02.2025', '18:35', 0, 0, 0, 0, 0, NULL, '', 0, 0, 0, 0, 0, 0, 0, '#weather'),
(21, 0, 1739554602, 1739554602, 0, 0, 'Die ewige Pizza-Frage', 'Heute Abend gab’s Pizza. Aber vorher die große Entscheidung: Selbst machen oder bestellen? Natürlich war ich motiviert und wollte sie selbst belegen – bis ich dann in den Kühlschrank geguckt habe. Ergebnis: Tomatensoße, Käse… und sonst nicht viel. Minimalismus kann auch lecker sein, oder? Am Ende war’s trotzdem ein Erfolg. Vielleicht nicht die beste Pizza der Welt, aber definitiv die schnellste. 🍕🔥😄\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n', 'pizza.jpg', '4', '', '12.02.2025', '18:36', 0, 0, 0, 0, 0, NULL, '', 0, 0, 0, 0, 0, 0, 0, '#food'),
(22, 0, 1739554650, 1739554650, 0, 0, 'Der tägliche Kampf mit dem Frost', 'Heute Morgen kam die bittere Erkenntnis: Der Winter ist noch nicht vorbei. Mein Auto? Komplett zugefroren. Also stand ich da, bewaffnet mit einem Eiskratzer, während meine Finger langsam zu Eiszapfen wurden. Nach zehn Minuten harter Arbeit war die Windschutzscheibe endlich frei – und genau in dem Moment fuhr jemand vorbei, der seine Standheizung genutzt hatte. Nächstes Ziel: Reicher werden und sowas auch haben. 🚗❄️😂\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n', 'winter-car.jpg', '1', '', '13.02.2025', '18:37', 0, 0, 0, 0, 0, NULL, '', 0, 0, 0, 0, 0, 0, 0, '#weather');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tx_journaling_domain_model_journaling`
--
ALTER TABLE `tx_journaling_domain_model_journaling`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `parent` (`pid`,`deleted`,`hidden`),
  ADD KEY `t3ver_oid` (`t3ver_oid`,`t3ver_wsid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tx_journaling_domain_model_journaling`
--
ALTER TABLE `tx_journaling_domain_model_journaling`
  MODIFY `uid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
