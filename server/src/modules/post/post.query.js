import communityRepository from "../community/community.repository.js";

class PostQuery {
  constructor(request = {}) {
    this.request = request;

    this.filters = {};
    this.options = {};
  }

  static async from(request = {}) {
    const query = new PostQuery(request);

    await query.build();

    return {
      filters: query.filters,
      options: query.options,
    };
  }

  async build() {
    await this.buildFilters();
    this.buildOptions();
  }

  async buildFilters() {
    const { filters = {} } = this.request;

    if (filters.community) {
      const community = await communityRepository.findOne({
        slug: filters.community,
      });

      if (community) {
        this.filters.community = community._id;
      } else {
        // Force an empty result instead of throwing
        this.filters.community = null;
      }
    }

    if (filters.user) {
      this.filters.user = filters.user;
    }

    if (filters.search) {
      this.filters.content = {
        $regex: filters.search,
        $options: "i",
      };
    }
  }

  buildOptions() {
    const { options = {} } = this.request;

    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 20;

    this.options.skip = (page - 1) * limit;
    this.options.limit = limit;

    this.options.sort = options.sort ?? {
      createdAt: -1,
    };
  }
}

export default PostQuery;
