<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\PC;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Mail\QrCodeEmail;
use Illuminate\Support\Facades\Mail;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class StudentController extends Controller
{
    // Register a new student along with their PC
    public function register(Request $request)
    {
        // Validate request input
        $validator = Validator::make($request->all(), [
            'student_id' => 'required|string|unique:students',
            'student_name' => 'required|string',
            'phoneNumber' => 'nullable|string',
            'email' => 'required|email|unique:students,email',
            'pc_brand' => 'required|string',
            'serial_number' => 'required|string|unique:pcs',
            'pc_color' => 'required|string',
        ]);
        
        // Check for validation errors
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Create student entry
        $student = Student::create([
            'student_id' => $request->student_id,
            'student_name' => $request->student_name,
            'phoneNumber' => $request->phoneNumber,
            'email' => $request->email,
            'serial_number' => $request->serial_number,
            'pc_color' => $request->pc_color,
            'pc_brand' => $request->pc_brand,
            'status' => $request->status, //in or out
            'qr_code' => null,
        ]);
    $studentId  = $student->id;
    // Log the created student details
    \Log::info('Student created: ', ['student' => $student]);

        // Create PC entry
        $pc = PC::create([
            'serial_number' => $request->serial_number,
            'pc_brand' => $request->pc_brand,
            'pc_color' => $request->pc_color,
            'owner_id' => $studentId ,
        ]);

        $qrCodeContent = $request->serial_number;
        $qrCodeImage = QrCode::format('png')->size(300)->generate($qrCodeContent);

        $student->qr_code = base64_encode($qrCodeImage);
    $student->save();

        // Send the email with the QR code
        if (!filter_var($request->email, FILTER_VALIDATE_EMAIL)) {
            return response()->json(['message' => 'Invalid email address'], 400);
        }


        Mail::to($request->email)->send(new QrCodeEmail($qrCodeImage));

        $student = Student::findOrFail($studentId);

// Fetch the associated PC using the owner_id
$pc = PC::where('owner_id', $studentId)->first();

// Combine both into a response
$response = [
    'student' => $student,
    'pc' => $pc,
];

// Return the student and PC details
return response()->json($response);

    }


    //search
    public function index(Request $request)
    {
        $searchTerm = $request->get('search', '');

        // Query students based on the search term across multiple columns
        $students = Student::where('student_name', 'like', "%{$searchTerm}%")
            ->orWhere('student_id', 'like', "%{$searchTerm}%")
            ->orWhere('phoneNumber', 'like', "%{$searchTerm}%")
            ->orWhere('serial_number', 'like', "%{$searchTerm}%")
            ->orWhereHas('pc', function ($query) use ($searchTerm) {
                $query->where('pc_color', 'like', "%{$searchTerm}%")
                      ->orWhere('pc_brand', 'like', "%{$searchTerm}%");
            })
            ->get();

        if ($students->isEmpty()) {
            Log::info('No students found for search term: ' . $searchTerm);
        }

        return response()->json($students);
    }

    // Generate a QR code (dummy implementation)
    private function generateQRCode($data)
    {
        return $data; // Placeholder
    }
    
    // Retrieve all student information
    public function showAll()
    {
        // Get all students
        $students = Student::all();
    
        // Create an array to hold the response data
        $response = [];
    
        // Loop through each student to fetch the associated PC
        foreach ($students as $student) {
            $pc = PC::where('owner_id', $student->id)->first(); // Fetch the associated PC
    
            // Add both student and PC to the response
            $response[] = [
                'student_id' => $student->student_id,
                'student_name' => $student->student_name,
                'phoneNumber' => $student->phoneNumber,
                'email' => $student->email,
                'status' => $student->status,
                'serial_number' => $student->serial_number,
                'pc_brand' => $pc->pc_brand,
                'pc_color' => $pc->pc_color,
                'pc' => $pc ? [
                    'serial_number' => $pc->serial_number,
                    'pc_brand' => $pc->pc_brand,
                    'pc_color' => $pc->pc_color,
                ] : null, // Handle case where there might be no associated PC
            ];
        
        }
    
        // Return the combined response
        return response()->json($response);
    }
    

    // Show student information
    public function show($id)
    {
        $student = Student::with('pc')->findOrFail($id);
        return response()->json($student);
    }
    // Update method
public function update(Request $request, $id)
{
    // Find the student by student_id
    $student = Student::where('student_id', $id)->with('pc')->first();
    
    if (!$student) {
        return response()->json(['message' => 'Student not found'], 404);
    }

    // Validation rules
    $rules = [
        'student_name' => 'required|string',
        'phoneNumber' => 'nullable|string',
        'email' => 'email|unique:students,email,' . $student->id,
        'pc_brand' => 'required|string',
        'pc_color' => 'required|string',
    ];

    // Check if the serial_number is being updated
    if ($request->has('serial_number')) {
        $pc = PC::where('owner_id', $student->id)->first();
        $rules['serial_number'] = 'required|string|unique:pcs,serial_number,' . ($pc ? $pc->pc_id : 'null');
    }

    // Validate the input
    $validator = Validator::make($request->all(), $rules);

    // Handle validation errors
    if ($validator->fails()) {
        return response()->json($validator->errors(), 400);
    }

    // Update student information
    $student->update($request->only(['student_name', 'phoneNumber', 'email']));

    // Update PC information if provided
    if ($request->has('serial_number') || $request->has('pc_brand') || $request->has('pc_color')) {
        $pc = PC::where('owner_id', $student->id)->first(); // Fetch PC by owner_id
        if ($pc) {
            $pc->update($request->only(['serial_number', 'pc_brand', 'pc_color']));
        }
    }

    return response()->json(['message' => 'Student updated successfully', 'student' => $student], 200);
}



    // Delete a student
public function delete($id)
{
    $student = Student::where('student_id', $id)->first(); // Fetch the student

    if (!$student) {
        return response()->json(['message' => 'Student not found'], 404);
    }

    // Fetch associated PC using owner_id
    $pc = PC::where('owner_id', $student->id)->first();

    // Delete the associated PC if it exists
    if ($pc) {
        $pc->delete();
    }

    // Delete student record
    $student->delete();

    return response()->json(['message' => 'Student deleted successfully'], 200);
}

}
