'use client';

import LayoutDashboard from "@/Layouts/LayoutDashboard";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Avatar, Box, Button, Card, CardBody, CardHeader, Flex, HStack, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { useRef, useState } from "react";

export default function Show() {
    const { prescription } = usePage().props;
    const [selectedIndex, setSelectedIndex] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const toast = useToast();

    const countAge = (date) => {
        const today = new Date();
        const birthDate = new Date(date);
        const m = today.getMonth() - birthDate.getMonth();
        let age = today.getFullYear() - birthDate.getFullYear();

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }

    const setTimeBeforeAfterMeal = (data) => {
        switch (data) {
            case 'before':
                return 'Sebelum Makan';
            case 'after':
                return 'Sesudah Makan';
            case 'anytime':
                return 'Kapan Saja';
            default:
                return 'Tidak Diketahui';
        }
    }

    const obatHabis = (details) => {
        const maxDaysToEmpty = Math.max(...details.map(detail => detail.days_to_empty));
        const detailWithMaxDays = details.find(detail => detail.days_to_empty === maxDaysToEmpty);
        return detailWithMaxDays ? detailWithMaxDays.empty_date : 'N/A';
    }

    const { data, setData, delete: deletePrescription, processing, errors } = useForm({});

    const handleDelete = () => {
        deletePrescription(route('pemeriksaan.destroy', prescription.id), {
            onSuccess: () => {
                toast({
                    title: "Success",
                    description: "Data pemeriksaan berhasil dihapus",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                    position: "top-right",
                });
            },
            onError: (errors) => {
                toast({
                    title: "Error",
                    description: errors.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                    position: "top-right",
                });
            },
        })
    }

    return (
        <>
            <LayoutDashboard>
                <Card borderRadius={20}>
                    <Flex justifyContent="space-between" gap={5} m={5}>
                        <Card w={"30%"} borderRadius={15} variant={"outline"} boxShadow={"none"}>
                            <CardHeader>
                                <Avatar
                                    size="ful"
                                    name={prescription.pasien.name}
                                    src={prescription.pasien.avatar ? prescription.pasien.avatar : "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100270.jpg"}
                                    alignItems={"center"}
                                />
                            </CardHeader>
                            <CardBody>
                                <Text align={"center"} size={"xl"} fontWeight={"bold"}>{prescription.pasien.name}</Text>
                                <Text align={"center"} color={"#A3AED0"}>{prescription.pasien.role}</Text>
                            </CardBody>
                        </Card>
                        <Card w={"30%"} borderRadius={15} variant={"outline"} boxShadow={"none"}>
                            <CardHeader>
                                <Text align={"center"} size={"xl"} fontWeight={"bold"}>Detail Pasien</Text>
                            </CardHeader>
                            <CardBody>
                                <Text color={"#A3AED0"}>Nama</Text>
                                <Text>{prescription.pasien.name}</Text>
                                <Text color={"#A3AED0"} mt={2}>Umur</Text>
                                <Text>{countAge(prescription.pasien.birth_date)} Tahun</Text>
                                <Text color={"#A3AED0"} mt={2}>Jenis Kelamin</Text>
                                <Text>{prescription.pasien.gender}</Text>
                                <Text color={"#A3AED0"} mt={2}>Alamat</Text>
                                <Text>{prescription.pasien.address}</Text>
                            </CardBody>
                        </Card>
                        <Card w={"30%"} borderRadius={15} variant={"outline"} boxShadow={"none"}>
                            <CardHeader>
                                <Text align={"center"} size={"xl"} fontWeight={"bold"}>Obat yang dikonsumsi</Text>
                            </CardHeader>
                            <CardBody>
                                {prescription.details && prescription.details.length > 0 ? (
                                    <>
                                        <Text color={"#A3AED0"}>Nama obat</Text>
                                        <Text>{prescription.details[selectedIndex].medicine}</Text>
                                        <Text color={"#A3AED0"} mt={2}>Dosis</Text>
                                        <Text>{prescription.details[selectedIndex].dosage}</Text>
                                        <Text color={"#A3AED0"} mt={2}>Aturan konsumsi</Text>
                                        <Text>{prescription.details[selectedIndex].aturan_konsumsi}X Sehari</Text>
                                        <Text color={"#A3AED0"} mt={2}>Waktu Minum</Text>
                                        <Text>{setTimeBeforeAfterMeal(prescription.details[selectedIndex].time_before_after_meal)}</Text>
                                        <Text color={"#A3AED0"} mt={2}>Status</Text>
                                        <Text>{prescription.details[selectedIndex].status}</Text>
                                        <HStack mt={2} spacing="4" justify="center">
                                            {prescription.details.map((detail, index) => (
                                                <Button
                                                    key={index}
                                                    variant={selectedIndex === index ? "solid" : "outline"}
                                                    colorScheme="blue"
                                                    onClick={() => setSelectedIndex(index)}
                                                >
                                                    {index + 1}
                                                </Button>
                                            ))}
                                        </HStack>
                                    </>
                                ) : (
                                    <Text align={"center"} color={"#A3AED0"}>Tidak ada data obat yang dikonsumsi</Text>
                                )}

                            </CardBody>
                        </Card>
                    </Flex>
                    <Flex justifyContent={"space-between"} gap={5} m={5}>
                        <Box w={"65%"} borderRadius={15} boxShadow={"none"} borderWidth='1px' >
                            <Flex justifyContent={"space-around"} m={5}>
                                <Text size={"xl"} fontWeight={"bold"} alignSelf={"center"}>Masa Pengobatan</Text>
                                <Box>
                                    <Text color={"#A3AED0"}>Mulai Pengobatan</Text>
                                    <Text color={"#2B3674"}>{new Date(prescription.created_at).toLocaleDateString("id-ID")}</Text>
                                </Box>
                                <Box>
                                    <Text color={"#A3AED0"}>Selesai Pengobatan</Text>
                                    <Text color={"#2B3674"}>{obatHabis(prescription.details)}</Text>
                                </Box>
                            </Flex>
                        </Box>
                        <Flex w={"30%"} gap={5} justifyContent={"space-between"}>
                            <Button w={"50%"} variant="outline" size={"md"} borderColor={"#63B3ED"} color={"#63B3ED"} borderRadius={8} onClick={onOpen}>Hapus</Button>
                            <Button
                                w={"50%"}
                                variant="solid"
                                size={"md"}
                                borderColor={"#63B3ED"}
                                bgColor={"#63B3ED"}
                                color={"white"}
                                borderRadius={8}
                                onClick={() => router.visit(route('pemeriksaan.edit', prescription.id))}
                            >
                                Edit
                            </Button>
                        </Flex>
                    </Flex>
                </Card>
            </LayoutDashboard>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isCentered
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Hapus Pemeriksaan
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Apakah Anda yakin ingin menghapus data pemeriksaan ini? Tindakan ini tidak dapat dikembalikan.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Batal
                            </Button>
                            <Button colorScheme='red' onClick={handleDelete} ml={3}>
                                Hapus
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>

    );
}