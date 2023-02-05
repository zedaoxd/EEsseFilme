import { Outlet } from "react-router";
import { toast } from "react-toastify";
import { api } from "../../../../../../services/api/api";

type Props = {
  onUploadSuccess: (imgName: string) => void;
  onSelectImage: (image: File) => void;
  children: React.ReactNode;
};

const Upload = ({ onUploadSuccess, onSelectImage, children }: Props) => {
  const uploadImage = (selectImage: File) => {
    const formData = new FormData();
    formData.append("file", selectImage);

    api
      .post("/movies/image?file", formData)
      .then((r) => onUploadSuccess(r.data))
      .catch((e) => {
        toast.error("Erro ao fazer upload de imagem");
        console.log(e.config);
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectImage = event.target.files?.[0];

    if (selectImage) {
      onSelectImage(selectImage);
      uploadImage(selectImage);
    }
  };
  return (
    <>
      <h3>Selecione a capa do filme</h3>
      <label htmlFor="movieCover">{children}</label>
      <input
        type="file"
        id="movieCover"
        hidden
        accept="image/png, image/jpeg"
        onChange={handleChange}
        name="file"
      />
      <small>
        As imagens devem ser JPEG ou PNG e não devem ultrapassar
        <strong> 10 mb.</strong>
      </small>
    </>
  );
};

export default Upload;
