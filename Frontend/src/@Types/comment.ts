import User from "./user";

type Comment = {
  id: number;
  description: string;
  spoiler: boolean;
  dateComment: string;
  user: User;
};

export default Comment;
