import axios from 'axios';

export const RawgService = {
  baseUrl: `https://api.rawg.io/api`,
  async fetchPlatforms() {
    try {
      const response = await axios.get(
        `${this.baseUrl}/platforms?key=${process.env.RAWG_API_KEY}`
      );

      return response.data.results.map((platform) => ({
        id: platform.id,
        name: platform.name,
        slug: platform.slug,
        games_count: platform.games_count,
      }));
    } catch (error) {
      return error;
    }
  },
  async fetchParents() {
    try {
      const response = await axios.get(
        `${this.baseUrl}/platforms/lists/parents?key=${process.env.RAWG_API_KEY}`
      );
      return response.data;
    } catch (error) {
      return error;
    }
  },
};
