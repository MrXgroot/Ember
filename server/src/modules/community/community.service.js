// modules/community/community.service.js

import communityRepository from "./community.repository.js";

class CommunityService {
  async createCommunity(communityData) {
    return await communityRepository.create(communityData);
  }

  async getCommunities(query = {}) {
    const filters = {};
    const options = {};

    // We'll build these as features are added.
    // search
    // pagination
    // sorting
    // filtering

    return await communityRepository.findMany(filters, options);
  }

  async getCommunity(id) {
    return await communityRepository.findById(id);
  }

  async updateCommunity(id, communityData) {
    return await communityRepository.updateById(id, communityData);
  }

  async deleteCommunity(id) {
    return await communityRepository.deleteById(id);
  }
}

export default new CommunityService();
