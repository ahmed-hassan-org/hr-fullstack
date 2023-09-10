import { Column, Entity, Index } from "typeorm";

@Index("users_email_uindex", ["email"], { unique: true })
@Entity("users", { schema: "hr" })
export class Users {
  @Column("int", { primary: true, name: "user_id" })
  userId: number;

  @Column("varchar", { name: "username", length: 50 })
  username: string;

  @Column("varchar", { name: "email", unique: true, length: 80 })
  email: string;

  @Column("varchar", { name: "password", nullable: true, length: 40 })
  password: string | null;

  @Column("tinyint", {
    name: "is_active",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isActive: boolean | null;

  @Column("tinyint", {
    name: "is_blocked",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isBlocked: boolean | null;

  @Column("tinyint", {
    name: "isOtpEnabled",
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  isOtpEnabled: boolean | null;

  @Column("varchar", {
    name: "twoFactorAuthenticationSecret",
    nullable: true,
    length: 2000,
  })
  twoFactorAuthenticationSecret: string | null;
}
