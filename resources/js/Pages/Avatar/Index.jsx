import { AvatarCreator } from '@readyplayerme/react-avatar-creator';
import { useForm } from '@inertiajs/react';
import { useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const config = {
  clearCache: true,
  bodyType: 'fullbody',
  quickStart: false,
  language: 'en',
};

const style = { width: '100%', height: '100vh', border: 'none' };

export default function Index() {
	const toast = useToast();
	const { data, setData, post, processing, errors } = useForm({
		avatar: "",
	});

  const handleOnAvatarExported = async (event) => {
		const avatar_url = event.data.url.replace(".glb", ".png");
		setData("avatar", avatar_url);
  };

	useEffect(() => {
		function storeAvatar() {
			post(route('avatar.store'), {
				onSuccess: () => {
					toast({
						title: "Avatar Berhasil Disimpan",
						description: "Avatar anda berhasil disimpan.",
						status: "success",
						duration: 5000,
						isClosable: true,
						position: "top-right",
					});
				},
				onError: (error) => {
					console.log(error);
					toast({
						title: "Avatar Gagal Disimpan",
						description: error[0],
						status: "error",
						duration: 5000,
						isClosable: true,
						position: "top-right",
					});
				},
			});
		}

		if (data.avatar) {
			storeAvatar();
		}
	}, [data.avatar]);

  return (
    <>
      <AvatarCreator subdomain="avicenna" config={config} style={style} onAvatarExported={handleOnAvatarExported} />
    </>
  );
}