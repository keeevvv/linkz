-- AlterTable
ALTER TABLE `link` ADD COLUMN `embedType` VARCHAR(191) NULL,
    ADD COLUMN `imageUrl` TEXT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `githubUrl` VARCHAR(191) NULL,
    ADD COLUMN `instagramUrl` VARCHAR(191) NULL,
    ADD COLUMN `linkedInUrl` VARCHAR(191) NULL;
