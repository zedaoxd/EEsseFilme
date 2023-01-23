import AddIcon from "@mui/icons-material/Add";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AppPagination from "../../../../components/Pagination";
import UsersFilter from "../../../../components/UsersFilter";
import { deleteById, getAllUsersPaged } from "../../../../services/api/user";
import "./styles.scss";
import UserCard from "./UserCard";

type ControlComponentsData = {
  activePage: number;
  emailFilter: string;
};

const ManageUsers = () => {
  const client = useQueryClient();
  const [controlComponentData, setControlComponentData] =
    useState<ControlComponentsData>({
      activePage: 0,
      emailFilter: "",
    });

  const { data: page } = useQuery(
    ["getAllUsersPaged", controlComponentData.activePage],
    () =>
      getAllUsersPaged(
        controlComponentData.activePage,
        controlComponentData.emailFilter
      )
  );

  const { mutate } = useMutation((userId: number) => deleteById(userId), {
    onSuccess: () =>
      client.invalidateQueries([
        "getAllUsersPaged",
        controlComponentData.activePage,
      ]),
  });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentData((prev) => ({
      ...prev,
      activePage: pageNumber - 1,
    }));
  };

  const onSubmitFilter = (emailFilter: string) => {
    setControlComponentData((prev) => ({ ...prev, emailFilter: emailFilter }));
  };

  const onDeleteUser = (userId: number) => {
    if (window.confirm("Deseja realmente deletar este usuário? ")) {
      mutate(userId);
      toast.info("Usuário deletado");
    }
  };

  return (
    <div className="manageUsersContainer">
      <div className="manageUsersHeaderContainer">
        <h1>Gerenciar Usuários</h1>
        <Link to={"/profile/admin/users/create"}>
          <AddIcon /> Adicionar
        </Link>
      </div>
      <div className="manageUsersListContainer">
        <div className="manageUsersFilterContainer">
          <UsersFilter onSubmitFilter={onSubmitFilter} />
        </div>

        <div className="manageUsersListContent">
          {page?.content.map((x) => (
            <UserCard key={x.id} user={x} onDeleteUser={onDeleteUser} />
          ))}
        </div>

        <div className="manageUserPagonationContainer">
          {page && (
            <AppPagination
              onChange={handlePageChange}
              color="secondary"
              page={page.number}
              pageCount={page.totalPages}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
