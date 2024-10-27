'use client';

import Pagination from "@/Components/Pagination";
import LayoutDashboard from "@/Layouts/LayoutDashboard";
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, IconButton, Input, InputGroup, InputRightElement, Progress, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { FaPen, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { Inertia } from '@inertiajs/inertia';

export default function Index() {
    const { prescriptions, filters } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');
    const [data, setData] = useState(prescriptions);

    // Fungsi untuk menangani perubahan input pencarian
    // const handleSearchChange = (e) => {
    //     const value = e.target.value;
    //     setSearch(value);

    //     // Melakukan permintaan pencarian ke server setelah input berubah
    //     if (value.length > 2) {
    //         Inertia.visit(route('pemeriksaan'), {
    //             method: 'get',
    //             data: { search: value },
    //             only: ['prescriptions', 'filters'],
    //             preserveState: true,
    //             replace: true,
    //             preserveScroll: true,
    //             onSuccess: (page) => {
    //                 setData(page.props.prescriptions);
    //             },
    //         });
    //     } else {
    //         Inertia.visit(route('pemeriksaan'), {
    //             method: 'get',
    //             only: ['prescriptions', 'filters'],
    //             preserveState: true,
    //             replace: true,
    //             preserveScroll: true,
    //             onSuccess: (page) => {
    //                 setData(page.props.prescriptions);
    //             },
    //         });
    //     }
    // };

    // const handleSearchChange = (e) => {
    //     const value = e.target.value;
    //     setSearch(value);
    //     const test = new URLSearchParams(window.location.search).get(search) || '';
    //     console.log(test);
    // }


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
                            <Input
                                type="text"
                                placeholder="Masukan nama Pasien"
                            />
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
                                    <Th color="#A0AEC0" w="10%">Aksi</Th>
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
                                                <Progress value={50} colorScheme="blue" size="sm" w="full" />
                                            </Box>
                                        </Td>
                                        <Td>
                                            <Link href={route('pemeriksaan.show', prescription.id)}>
                                                <Button variant="outline" size={"sm"} borderColor={"#63B3ED"} color={"#63B3ED"} borderRadius={8}>
                                                    Detail
                                                </Button>
                                            </Link>
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
