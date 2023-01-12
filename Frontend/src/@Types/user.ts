import Comment from "./comment";
import Rating from "./rating";

export type User = {
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
