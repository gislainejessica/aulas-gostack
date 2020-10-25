import { Router, response } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import { getCustomRepository } from 'typeorm';

const appointmentsRouter = Router();

// const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)

  const appontments = await appointmentsRepository.find();

  return response.json(appontments);
});

appointmentsRouter.post('/', async (request, resposte) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    // const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider,
    });

    return resposte.json(appointment);
  } catch (err) {
    return resposte.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
