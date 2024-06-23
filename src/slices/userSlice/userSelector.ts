import { RootState } from "store";

export const selectUsersList = (state: RootState) => state.users.users;