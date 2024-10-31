'use client';

import Pagination from "@/Components/Pagination";
import LayoutDashboard from "@/Layouts/LayoutDashboard";
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, IconButton, Input, InputGroup, InputRightElement, Progress, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { FaPen, FaPlus, FaSearch, FaTrash } from "react-icons/fa";

export default function Index() {
    const { prescriptions } = usePage().props;

    return (
        <LayoutDashboard>
            <Card borderRadius={"xl"} p={5}>
                <CardHeader>
                    <Text fontSize="xl" fontWeight="bold">Jadwal konsumsi obat</Text>
					<Text fontSize="md" color="gray.500">Berikut adalah list jadwal konsumsi obat bagi anda</Text>
                </CardHeader>
                <CardBody>
                    <TableContainer>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th color="#A0AEC0" w="5%">No</Th>
                                    <Th color="#A0AEC0" w="20%">Nama Obat</Th>
                                    <Th color="#A0AEC0" w="20%">Instruksi Konsumsi</Th>
                                    <Th color="#A0AEC0" w="20%">Dosis Konsumsi</Th>
                                    <Th color="#A0AEC0" w="25%">Waktu Konsumsi</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
								{prescriptions && prescriptions.details.map((prescription, index) => (
									<Tr key={index}>
										<Td>{index + 1}</Td>
										<Td>{prescription.medicine}</Td>
										<Td>{prescription.aturan_konsumsi}x Sehari</Td>
										<Td>{prescription.dosage}</Td>
										<Td>{prescription.time_before_after_meal == 'after' ? 'Setelah makan' : 'Sebelum makan'}</Td>
									</Tr>
								))}

                                {!prescriptions && (
                                    <Tr>
                                        <Td colSpan="5" textAlign="center">Anda belum memiliki jadwal konsumsi obat</Td>
                                    </Tr>
                                )}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </CardBody>
            </Card>
        </LayoutDashboard>
    );
}
