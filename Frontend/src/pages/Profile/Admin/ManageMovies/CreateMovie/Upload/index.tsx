import { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../../../../../services/api/api";

type Props = {
  onUploadSuccess: (imgName: string) => void;
};

const Upload = ({ onUploadSuccess }: Props) => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<File>();

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
      setUploadedImageUrl(selectImage);
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
      {uploadedImageUrl && (
        <img
          src={URL.createObjectURL(uploadedImageUrl)}
          alt="image"
          height={200}
          width={100}
        />
      )}
    </>
  );
};

export default Upload;
