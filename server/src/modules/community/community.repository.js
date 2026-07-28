// modules/community/community.repository.js

import Community from "./community.model.js";

const UPDATE_OPTIONS = {
  returnDocument: "after",
  runValidators: true,
};

class CommunityRepository {
  async create(communityData) {
    return await Community.create(communityData);
  }

  async findById(communityId, options = {}) {
    let query = Community.findById(communityId);

    for (const populate of options.populate ?? []) {
      query = query.populate(populate);
    }

    return await query;
  }

  async findOne(filter = {}, options = {}) {
    let query = Community.findOne(filter);

    for (const populate of options.populate ?? []) {
      query = query.populate(populate);
    }

    return await query;
  }

  async findMany(filter = {}, options = {}) {
    const { populate, ...queryOptions } = options;

    let query = Community.find(filter, null, queryOptions);

    for (const item of populate ?? []) {
      query = query.populate(item);
    }
    return await query;
  }

  async updateById(communityId, updateData, options = {}) {
    return await Community.findByIdAndUpdate(communityId, updateData, {
      ...UPDATE_OPTIONS,
      ...options,
    });
  }

  async deleteById(communityId) {
    return await Community.findByIdAndDelete(communityId);
  }

  async count(filter = {}) {
    return await Community.countDocuments(filter);
  }

  async exists(filter) {
    return await Community.exists(filter);
  }

  async joinCommunity(communityId, userId) {
    return await Community.findByIdAndUpdate(
      communityId,
      {
        $addToSet: {
          members: userId,
        },
        $inc: {
          membersCount: 1,
        },
      },
      UPDATE_OPTIONS,
    );
  }

  async leaveCommunity(communityId, userId) {
    return await Community.findByIdAndUpdate(
      communityId,
      {
        $pull: {
          members: userId,
        },
        $inc: {
          membersCount: -1,
        },
      },
      UPDATE_OPTIONS,
    );
  }
}

export default new CommunityRepository();
