import { Head, Link } from '@inertiajs/react';  // Tambahkan Link di sini
import AdminLayout from './Layout/AdminLayout';
import StatisticCard from '@/Components/StatisticCard';
import RecentActivities from '@/Components/RecentActivities';
import Chart from '@/Components/Chart';
import { FaTasks, FaCheckCircle, FaClock, FaExclamationCircle } from 'react-icons/fa';

export default function Dashboard() {
    const statistics = [
        {
            title: "Total Tasks",
            value: "150",
            icon: <FaTasks className="w-6 h-6" />,
            color: "bg-blue-500"
        },
        {
            title: "Completed",
            value: "95",
            icon: <FaCheckCircle className="w-6 h-6" />,
            color: "bg-green-500"
        },
        {
            title: "Pending",
            value: "45",
            icon: <FaClock className="w-6 h-6" />,
            color: "bg-yellow-500"
        },
        {
            title: "Overdue",
            value: "10",
            icon: <FaExclamationCircle className="w-6 h-6" />,
            color: "bg-red-500"
        }
    ];

    return (
        <AdminLayout>
            <Head title="Dashboard" />
            
            <div className="p-6">
                <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>
                
                {/* Tombol Arahkan ke Todo List */}
                <div className="mb-6">
                    <Link href="/todo">
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                            Go to Todo List
                        </button>
                    </Link>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {statistics.map((stat, index) => (
                        <StatisticCard key={index} {...stat} />
                    ))}
                </div>

                {/* Charts and Recent Activities */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">Task Progress</h2>
                        <Chart />
                    </div>
                    
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
                        <RecentActivities />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
