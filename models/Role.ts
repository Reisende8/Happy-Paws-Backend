import { Model, Column, Table } from "sequelize-typescript";

@Table({ tableName: "roles" })
class Role extends Model<Role> {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @Column
  firstName!: string;

  @Column
  lastName!: string;

  @Column
  email!: string;
}

export default Role;
