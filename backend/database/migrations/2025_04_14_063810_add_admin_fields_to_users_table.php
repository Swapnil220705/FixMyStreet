<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Check if columns exist before adding them
            if (!Schema::hasColumn('users', 'is_admin')) {
                $table->boolean('is_admin')->default(false);
            }
            
            if (!Schema::hasColumn('users', 'employee_id')) {
                $table->string('employee_id')->nullable();
            }
            
            if (!Schema::hasColumn('users', 'department_code')) {
                $table->string('department_code')->nullable();
            }
            
            if (!Schema::hasColumn('users', 'government_id')) {
                $table->string('government_id')->nullable();
            }
            
            if (!Schema::hasColumn('users', 'phone')) {
                $table->string('phone')->nullable();
            }
            
            if (!Schema::hasColumn('users', 'date_of_birth')) {
                $table->date('date_of_birth')->nullable();
            }
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Check if columns exist before dropping them
            $columns = [
                'is_admin', 
                'employee_id', 
                'department_code', 
                'government_id',
                'phone',
                'date_of_birth'
            ];
            
            $existingColumns = [];
            foreach ($columns as $column) {
                if (Schema::hasColumn('users', $column)) {
                    $existingColumns[] = $column;
                }
            }
            
            if (!empty($existingColumns)) {
                $table->dropColumn($existingColumns);
            }
        });
    }
};
