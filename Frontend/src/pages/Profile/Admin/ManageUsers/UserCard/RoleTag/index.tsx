import Role from "../../../../../../@Types/role";
import "./styles.scss";

type Props = {
  role: Role;
};

const RoleTag = ({ role }: Props) => {
  const r = role.name.split("_")[1];
  return (
    <div className={`roleTagContainer ${r === "ADMIN" ? "blue" : "red"}`}>
      {r}
    </div>
  );
};

export default RoleTag;
