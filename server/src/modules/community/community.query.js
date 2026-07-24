// community.query.js

class CommunityQuery {
  constructor(filters = {}, options = {}) {
    this.input = {
      filters,
      options,
    };

    this.query = {
      filters: {},
      options: {},
    };
  }

  static from(filters = {}, options = {}) {
    return new CommunityQuery(filters, options).build();
  }

  build() {
    this.buildFilters();
    this.buildOptions();

    return this.query;
  }

  buildFilters() {
    const { filters } = this.input;

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

    // Owner
    if (filters.owner) {
      this.query.filters.owner = filters.owner;
    }

    // Member
    if (filters.member) {
      this.query.filters.members = filters.member;
    }

    // Visibility
    if (filters.visibility) {
      this.query.filters.visibility = filters.visibility;
    }

    // Tags
    if (filters.tag) {
      this.query.filters.tags = {
        $in: Array.isArray(filters.tag) ? filters.tag : [filters.tag],
      };
    }
  }

  buildOptions() {
    const { options } = this.input;

    this.query.options.page = options.page ?? 1;
    this.query.options.limit = options.limit ?? 20;

    switch (options.sort) {
      case "popular":
        this.query.options.sort = {
          membersCount: -1,
        };
        break;

      case "new":
        this.query.options.sort = {
          createdAt: -1,
        };
        break;

      default:
        this.query.options.sort = {
          createdAt: -1,
        };
    }
  }
}

export default CommunityQuery;
