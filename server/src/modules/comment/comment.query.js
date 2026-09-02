// modules/comment/comment.query.js

class CommentQuery {
  constructor(request = {}) {
    this.request = request;

    this.filters = {};
    this.options = {};
  }

  static async from(request = {}) {
    const query = new CommentQuery(request);

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

    if (filters.post) {
      this.filters.post = filters.post;
    }

    if (filters.user) {
      this.filters.user = filters.user;
    }

    if (filters.parent !== undefined) {
      this.filters.parent = filters.parent;
    }
  }

  buildOptions() {
    const { options = {} } = this.request;

    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 20;

    this.options.skip = (page - 1) * limit;
    this.options.limit = limit;

    switch (options.sort) {
      case "newest":
        this.options.sort = { createdAt: -1 };
        break;

      case "oldest":
        this.options.sort = { createdAt: 1 };
        break;

      default:
        this.options.sort = { createdAt: 1 };
    }
  }
}

export default CommentQuery;
