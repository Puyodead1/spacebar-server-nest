/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "discriminator" TEXT NOT NULL DEFAULT '0',
    "global_name" TEXT,
    "avatar" TEXT,
    "avatar_decoration" TEXT,
    "bot" BOOLEAN NOT NULL DEFAULT false,
    "system" BOOLEAN NOT NULL DEFAULT false,
    "mfa_enabled" BOOLEAN NOT NULL DEFAULT false,
    "nsfw_allowed" BOOLEAN,
    "pronouns" TEXT NOT NULL DEFAULT '',
    "bio" TEXT NOT NULL DEFAULT '',
    "banner" TEXT,
    "accent_color" INTEGER,
    "locale" TEXT NOT NULL DEFAULT 'en-US',
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "email" TEXT,
    "phone" TEXT,
    "premium_type" INTEGER NOT NULL DEFAULT 0,
    "personal_connection_id" TEXT,
    "flags" INTEGER NOT NULL DEFAULT 0,
    "public_flags" INTEGER NOT NULL DEFAULT 0,
    "purchased_flags" INTEGER NOT NULL DEFAULT 0,
    "premium_usage_flags" INTEGER NOT NULL DEFAULT 0,
    "desktop" BOOLEAN NOT NULL DEFAULT false,
    "mobile" BOOLEAN NOT NULL DEFAULT false,
    "has_bounced_email" BOOLEAN DEFAULT false,
    "password" TEXT NOT NULL,
    "legacy_username" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
