import {
  Model,
  Column,
  Table,
  PrimaryKey,
  HasMany,
} from "sequelize-typescript";
import User from "./User";

@Table({ tableName: "roles" })
class Role extends Model<Role> {
  @PrimaryKey
  @Column
  id!: number;

  @Column
  name!: string;

  @HasMany(() => User, "roleId")
  users!: User[];
}

export default Role;
