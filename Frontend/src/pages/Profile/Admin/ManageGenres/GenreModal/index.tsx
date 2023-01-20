import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import Genre from "../../../../../@Types/genre";
import { saveGenre, updateGenre } from "../../../../../services/api/genre";
import "./styles.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  genre?: Genre;
};

type FormData = {
  name: string;
};

const GenreModal = ({ isOpen, genre, onClose }: Props) => {
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const client = useQueryClient();

  useEffect(() => {
    setValue("name", genre?.name || "");
  }, [genre]);

  const { mutate } = useMutation(
    async (data: FormData) => {
      genre
        ? await updateGenre(data as Genre, genre.id)
        : await saveGenre(data as Genre);
    },
    { onSuccess: () => client.invalidateQueries(["getAllGenresManager"]) }
  );

  const onSubmit = (formData: FormData) => {
    mutate(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      onRequestClose={onClose}
    >
      <button type="button" onClick={onClose} className="react-modal-close">
        <CloseIcon />
      </button>

      <div className="genreModalForm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("name", {
              required: "Campo obrigátorio",
            })}
            type="text"
            placeholder="Gênero"
            name="name"
          />

          <button type="submit">
            {genre ? (
              <>
                <SystemUpdateAltIcon /> Atualizar
              </>
            ) : (
              <>
                <AddIcon /> Salvar
              </>
            )}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default GenreModal;
