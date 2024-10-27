import { Text, Image, Box, Flex, Input, Button, InputGroup, FormControl, Switch } from "@chakra-ui/react";
import mobilejkn from "@/Assets/img/mobilejkn.png";
import { Link } from "@inertiajs/react";

export default function Register() {
	return (
		<Flex justifyContent={"space-between"} gap={5} overflow={"hidden"} bg={"white"}>
			<Box w={"50%"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDir={"column"}>
				<Box w={"55%"}>
					<Text fontSize="4xl" fontWeight={"bold"} color={"blue.800"}>Selamat Datang</Text>
					<Text fontSize="xl" color={"gray.400"} fontWeight={"500"}>Silahkan pilih posisi anda untuk mendaftar.</Text>

					<Box w={"100%"} mt={10}>
						<Link href="/auth/register/nakes">
							<Button w={"100%"} variant={"outline"} borderRadius={"2xl"} colorScheme="brand" size="lg">Tenaga Kesehatan</Button>
						</Link>

						<Link href="/auth/register/pasien">
							<Button w={"100%"} mt={5} borderRadius={"2xl"} colorScheme="brand" size="lg">Pasien</Button>
						</Link>

						<Flex justifyContent={"center"} mt={10} gap={1}>
							<Text color={"gray.600"}>Sudah punya akun? </Text>
							<Link href="/auth/login">
								<Text color={"brand.600"} cursor={"pointer"} fontWeight={"600"}>Masuk</Text>
							</Link>
						</Flex>

					</Box>
				</Box>
			</Box>
			<Box w={"50%"} maxH={"100vh"} minH={"100vh"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
				<Image src={mobilejkn} alt="Mobile JKN" w="100%" p={14} />
			</Box>
		</Flex>
	);
}