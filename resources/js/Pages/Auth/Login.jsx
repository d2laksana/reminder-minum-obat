import { Text, Image, Box, Flex, Input, Button, InputGroup, FormControl, Switch, FormLabel, useToast, FormErrorMessage } from "@chakra-ui/react";
import mobilejkn from "@/Assets/img/mobilejkn.png";
import { Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";

export default function Login() {
	const toast = useToast();
	const { data, setData, post, processing, errors } = useForm({
		email: "",
		password: "",
		remember: false
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		await post(route("login"), {
			onSuccess: () => {
				toast({
					title: "Login Berhasil",
					description: "Anda berhasil login.",
					status: "success",
					duration: 5000,
					isClosable: true,
					position: "top-right",
				});
			},
		});
	}


	return (
		<Flex justifyContent={"space-between"} gap={5} overflow={"hidden"} bg={"white"}>
			<Box w={"50%"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDir={"column"}>
				<Box>
					<Text fontSize="4xl" fontWeight={"bold"} color={"blue.800"}>Selamat Datang Kembali</Text>
					<Text fontSize="xl" color={"gray.400"} fontWeight={"500"}>Masukkan email dan kata sandi anda untuk masuk.</Text>

					<form onSubmit={handleSubmit}>
						<Box w={"100%"} mt={10}>
							<FormControl isRequired isInvalid={errors.email}>
								<FormLabel>Email</FormLabel>
								<InputGroup>
									<Input type="email" placeholder="Alamat email anda" py={6} mt={1} borderRadius={"2xl"} onChange={(e) => setData({...data, email: e.target.value})} value={data.email} />
								</InputGroup>
								{errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
							</FormControl>

							<FormControl isRequired mt={5} isInvalid={errors.password}>
								<FormLabel>Kata Sandi</FormLabel>
								<InputGroup>
									<Input type="password" placeholder="Kata sandi anda" py={6} mt={1} borderRadius={"2xl"} onChange={(e) => setData({...data, password: e.target.value})} value={data.password} />
								</InputGroup>
								{errors.password && <FormErrorMessage>{errors.password}</FormErrorMessage>}
							</FormControl>

							<Flex justifyContent={"space-between"} mt={5}>
								<Flex alignItems={"center"}>
									<Switch size="lg" colorScheme="brand" onChange={(e) => setData({...data, remember: e.target.checked})} />
									<Text ml={2}>Ingat saya</Text>
								</Flex>
								<Text color={"brand.600"} cursor={"pointer"} fontWeight={"600"}>Lupa kata sandi?</Text>
							</Flex>

							<Button type="submit" isLoading={processing} w={"100%"} mt={7} borderRadius={"2xl"} colorScheme="brand" size="lg">Masuk</Button>

							<Flex justifyContent={"center"} mt={5} gap={1}>
								<Text color={"gray.600"}>Belum punya akun? </Text>
								<Link href="/auth/register">
									<Text color={"brand.600"} cursor={"pointer"} fontWeight={"600"}>Daftar</Text>
								</Link>
							</Flex>
						</Box>
					</form>
						
				</Box>
			</Box>
			<Box w={"50%"} maxH={"100vh"} minH={"100vh"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
				<Image src={mobilejkn} alt="Mobile JKN" w="100%" p={14} />
			</Box>
		</Flex>
	);
}