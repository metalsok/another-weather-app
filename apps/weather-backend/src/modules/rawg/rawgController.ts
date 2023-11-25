import axios from 'axios';
import { RawgService } from './rawgService';

export const RawgController = {
  async getPlatforms(req, res) {
    try {
      const platforms = await RawgService.fetchPlatforms();
      res.json(platforms);
    } catch (error) {
      res.error(500).send(error);
    }
  },
  async getPlatformParents(req, res) {
    try {
      const parents = await RawgService.fetchParents();
      res.json(parents);
    } catch (error) {
      res.error(500).send(error);
    }
  },
  async getGames(req, res) {
    const { platforms, dates } = req.query;
    try {
      const games = await RawgService.fetchGames(platforms, dates);
      res.json(games);
    } catch (error) {
      res.error(500).send(error);
    }
  },
};
