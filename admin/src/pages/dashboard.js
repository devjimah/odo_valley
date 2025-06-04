import { useState, useEffect } from "react";
import { FiMap, FiBookOpen, FiMessageSquare, FiImage } from "react-icons/fi";
import api from "../utils/api";
import { requireAuth } from "../utils/auth";

const Dashboard = () => {
  const [stats, setStats] = useState({
    destinations: 0,
    tours: 0,
    testimonials: 0,
    gallery: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        // Fetch all stats in parallel
        const [destinations, tours, testimonials, gallery] = await Promise.all([
          api.get("/destinations"),
          api.get("/tours"),
          api.get("/testimonials"),
          api.get("/gallery"),
        ]);

        setStats({
          destinations: destinations.data.count || 0,
          tours: tours.data.count || 0,
          testimonials: testimonials.data.count || 0,
          gallery: gallery.data.count || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Stats cards with icons
  const statsCards = [
    {
      title: "Destinations",
      count: stats.destinations,
      icon: <FiMap size={24} className="text-blue-500" />,
      color: "blue",
    },
    {
      title: "Tours",
      count: stats.tours,
      icon: <FiBookOpen size={24} className="text-purple-500" />,
      color: "purple",
    },
    {
      title: "Testimonials",
      count: stats.testimonials,
      icon: <FiMessageSquare size={24} className="text-green-500" />,
      color: "green",
    },
    {
      title: "Gallery Images",
      count: stats.gallery,
      icon: <FiImage size={24} className="text-amber-500" />,
      color: "amber",
    },
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title tracking-tight">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <div key={index} className="card flex items-center">
            <div className={`rounded-full p-4 bg-${card.color}-100 mr-4`}>
              {card.icon}
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700">
                {card.title}
              </h3>
              <p className="text-2xl font-semibold">
                {loading ? "..." : card.count}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4 tracking-tight">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="/destinations/new" className="btn btn-primary">
            Add Destination
          </a>
          <a href="/tours/new" className="btn btn-secondary">
            Add Tour
          </a>
          <a href="/testimonials/new" className="btn btn-success">
            Add Testimonial
          </a>
          <a href="/gallery/new" className="btn btn-primary">
            Add Gallery Image
          </a>
        </div>
      </div>
    </div>
  );
};

// Add server-side authentication check
export const getServerSideProps = requireAuth;

export default Dashboard;
