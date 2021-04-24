-- CreateTable
CREATE TABLE "Pokemon" (
    "autoId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "classification" TEXT NOT NULL,
    "types" TEXT[],

    PRIMARY KEY ("autoId")
);
