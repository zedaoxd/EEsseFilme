import { Pagination, Stack } from "@mui/material";

type Props = {
  pageCount: number;
  onChange: (pageNumber: number) => void;
  page: number;
  color?: "primary" | "secondary" | "standard";
};

const AppPagination = ({ pageCount, color, onChange, page }: Props) => {
  return (
    <Stack spacing={2}>
      <Pagination
        count={pageCount}
        variant="outlined"
        color={color || "primary"}
        page={page + 1}
        onChange={(event, number) => onChange(number)}
      />
    </Stack>
  );
};

export default AppPagination;
