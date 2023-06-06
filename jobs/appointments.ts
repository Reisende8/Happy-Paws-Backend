import { Op } from "sequelize";
import Appointment from "../models/Appointment";

module.exports.fulfillAppointments = async () => {
  const today = new Date();
  today.setDate(today.getDate() - 1);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 2);
  const appointmentsToChange = await Appointment.findAll({
    where: {
      date: {
        [Op.and]: [{ [Op.lt]: today }, { [Op.gt]: yesterday }],
      },
      status: "pending",
    },
  });
  const appointmentsToChangeIds = appointmentsToChange.map(
    (a) => a.dataValues.id
  );
  const updatedStatusAppointments = await Appointment.update(
    { status: "fulfilled" },
    {
      where: {
        id: appointmentsToChangeIds,
      },
    }
  );
};
