import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class Account {
  constructor(props?: Partial<Account>) {
    Object.assign(this, props)
  }

  /**
   * Account address
   */
  @PrimaryColumn_()
  id!: string

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  totalSpent!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  lastBlock!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  totalTransactions!: bigint
}
