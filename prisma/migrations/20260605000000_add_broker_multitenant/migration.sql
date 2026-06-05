-- ============================================================
-- Migration: add_broker_multitenant
-- Chuyển sang multi-tenant: thêm Broker, brokerId vào Lead/Setting/User
-- ============================================================

-- 1. Tạo bảng Broker mới
CREATE TABLE `Broker` (
  `id`          INT NOT NULL AUTO_INCREMENT,
  `name`        VARCHAR(100) NOT NULL,
  `phone`       VARCHAR(20) NOT NULL,
  `domain`      VARCHAR(255) NOT NULL,
  `template`    VARCHAR(20) NOT NULL DEFAULT 'mau-1',
  `status`      VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
  `activatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `expiredAt`   DATETIME(3) NOT NULL,
  `notifyEmail` VARCHAR(255) NULL,
  `createdAt`   DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt`   DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `Broker_domain_key` (`domain`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 2. Thêm brokerId vào User (nullable — NULL = Master Admin)
ALTER TABLE `User`
  ADD COLUMN `brokerId` INT NULL AFTER `id`;

-- Đổi role ADMIN cũ → BROKER
UPDATE `User` SET `role` = 'BROKER' WHERE `role` = 'ADMIN';

ALTER TABLE `User`
  ADD CONSTRAINT `User_brokerId_fkey`
  FOREIGN KEY (`brokerId`) REFERENCES `Broker`(`id`)
  ON DELETE SET NULL ON UPDATE CASCADE;

-- 3. Thêm brokerId vào Lead
ALTER TABLE `Lead`
  ADD COLUMN `brokerId` INT NOT NULL DEFAULT 1 AFTER `id`;

ALTER TABLE `Lead`
  ADD CONSTRAINT `Lead_brokerId_fkey`
  FOREIGN KEY (`brokerId`) REFERENCES `Broker`(`id`)
  ON DELETE RESTRICT ON UPDATE CASCADE;

-- 4. Refactor Setting: đổi từ key PK → id PK, thêm brokerId
-- Tạo bảng mới
CREATE TABLE `Setting_new` (
  `id`        INT NOT NULL AUTO_INCREMENT,
  `brokerId`  INT NOT NULL,
  `key`       VARCHAR(100) NOT NULL,
  `value`     TEXT NOT NULL,
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `Setting_brokerId_key_key` (`brokerId`, `key`),
  CONSTRAINT `Setting_brokerId_fkey`
    FOREIGN KEY (`brokerId`) REFERENCES `Broker`(`id`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Copy data cũ sang (gán brokerId = 1 tạm thời)
INSERT INTO `Setting_new` (`brokerId`, `key`, `value`, `updatedAt`)
SELECT 1, `key`, `value`, `updatedAt` FROM `Setting`;

-- Xóa bảng cũ, đổi tên bảng mới
DROP TABLE `Setting`;
RENAME TABLE `Setting_new` TO `Setting`;
