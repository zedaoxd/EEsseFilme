import { Pagination, Stack } from "@mui/material";

type Props = {
  pageCount: number;
  range?: number;
  onChange: (pageNumber: number) => void;
  page: number;
};

const AppPagination = ({ pageCount, range, onChange, page }: Props) => {
  return (
    <Stack spacing={2}>
      <Pagination
        count={pageCount}
        variant="outlined"
        color="primary"
        page={page + 1}
        onChange={(event, number) => onChange(number)}
      />
    </Stack>
  );
};

export default AppPagination;
