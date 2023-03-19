import {
  Model,
  Column,
  Table,
  PrimaryKey,
  Default,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from "sequelize-typescript";
import Appointment from "./Appointment";
import User from "./User";
import Veterinarian from "./Veterinarian";

@Table({ tableName: "clients" })
class Client extends Model<Client> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId!: string;

  @Column
  firstName!: string;

  @Column
  lastName!: string;

  @BelongsTo(() => User, { foreignKey: "userId", targetKey: "id" })
  user!: User;

  @BelongsToMany(
    () => Veterinarian,
    () => Appointment,
    "clientId",
    "veterinarianId"
  )
  veterinarians!: Veterinarian[];
}

export default Client;
