import { Column, Entity } from "typeorm";

@Entity("roles", { schema: "hr" })
export class Roles {
  @Column("int", { primary: true, name: "role_id" })
  roleId: number;

  @Column("varchar", { name: "role_name", length: 40 })
  roleName: string;
}
