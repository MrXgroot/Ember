import slugify from "slugify";

import communityRepository from "./community.repository.js";
import CommunityQuery from "./community.query.js";

export const COMMUNITY_POPULATE = [
  {
    path: "owner",
    select: "displayName username avatar",
  },
];

function createSlug(value) {
  return slugify(value, {
    lower: true,
    strict: true,
    trim: true,
  });
}

function isMember(community, userId) {
  return community.members.some((member) => {
    const memberId = member._id ?? member;

    return memberId.toString() === userId.toString();
  });
}

class CommunityService {
  async createCommunity({ communityData, userId }) {
    const baseSlug = createSlug(communityData.slug ?? communityData.name);

    if (!baseSlug) {
      throw new Error("Community name must include letters or numbers.");
    }

    let slug = baseSlug;
    let suffix = 2;

    while (await communityRepository.exists({ slug })) {
      slug = `${baseSlug}-${suffix++}`;
    }

    return await communityRepository.create({
      ...communityData,
      owner: userId,
      slug,
      members: [userId],
      membersCount: 1,
    });
  }

  async getCommunity(request = {}) {
    const query = CommunityQuery.from(request);

    return await communityRepository.findOne(query.filters, {
      ...query.options,
      populate: COMMUNITY_POPULATE,
    });
  }

  async getCommunities(request = {}) {
    const query = CommunityQuery.from(request);

    return await communityRepository.findMany(query.filters, {
      ...query.options,
      populate: COMMUNITY_POPULATE,
    });
  }

  async updateCommunity({ communityId, communityData, userId }) {
    const community = await communityRepository.findById(communityId);

    if (!community) {
      throw new Error("Community not found.");
    }

    if (community.owner.toString() !== userId.toString()) {
      throw new Error("You are not allowed to update this community.");
    }

    const updateData = { ...communityData };

    if (communityData.name) {
      const baseSlug = createSlug(communityData.name);

      if (!baseSlug) {
        throw new Error("Community name must include letters or numbers.");
      }

      let slug = baseSlug;
      let suffix = 2;

      while (
        await communityRepository.exists({
          slug,
          _id: { $ne: communityId },
        })
      ) {
        slug = `${baseSlug}-${suffix++}`;
      }

      updateData.slug = slug;
    }

    return await communityRepository.updateById(communityId, updateData);
  }

  async deleteCommunity({ communityId, userId }) {
    const community = await communityRepository.findById(communityId);

    if (!community) {
      throw new Error("Community not found.");
    }

    if (community.owner.toString() !== userId.toString()) {
      throw new Error("You are not allowed to delete this community.");
    }

    return await communityRepository.deleteById(communityId);
  }

  async joinCommunity({ communityId, userId }) {
    const community = await communityRepository.findById(communityId);

    if (!community) {
      throw new Error("Community not found.");
    }

    if (isMember(community, userId)) {
      return await communityRepository.findById(communityId, {
        populate: COMMUNITY_POPULATE,
      });
    }

    await communityRepository.joinCommunity(communityId, userId);

    return await communityRepository.findById(communityId, {
      populate: COMMUNITY_POPULATE,
    });
  }

  async leaveCommunity({ communityId, userId }) {
    const community = await communityRepository.findById(communityId);

    if (!community) {
      throw new Error("Community not found.");
    }

    if (!isMember(community, userId)) {
      return await communityRepository.findById(communityId, {
        populate: COMMUNITY_POPULATE,
      });
    }

    await communityRepository.leaveCommunity(communityId, userId);

    return await communityRepository.findById(communityId, {
      populate: COMMUNITY_POPULATE,
    });
  }
}

export default new CommunityService();
