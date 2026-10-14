<?php

namespace App\Http\Controllers;

use App\Models\Complaint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ComplaintController extends Controller
{
    /**
     * Store a newly created complaint in storage.
     */
    public function store(Request $request)
    {
        \Log::info('Complaint submission started', $request->all());
        try {
            // Validate request
            $validated = $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg|max:5048',
                'latitude' => 'required|numeric',
                'longitude' => 'required|numeric',
                'issue_type' => 'required|string|max:50',
                'details' => 'required|string|max:500',
            ]);
            
            // Handle image upload
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('complaints', 'public');
                $imageFullPath = storage_path('app/public/' . $imagePath);
            } else {
                return response()->json(['message' => 'Image file is required'], 422);
            }
            
            // Create complaint
            $complaint = new Complaint();
            $complaint->user_id = Auth::id();
            $complaint->issue_type = $validated['issue_type'];
            $complaint->details = $validated['details'];
            $complaint->latitude = $validated['latitude'];
            $complaint->longitude = $validated['longitude'];
            $complaint->status = 'reported';
            $complaint->severity = 'low'; // Default severity
            $complaint->image_path = $imagePath;
            $complaint->save();
            
            // AI service call
            try {
                $client = new \GuzzleHttp\Client();
                $response = $client->post('http://localhost:5000/analyze', [
                    'multipart' => [
                        [
                            'name' => 'image',
                            'contents' => fopen($imageFullPath, 'r')
                        ]
                    ]
                ]);
                
                $aiResult = json_decode($response->getBody(), true);
                $severity = $aiResult['severity'] ?? 'low';
                $damageDetected = $aiResult['damage_detected'] ?? false;
                $damageScore = $aiResult['final_score'] ?? 0;
                
                $complaint->severity = $severity;
                $complaint->save();
                
                return response()->json([
                    'message' => 'Complaint submitted successfully',
                    'complaint' => $complaint,
                    'severity' => $severity,
                    'damage_score' => $damageScore,
                    'image_url' => asset('storage/' . $imagePath)
                ], 201);
            } catch (\Exception $e) {
                // If AI service fails, return with default severity
                \Log::error('AI service error: ' . $e->getMessage());
                
                return response()->json([
                    'message' => 'Complaint submitted successfully (AI service unavailable)',
                    'complaint' => $complaint,
                    'severity' => 'low',
                    'damage_score' => 0,
                    'image_url' => asset('storage/' . $imagePath)
                ], 201);
            }
        } catch (\Exception $e) {
            \Log::error('Complaint submission error: ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }
    
    
    /**
     * Display the specified complaint.
     */
    public function show(Complaint $complaint)
    {
        // Authorization check would go here
        return response()->json(['complaint' => $complaint]);
    }

    /**
     * Update the specified complaint status (admin only).
     */
    public function update(Request $request, $id)
    {
        // This would typically have admin authorization
        $complaint = Complaint::findOrFail($id);
        
        $validated = $request->validate([
            'status' => 'required|in:reported,in_progress,resolved',
            'severity' => 'sometimes|nullable|in:low,medium,high',
        ]);

        $complaint->update($validated);

        return response()->json([
            'message' => 'Complaint updated successfully',
            'complaint' => $complaint
        ]);
    }

    /**
     * Get all complaints for the authenticated user.
     */
    public function userReports(Request $request)
    {
        return response()->json([
            'complaints' => $request->user()->complaints()->latest()->get()
        ]);
    }
}
