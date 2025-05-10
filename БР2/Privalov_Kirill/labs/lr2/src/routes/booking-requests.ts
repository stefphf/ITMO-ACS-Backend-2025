import { Router } from 'express';
import { BookingRequestController } from '../controllers/BookingRequestController';
import { checkJwt, checkOwnership, checkRole } from '../middleware/checkJwt';
import { UserRole } from '../entities/User';

const router = Router();

router.get('/', checkJwt, BookingRequestController.getAll);
router.get('/:id', checkJwt, BookingRequestController.getById);
router.post(
  '/',
  checkJwt,
  checkRole(UserRole.TENANT),
  BookingRequestController.create,
);
router.put(
  '/:id',
  checkJwt,
  checkOwnership('booking_request', 'tenant'),
  BookingRequestController.update,
);
router.delete(
  '/:id',
  checkJwt,
  checkOwnership('booking_request', 'tenant'),
  BookingRequestController.delete,
);

export default router;
