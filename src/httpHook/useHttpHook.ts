const __BASE_URL = 'http://localhost:3001/emails';

export const useHttpHook = () => {
   const getAllUsers = async () => {
      try {
         const res = await fetch(__BASE_URL);
         if (!res.ok) {
            throw new Error('Error in fetchin...');
         }
         return await res.json();
      } catch (e) {
         console.log(e);
      }
   };

   const getCurrentUser = async (id: string) => {
      try {
         const res = await fetch(`${__BASE_URL}/${id}`);
         if (!res.ok) {
            throw new Error('Error in fetchin...');
         }
         const result = await res.json();
         return result;
      } catch (e) {
         console.log(e);
      }
   }

   return {
      getAllUsers,
      getCurrentUser
   }
}