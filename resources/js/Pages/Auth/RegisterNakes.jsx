import { Text, Image, Box, Flex, Input, Button, InputGroup, InputLeftAddon, FormControl, Switch, FormLabel, Select, useToast, FormErrorMessage } from "@chakra-ui/react";
import mobilejkn from "@/Assets/img/mobilejkn.png";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import { useForm } from "@inertiajs/react";

export default function RegisterNakes({ instansis }) {
	const toast = useToast();
	const [step, setStep] = useState(1);

	const { data, setData, post, processing, errors } = useForm({
		instansi_id: "",
		name: "",
		username: "",
		email: "",
		bpjs_number: "",
		password: "",
		password_confirmation: "",
		address: "",
		phone: "",
		birth_date: "",
		gender: ""
	});
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		await post(route("register.nakes.post"), {
			onSuccess: () => {
				toast({
					title: "Pendaftaran Berhasil",
					description: "Akun anda berhasil dibuat, silahkan login.",
					status: "success",
					duration: 5000,
					isClosable: true,
					position: "top-right",
				});
			},
			onError: (errors) => {
				setStep(1);
			}
		});
	}

	return (
		<Flex justifyContent={"space-between"} gap={5} overflow={"hidden"} bg={"white"}>
			<Box w={"50%"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDir={"column"}>
				<Box>
					<Text fontSize="4xl" fontWeight={"bold"} color={"blue.800"}>Selamat Datang</Text>
					<Text fontSize="xl" color={"gray.400"} fontWeight={"500"}>Masukkan data diri anda untuk membuat akun.</Text>

					<form onSubmit={handleSubmit}>
						<Box w={"100%"} mt={10} display={step === 1 ? "block" : "none"}>
							<FormControl isRequired isInvalid={errors.name}>
								<FormLabel>Nama</FormLabel>
								<InputGroup>
									<Input type="text" placeholder="Nama lengkap anda" py={6} borderRadius={"2xl"} onChange={(e) => setData({...data, name: e.target.value})} value={data.name} />
								</InputGroup>
								{errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
							</FormControl>

							<FormControl isRequired mt={5} isInvalid={errors.instansi_id}>
								<FormLabel>Instansi</FormLabel>
								<InputGroup>
									<Select placeholder="Pilih instansi anda" height={"50"} borderRadius={"2xl"} onChange={(e => setData({...data, instansi_id: e.target.value}))} value={data.instansi_id}>
										{instansis.map((instansi) => (
											<option key={instansi.id} value={instansi.id}>{instansi.name}</option>
										))}
									</Select>
								</InputGroup>
							</FormControl>

							<FormControl isRequired mt={5} isInvalid={errors.bpjs_number}>
								<FormLabel>Nomor BPJS</FormLabel>
								<InputGroup>
									<Input type="text" placeholder="Nomor BPJS anda" py={6} borderRadius={"2xl"} onChange={(e) => setData({...data, bpjs_number: e.target.value})} value={data.bpjs_number} />
								</InputGroup>
								{errors.bpjs_number && <FormErrorMessage>{errors.bpjs_number}</FormErrorMessage>}
							</FormControl>

							<FormControl isRequired mt={5} isInvalid={errors.email}>
								<FormLabel>Email</FormLabel>
								<InputGroup>
									<Input type="email" placeholder="Alamat email anda" py={6} borderRadius={"2xl"} onChange={(e) => setData({...data, email: e.target.value})} value={data.email} />
								</InputGroup>
								{errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
							</FormControl>

							<Button w={"100%"} mt={7} borderRadius={"2xl"} colorScheme="brand" size="lg" onClick={() => setStep(2)}>Lanjut</Button>
						</Box>

						<Box w={"100%"} mt={10} display={step === 2 ? "block" : "none"}>
							<FormControl isRequired isInvalid={errors.phone}>
								<FormLabel>Nomor HP</FormLabel>
								<InputGroup>
									<InputLeftAddon children="+62" borderLeftRadius={"2xl"} height={"50"} />
									<Input type="text" height={"50"} placeholder="Nomor HP anda" borderRadius={"2xl"} onChange={(e) => setData({...data, phone: e.target.value})} value={data.phone} />
								</InputGroup>
								{errors.phone && <FormErrorMessage>{errors.phone}</FormErrorMessage>}
							</FormControl>

							<FormControl isRequired mt={5} isInvalid={errors.birth_date}>
								<FormLabel>Tanngal Lahir</FormLabel>
								<InputGroup>
									<Input type="date" height={"50"} borderRadius={"2xl"} onChange={(e) => setData({...data, birth_date: e.target.value})} value={data.birth_date} />
								</InputGroup>
								{errors.birth_date && <FormErrorMessage>{errors.birth_date}</FormErrorMessage>}
							</FormControl>

							<FormControl isRequired mt={5} isInvalid={errors.gender}>
								<FormLabel>Jenis Kelamin</FormLabel>
								<InputGroup>
									<Select placeholder="Pilih jenis kelamin" height={"50"} borderRadius={"2xl"} onChange={(e => setData({...data, gender: e.target.value}))} value={data.gender}>
										<option value="Pria">Laki-laki</option>
										<option value="Wanita">Perempuan</option>
									</Select>
								</InputGroup>
								{errors.gender && <FormErrorMessage>{errors.gender}</FormErrorMessage>}
							</FormControl>

							<FormControl isRequired mt={5} isInvalid={errors.address}>
								<FormLabel>Alamat</FormLabel>
								<InputGroup>
									<Input type="text" placeholder="Alamat lengkap anda" py={6} borderRadius={"2xl"} onChange={(e) => setData({...data, address: e.target.value})} value={data.address} />
								</InputGroup>
								{errors.address && <FormErrorMessage>{errors.address}</FormErrorMessage>}
							</FormControl>

							<Button w={"100%"} mt={7} borderRadius={"2xl"} colorScheme="brand" size="lg" onClick={() => setStep(3)}>Lanjut</Button>
						</Box>

						<Box w={"100%"} mt={10} display={step === 3 ? "block" : "none"}>
							<FormControl isRequired mt={5} isInvalid={errors.username}>
								<FormLabel>Username</FormLabel>
								<InputGroup>
									<Input type="text" placeholder="Username pilihan anda" py={6} borderRadius={"2xl"} onChange={(e) => setData({...data, username: e.target.value})} value={data.username} />
								</InputGroup>
								{errors.username && <FormErrorMessage>{errors.username}</FormErrorMessage>}
							</FormControl>

							<FormControl isRequired mt={5} isInvalid={errors.password}>
								<FormLabel>Kata Sandi</FormLabel>
								<InputGroup>
									<Input type="password" placeholder="Kata sandi anda" py={6} borderRadius={"2xl"} onChange={(e) => setData({...data, password: e.target.value})} value={data.password} />
								</InputGroup>
								{errors.password && <FormErrorMessage>{errors.password}</FormErrorMessage>}
							</FormControl>

							<FormControl isRequired mt={5} isInvalid={errors.password_confirmation}>
								<FormLabel>Konfirmasi Kata Sandi</FormLabel>
								<InputGroup>
									<Input type="password" placeholder="Konfirmasi kata sandi anda" py={6} borderRadius={"2xl"} onChange={(e) => setData({...data, password_confirmation: e.target.value})} value={data.password_confirmation} />
								</InputGroup>
								{errors.password_confirmation && <FormErrorMessage>{errors.password_confirmation}</FormErrorMessage>}
							</FormControl>

							<Button isLoading={processing} type="submit" w={"100%"} mt={7} borderRadius={"2xl"} colorScheme="brand" size="lg">Daftar</Button>
						</Box>
					</form>

					<Flex justifyContent={"center"} mt={5} gap={1}>
						<Text color={"gray.600"}>Sudah punya akun? </Text>
						<Link href="/auth/login">
							<Text color={"brand.600"} cursor={"pointer"} fontWeight={"600"}>Masuk</Text>
						</Link>
					</Flex>
						
				</Box>
			</Box>
			<Box w={"50%"} maxH={"100vh"} minH={"100vh"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
				<Image src={mobilejkn} alt="Mobile JKN" w="100%" p={14} />
			</Box>
		</Flex>
	);
}