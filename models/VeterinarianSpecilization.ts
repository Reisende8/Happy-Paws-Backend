import {
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Veterinarian from "./Veterinarian";

@Table({ tableName: "veterinarian_specializations" })
class VeterinarianSpecialization extends Model<VeterinarianSpecialization> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column
  name!: string;

  @HasMany(() => Veterinarian, "specializationId")
  veterinarian!: Veterinarian[];
}

export default VeterinarianSpecialization;
