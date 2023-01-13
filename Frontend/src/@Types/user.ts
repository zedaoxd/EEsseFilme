import Comment from "./comment";
import Rating from "./rating";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: [
    {
      id: number;
      name: string;
    }
  ];
  comments: Comment[];
  ratings: Rating[];
};

export default User;
