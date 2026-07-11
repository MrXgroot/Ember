// modules/community/community.controller.js

import communityService from "./community.service.js";

class CommunityController {
  async createCommunity(req, res) {
    const community = await communityService.createCommunity(req.body);

    res.status(201).json(community);
  }

  async getCommunities(req, res) {
    const communities = await communityService.getCommunities(req.query);

    res.status(200).json(communities);
  }

  async getCommunity(req, res) {
    const community = await communityService.getCommunity(
      req.params.communityId,
    );

    res.status(200).json(community);
  }

  async updateCommunity(req, res) {
    const community = await communityService.updateCommunity(
      req.params.communityId,
      req.body,
    );

    res.status(200).json(community);
  }

  async deleteCommunity(req, res) {
    await communityService.deleteCommunity(req.params.communityId);

    res.status(204).send();
  }
}

export default new CommunityController();
