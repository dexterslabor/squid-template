module.exports = class treasury1646757944231 {
  name = 'treasury1646757944231'

  async up(db) {
    await db.query(`ALTER TABLE "account" RENAME COLUMN "balance" TO "total_spent"`)
  }

  async down(db) {
    await db.query(`ALTER TABLE "account" RENAME COLUMN "total_spent" TO "balance"`)
  }
}
