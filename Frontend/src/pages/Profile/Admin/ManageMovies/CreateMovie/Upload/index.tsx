import { toast } from "react-toastify";
import { api } from "../../../../../../services/api/api";

type Props = {
  onUploadSuccess: (imgName: string) => void;
  onSelectImage: (image: File) => void;
};

const Upload = ({ onUploadSuccess, onSelectImage }: Props) => {
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
      <label htmlFor="movieCover">Selecione a capa do filme</label>
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
