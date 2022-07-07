import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface paginationProps {
  totalCountOfRegisters: number;
  registerPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 2;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter((page) => page > 0);
}

export function Pagination({
  totalCountOfRegisters,
  currentPage = 1,
  registerPerPage = 10,
  onPageChange,
}: paginationProps) {
  const lastPage = Math.floor(totalCountOfRegisters / registerPerPage);

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount))
      : [];

  return (
    <Stack
      direction={["column", "row"]}
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>200</strong>
      </Box>
      <Stack direction="row" spacing="2">
        {
          // firt page and dotsđ
          currentPage > 1 + siblingsCount && (
            <>
              <PaginationItem onPageChange={onPageChange} number={1} />
              {currentPage > 2 + siblingsCount && (
                <Text color="gray.300" width="8" textAlign="center">
                  ...
                </Text>
              )}
            </>
          )
        }
        {
          // Preveious Page
          previousPages.length > 0 &&
            previousPages.map((page) => {
              return (
                <PaginationItem
                  onPageChange={onPageChange}
                  key={page}
                  number={page}
                />
              );
            })
        }
        <PaginationItem
          onPageChange={onPageChange}
          number={currentPage}
          isCurrent
        />
        {
          // Preveious Page
          nextPages.length > 0 &&
            nextPages.map((page) => {
              return (
                <PaginationItem
                  onPageChange={onPageChange}
                  key={page}
                  number={page}
                />
              );
            })
        }
        {
          //lastPage and dots
          currentPage + siblingsCount < lastPage && (
            <>
              {currentPage + 1 + siblingsCount < lastPage && (
                <Text color="gray.300" width="6" textAlign="center">
                  ...
                </Text>
              )}
              <PaginationItem onPageChange={onPageChange} number={lastPage} />
            </>
          )
        }
      </Stack>
    </Stack>
  );
}
