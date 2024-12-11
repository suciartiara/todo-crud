<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    // Menampilkan semua todo
    public function index()
    {
        $todos = Todo::all();  // Ambil semua data todo
        return response()->json($todos);  // Kirim data dalam format JSON
    }

    // Menyimpan todo baru
    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'title' => 'required|string|max:255',
            'completed' => 'nullable|string|in:pending,completed,overdue',
        ]);
    
        // Konversi 'completed' string ke boolean jika diperlukan
        $completedStatus = $request->completed === 'completed';
    
        // Simpan todo baru ke database
        $todo = Todo::create([
            'title' => $request->title,
            'completed' => $completedStatus, // Default completed berdasarkan string
        ]);
    
        // Mengembalikan response JSON
        return response()->json($todo, 201);
    }

    // Mengambil data todo tertentu
    public function show($id)
    {
        $todo = Todo::findOrFail($id);  // Mencari todo berdasarkan id

        return response()->json($todo);
    }

    // Mengupdate todo tertentu
    public function update(Request $request, $id)
    {
        $todo = Todo::findOrFail($id);  // Mencari todo berdasarkan id

        // Validasi input
        $request->validate([
            'title' => 'required|string|max:255',
            'completed' => 'boolean',
        ]);

        // Update data todo
        $todo->update([
            'title' => $request->title,
            'completed' => $request->completed,
        ]);

        return response()->json($todo);
    }

    // Menghapus todo tertentu
    public function destroy($id)
    {
        $todo = Todo::findOrFail($id);  // Mencari todo berdasarkan id

        // Menghapus todo
        $todo->delete();

        return response()->json(null, 204);  // Mengembalikan response kosong setelah berhasil dihapus
    }

    public function getStatistics()
{
    $totalTasks = Todo::count();
    $completedTasks = Todo::where('completed', true)->count();
    $pendingTasks = Todo::where('completed', false)->count();

    // Misalnya, untuk overdue, anggap todo yang lebih dari 7 hari yang lalu sebagai overdue
    $overdueTasks = Todo::where('completed', false)
                        ->where('created_at', '<', now()->subDays(7))
                        ->count();

    return response()->json([
        'total' => $totalTasks,
        'completed' => $completedTasks,
        'pending' => $pendingTasks,
        'overdue' => $overdueTasks,
    ]);
}

}
