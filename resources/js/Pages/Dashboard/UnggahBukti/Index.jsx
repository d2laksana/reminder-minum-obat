'use client';

import Pagination from "@/Components/Pagination";
import LayoutDashboard from "@/Layouts/LayoutDashboard";
import { Box, Card, CardBody, CardFooter, CardHeader, Flex, IconButton, InputRightElement, Progress, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, Input, Button, InputGroup, FormControl, FormLabel, Select, Checkbox, CheckboxGroup, Image, Textarea, useToast } from "@chakra-ui/react";
import { Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { FaPen, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { useDropzone } from 'react-dropzone';
import { FaUpload } from "react-icons/fa6";
import { useForm } from "@inertiajs/react";

export default function Index() {
    const { prescriptions } = usePage().props;
    const toast = useToast();
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();

    const [preview, setPreview] = useState(null);
    const { data, setData, post, processing, errors } = useForm({
        prescription_detail_id: "",
        status: "",
        photo: {},
        description: "",
    });

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const handleImageUpload = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setData('photo', file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route('pasien.bukti.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setData('prescription_detail_id', "");
                setData('status', "");
                setData('photo', {});
                setData('note', "");
                setPreview(null);
                return toast({
                    title: "Berhasil",
                    description: "Bukti foto berhasil diunggah",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            }, onError: (errors) => {
                console.log(errors);
                return toast({
                    title: "Error",
                    description: "Bukti foto gagal diunggah",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            }
        });
    }

    return (
        <LayoutDashboard>
            <Card borderRadius={"xl"} p={10}>
                <form onSubmit={handleSubmit}>
                    <Flex justifyContent={"space-between"} mb={5} gap={10} alignItems={"center"}>
                        <div {...getRootProps({ className: 'dropzone' })} style={{ width: "30%" }}>
                            <Box bg={"#FAFCFE"} borderRadius={"xl"} display={"flex"} alignItems={"center"} p={5} border={"1px"} borderColor={"#E0E5F2"} borderStyle={"dashed"} justifyContent={"center"} flexDir={"column"} h={"500px"} cursor={"pointer"}>
                                <input {...getInputProps()} onChange={handleImageUpload} />
                                {preview && <Image src={preview} alt="Preview" mt={5} />}

                                {!preview && (
                                    <>
                                        <FaUpload size={50} color="#63B3ED" />
                                        <Text fontSize={"xl"} fontWeight={"bold"} color={"#63B3ED"} mt={5}>Unggah bukti foto</Text>
                                    </>
                                )}
                            </Box>
                        </div>
                        <Box w={"70%"}>
                            <Text fontSize={"2xl"} fontWeight={"bold"}>Unggah Bukti Foto</Text>
                            <Text fontSize={"md"} color={"gray.400"} mt={1}>Unggah foto bukti konsumsi obat untuk mendapatkan koin dan menambah catatan pencapaian.</Text>

                            <Box mt={10} w={"50%"}>
                                <FormControl isRequired mt={5}>
                                    <FormLabel>Nama obat</FormLabel>
                                    <InputGroup>
                                        <Select placeholder="Pilih obat" height={"50"} borderRadius={"2xl"} onChange={(e) => setData('prescription_detail_id', e.target.value)}>
                                            {prescriptions && prescriptions.details && prescriptions.details.map((prescription, index) => (
                                                prescription.progress != 100 && <option key={index} value={prescription.id}>{prescription.medicine}</option>
                                            ))}
                                        </Select>
                                    </InputGroup>
                                </FormControl>

                                <FormControl mt={5}>
                                    <FormLabel>Catatan untuk kami</FormLabel>
                                    <Textarea placeholder="Masukkan catatan untuk kami" height={"50"} borderRadius={"2xl"} onChange={(e) => setData('description', e.target.value)} />
                                </FormControl>

                                {/* Checkbox Akhiri masa konsumsi */}
                                <FormControl mt={5}>
                                    <CheckboxGroup colorScheme="brand" onChange={(value) => setData('status', value.toString())}>
                                        <Checkbox value={"true"}>Akhiri masa konsumsi</Checkbox>
                                    </CheckboxGroup>
                                </FormControl>

                                <Button type="submit" isLoading={processing} w={"100%"} mt={"10"} borderRadius={"2xl"} colorScheme="brand" size="lg">Unggah</Button>
                            </Box>
                        </Box>
                    </Flex>
                </form>
            </Card>
        </LayoutDashboard>
    );
}
