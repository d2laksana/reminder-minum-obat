'use client';

import LayoutDashboard from "@/Layouts/LayoutDashboard";
import { Box, Card, Flex, Select, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";

// Registrasi elemen yang dibutuhkan Chart.js versi 4.4.6
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);



export default function Overview() {
    const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleString('default', { month: 'long' })); // Default ke bulan sekarang
    // Data harian untuk masing-masing bulan (contoh data)
    const dailyDataByMonth = {
        January: [80, 95, 70, 100, 90, 110, 75, 85, 95, 100, 120, 130, 90, 100, 80, 95, 100, 110, 120, 130, 90, 100, 80, 95, 100, 110, 120, 130, 90, 100, 80],
        February: [60, 85, 75, 80, 70, 90, 65, 75, 85, 80, 60, 70, 75, 85, 70, 80, 65, 75, 85, 80, 60, 70, 75, 85, 70, 80],
        March: [90, 110, 95, 105, 100, 120, 110, 115, 120, 130, 100, 110, 115, 120, 110, 120, 130, 125, 120, 115, 110, 105, 100, 110, 115, 120, 130],
        // Tambahkan data untuk bulan lainnya
        October: [120, 150, 110, 170, 160, 150, 140, 130, 120, 110, 160, 170, 180, 150, 160, 140, 130, 120, 110, 160, 170, 180, 150, 160, 140, 130, 120],
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
                <Flex direction={"row"} align="center" w={"100%"} justifyContent={"space-between"} gap={5}>
                    <Box
                        w={"100%"}
                        p={4}
                        bg={"white"}
                        borderRadius={15}
                        boxShadow={"md"}
                    >
                        <Text fontSize={"xl"} >Daily Sales</Text>
                    </Box>
                    <Box
                        w={"100%"}
                        p={4}
                        bg={"white"}
                        borderRadius={15}
                        boxShadow={"md"}
                    >
                        <Text fontSize={"xl"} >Daily Sales</Text>
                    </Box>
                    <Box
                        w={"100%"}
                        p={4}
                        bg={"white"}
                        borderRadius={15}
                        boxShadow={"md"}
                    >
                        <Text fontSize={"xl"} >Daily Sales</Text>
                    </Box>
                </Flex>
                <Card w={"100%"}>
                    <Box
                        mx={"auto"}
                        mt={5}
                        w={"90%"}
                        bgGradient="linear(to-r, #313860 0%, #313860 0%, #151928 100%, #151928 100%)"
                        borderRadius="lg"
                        p={4}
                        overflow="hidden"  // Mencegah elemen keluar dari batas Box
                    >
                        {/* Dropdown untuk memilih bulan */}
                        <Select
                            placeholder="Pilih Bulan"
                            width="fit-content"
                            mb="4"
                            borderRadius="md"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            _hover={{ bg: "inherit", textColor: "white" }} // Inherit on hover as well
                            _focus={{ bg: "inherit", textColor: "white" }}
                            iconColor="white"
                        >
                            <option value="January">Januari</option>
                            <option value="February">Februari</option>
                            <option value="March">Maret</option>
                            {/* Tambahkan bulan lainnya */}
                            <option value="October">Oktober</option>
                        </Select>

                        {/* Chart dengan data harian yang diperbarui sesuai bulan yang dipilih */}
                        <Box w={"100%"} h={"100%"} mx={"auto"} overflow="hidden" p={2}>
                            <Bar data={getData()} options={options} />
                        </Box>
                    </Box>

                    <Box mt="4">
                        <Text fontSize="xl" fontWeight="bold">Jumlah Pasien</Text>
                        <Text color="gray.400">Jumlah pasien suatu instansi dalam satu bulan, ditampilkan per hari.</Text>
                    </Box>
                </Card>
            </Flex>
        </LayoutDashboard>
    );
}
