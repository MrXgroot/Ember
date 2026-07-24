import communityRepository from "./community.repository.js";
import CommunityQuery from "./community.query.js";

export const COMMUNITY_POPULATE = [
  {
    path: "user",
    select: "username displayName avatar",
  },
];

class CommunityService {
  async createCommunity(communityData) {
    return communityRepository.create(communityData);
  }

  async getCommunity(request = {}) {
    const query = CommunityQuery.from(request);

    return communityRepository.findOne(query.filters, {
      ...query.options,
      populate: COMMUNITY_POPULATE,
    });
  }

  async getCommunities(request = {}) {
    const query = CommunityQuery.from(request);

    return communityRepository.findMany(query.filters, {
      ...query.options,
      populate: COMMUNITY_POPULATE,
    });
  }

  async updateCommunity(id, communityData) {
    return communityRepository.updateById(id, communityData);
  }

  async deleteCommunity(id) {
    return communityRepository.deleteById(id);
  }

  async joinCommunity({ communityId, userId }) {
    // TODO
  }

  async leaveCommunity({ communityId, userId }) {
    // TODO
  }
}

export default new CommunityService();
