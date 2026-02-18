import express from 'express';
import {
  getAll,
  getOne,
  addOne,
  updateOne,
  deleteOne
} from '../Controllers/contOne';


const router = express.Router();

router.route('/').get(getAll).post(addOne);

router.route('/:id').get(getOne).put(updateOne).delete(deleteOne);


export default router;
