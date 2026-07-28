// community.query.js

class CommunityQuery {
  constructor(request = {}) {
    this.input = request;

    this.query = {
      filters: {},
      options: {},
    };
  }

  static from(request = {}) {
    return new CommunityQuery(request).build();
  }

  build() {
    this.buildFilters();
    this.buildOptions();

    return this.query;
  }

  buildFilters() {
    const { filters = {} } = this.input;

    // Slug
    if (filters.slug) {
      this.query.filters.slug = filters.slug;
    }

    // Search
    if (filters.search) {
      this.query.filters.$or = [
        {
          name: {
            $regex: filters.search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: filters.search,
            $options: "i",
          },
        },
      ];
    }

    // Member
    if (filters.member) {
      this.query.filters.members = filters.member;
    }

    // Owner
    if (filters.owner) {
      this.query.filters.owner = filters.owner;
    }
  }

  buildOptions() {
    const { options = {} } = this.input;

    const page = Number(options.page ?? 1);
    const limit = Number(options.limit ?? 20);

    this.query.options.skip = (page - 1) * limit;
    this.query.options.limit = limit;

    switch (options.sort) {
      case "popular":
        this.query.options.sort = {
          membersCount: -1,
        };
        break;

      case "new":
      default:
        this.query.options.sort = {
          createdAt: -1,
        };
    }
  }
}

export default CommunityQuery;
