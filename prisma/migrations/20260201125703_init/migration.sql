-- CreateTable
CREATE TABLE "Tenant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "subscriptionShare" REAL NOT NULL,
    "tier" TEXT NOT NULL,
    "crarryoverCredit" REAL NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "SolarProduction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "timestamp" DATETIME NOT NULL,
    "kwh" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "TenantConsumption" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "kwh" REAL NOT NULL
);
