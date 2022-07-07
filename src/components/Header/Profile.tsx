import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {
  return (
    <Flex align={"center"}>
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Letícia Rodrigues</Text>
          <Text color="gray.300" fontSize="small">
            leticia.rodrigues@gmail.com
          </Text>
        </Box>
      )}
      <Avatar
        size="md"
        name="Letícia Rodrigues"
        src="https://github.com/leticiar-io.png"
      />
    </Flex>
  );
}
