'use client';

import LayoutDashboard from "@/Layouts/LayoutDashboard";
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Step, StepDescription, StepIcon, StepIndicator, StepNumber, Stepper, StepSeparator, StepStatus, StepTitle, Textarea, useToast } from "@chakra-ui/react";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

export default function Create() {
    const toast = useToast();
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        { title: "Pertama", description: "Data Pasien & Diagnosa" },
        { title: "Kedua", description: "Resep & Panduan" },
    ]

    const nextStep = () => {
        activeStep < 1 ? setActiveStep(activeStep + 1) : null;
        window.scrollTo(0, 0);
    }

    const prevStep = () => {
        activeStep > 0 ? setActiveStep(activeStep - 1) : null;
        window.scrollTo(0, 0);
    }

    const { data, setData, post, processing, errors } = useForm({
        bpjs_number: '',
        diagnosis: '',
        resep: [
            {
                medicine: '',
                quantity: '1',
                dosage: '',
                aturan_konsumsi: '1',
                total_konsumsi: '1',
                instructions: '',
                status: '',
                time_before_after_meal: ''
            }
        ]
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('pemeriksaan.store'), {
            onSuccess: () => {
                toast({
                    title: "Success",
                    description: "Berhasil menambahkan data pemeriksaan",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                    position: "top-right",
                });
            },
            onError: (errors) => {
                console.log(errors);
                toast({
                    title: "Error",
                    description: errors.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                    position: "top-right",
                });
            }
        })
    }

    return (
        <LayoutDashboard>
            <Card w={"full"} mb={10}>
                <CardHeader>
                    <Heading size={"md"}>{steps[activeStep].description}</Heading>
                </CardHeader>
                <form>
                    <CardBody>
                        {activeStep === 0 && (
                            <>
                                <FormControl id="bpjs_number" isInvalid={errors.bpjs_number} isRequired>
                                    <FormLabel>No BPJS Pasien</FormLabel>
                                    <Input type="text" placeholder="Masukkan No BPJS Pasien" value={data.bpjs_number} onChange={(e) => setData('bpjs_number', e.target.value)} />
                                    <FormErrorMessage>{errors.bpjs_number}</FormErrorMessage>
                                </FormControl>
                                <FormControl id="diagnosis" mt={4} isInvalid={errors.diagnosis} isRequired>
                                    <FormLabel>Diagnosa</FormLabel>
                                    <Input type="text" placeholder="Masukkan Diagnosa" value={data.diagnosis} onChange={(e) => setData('diagnosis', e.target.value)} />
                                    <FormErrorMessage>{errors.diagnosis}</FormErrorMessage>
                                </FormControl>
                            </>
                        )}
                        {activeStep === 1 && (
                            <>
                                <Button variant={"brand"} size={"sm"} leftIcon={<FaPlus />} onClick={() => {
                                    setData('resep', [...data.resep, { medicine: '', quantity: '', dosage: '', instructions: '', status: '', time_before_after_meal: '' }]);
                                }}>
                                    Tambah Resep
                                </Button>
                                {data.resep.map((resep, index) => (
                                    <Card mt={4} p={4} key={index}>
                                        <FormControl id="medicine" isRequired>
                                            <FormLabel>Nama Obat</FormLabel>
                                            <Input type="text" placeholder="Masukan nama obat" value={data.resep[index].medicine} onChange={(e) => {
                                                const resep = data.resep.map((item, i) => {
                                                    if (i === index) {
                                                        item.medicine = e.target.value;
                                                    }
                                                    return item;
                                                });
                                                setData('resep', resep);
                                            }}
                                            />
                                        </FormControl>
                                        <Flex justifyContent={"space-between"} mt={4} gap={5}>
                                            <FormControl id="quantity" isRequired>
                                                <FormLabel>Jumlah Obat</FormLabel>
                                                <NumberInput defaultValue={data.resep[index].quantity} min={1} onChange={(value) => {
                                                    const resep = data.resep.map((item, i) => {
                                                        if (i === index) {
                                                            item.quantity = value;
                                                        }
                                                        return item;
                                                    });
                                                    setData('resep', resep);
                                                }}>
                                                    <NumberInputField />
                                                    <NumberInputStepper>
                                                        <NumberIncrementStepper />
                                                        <NumberDecrementStepper />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                            </FormControl>

                                            <FormControl id="dosage" isRequired>
                                                <FormLabel>Dosis</FormLabel>
                                                <Input type="text" placeholder="Masukan dosis obat" value={data.resep[index].dosage} onChange={(e) => {
                                                    const resep = data.resep.map((item, i) => {
                                                        if (i === index) {
                                                            item.dosage = e.target.value;
                                                        }
                                                        return item;
                                                    });
                                                    setData('resep', resep);
                                                }} />
                                            </FormControl>
                                        </Flex>

                                        <Flex justifyContent={"space-between"} mt={4} gap={5}>
                                            <FormControl id="aturan_konsumsi" isRequired>
                                                <FormLabel>Aturan konsumsi / hari</FormLabel>
                                                <NumberInput defaultValue={data.resep[index].aturan_konsumsi} min={0} max={4} onChange={(value) => {
                                                    const resep = data.resep.map((item, i) => {
                                                        if (i === index) {
                                                            item.aturan_konsumsi = value;
                                                        }
                                                        return item;
                                                    });
                                                    setData('resep', resep);
                                                }}>
                                                    <NumberInputField />
                                                    <NumberInputStepper>
                                                        <NumberIncrementStepper />
                                                        <NumberDecrementStepper />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                            </FormControl>
                                            <FormControl id="total_konsumsi" isRequired>
                                                <FormLabel>Total konsumsii</FormLabel>
                                                <NumberInput defaultValue={data.resep[index].total_konsumsi} min={1} onChange={(value) => {
                                                    const resep = data.resep.map((item, i) => {
                                                        if (i === index) {
                                                            item.total_konsumsi = value;
                                                        }
                                                        return item;
                                                    });
                                                    setData('resep', resep);
                                                }}>
                                                    <NumberInputField />
                                                    <NumberInputStepper>
                                                        <NumberIncrementStepper />
                                                        <NumberDecrementStepper />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                            </FormControl>
                                        </Flex>
                                        <FormControl mt={4} id="instructions" isRequired>
                                            <FormLabel>Panduan</FormLabel>
                                            <Textarea placeholder="Masukan Petunjuk minum obat" value={data.resep[index].instructions} onChange={(e) => {
                                                const resep = data.resep.map((item, i) => {
                                                    if (i === index) {
                                                        item.instructions = e.target.value;
                                                    }
                                                    return item;
                                                });
                                                setData('resep', resep);
                                            }}
                                            />
                                        </FormControl>
                                        <Flex justifyContent={"space-between"} mt={4} gap={5}>
                                            <FormControl id="status" isRequired>
                                                <FormLabel>Status</FormLabel>
                                                <Select placeholder="Status konsumsi obat" onChange={(e) => {
                                                    const resep = data.resep.map((item, i) => {
                                                        if (i === index) {
                                                            item.status = e.target.value;
                                                        }
                                                        return item;
                                                    });
                                                    setData('resep', resep);
                                                }}
                                                >
                                                    <option value={"wajib habis"}>Wajib Habis</option>
                                                    <option value={"conditional"}>Conditional</option>
                                                </Select>
                                            </FormControl>

                                            <FormControl id="time_before_after_meal" isRequired>
                                                <FormLabel>Waktu Konsumsi</FormLabel>
                                                <Select placeholder="Pilih waktu konsumsi obat" onChange={(e) => {
                                                    const resep = data.resep.map((item, i) => {
                                                        if (i === index) {
                                                            item.time_before_after_meal = e.target.value;
                                                        }
                                                        return item;
                                                    });
                                                    setData('resep', resep);
                                                }}
                                                >
                                                    <option value={"before"}>Sebelum Makan</option>
                                                    <option value={"after"}>Setelah Makan</option>
                                                    <option value={"anytime"}>Anytime</option>
                                                </Select>
                                            </FormControl>
                                        </Flex>
                                        <Flex justifyContent={"end"} mt={4}>
                                            <Button colorScheme={"red"} size={"sm"} leftIcon={<IoMdClose />} onClick={() => {
                                                const resep = data.resep.filter((_, i) => i !== index);
                                                setData("resep", resep);
                                            }}>
                                                Hapus
                                            </Button>
                                        </Flex>
                                    </Card>
                                ))}
                            </>
                        )}
                    </CardBody>
                </form>
                <CardFooter>
                    <Flex justifyContent={"end"} w={"100%"}>
                        <>
                            <Button
                                onClick={prevStep}
                                fontSize="md"
                                variant="outline"
                                colorScheme="gray"
                                fontWeight="500"
                                px={"7"}
                                h="50"
                                me={3}
                            >
                                Sebelumnya
                            </Button>
                            {activeStep < 1 ? (
                                <Button
                                    onClick={nextStep}
                                    fontSize="md"
                                    variant="brand"
                                    fontWeight="500"
                                    px={"7"}
                                    h="50"
                                >
                                    Selanjutnya
                                </Button>
                            ) : (
                                activeStep === 1 && (
                                    <Button
                                        onClick={handleSubmit}
                                        isLoading={processing}
                                        fontSize="md"
                                        variant="brand"
                                        fontWeight="500"
                                        px={"7"}
                                        h="50"
                                    >
                                        Simpan
                                    </Button>
                                )
                            )}
                        </>
                    </Flex>
                </CardFooter>
            </Card>
        </LayoutDashboard>
    );
}