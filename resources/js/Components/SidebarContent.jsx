import {
  Box,
  CloseButton,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import {
  FiHome,
} from 'react-icons/fi'
import { BiSolidWindowAlt } from "react-icons/bi";
import { NavItem } from './NavItem'
import { usePage } from '@inertiajs/react';
import { BsCloudUploadFill } from "react-icons/bs";
import { FaChartSimple, FaCartShopping } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";

export const SidebarContent = ({ onClose, ...rest }) => {
  const { auth } = usePage().props;
  const LinkItems = [
    { name: "Overview", path: '/', icon: FiHome },
    { name: "Pemeriksaaan", path: '/pemeriksaan', icon: BiSolidWindowAlt },

    // Pasien
    { name: "Beranda", path: '/jadwal', icon: FaHome },
    { name: "Unggah Bukti", path: '/bukti', icon: BsCloudUploadFill },
    { name: "Pencapaian", path: '/pencapaian', icon: FaChartSimple },
    { name: "Toko", path: '/store', icon: FaCartShopping },
  ]

  const isVisible = (link) => {
    if (auth.user.role === 'nakes') {
      return ['Overview', 'Pemeriksaaan'].includes(link.name);
    } else if (auth.user.role === 'pasien') {
      return ['Beranda', 'Unggah Bukti', 'Pencapaian', 'Toko'].includes(link.name);
    }
  };

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.800')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between" m="8">
        {/* <img src="https://example.com/logo.png" alt="logo" style={{ width: '10rem' }} /> */}
        <Box alignItems={"center"} textAlign={"center"} w={"100%"}>
          <Text fontSize="3xl" color={useColorModeValue('blue.800', 'white')} fontWeight={"900"}>
            Mobile
            <Text as={"span"} ms={"1"} fontWeight={"300"}>JKN</Text>
          </Text>
        </Box>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.filter(isVisible).map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}