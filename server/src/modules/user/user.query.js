class UserQuery {
  constructor(request = {}) {
    this.request = request;

    this.filters = {};
    this.options = {};
  }

  static async from(request = {}) {
    const query = new UserQuery(request);

    await query.build();

    return {
      filters: query.filters,
      options: query.options,
    };
  }

  async build() {
    this.buildFilters();
    this.buildOptions();
  }

  buildFilters() {
    const { filters = {} } = this.request;

    if (filters.search) {
      this.filters.$or = [
        {
          username: {
            $regex: filters.search,
            $options: "i",
          },
        },
        {
          displayName: {
            $regex: filters.search,
            $options: "i",
          },
        },
      ];
    }

    if (filters.username) {
      this.filters.username = filters.username;
    }

    if (filters.onboardingCompleted !== undefined) {
      this.filters.onboardingCompleted = filters.onboardingCompleted === "true";
    }

    if (filters.exclude) {
      this.filters._id = {
        $ne: filters.exclude,
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

    this.options.select =
      options.select ?? "displayName username avatar bio lastOnlineAt";
  }
}

export default UserQuery;
