import Vote from "./vote.model.js";

class VoteRepository {
  async create(voteData) {
    return await Vote.create(voteData);
  }

  async findOne(filters) {
    return await Vote.findOne(filters);
  }

  async updateById(voteId, updateData) {
    return await Vote.findByIdAndUpdate(voteId, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(voteId) {
    return await Vote.findByIdAndDelete(voteId);
  }

  async deleteOne(filters) {
    return await Vote.findOneAndDelete(filters);
  }

  async count(filters = {}) {
    return await Vote.countDocuments(filters);
  }
}

export default new VoteRepository();
