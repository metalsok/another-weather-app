import express from 'express';
import { RawgController } from './rawgController';

const router = express.Router();

router.get('/platforms', RawgController.getPlatforms);
router.get('/parents', RawgController.getPlatformParents);
router.get('/games', RawgController.getGames);


export {router as RawgRouter}
