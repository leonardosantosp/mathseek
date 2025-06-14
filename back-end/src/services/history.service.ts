import {
  getUserById,
  removeUserArrays,
  updateUser,
  updateUserArrays
} from "../repository/user.repository";
import { UpdateHistoryDto } from "../dto/history/updateHistory.dto";

export const getHistoryService = async (id: string) => {
  const user = await getUserById(id);
  if (!user) throw new Error("User not found");
  return user.history;
};

export const addOrRemoveHistoryService = async (
  id: string,
  updateHistory: UpdateHistoryDto,
  type: string
) => {
  const user = await getUserById(id);
  if (!user) throw new Error("User not found");

  if (type === "add") {
    return await updateUserArrays(id, { history: updateHistory });
  }

  return await removeUserArrays(id, { history: updateHistory });
};
