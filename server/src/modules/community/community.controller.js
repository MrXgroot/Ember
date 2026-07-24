import communityService from "./community.service.js";

export async function createCommunity(req, res, next) {
  try {
    const community = await communityService.createCommunity(req.body);

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
    const communities = await communityService.getCommunities({
      filters: req.query,
      options: req.query,
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
    const community = await communityService.updateCommunity(
      req.params.communityId,
      req.body,
    );

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
    await communityService.deleteCommunity(req.params.communityId);

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
