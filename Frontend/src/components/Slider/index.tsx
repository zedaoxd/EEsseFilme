import { Link } from "react-router-dom";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import Movie from "../../@Types/movie";
import "./styles.scss";

type Props = {
  movies?: Movie[];
};

const Slider = ({ movies }: Props) => {
  SwiperCore.use([Autoplay]);

  return (
    <Swiper
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
        stopOnLastSlide: false,
        pauseOnMouseEnter: true,
      }}
      loop
      spaceBetween={10}
      slidesPerView={5}
      navigation={true}
      modules={[Navigation]}
      pagination={{ clickable: true }}
      grabCursor
      className="m-slider"
    >
      {movies?.map((m) => (
        <SwiperSlide key={m.id}>
          <Link to={`/movie/${m.id}`}>
            <img src={`data:image;base64, ${m.imageByte}`} />
          </Link>
          <span>{m.originTitle}</span>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
