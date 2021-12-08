-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema book
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema book
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `book` DEFAULT CHARACTER SET armscii8 ;
USE `book` ;

-- -----------------------------------------------------
-- Table `book`.`book`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `book`.`book` (
  `idbook` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL,
  `author` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  PRIMARY KEY (`idbook`),
  UNIQUE INDEX `idbook_UNIQUE` (`idbook` ASC) VISIBLE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
