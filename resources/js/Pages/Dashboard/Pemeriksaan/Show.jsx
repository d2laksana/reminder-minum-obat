'use client';

import LayoutDashboard from "@/Layouts/LayoutDashboard";
import { Avatar, Box, Button, Card, CardBody, CardHeader, Flex, HStack, Text } from "@chakra-ui/react";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Show() {
    const { prescription } = usePage().props;
    const [selectedIndex, setSelectedIndex] = useState(0);

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


    return (
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
                            <Text color={"#A3AED0"}>Nama obat</Text>
                            <Text>{prescription.details[selectedIndex].medicine}</Text>
                            <Text color={"#A3AED0"} mt={2}>Dosis</Text>
                            <Text>{prescription.details[selectedIndex].medicine}</Text>
                            <Text color={"#A3AED0"} mt={2}>Aturan konsumsi</Text>
                            <Text>3x sehari</Text>
                            <Text color={"#A3AED0"} mt={2}>Waktu Minum</Text>
                            <Text>{prescription.details[selectedIndex].time_before_after_meal}</Text>
                            <Text color={"#A3AED0"} mt={2}>Status</Text>
                            <Text>Kondisional</Text>
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
                        </CardBody>
                    </Card>
                </Flex>
                <Flex justifyContent={"space-between"} gap={5} m={5}>
                    <Box w={"65%"} borderRadius={15} boxShadow={"none"} borderWidth='1px' >
                        <Flex justifyContent={"space-around"} m={5}>
                            <Text size={"xl"} fontWeight={"bold"} alignSelf={"center"}>Masa Pengobatan</Text>
                            <Box>
                                <Text color={"#A3AED0"}>Mulai Pengobatan</Text>
                                <Text color={"#2B3674"}>30/09/2024</Text>
                            </Box>
                            <Box>
                                <Text color={"#A3AED0"}>Selesai Pengobatan</Text>
                                <Text color={"#2B3674"}>30/09/2024</Text>
                            </Box>
                        </Flex>
                    </Box>
                    <Flex w={"30%"} gap={5} justifyContent={"space-between"}>
                        <Button w={"50%"} variant="outline" size={"md"} borderColor={"#63B3ED"} color={"#63B3ED"} borderRadius={8}>Hapus</Button>
                        <Link href={route('pemeriksaan.edit', prescription.id)}>
                            <Button w={"full"} variant="solid" size={"md"} borderColor={"#63B3ED"} bgColor={"#63B3ED"} color={"white"} borderRadius={8}>Edit</Button>
                        </Link>
                    </Flex>
                </Flex>
            </Card>
        </LayoutDashboard>
    );
}