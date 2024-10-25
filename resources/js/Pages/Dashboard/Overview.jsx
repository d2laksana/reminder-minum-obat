'use client';

import LayoutDashboard from "@/Layouts/LayoutDashboard";
import { Text } from "@chakra-ui/react";
import { usePage } from "@inertiajs/react";

export default function Overview() {
    return (
        <LayoutDashboard>
            <Text>Overview</Text>
        </LayoutDashboard>
    );
}