import AddIcon from "@mui/icons-material/Add";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Page from "../../../../@Types/page";
import User from "../../../../@Types/user";
import AppPagination from "../../../../components/Pagination";
import UsersFilter from "../../../../components/UsersFilter";
import { deleteById, getAllUsersPaged } from "../../../../services/api/user";
import UserCard from "./UserCard";
import swal from "sweetalert";
import "./styles.scss";

type ControlComponentsData = {
  activePage: number;
  emailFilter: string;
};

const ManageUsers = () => {
  const [controlComponentData, setControlComponentData] =
    useState<ControlComponentsData>({
      activePage: 0,
      emailFilter: "",
    });

  const [page, setPage] = useState<Page<User>>();

  useEffect(() => {
    getAllUsersPaged(
      controlComponentData.activePage,
      controlComponentData.emailFilter
    ).then((r) => setPage(r));
  }, [controlComponentData]);

  const { mutate } = useMutation((userId: number) => deleteById(userId), {
    onSuccess: () => {
      getAllUsersPaged(
        controlComponentData.activePage,
        controlComponentData.emailFilter
      ).then((r) => setPage(r));
      swal("Usuário deletado com sucesso!", {
        icon: "success",
      });
    },
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
    swal({
      title: "Você tem certeza?",
      text: "uma vez deletado não poderá voltar atrás!",
      icon: "warning",
      buttons: ["Cancelar", "Deletar"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        mutate(userId);
      } else {
        swal("Delete cancelado!");
      }
    });
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
