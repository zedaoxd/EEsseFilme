import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import "./styles.scss";

type FormData = {
  email: string;
};

type Props = {
  onSubmitFilter: (emailFilter: string) => void;
};

const UsersFilter = ({ onSubmitFilter }: Props) => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmitForm = (formData: FormData) => {
    onSubmitFilter(formData.email);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length >= 3) {
      onSubmitFilter(event.target.value);
    }
  };

  return (
    <div className="usersFilterContainer">
      <form onSubmit={handleSubmit(onSubmitForm)} method="get">
        <input
          {...register("email")}
          type="text"
          placeholder="E-mail"
          name="email"
          onChange={onChange}
        />

        <button type="submit">
          <SearchIcon />
        </button>
      </form>
    </div>
  );
};

export default UsersFilter;
