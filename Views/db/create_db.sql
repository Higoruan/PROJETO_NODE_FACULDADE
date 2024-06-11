-- MySQL Workbench Synchronization
-- Generated: 2024-06-11 20:20
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: Higor

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `HRJ` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE IF NOT EXISTS `HRJ`.`Product` (
  `id_produto` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `brand` VARCHAR(45) NOT NULL,
  `value` DECIMAL NOT NULL,
  PRIMARY KEY (`id_produto`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `HRJ`.`Functionary` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `cpf` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `HRJ`.`Customer` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `cpf` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `HRJ`.`sale` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `Customer_id` INT(11) NOT NULL,
  `Product_id` INT(10) UNSIGNED NOT NULL,
  `Functionary_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `Customer_id`, `Product_id`, `Functionary_id`),
  INDEX `fk_sale_Customer_idx` (`Customer_id` ASC),
  INDEX `fk_sale_Product1_idx` (`Product_id` ASC),
  INDEX `fk_sale_Functionary1_idx` (`Functionary_id` ASC),
  CONSTRAINT `fk_sale_Customer`
    FOREIGN KEY (`Customer_id`)
    REFERENCES `HRJ`.`Customer` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sale_Product1`
    FOREIGN KEY (`Product_id`)
    REFERENCES `HRJ`.`Product` (`id_produto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sale_Functionary1`
    FOREIGN KEY (`Functionary_id`)
    REFERENCES `HRJ`.`Functionary` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
