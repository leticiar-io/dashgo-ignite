import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
  isCurrent?: boolean;
  number: number;
  onPageChange: (page: number) => void;
}

export function PaginationItem({
  isCurrent = false,
  onPageChange,
  number,
}: PaginationItemProps) {
  return isCurrent ? (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      colorScheme="purple"
      disabled
      _disabled={{
        bg: "purple.500",
        cursor: "default",
        _hover: "purple.500",
      }}
    >
      {number}
    </Button>
  ) : (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      bg="gray.700"
      _hover={{ bg: "gray.500" }}
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  );
}
