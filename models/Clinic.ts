import {
  Model,
  Column,
  Table,
  PrimaryKey,
  Default,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import User from "./User";
import Veterinarian from "./Veterinarian";

@Table({ tableName: "clinics" })
class Clinic extends Model<Clinic> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId!: string;

  @Column
  address!: string;

  @Column
  name!: string;

  @BelongsTo(() => User, { foreignKey: "userId", targetKey: "id" })
  user!: User;

  @HasMany(() => Veterinarian, "clinicId")
  veterinarian!: Veterinarian[];
}

export default Clinic;
