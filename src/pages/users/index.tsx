import {
  Alert,
  AlertIcon,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  IconButton,
  Spinner,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  VStack,
  Link as ChakraLink
} from "@chakra-ui/react";

import Link from "next/link";
import { RiAddLine, RiPencilLine, RiRefreshLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

import { useQuery } from "react-query";
import { api } from "../../services/api";
import { useUsers } from "../../services/hooks/useUsers";
import { useState } from "react";
import { queryClient } from "../../services/queryClient";

export default function UserList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, refetch, error } = useUsers(page);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(
      ["user", userId],
      async () => {
        const response = await api.get(`users/${userId}`);

        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10 // 10 minutos
      }
    );
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching ? (
                <Spinner size="sm" color="gray.500" ml="4" />
              ) : (
                <IconButton
                  aria-label="Racarregar lista"
                  type="button"
                  size="xs"
                  fontSize="sm"
                  ml="4"
                  colorScheme="whiteAlpha"
                  icon={<Icon as={RiRefreshLine} />}
                  onClick={(e) => refetch()}
                />
              )}
            </Heading>

            <Link href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="16" />}
              >
                Criar
              </Button>
            </Link>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Alert status="error" color="black">
                <AlertIcon />
                <AlertTitle mr={2}>Ooops!</AlertTitle>
                Não foi possivel obter os usuários
              </Alert>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Cadastrado</Th>}
                    <Th width="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.users.map((user) => {
                    return (
                      <Tr key={user.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="purple" />
                        </Td>
                        <Td>
                          <Flex align="center">
                            <Flex ml="3">
                              <Box>
                                <Stack spacing="1">
                                  <ChakraLink
                                    color="purple.400"
                                    onMouseEnter={() =>
                                      handlePrefetchUser(user.id)
                                    }
                                  >
                                    <Text fontWeight="bold">{user.name}</Text>
                                  </ChakraLink>
                                  <Text fontSize="sm" color="gray.300">
                                    {user.email}
                                  </Text>
                                </Stack>
                              </Box>
                            </Flex>
                          </Flex>
                        </Td>
                        {isWideVersion && <Td> {user.createdAt}</Td>}
                        <Td>
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="purple"
                            //onMouseEnter={() => handlePrefetchUser(user.id)}
                            leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                          >
                            Editar
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
