export type Lessons = {
   subject: string,
   date: string,
   time: string,
   teacher: string
   payed: boolean,
   missed: boolean,
   cancelled: boolean,
   id: string
}


export type UserEmails = {
   name: string,
   password: string,
   id: string,
   email: string,
   img: string,
   message_quantity: string,
   lessons: Lessons[]
}





