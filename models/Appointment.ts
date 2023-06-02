import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Animal from "./Animal";
import Client from "./Client";
import Veterinarian from "./Veterinarian";

@Table({ tableName: "appointments" })
class Appointment extends Model<Appointment> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Animal)
  @Column(DataType.UUID)
  animalId!: string;

  @ForeignKey(() => Client)
  @Column({ type: DataType.UUID, unique: false })
  clientId!: string;

  @ForeignKey(() => Veterinarian)
  @Column({ type: DataType.UUID, unique: false })
  veterinarianId!: string;

  @Column
  date!: Date;

  @Column
  slot!: number;

  @Column
  description!: string;

  @Column
  status!: string;

  @Column
  animalAge!: number;

  @BelongsTo(() => Animal, { foreignKey: "animalId", targetKey: "id" })
  animal!: Animal;
}

export default Appointment;
