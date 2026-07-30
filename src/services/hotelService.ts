import { curatedHotels } from '../data/curatedHotels';

export const hotelService = {
  async list() {
    return curatedHotels;
  },
};
