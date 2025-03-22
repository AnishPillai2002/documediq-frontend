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
    const [chatMode, setChatMode] = useState("general"); // "patient" or "general"

    const filteredPatients = patientsData.filter(patient =>
        patient.name.toLowerCase().includes(search.toLowerCase())
    );

    const sendMessage = () => {
        if (message.trim() !== "") {
            setChat([
                ...chat, 
                { 
                    sender: "Doctor", 
                    text: message, 
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
            ]);
            
            // Simulate response for demo purposes
            setTimeout(() => {
                setChat(prev => [
                    ...prev,
                    {
                        sender: chatMode === "patient" ? selectedPatient.name : "System",
                        text: `This is a simulated response to: "${message}"`,
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }
                ]);
            }, 1000);
            
            setMessage("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const selectPatient = (patient) => {
        setSelectedPatient(patient);
        setChatMode("patient");
        setChat([]); // Clear chat when switching patients
    };

    const switchToGeneralChat = () => {
        setChatMode("general");
        setSelectedPatient(null);
        setChat([]); // Clear chat when switching to general mode
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-1/4 bg-white shadow-md flex flex-col">
                <div className="p-4 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-blue-600">DocuMedIQ</h1>
                    <p className="text-sm text-gray-500">Doctor Dashboard</p>
                </div>
                
                <div className="p-4">
                    <button 
                        onClick={switchToGeneralChat}
                        className={`w-full mb-4 p-3 rounded-lg transition-all flex items-center ${
                            chatMode === "general" 
                                ? "bg-blue-500 text-white" 
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        General Chat
                    </button>
                    
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search patients..."
                            className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4">
                    <h2 className="text-xs uppercase font-semibold text-gray-500 mb-2 tracking-wider">Patients</h2>
                    <ul>
                        {filteredPatients.map((patient) => (
                            <li
                                key={patient.id}
                                className={`p-3 mb-2 cursor-pointer rounded-lg transition-all flex items-center ${
                                    selectedPatient?.id === patient.id && chatMode === "patient"
                                        ? "bg-blue-500 text-white"
                                        : "hover:bg-gray-100"
                                }`}
                                onClick={() => selectPatient(patient)}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                                    selectedPatient?.id === patient.id && chatMode === "patient" 
                                        ? "bg-blue-400" 
                                        : "bg-blue-100"
                                }`}>
                                    <span className={selectedPatient?.id === patient.id && chatMode === "patient" ? "text-white" : "text-blue-500"}>
                                        {patient.name.split(" ").map(name => name[0]).join("")}
                                    </span>
                                </div>
                                <div>
                                    <h3 className={`font-medium ${selectedPatient?.id === patient.id && chatMode === "patient" ? "text-white" : "text-gray-800"}`}>
                                        {patient.name}
                                    </h3>
                                    <p className={`text-xs ${selectedPatient?.id === patient.id && chatMode === "patient" ? "text-blue-100" : "text-gray-500"}`}>
                                        Age: {patient.age}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Chat Section */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="bg-white p-4 shadow-sm border-b border-gray-200 flex items-center">
                    {chatMode === "patient" && selectedPatient ? (
                        <>
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                <span className="text-blue-500">{selectedPatient.name.split(" ").map(name => name[0]).join("")}</span>
                            </div>
                            <div>
                                <h2 className="font-medium text-gray-800">{selectedPatient.name}</h2>
                                <p className="text-xs text-gray-500">Age: {selectedPatient.age}</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <h2 className="font-medium text-gray-800">General Chat</h2>
                        </>
                    )}
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                    {chat.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <p>No messages yet</p>
                            <p className="text-sm mt-2">
                                {chatMode === "patient" 
                                    ? `Start a conversation with ${selectedPatient.name}` 
                                    : "Send a message to start chatting"
                                }
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {chat.map((msg, index) => (
                                <div key={index} className={`flex ${msg.sender === "Doctor" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-xs md:max-w-md lg:max-w-lg rounded-2xl px-4 py-3 ${
                                        msg.sender === "Doctor" 
                                            ? "bg-blue-500 text-white rounded-tr-none" 
                                            : "bg-white shadow-sm rounded-tl-none"
                                    }`}>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className={`text-xs font-medium ${msg.sender === "Doctor" ? "text-blue-100" : "text-gray-500"}`}>
                                                {msg.sender}
                                            </span>
                                            <span className={`text-xs ${msg.sender === "Doctor" ? "text-blue-100" : "text-gray-400"}`}>
                                                {msg.timestamp}
                                            </span>
                                        </div>
                                        <p className={msg.sender === "Doctor" ? "text-white" : "text-gray-800"}>
                                            {msg.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Message Input */}
                <div className="p-4 bg-white border-t border-gray-200">
                    <div className="flex items-center bg-gray-100 rounded-lg p-1">
                        <input
                            type="text"
                            className="flex-1 p-3 bg-transparent border-none focus:outline-none"
                            placeholder={`Type a message to ${chatMode === "patient" && selectedPatient ? selectedPatient.name : "General Chat"}...`}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 ml-2 flex items-center"
                            onClick={sendMessage}
                            disabled={!message.trim()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}