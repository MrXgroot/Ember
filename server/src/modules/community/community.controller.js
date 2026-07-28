import communityService from "./community.service.js";

export async function createCommunity(req, res, next) {
  try {
    const community = await communityService.createCommunity({
      communityData: req.body,
      userId: req.user.id,
    });

    res.status(201).json({
      message: "Community created successfully.",
      data: {
        community,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getCommunity(req, res, next) {
  try {
    const community = await communityService.getCommunity({
      filters: {
        slug: req.params.slug,
      },
    });

    res.json({
      message: "Community fetched successfully.",
      data: {
        community,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getCommunities(req, res, next) {
  try {
    const { search, owner, member, page, limit, sort } = req.query;
    const communities = await communityService.getCommunities({
      filters: {
        search,
        owner,
        member,
      },
      options: {
        page,
        limit,
        sort,
      },
    });
    res.json({
      message: "Communities fetched successfully.",
      data: {
        communities,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function updateCommunity(req, res, next) {
  try {
    const community = await communityService.updateCommunity({
      communityId: req.params.communityId,
      communityData: req.body,
      userId: req.user.id,
    });

    res.json({
      message: "Community updated successfully.",
      data: {
        community,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteCommunity(req, res, next) {
  try {
    await communityService.deleteCommunity({
      communityId: req.params.communityId,
      userId: req.user.id,
    });

    res.json({
      message: "Community deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
}

export async function joinCommunity(req, res, next) {
  try {
    const community = await communityService.joinCommunity({
      communityId: req.params.communityId,
      userId: req.user.id,
    });

    res.json({
      message: "Joined community successfully.",
      data: {
        community,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function leaveCommunity(req, res, next) {
  try {
    const community = await communityService.leaveCommunity({
      communityId: req.params.communityId,
      userId: req.user.id,
    });

    res.json({
      message: "Left community successfully.",
      data: {
        community,
      },
    });
  } catch (error) {
    next(error);
  }
}
