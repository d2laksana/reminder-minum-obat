<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('prescription_details', function (Blueprint $table) {
            $table->string('dosage')->change();
            $table->integer('aturan_konsumsi')->default(1)->after('dosage');
            $table->integer('total_konsumsi')->default(1)->after('aturan_konsumsi');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('prescription_details', function (Blueprint $table) {
            $table->integer('dosage')->change();
            $table->dropColumn('aturan_konsumsi');
            $table->dropColumn('total_konsumsi');
        });
    }
};
