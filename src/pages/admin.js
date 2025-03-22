import { useState } from "react";
import { Search, Upload, User, FileText, Calendar, Check } from "lucide-react";

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

export default function AdminDashboard() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [file, setFile] = useState(null);
  const [search, setSearch] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadSuccess(false);
  };

  const handleUpload = () => {
    if (file) {
      // In a real app, you would handle the actual upload here
      setTimeout(() => {
        setUploadSuccess(true);
      }, 1000);
    }
  };

  const filteredPatients = patientsData.filter(patient => 
    patient.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-800">Hospital Admin</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-white text-slate-600 px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-100 transition">
              Help
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
              <span className="text-sm font-medium">AD</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex flex-1 max-w-7xl mx-auto w-full p-6 gap-6 overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/3 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100">
            <h2 className="text-lg font-semibold text-slate-800 mb-3">Patients</h2>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search patients..." 
                className="w-full p-2 pl-10 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            {filteredPatients.length === 0 ? (
              <div className="text-center py-10 text-slate-500">No patients found</div>
            ) : (
              <ul className="space-y-2">
                {filteredPatients.map((patient) => (
                  <li
                    key={patient.id}
                    className={`p-3 rounded-lg cursor-pointer transition-all flex items-center ${
                      selectedPatient?.id === patient.id 
                        ? 'bg-blue-50 border-blue-200 border' 
                        : 'hover:bg-slate-50 border border-transparent'
                    }`}
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      selectedPatient?.id === patient.id ? 'bg-blue-500' : 'bg-slate-200'
                    }`}>
                      <User className={`w-4 h-4 ${
                        selectedPatient?.id === patient.id ? 'text-white' : 'text-slate-500'
                      }`} />
                    </div>
                    <div>
                      <h3 className={`font-medium ${
                        selectedPatient?.id === patient.id ? 'text-blue-700' : 'text-slate-700'
                      }`}>
                        {patient.name}
                      </h3>
                      <div className="flex items-center text-xs text-slate-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>Age: {patient.age}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        {/* Main panel */}
        <div className="w-2/3 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          {selectedPatient ? (
            <div className="p-6 flex flex-col h-full">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <h2 className="text-xl font-bold text-slate-800">Patient Details</h2>
              </div>
              
              <div className="flex gap-6 mb-8">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                  <User className="w-8 h-8 text-slate-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">{selectedPatient.name}</h3>
                  <div className="flex items-center text-slate-500 mt-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{selectedPatient.age} years old</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-500" />
                  Upload Medical Document
                </h3>
                
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center hover:border-blue-300 transition-colors">
                  <input 
                    type="file" 
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileChange} 
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                    <p className="text-sm text-slate-600 mb-1">
                      {file ? file.name : "Drag and drop a file, or click to browse"}
                    </p>
                    <p className="text-xs text-slate-500">
                      {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "Supports PDF, DOC, JPEG up to 10MB"}
                    </p>
                  </label>
                </div>
                
                {file && (
                  <div className="mt-4">
                    {uploadSuccess ? (
                      <div className="flex items-center justify-center p-2 bg-green-50 text-green-700 rounded-lg border border-green-200">
                        <Check className="w-4 h-4 mr-2" />
                        Successfully uploaded document for {selectedPatient.name}
                      </div>
                    ) : (
                      <button 
                        onClick={handleUpload}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Document
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <div className="bg-slate-50 rounded-full p-6 mb-4">
                <User className="w-12 h-12 text-slate-300" />
              </div>
              <h3 className="text-lg font-medium text-slate-700 mb-2">No Patient Selected</h3>
              <p className="text-slate-500 max-w-md">
                Please select a patient from the list to view their details and upload documents.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



