// resources/js/Pages/Components/StatisticCard.jsx

export default function StatisticCard({ title, value, icon, color }) {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm">{title}</p>
                    <h3 className="text-2xl font-bold mt-1">{value}</h3>
                </div>
                <div className={`${color} p-3 rounded-full text-white`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}
