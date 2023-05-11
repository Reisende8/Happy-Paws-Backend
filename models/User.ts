import {
  Model,
  Column,
  Table,
  PrimaryKey,
  Default,
  DataType,
  ForeignKey,
  BelongsTo,
  HasOne,
} from "sequelize-typescript";
import Client from "./Client";
import Clinic from "./Clinic";
import Role from "./Role";

@Table({ tableName: "users" })
class User extends Model<User> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Role)
  @Column
  roleId!: number;

  @Column
  email!: string;

  @Column
  password!: string;

  @Column
  phoneNumber!: string;

  @Column
  emailActivated!: boolean;

  @Column
  activationToken!: string;

  @BelongsTo(() => Role, { foreignKey: "roleId", targetKey: "id" })
  role!: Role;

  @HasOne(() => Client, "userId")
  client!: Client;

  @HasOne(() => Clinic, "userId")
  clinic!: Clinic;
}

export default User;
