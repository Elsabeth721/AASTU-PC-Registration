<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    // Admin login
public function login(Request $request)
{
    $request->validate([
        'username' => 'required|string',
        'password' => 'required|string',
    ]);

        // Find the admin by username
    $admin = Admin::where('username', $request->username)->first();

        // Check if the admin exists and the password is correct
    if ($admin && Hash::check($request->password, $admin->password)) {
        if ($admin->role !== 'super_admin') {
            return response()->json(['message' => 'Access denied. Super admin role required.'], 403);
        }
        return response()->json(['admin' => $admin], 200);
    }

    return response()->json(['message' => 'Invalid credentials'], 401);
}

    // Retrieve all admins
    public function index()
    {
        return response()->json(Admin::all());
    }

    // Retrieve a single admin by ID
    public function show($id)
    {
        $admin = Admin::findOrFail($id);
        return response()->json($admin);
    }

    // Create a new admin
    public function store(Request $request)
    {
        $request->validate([
            'admin_id' => 'required|string|unique:admins',
            'username' => 'required|string', 
            'password' => 'required|string|min:6',  
            'email' => 'nullable|email|unique:admins', 
            'profile_picture' =>'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Allow images only, 
            'phoneNumber' => 'nullable|string', 
        ]);
    
        // Create a new admin record
        $admin = Admin::create([
            'admin_id' => $request->admin_id, 
            'username' => $request->username, 
            'password' => Hash::make($request->password), 
            'role' => 'admin', // Set role to 'admin' by default
            'email' => $request->email, // Set email from request
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Allow images only
            'phoneNumber' => $request->phoneNumber, // Set phone number
        ]);
    
        return response()->json($admin, 201);
    }

    // Update an existing admin
    public function update(Request $request, $id)
    {
        $admin = Admin::findOrFail($id);

        // Validate incoming request data
        $request->validate([
            'username' => 'sometimes|required|string', // Username is required if provided
            'password' => 'sometimes|string|min:6', // Password must be at least 6 characters if provided
           // 'role' => 'sometimes|required|in:super_admin,admin', // Role should be valid if provided
            'email' => 'nullable|email|unique:admins,email,' . $admin->id, // Email validation
            'profile_picture' => 'nullable|string', // Profile picture is optional
            'phoneNumber' => 'nullable|string', // Phone number is optional
        ]);

        if ($request->has('password')) {
            $admin->password = Hash::make($request->password);
        }

        $admin->update($request->except('password'));

        return response()->json($admin);
    }

    public function getChartData()
{
    $admins = Admin::all();
    
    // Initialize an array for monthly counts
    $monthlyCounts = array_fill(0, 12, 0);

    foreach ($admins as $admin) {
        $month = (int)date('m', strtotime($admin->created_at)) - 1; // Get month index (0-11)
        $monthlyCounts[$month]++;
    }

    return response()->json([
        'barData1' => [
            'labels' => ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            'datasets' => [[
                'label' => 'Total Admin Registrations',
                'data' => $monthlyCounts,
                'backgroundColor' => '#e2ad00e1',
            ]],
        ],
    ]);
}


public function destroy($id)
{
    // Find the admin by admin_id or fail
    $admin = Admin::where('admin_id', $id)->firstOrFail();
    $admin->delete(); // Delete the admin record
    return response()->json(null, 204); // Return a 204 status for successful deletion
}

   }