import Save from "./save.model.js";

export async function create(saveData) {
  return await Save.create(saveData);
}

export async function findOne(filter) {
  return await Save.findOne(filter);
}

export async function deleteById(id) {
  return await Save.findByIdAndDelete(id);
}

export async function deleteOne(filter) {
  return await Save.findOneAndDelete(filter);
}

export async function exists(filter) {
  return await Save.exists(filter);
}
