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
import Animal from "./Animal";
import Appointment from "./Appointment";
import Client from "./Client";
import Clinic from "./Clinic";
import VeterinarianSpecialization from "./VeterinarianSpecialization";
import WorksWith from "./WorksWith";

@Table({ tableName: "veterinarians" })
class Veterinarian extends Model<Veterinarian> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Clinic)
  @Column(DataType.UUID)
  clinicId!: string;

  @ForeignKey(() => VeterinarianSpecialization)
  @Column(DataType.UUID)
  specializationId!: string;

  @Column
  firstName!: string;

  @Column
  lastName!: string;

  @Column
  estimatedPrice!: number;

  @BelongsTo(() => VeterinarianSpecialization, {
    foreignKey: "specializationId",
    targetKey: "id",
  })
  veterinarianSpecialization!: VeterinarianSpecialization;

  @BelongsTo(() => Clinic, { foreignKey: "clinicId", targetKey: "id" })
  clinic!: Clinic;

  @BelongsToMany(() => Animal, () => WorksWith, "veterinarianId", "animalId")
  animals!: Animal[];

  @BelongsToMany(() => Client, {
    through: { model: () => Appointment, unique: false },
  })
  clients!: Client[];
}

export default Veterinarian;
