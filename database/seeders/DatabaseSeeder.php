<?php

namespace Database\Seeders;

use App\Models\Instansi;
use App\Models\Nakes;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $instansiKesehatan = [
            [
                "name" => "RSUP Dr. Sardjito",
                "address" => "Jl. Kesehatan No.1, Sekip, Sinduadi, Mlati, Sleman, Yogyakarta 55284"
            ],
            [
                "name" => "RS Bethesda Yogyakarta",
                "address" => "Jl. Jend. Sudirman No.70, Cokrodiningratan, Jetis, Yogyakarta 55224"
            ],
            [
                "name" => "RS Panti Rapih",
                "address" => "Jl. Cik Di Tiro No.30, Terban, Gondokusuman, Yogyakarta 55223"
            ],
            [
                "name" => "RS PKU Muhammadiyah Yogyakarta",
                "address" => "Jl. KH. Ahmad Dahlan No.20, Notoprajan, Ngampilan, Yogyakarta 55262"
            ],
            [
                "name" => "RSUD Kota Yogyakarta",
                "address" => "Jl. Ki Ageng Pemanahan No.1, Warungboto, Umbulharjo, Yogyakarta 55163"
            ],
            [
                "name" => "RS Ludira Husada Tama",
                "address" => "Jl. Wiratama No.5, Tegalrejo, Yogyakarta 55244"
            ],
            [
                "name" => "RS Queen Latifa Yogyakarta",
                "address" => "Jl. Wates Km. 3,5 No.99, Gamping, Sleman, Yogyakarta 55293"
            ],
            [
                "name" => "RS Happy Land Medical Centre",
                "address" => "Jl. Ipda Tut Harsono No.6, Muja Muju, Umbulharjo, Yogyakarta 55165"
            ],
            [
                "name" => "RS Bhayangkara Yogyakarta",
                "address" => "Jl. Raya Solo - Yogyakarta No.16, Kalasan, Sleman, Yogyakarta 55571"
            ],
            [
                "name" => "RS Pratama Kota Yogyakarta",
                "address" => "Jl. Gondosuli, Muja Muju, Umbulharjo, Yogyakarta 55165"
            ]
        ];

        $nakes = [
            [
                "name" => "Naufal Hady AJ",
                "username" => "naufaljr",
                "email" => "naufaljr@gmail.com",
                "password" => bcrypt("password"),
                "address" => "Jl. Kesehatan No.1, Sekip, Sinduadi, Mlati, Sleman, Yogyakarta 55284",
                "phone" => "081234567890",
                "birth_date" => "1990-01-01",
                "gender" => "pria",
                "role" => "nakes"
            ],
            [
                "name" => "Rizky Kurniawan",
                "username" => "rizkykurniawan",
                "email" => "rizkykurniawan@gmail.com",
                "password" => bcrypt("password"),
                "address" => "Jl. Kesehatan No.1, Sekip, Sinduadi, Mlati, Sleman, Yogyakarta 55284",
                "phone" => "081234567890",
                "birth_date" => "1990-01-01",
                "gender" => "pria",
                "role" => "nakes"
            ],
        ];

        foreach ($instansiKesehatan as $instansi) {
            Instansi::create($instansi);
        }

        foreach ($nakes as $u) {
            $user = User::create($u);
            Nakes::create([
                "user_id" => $user->id,
                "instansi_id" => 1
            ]);
        }


        User::create([
            "name" => "Rafino Ramdhaniar PP",
            "username" => "rafino",
            "email" => "rafino@gmail.com",
            "password" => bcrypt("password"),
            "address" => "Jl. Kesehatan No.1, Sekip, Sinduadi, Mlati, Sleman, Yogyakarta 55284",
            "phone" => "081234567890",
            "birth_date" => "1990-01-01",
            "gender" => "pria",
            "role" => "pasien",
            "bpjs_number" => fake()->unique()->numerify('############')
        ]);
    }
}
