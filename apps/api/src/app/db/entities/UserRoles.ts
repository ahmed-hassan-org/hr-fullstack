import { Column, Entity } from "typeorm";

@Entity("user_roles", { schema: "hr" })
export class UserRoles {
  @Column("int", { primary: true, name: "user_id" })
  userId: number;

  @Column("int", { primary: true, name: "role_id" })
  roleId: number;
}
