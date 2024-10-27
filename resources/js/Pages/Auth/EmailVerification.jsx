import { Text, Image, Box, Flex, Input, Button, InputGroup, FormControl, Switch, FormLabel, useToast, FormErrorMessage, PinInput, PinInputField } from "@chakra-ui/react";
import mobilejkn from "@/Assets/img/mobilejkn.png";
import { Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";

export default function EmailVerification() {
	const toast = useToast();
	const { data, setData, post, processing, errors } = useForm({
		pin: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		await post(route("verify.email.post"), {
			onSuccess: () => {
				toast({
					title: "Verifikasi Berhasil",
					description: "Email anda berhasil diverifikasi.",
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
					<Text fontSize="4xl" fontWeight={"bold"} color={"blue.800"}>Masukkan Kode Verifikasi</Text>
					<Text fontSize="xl" color={"gray.400"} fontWeight={"500"}>Masukkan kode verifikasi yang dikirimkan ke email anda.</Text>

					<form onSubmit={handleSubmit}>
						<Box w={"100%"} mt={10}>
							<FormControl isRequired isInvalid={errors.pin}>
								<FormLabel>Kode Verifikasi</FormLabel>
								<PinInput w={"100%"} size="lg" borderRadius={"2xl"} onChange={(value) => setData({...data, pin: value})} value={data.pin}>
									<PinInputField />
									<PinInputField />
									<PinInputField />
									<PinInputField />
									<PinInputField />
									<PinInputField />
								</PinInput>
								{errors.pin && <FormErrorMessage>{errors.pin}</FormErrorMessage>}
							</FormControl>

							<Button type="submit" isLoading={processing} w={"100%"} mt={7} borderRadius={"2xl"} colorScheme="brand" size="lg">Verifikasi</Button>

							<Flex justifyContent={"center"} mt={5} gap={1}>
								<Text color={"gray.600"}>Sudah punya akun? </Text>
								<Link href="/auth/login">
									<Text color={"brand.600"} cursor={"pointer"} fontWeight={"600"}>Masuk</Text>
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