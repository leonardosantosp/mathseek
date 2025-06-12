import { getUserById, updateUser } from "../repository/user.repository";
import { UpdateHistoryDto } from "../dto/history/updateHistory.dto";

export const getHistoryService = async (id: string) => {
  const user = await getUserById(id);
  if (!user) throw new Error("User not found");
  return user.history;
};

export const updateHistoryService = async (
  id: string,
  updateHistory: UpdateHistoryDto
) => {
  const user = await getUserById(id);
  if (!user) throw new Error("User not found");
  user.history = updateHistory;
  return await updateUser(id, user);
};
