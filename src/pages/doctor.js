import { useState } from "react";

const patientsData = [
    { id: 1, name: "John Doe", age: 45 },
    { id: 2, name: "Jane Smith", age: 38 },
    { id: 3, name: "Michael Johnson", age: 50 },
    { id: 4, name: "Emily Davis", age: 29 },
    { id: 5, name: "Robert Brown", age: 60 },
    { id: 6, name: "Sarah Wilson", age: 34 },
    { id: 7, name: "David Martinez", age: 42 },
    { id: 8, name: "Laura Anderson", age: 39 }
  ];
  
  export default function DoctorDashboard() {
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [search, setSearch] = useState("");
  
    const filteredPatients = patientsData.filter(patient => 
      patient.name.toLowerCase().includes(search.toLowerCase())
    );
  
    const sendMessage = () => {
      if (message.trim() !== "") {
        setChat([...chat, { sender: "Doctor", text: message }]);
        setMessage("");
      }
    };
  
    return (
      <div className="flex p-6 max-w-5xl mx-auto bg-gray-100 h-screen">
        {/* Patient List */}
        <div className="w-1/3 bg-white shadow-lg rounded-lg p-4 border-r h-full overflow-hidden">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">Patients List</h2>
          <input 
            type="text" 
            placeholder="Search patients..." 
            className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ul className="border p-4 rounded shadow-md h-full overflow-y-auto bg-gray-50">
            {filteredPatients.map((patient) => (
              <li
                key={patient.id}
                className={`p-2 cursor-pointer border rounded mb-2 transition-all hover:bg-blue-100 ${selectedPatient?.id === patient.id ? 'bg-blue-300 text-white' : 'bg-white'}`}
                onClick={() => setSelectedPatient(patient)}
              >
                {patient.name} (Age: {patient.age})
              </li>
            ))}
          </ul>
        </div>
        
        {/* Chat Section */}
        <div className="w-2/3 p-6 bg-white shadow-lg rounded-lg h-full flex flex-col">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Doctor Dashboard</h1>
          {selectedPatient ? (
            <>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Chat with {selectedPatient.name}</h3>
              <div className="flex-1 border p-4 rounded shadow-md bg-gray-50 overflow-y-auto mb-4 h-80">
                {chat.map((msg, index) => (
                  <div key={index} className={`mb-2 p-2 rounded ${msg.sender === "Doctor" ? "bg-blue-200 self-end" : "bg-gray-200 self-start"}`}>
                    <strong>{msg.sender}:</strong> {msg.text}
                  </div>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  onClick={sendMessage}
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-600">Select a patient to start chatting.</p>
          )}
        </div>
      </div>
    );
  }