import { Model, Column, Table } from "sequelize-typescript";

@Table({ tableName: "users" })
class User extends Model<User> {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @Column
  firstName!: string;

  @Column
  lastName!: string;

  @Column
  email!: string;
}

export default User;
