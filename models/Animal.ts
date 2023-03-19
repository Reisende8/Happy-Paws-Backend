import {
  BelongsToMany,
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Appointment from "./Appointment";
import Veterinarian from "./Veterinarian";
import WorksWith from "./WorksWith";

@Table({ tableName: "animals" })
class Animal extends Model<Animal> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column
  name!: string;

  @HasMany(() => Appointment, "animalId")
  appointment!: Appointment[];

  @BelongsToMany(
    () => Veterinarian,
    () => WorksWith,
    "animalId",
    "veterinarianId"
  )
  veterinarians!: Veterinarian[];
}

export default Animal;
