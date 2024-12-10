<?php

namespace App\Http\Controllers;

use App\Models\PC;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PcController extends Controller
{
    // Retrieve all PCs
    public function index()
    {
        $pcs = PC::all();

        if ($pcs->isEmpty()) {
            Log::info('No PCs found.');
        }

        return response()->json($pcs);
    }

    // Retrieve a single PC by ID
    public function show($id)
    {
        $pc = PC::findOrFail($id);
        return response()->json($pc);
    }

    // Create a new PC
    public function store(Request $request)
    {
        $request->validate([
            'serial_number' => 'required|string|unique:pcs',
            'pc_brand' => 'required|string|max:255',
            'pc_color' => 'required|string|max:255',
            'owner_id' => 'nullable|exists:Students,student_id', // Ensure the owner exists
        ]);

        // Create a new PC with the validated data
        $pc = PC::create($request->only(['serial_number', 'pc_brand', 'pc_color', 'owner_id']));
        
        Log::info('PC created: ', ['pc' => $pc]);

        return response()->json($pc, 201);
    }

    // Update an existing PC
    public function update(Request $request, $id)
    {
        $pc = PC::findOrFail($id);

        $request->validate([
            'serial_number' => 'sometimes|required|string|unique:pcs,serial_number,' . $pc->id,
            'pc_brand' => 'sometimes|required|string|max:255',
            'pc_color' => 'sometimes|required|string|max:255',
            'owner_id' => 'nullable|exists:Students,student_id', // Ensure the owner exists
        ]);

        $pc->update($request->only(['serial_number', 'pc_brand', 'pc_color', 'owner_id']));

        Log::info('PC updated: ', ['pc' => $pc]);

        return response()->json($pc);
    }

    public function getChartData()
{
    $pcs = PC::all();
    
    // Initialize an array for monthly counts
    $monthlyCounts = array_fill(0, 12, 0);

    foreach ($pcs as $pc) {
        $month = (int)date('m', strtotime($pc->created_at)) - 1; // Get month index (0-11)
        $monthlyCounts[$month]++;
    }

    return response()->json([
        'barData2' => [
            'labels' => ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            'datasets' => [[
                'label' => 'Total PC Registrations of the Year',
                'data' => $monthlyCounts,
                'backgroundColor' => '#22C55E',
            ]],
        ],
    ]);
}

    // Delete a PC
    public function delete($id)
    {
        $pc = PC::findOrFail($id);
        $pc->delete();

        Log::info('PC deleted: ', ['pc_id' => $id]);

        return response()->json(null, 204);
    }
}