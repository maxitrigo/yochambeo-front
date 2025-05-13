import { useState } from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { GiPositionMarker } from "react-icons/gi";

export const Trades = () => {

    const departments = [
      "Artigas", "Canelones", "Cerro Largo", "Colonia", "Durazno",
      "Flores", "Florida", "Lavalleja", "Maldonado", "Montevideo",
      "Paysandú", "Río Negro", "Rivera", "Rocha", "Salto",
      "San José", "Soriano", "Tacuarembó", "Treinta y Tres",
    ];

    const users = Array.from({ length: 40 }, (_, i) => ({
        id: i + 1,
        fullName: `Maximiliano Rodriguez ${i + 1}`,
        trades: getRandomTrades(),
        profileImg: "https://i.pravatar.cc/150?img=" + ((i % 70) + 1),
        verified: Math.random() > 0.5,
        rating: Math.floor(Math.random() * 5) + 1,
        location: departments[Math.floor(Math.random() * departments.length)],
      }));
      
      function getRandomTrades() {
        const allTrades = [
          "Electricista", "Plomero", "Sanitario", "Albañil", "Pintor",
          "Carpintero", "Techista", "Soldador", "Yesero", "Vidriero",
          "Gasista", "Herrero", "Jardinero", "Cerrajero", "Instalador de A/C",
          "Mueblero", "Tapicero", "Zinguero", "Montajista", "Reparador de electrodomésticos",
        ];
        const num = Math.floor(Math.random() * 2) + 1;
        const shuffled = allTrades.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
      }


  const [searchTerm, setSearchTerm] = useState("");

  const sortedUsers = users.sort((a, b) => Number(b.verified) - Number(a.verified));

  const filteredUsers = sortedUsers.filter(
    (user) =>
      user.trades.some((trade) =>
        trade.toLowerCase().includes(searchTerm.toLowerCase())
      ) || user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gradient-to-br from-gray-100 to-neutral-100 px-2 py-8">
      <div className="w-full max-w-xl mb-8">
        <input
          type="text"
          placeholder="Buscar oficios..."
          className="w-full px-5 py-3 rounded-full shadow-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-5xl p-4">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white transition-transform duration-300 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center min-h-[400px]"
          >
            <div className="relative mb-4">
              <img
                src={user.profileImg}
                alt={user.fullName}
                className="rounded-full object-cover shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                {user.verified && (
                  <RiVerifiedBadgeFill className="text-blue-500 text-xl" />
                )}
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-800">{user.fullName}</h2>
            <div className="flex items-center justify-center mt-4 text-gray-600">
              <GiPositionMarker className="text-xl mr-1" />
              <span className="text-sm">{user.location}</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < user.rating ? "text-yellow-400" : "text-gray-300"}>
                    ★
                    </span>
                ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {user.trades.map((trade) => (
                <span
                  key={trade}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                >
                  {trade}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
