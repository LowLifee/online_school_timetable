import { RootState } from "store";

export const selectUsersInfo = (state: RootState) => ({
   status: state.users.status,
   error: state.users.error,
   qty: state.users.list
})

export const selectUsersList = (state: RootState) => state.users.list;