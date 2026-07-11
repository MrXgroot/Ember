// modules/community/community.repository.js

import Community from "./community.model.js";

class CommunityRepository {
  async create(communityData) {
    return await Community.create(communityData);
  }

  async findById(id) {
    return await Community.findById(id);
  }

  async findOne(filter) {
    return await Community.findOne(filter);
  }

  async findMany(filter = {}, options = {}) {
    return await Community.find(filter, null, options);
  }

  async updateById(id, communityData) {
    return await Community.findByIdAndUpdate(id, communityData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id) {
    return await Community.findByIdAndDelete(id);
  }

  async count(filter = {}) {
    return await Community.countDocuments(filter);
  }

  async exists(filter) {
    return await Community.exists(filter);
  }
}

export default new CommunityRepository();
