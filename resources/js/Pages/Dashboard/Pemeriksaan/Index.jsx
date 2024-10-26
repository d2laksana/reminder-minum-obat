'use client';

import Pagination from "@/Components/Pagination";
import LayoutDashboard from "@/Layouts/LayoutDashboard";
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Progress, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Link, usePage } from "@inertiajs/react";
import { FaPen, FaPlus, FaSearch, FaTrash } from "react-icons/fa";


export default function Index() {
    const { prescriptions } = usePage().props;

    return (
        <LayoutDashboard>
            <Card>
                <CardHeader>
                    <Flex justifyContent="space-between" gap={5} mt={5}>
                        <InputGroup w={"30%"} style={{ color: '#E2E8F0' }}>
                            <InputRightElement
                                pointerEvents="none"
                                children={<FaSearch style={{ color: '#E2E8F0' }} />}
                            />
                            <Input type="text" placeholder="Masukan nama Pasien" />
                        </InputGroup>
                        <Link href={route('pemeriksaan.create')}>
                            <Button variant="outline" size={"md"} borderColor={"#63B3ED"} color={"#63B3ED"} borderRadius={8}>
                                <FaPlus style={{ marginRight: 10 }} size={15} />
                                Tambah
                            </Button>
                        </Link>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <TableContainer>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th color="#A0AEC0" w="5%">No</Th>
                                    <Th color="#A0AEC0" w="20%">Nama</Th>
                                    <Th color="#A0AEC0" w="20%">Tanggal Mulai Pengobatan</Th>
                                    <Th color="#A0AEC0" w="20%">Perkiraan Selesai Pengobatan</Th>
                                    <Th color="#A0AEC0" w="25%">Progress</Th>
                                    <Th color="#A0AEC0" w="10%">Edit</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {prescriptions.data.map((prescription, index) => (
                                    <Tr key={prescription.id}>
                                        <Td>{index + 1}</Td>
                                        <Td>{prescription.pasien.name}</Td>
                                        <Td textAlign={"center"}>30/09/2024</Td>
                                        <Td textAlign={"center"}>30/09/2024</Td>
                                        <Td>
                                            <Box>
                                                <Text color={"#63B3ED"}>50%</Text>
                                                <Progress value={50} color={"#63B3ED"} size={"sm"} w={"full"} />
                                            </Box>
                                        </Td>
                                        <Td>
                                            <Flex justifyContent={"center"}>
                                                <Link href="#">
                                                    <IconButton aria-label="Edit" icon={<FaPen />} size={"sm"} color={"black"} />
                                                </Link>
                                                <Link href={route('pemeriksaan.edit', prescription.id)}>
                                                    <IconButton aria-label="Delete" icon={<FaTrash />} size={"sm"} color={"black"} />
                                                </Link>
                                            </Flex>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </CardBody>
                <CardFooter>
                    <Pagination prescriptions={prescriptions} />
                </CardFooter>

            </Card>
        </LayoutDashboard>
    );
}