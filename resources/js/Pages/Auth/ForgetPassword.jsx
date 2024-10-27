import { Text, Image, Box, Flex, Input, Button, InputGroup, FormControl, Switch, FormLabel, useToast, FormErrorMessage } from "@chakra-ui/react";
import mobilejkn from "@/Assets/img/mobilejkn.png";
import { Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";

export default function ForgetPassword() {
	const toast = useToast();
	const { data, setData, post, processing, errors } = useForm({
		email: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		await post(route("forget.password.post"), {
			onSuccess: () => {
				toast({
					title: "Berhasil",
					description: "Permintaan reset kata sandi berhasil dikirimkan ke email Anda.",
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
					<Text fontSize="4xl" fontWeight={"bold"} color={"blue.800"}>Lupa Kata Sandi</Text>
					<Text fontSize="xl" color={"gray.400"} fontWeight={"500"}>Masukan alamat email Anda yang terdaftar di JKN Mobile.</Text>

					<form onSubmit={handleSubmit}>
						<Box w={"100%"} mt={10}>
							<FormControl isRequired isInvalid={errors.email}>
								<FormLabel>Email</FormLabel>
								<InputGroup>
									<Input type="email" placeholder="Alamat email anda" py={6} borderRadius={"2xl"} onChange={(e) => setData({...data, email: e.target.value})} value={data.email} />
								</InputGroup>
								{errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
							</FormControl>

							<Button type="submit" isLoading={processing} w={"100%"} mt={7} borderRadius={"2xl"} colorScheme="brand" size="lg">Riset Kata Sandi</Button>

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