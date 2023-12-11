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
        image_background:platform.image_background
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
      return response.data.results;
    } catch (error) {
      return error;
    }
  },
  async fetchGames(platforms: string, dates: string) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/games?key=${process.env.RAWG_API_KEY}&platforms=${platforms}&dates=${dates}`
      );
      return gamesDataReducer(response.data);
    } catch (error) {
      return error;
    }
  },
};

function gamesDataReducer(data) {
  return {
    count: data.count,
    results: data.results.map((result) => ({
      id: result.id,
      name: result.name,
      background_image: result.background_image,
      rating: result.rating,
      short_screenshots: result.short_screenshots,
    })),
  };
}
