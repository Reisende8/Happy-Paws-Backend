import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import Animal from "./Animal";
import Veterinarian from "./Veterinarian";

@Table({ tableName: "works_with" })
class WorksWith extends Model<WorksWith> {
  @ForeignKey(() => Animal)
  @Column(DataType.UUID)
  animalId!: string;

  @ForeignKey(() => Veterinarian)
  @Column(DataType.UUID)
  veterinarianId!: string;
}

export default WorksWith;
