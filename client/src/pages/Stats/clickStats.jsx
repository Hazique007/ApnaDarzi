import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ClickStats = () => {
  const [stats, setStats] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [genderPieData, setGenderPieData] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/stats/getClickStats"
        );

        const fetchedStats = response.data.stats;
        setStats(fetchedStats);

        const labels = fetchedStats.map(
          (stat) => `${stat._id.gender} - ${stat._id.category}`
        );
        const counts = fetchedStats.map((stat) => stat.count);

        setChartData({
          labels,
          datasets: [
            {
              label: "Clicks",
              data: counts,
              backgroundColor: "rgba(59, 130, 246, 0.5)",
              borderColor: "rgba(59, 130, 246, 1)",
              borderWidth: 1,
            },
          ],
        });

        const genderCounts = fetchedStats.reduce((acc, stat) => {
          acc[stat._id.gender] = (acc[stat._id.gender] || 0) + stat.count;
          return acc;
        }, {});

        const pieLabels = Object.keys(genderCounts);
        const pieCounts = Object.values(genderCounts);

        setGenderPieData({
          labels: pieLabels,
          datasets: [
            {
              data: pieCounts,
              backgroundColor: ["#FFB703", "#8ECAE6", "#219EBC"],
              hoverBackgroundColor: ["#FB8500", "#0077B6", "#023047"],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching click stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-5 text-gray-800">
        Click Statistics
      </h1>

      <div className="bg-white shadow-md rounded-lg p-5 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Clicks by Gender and Category
        </h2>
        {chartData ? (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: { display: true, text: "Clicks by Gender and Category" },
              },
            }}
          />
        ) : (
          <p className="text-gray-500 text-center">Loading chart...</p>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg p-5 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Gender-wise Click Distribution
        </h2>
        {genderPieData ? (
          <Pie
            data={genderPieData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: {
                  display: true,
                  text: "Gender-wise Click Distribution",
                },
              },
            }}
          />
        ) : (
          <p className="text-gray-500 text-center">Loading chart...</p>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg p-5">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Details</h2>
        <ul className="divide-y divide-gray-200">
          {stats.map((stat, index) => (
            <li
              key={index}
              className="py-3 flex justify-between items-center text-gray-600"
            >
              <span className="font-medium">
                {stat._id.gender} - {stat._id.category}
              </span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                {stat.count} clicks
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClickStats;
