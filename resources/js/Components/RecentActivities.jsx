// resources/js/Pages/Components/RecentActivities.jsx

export default function RecentActivities() {
    const activities = [
        {
            action: "Added new task",
            task: "Design Dashboard Layout",
            time: "5 minutes ago",
            status: "bg-blue-100 text-blue-800"
        },
        {
            action: "Completed task",
            task: "User Authentication",
            time: "2 hours ago",
            status: "bg-green-100 text-green-800"
        },
        {
            action: "Updated task",
            task: "Database Schema",
            time: "5 hours ago",
            status: "bg-yellow-100 text-yellow-800"
        },
        {
            action: "Deleted task",
            task: "Old Feature",
            time: "1 day ago",
            status: "bg-red-100 text-red-800"
        }
    ];

    return (
        <div className="space-y-4">
            {activities.map((activity, index) => (
                <div key={index} className="border-b pb-3 last:border-0">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-medium">{activity.action}</p>
                            <p className="text-sm text-gray-500">{activity.task}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${activity.status}`}>
                            {activity.time}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}