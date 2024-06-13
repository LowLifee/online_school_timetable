export type UserLog = {
   login: string;
   password: string;
}

export type UserDate = {
   password: string;
   id: string | number;
}

export type User = UserDate[]
