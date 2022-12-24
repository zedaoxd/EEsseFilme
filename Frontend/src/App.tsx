import { useEffect, useState } from "react";
import "./App.css";
import axios, { AxiosRequestConfig } from "axios";

function App() {
  const [image, setImage] = useState<Uint8Array>();

  useEffect(() => {
    axios.get("http://localhost:8080/api/movies/1").then((response) => {
      setImage(response.data.imageByte);
    });
  }, [image]);

  return (
    <div className="App">
      <img src={`data:image;base64, ${image}`} />
    </div>
  );
}

export default App;
