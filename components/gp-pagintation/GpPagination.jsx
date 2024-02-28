import { Box, Pagination, Stack } from "@mui/material";
import React from "react";

const GpPagination = ({ handleChangePage, page, totalPages, rowsPerPage }) => {
  return (
    <Box
      sx={{
        width: "95%",
        display: "flex",
        justifyContent: "center",
        margin: "2rem",
      }}
    >
      <Stack spacing={2}>
        <Pagination
          color="primary"
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          pageSize={rowsPerPage}
        />
      </Stack>
    </Box>
  );
};

export default GpPagination;
