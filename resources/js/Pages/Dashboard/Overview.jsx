'use client';

import LayoutDashboard from "@/Layouts/LayoutDashboard";
import { Box, Card, Flex, Select, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";
import { FaUser } from "react-icons/fa";

// Registrasi elemen yang dibutuhkan Chart.js versi 4.4.6
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);



export default function Overview() {
    const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleString('default', { month: 'long' })); // Default ke bulan sekarang
    // Data harian untuk masing-masing bulan (contoh data)
    const dailyDataByMonth = {
        January: [80, 95, 70, 100, 90, 110, 75, 85, 95, 100, 120, 130, 90, 100, 80, 95, 100, 110, 120, 130, 90, 100, 80, 95, 100, 110, 120, 130, 90, 100, 80],
        February: [60, 85, 75, 80, 70, 90, 65, 75, 85, 80, 60, 70, 75, 85, 70, 80, 65, 75, 85, 80, 60, 70, 75, 85, 70, 80],
        March: [90, 110, 95, 105, 100, 120, 110, 115, 120, 130, 100, 110, 115, 120, 110, 120, 130, 125, 120, 115, 110, 105, 100, 110, 115, 120, 130],
        April: [70, 90, 80, 85, 75, 95, 90, 85, 80, 70, 90, 80, 85, 75, 95, 90, 85, 80, 70, 90, 80, 85, 75, 95, 90, 85, 80],
        May: [100, 120, 110, 115, 120, 130, 100, 110, 115, 120, 110, 120, 130, 125, 120, 115, 110, 105, 100, 110, 115, 120, 130, 100, 110, 115, 120],
        June: [80, 95, 70, 100, 90, 110, 75, 85, 95, 100, 120, 130, 90, 100, 80, 95, 100, 110, 120, 130, 90, 100, 80, 95, 100, 110, 120, 130, 90, 100, 80],
        July: [60, 85, 75, 80, 70, 90, 65, 75, 85, 80, 60, 70, 75, 85, 70, 80, 65, 75, 85, 80, 60, 70, 75, 85, 70, 80],
        August: [90, 110, 95, 105, 100, 120, 110, 115, 120, 130, 100, 110, 115, 120, 110, 120, 130, 125, 120, 115, 110, 105, 100, 110, 115, 120, 130],
        September: [70, 90, 80, 85, 75, 95, 90, 85, 80, 70, 90, 80, 85, 75, 95, 90, 85, 80, 70, 90, 80, 85, 75, 95, 90, 85, 80],
        October: [100, 120, 110, 115, 120, 130, 100, 110, 115, 120, 110, 120, 130, 125, 120, 115, 110, 105, 100, 110, 115, 120, 130, 100, 110, 115, 120],
        November: [80, 95, 70, 100, 90, 110, 75, 85, 95, 100, 120, 130, 90, 100, 80, 95, 100, 110, 120, 130, 90, 100, 80, 95, 100, 110, 120, 130, 90, 100, 80],
        December: [60, 85, 75, 80, 70, 90, 65, 75, 85, 80, 60, 70, 75, 85, 70, 80, 65, 75, 85, 80, 60, 70, 75, 85, 70],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: true },
            tooltip: {
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                titleColor: "#000000",
                bodyColor: "#000000",
                borderColor: "#FFFFFF",
                borderWidth: 1,
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: "#FFFFFF" },
            },
            y: {
                beginAtZero: true,
                grid: { color: "rgba(255, 255, 255, 0.2)" },
                ticks: {
                    color: "#FFFFFF",
                    stepSize: 50,
                },

            },
        },
    };

    // Fungsi untuk mendapatkan data harian berdasarkan bulan yang dipilih
    const getData = () => {
        const dailyData = dailyDataByMonth[selectedMonth] || [];
        return {
            labels: Array.from({ length: dailyData.length }, (_, i) => `Day ${i + 1}`),
            datasets: [
                {
                    data: dailyData,
                    backgroundColor: "#FFFFFF",
                    borderRadius: 20,
                },
            ],
        };
    };

    return (
        <LayoutDashboard>
            <Flex direction={"column"} align="center" gap={10}>
                <Flex direction={"row"} align="center" w={"100%"} justifyContent={"space-between"} gap={10}>
                    <Box
                        w={"100%"}
                        py={5}
                        px={7}
                        bg={"white"}
                        borderRadius={15}
                        boxShadow={"md"}
                        display={"flex"}
                        flexDirection={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Box>
                            <Text fontSize={"md"} color={"gray.400"} fontWeight={"500"}>Pasien dalam pantauan</Text>
                            <Text fontSize={"xl"} fontWeight={"bold"}>100</Text>
                        </Box>
                        <Box bg={"blue.300"} borderRadius={"xl"} p={4}>
                            <FaUser size={26} color="white" />
                        </Box>
                    </Box>
                    <Box
                        w={"100%"}
                        py={5}
                        px={7}
                        bg={"white"}
                        borderRadius={15}
                        boxShadow={"md"}
                        display={"flex"}
                        flexDirection={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Box>
                            <Text fontSize={"md"} color={"gray.400"} fontWeight={"500"}>Pasien baru</Text>
                            <Text fontSize={"xl"} fontWeight={"bold"}>43</Text>
                        </Box>
                        <Box bg={"blue.300"} borderRadius={"xl"} p={4}>
                            <FaUser size={26} color="white" />
                        </Box>
                    </Box>
                    <Box
                        w={"100%"}
                        py={5}
                        px={7}
                        bg={"white"}
                        borderRadius={15}
                        boxShadow={"md"}
                        display={"flex"}
                        flexDirection={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                    >
                        <Box>
                            <Text fontSize={"md"} color={"gray.400"} fontWeight={"500"}>Pasien sembuh</Text>
                            <Text fontSize={"xl"} fontWeight={"bold"}>2000+</Text>
                        </Box>
                        <Box bg={"blue.300"} borderRadius={"xl"} p={4}>
                            <FaUser size={26} color="white" />
                        </Box>
                    </Box>
                </Flex>
                <Card w={"100%"} borderRadius={"xl"} p={8}>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>Jumlah Pasien</Text>
                    <Text fontSize={"md"} mb={5} color={"gray.500"}>Jumlah pasien suatu instansi dalam satu bulan.</Text>
                    <Box
                        mx={"auto"}
                        w={"100%"}
                        bgGradient="linear(to-r, #313860 0%, #313860 0%, #151928 100%, #151928 100%)"
                        borderRadius="lg"
                        p={4}
                        overflow="hidden"
                    >
                        {/* Dropdown untuk memilih bulan */}
                        <Select
                            width="fit-content"
                            mb="4"
                            borderRadius="md"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            _hover={{ bg: "inherit", textColor: "white" }}
                            _focus={{ bg: "inherit", textColor: "white" }}
                            iconColor="white"
                            textColor={selectedMonth ? "white" : "gray.400"}
                            bg="gray.700"
                            _active={{ text: "gray.700" }}
                            _selected={{ text: "gray.700" }}
                        >
                            <option value="January" style={{ color: "#2D3748" }}>
                                Januari
                            </option>
                            <option value="February" style={{ color: "#2D3748" }}>
                                Februari
                            </option>
                            <option value="March" style={{ color: "#2D3748" }}>
                                Maret
                            </option>
                            <option value="April" style={{ color: "#2D3748" }}>
                                April
                            </option>
                            <option value="May" style={{ color: "#2D3748" }}>
                                Mei
                            </option>
                            <option value="June" style={{ color: "#2D3748" }}>
                                Juni
                            </option>
                            <option value="July" style={{ color: "#2D3748" }}>
                                Juli
                            </option>
                            <option value="August" style={{ color: "#2D3748" }}>
                                Agustus
                            </option>
                            <option value="September" style={{ color: "#2D3748" }}>
                                September
                            </option>
                            <option value="October" style={{ color: "#2D3748" }}>
                                Oktober
                            </option>
                            <option value="November" style={{ color: "#2D3748" }}>
                                November
                            </option>
                            <option value="December" style={{ color: "#2D3748" }}>
                                Desember
                            </option>
                        </Select>

                        {/* Chart dengan data harian yang diperbarui sesuai bulan yang dipilih */}
                        <Box w={"100%"} h={"100%"} mx={"auto"} overflow="hidden" p={2}>
                            <Bar data={getData()} options={options} />
                        </Box>
                    </Box>
                </Card>
            </Flex>
        </LayoutDashboard>
    );
}
