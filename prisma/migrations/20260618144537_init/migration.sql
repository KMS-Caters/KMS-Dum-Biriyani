-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customerName` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `chickenDumQty` INTEGER NOT NULL DEFAULT 0,
    `muttonDumQty` INTEGER NOT NULL DEFAULT 0,
    `chicken65Size` VARCHAR(191) NULL,
    `pineappleKesariQty` INTEGER NOT NULL DEFAULT 0,
    `deliveryDate` VARCHAR(191) NULL,
    `deliveryTime` VARCHAR(191) NULL,
    `deliveryAddress` VARCHAR(191) NULL,
    `paymentMode` VARCHAR(191) NULL DEFAULT 'Cash',
    `notes` VARCHAR(191) NULL,
    `totalAmount` DOUBLE NOT NULL DEFAULT 0,
    `status` VARCHAR(191) NOT NULL DEFAULT 'NEW',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
