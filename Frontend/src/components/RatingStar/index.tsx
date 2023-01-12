import { Rating, Stack } from "@mui/material";
import "./styles.scss";

type Props = {
  readable: boolean;
  initialValue?: number;
};

const RatingStar = ({ readable, initialValue }: Props) => {
  return (
    <>
      <h3 className="rs-rating">
        Avaliação do Filme:
        <Stack spacing={1} style={{ display: "inline-block" }}>
          <Rating
            name={`${readable ? "half-rating-read" : "half-rating"}`}
            precision={0.5}
            readOnly
            value={initialValue ? initialValue : 0}
          />
        </Stack>
      </h3>
    </>
  );
};

export default RatingStar;
