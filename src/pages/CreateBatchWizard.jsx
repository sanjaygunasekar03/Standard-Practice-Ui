import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CreateBatchWizard = () => {
  const { step } = useParams();
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [formData, setFormData] = useState({});
  const [templateFilter, setTemplateFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('Most Recent');
  const [ivrOnly, setIvrOnly] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  const callTypes = [
    { id: 'claims', name: 'Claims Status', description: 'Check the status of submitted claims' },
  ];

  const templates = [
    {
      id: 'tpl_001',
      name: 'New 11.20 Claim Status - IVR Only Call',
      datapoints: '1-8 Datapoints',
      type: 'Claim Status',
      isIvrOnly: true,
      isStarred: false,
      createdBy: { initials: 'AC', avatarUrl: null },
      createdAt: '11/20/2025',
      badge: 'New'
    },
    {
      id: 'tpl_002',
      name: 'Claim Status (NR) - Standard Template',
      datapoints: '3-6 Datapoints',
      type: 'Claim Status',
      isIvrOnly: false,
      isStarred: false,
      createdBy: { initials: 'BC', avatarUrl: null },
      createdAt: '11/15/2025',
      badge: 'AC'
    },
    {
      id: 'tpl_003',
      name: 'Bristol Onboarding Template 11.07',
      datapoints: '3-9 Datapoints',
      type: 'Claim Status',
      isIvrOnly: false,
      isStarred: true,
      createdBy: { initials: 'NK', avatarUrl: 'https://cdn.example.com/user_pfp.jpg' },
      createdAt: '11/07/2025',
      badge: ''
    },
    {
      id: 'tpl_004',
      name: 'Claim Status Log – 4 Questions',
      datapoints: '4-8 Datapoints',
      type: 'Claim Status',
      isIvrOnly: true,
      isStarred: false,
      createdBy: { initials: 'JD', avatarUrl: null },
      createdAt: '10/28/2025',
      badge: ''
    },
    {
      id: 'tpl_005',
      name: 'Claim Status (NR) Only – 4 Steps',
      datapoints: '2-5 Datapoints',
      type: 'Claim Status',
      isIvrOnly: false,
      isStarred: false,
      createdBy: { initials: 'MS', avatarUrl: null },
      createdAt: '10/20/2025',
      badge: ''
    },
    {
      id: 'tpl_006',
      name: 'Advanced Claims Processing Template',
      datapoints: '5-12 Datapoints',
      type: 'Claim Status',
      isIvrOnly: true,
      isStarred: false,
      createdBy: { initials: 'RL', avatarUrl: null },
      createdAt: '10/15/2025',
      badge: 'Premium'
    }
  ];

  const questions = [
    { id: 'patient_name', label: 'Patient Name', type: 'text' },
    { id: 'dob', label: 'Date of Birth', type: 'date' },
    { id: 'member_id', label: 'Member ID', type: 'text' },
    { id: 'dos', label: 'Date of Service', type: 'date' },
  ];

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    navigate('/batches/new/select-template');
  };

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    navigate(`/batches/edit/${templateId}`);
  };

  const handleFormChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleNext = () => {
    if (step === 'configure') navigate('/batches/new/upload');
    else if (step === 'upload') navigate('/batches/new/review');
  };

  const handleBack = () => {
    if (step === 'select-template') navigate('/batches/new/select-type');
    else if (step === 'configure') navigate('/batches/new/select-template');
    else if (step === 'upload') navigate('/batches/new/configure');
    else if (step === 'review') navigate('/batches/new/upload');
  };

  const handleClose = () => {
    navigate('/');
  };

  if (step === 'select-type' || !step) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto relative">
          {/* Close X button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-light"
          >
            ×
          </button>

          <div className="p-12">
            {/* Header - Top Left Aligned */}
            <div className="mb-12">
              <h1 className="text-2xl font-bold text-gray-900">Select Call Type</h1>
              <p className="text-lg text-gray-600 mt-2">What is the goal of this call batch?</p>
              <p className="text-sm text-gray-500 mt-1">Pick what type of call you would like Standard Practice to make on your behalf.</p>
            </div>

            {/* Selection Cards - Horizontal Flexbox */}
            <div className="flex flex-col lg:flex-row gap-8 mb-12">
              {/* Card A (Active Option) */}
              <div className="flex-1 bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all">
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">Claims</span>
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-sm">🛡️</span>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-gray-600">Call insurance to manage and check the status of claims</p>
                </div>

                <div className="space-y-2 mb-6">
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">To: Insurance</span>
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">Re: Patient</span>
                </div>

                <button
                  onClick={() => handleTypeSelect('claims')}
                  className="w-full py-3 px-6 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
                >
                  Select Call Type
                </button>
              </div>

              {/* Card B (Feedback Option) */}
              <div className="flex-1 bg-gray-50 rounded-lg p-6 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <span className="text-gray-600 text-lg">❓</span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-4">Not seeing your call type?</h3>

                <button className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                  <span>Request New Call Type</span>
                  <span className="text-sm">📤</span>
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 pt-6">
              <button
                onClick={handleClose}
                className="w-full py-3 text-gray-500 hover:text-gray-700 font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'select-template') {
    const filteredTemplates = templates.filter(template => {
      if (templateFilter !== 'All' && template.badge !== templateFilter) return false;
      if (searchTerm && !template.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    });

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white border border-[#EAECEF] rounded-xl shadow-xl max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-[#1A1C21] tracking-tight mb-2">Select a Call Template</h1>
              <p className="text-lg text-[#717784]">What's the best template for the call conversation?</p>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-8 p-6 bg-[#F7F8FA] rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-[#4A4F59] font-semibold text-sm uppercase tracking-wider">Sort By:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2.5 border border-[#D0D5DD] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00B8D9] bg-white"
                  >
                    <option>Most Recent</option>
                    <option>Most Used</option>
                    <option>A-Z</option>
                  </select>
                </div>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ivrOnly}
                    onChange={(e) => setIvrOnly(e.target.checked)}
                    className="rounded border-[#D0D5DD]"
                  />
                  <span className="text-sm text-[#4A4F59] font-medium">IVR Only</span>
                </label>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-[#4A4F59] font-semibold text-sm uppercase tracking-wider">Template Status:</span>
                  <select
                    value={templateFilter}
                    onChange={(e) => setTemplateFilter(e.target.value)}
                    className="px-4 py-2.5 border border-[#D0D5DD] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00B8D9] bg-white"
                  >
                    <option>All</option>
                    <option>Active</option>
                    <option>Draft</option>
                  </select>
                </div>
                <span className="text-sm text-[#98A2B3]">{filteredTemplates.length} templates found</span>
              </div>

              <div className="flex items-center space-x-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Filter by Relevant"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-80 px-4 py-2.5 pl-10 pr-10 border border-[#D0D5DD] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00B8D9] bg-white"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <span className="text-[#98A2B3]">🔍</span>
                  </div>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <span className="text-[#98A2B3]">✕</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Template Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 max-h-96 overflow-y-auto">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="border border-[#EAECEF] rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer hover:border-[#00B8D9] bg-white"
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-sm font-bold text-[#1A1C21] leading-tight">{template.name}</h3>
                        {template.isIvrOnly && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">IVR Only</span>
                        )}
                      </div>
                      <p className="text-xs text-[#717784] mb-2">{template.datapoints}</p>
                      <span className="inline-block px-2 py-1 bg-[#F1EBFA] text-[#6929C4] rounded text-xs font-medium mb-2">
                        {template.type}
                      </span>
                    </div>
                    <button className="text-gray-400 hover:text-yellow-500 text-lg">
                      {template.isStarred ? '⭐' : '☆'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {template.createdBy.avatarUrl ? (
                        <img
                          src={template.createdBy.avatarUrl}
                          alt={template.createdBy.initials}
                          className="w-6 h-6 rounded-full border border-[#EAECEF]"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-[#F7F8FA] flex items-center justify-center text-xs font-bold border border-[#EAECEF] text-[#4A4F59]">
                          {template.createdBy.initials}
                        </div>
                      )}
                      <span className="text-xs text-[#98A2B3]">{template.createdAt}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <button className="flex-1 bg-white border border-[#D0D5DD] text-[#4A4F59] py-2.5 px-4 rounded-lg hover:bg-[#F7F8FA] transition-colors font-semibold text-sm">
                      Preview
                    </button>
                    <button className="flex-1 bg-[#00B8D9] text-white py-2.5 px-4 rounded-lg hover:bg-[#00A3C1] transition-colors font-semibold text-sm">
                      Select
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <button onClick={handleBack} className="px-6 py-2.5 text-[#717784] hover:text-[#1A1C21] font-semibold transition-colors">
                Back
              </button>
              <div className="flex items-center space-x-4">
                <button className="px-6 py-2.5 border border-[#D0D5DD] rounded-lg text-[#4A4F59] font-semibold hover:bg-[#F7F8FA] transition-colors">
                  Edit Call Templates
                </button>
                <span className="text-sm text-[#98A2B3]">Sort By: <strong>Most Relevant</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'configure') {
    return (
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-[#1A1C21] tracking-tight mb-8">Configure Questions</h1>
        <div className="bg-white border border-[#EAECEF] rounded-xl p-8 space-y-6 shadow-sm">
          {questions.map((q) => (
            <div key={q.id}>
              <label className="block text-sm font-semibold text-[#4A4F59] mb-3 uppercase tracking-wider">{q.label}</label>
              <input
                type={q.type}
                className="w-full px-4 py-3 border border-[#D0D5DD] rounded-lg text-[#1A1C21] focus:outline-none focus:ring-2 focus:ring-[#00B8D9] bg-white"
                onChange={(e) => handleFormChange(q.id, e.target.value)}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-8">
          <button onClick={handleBack} className="px-6 py-2.5 bg-white border border-[#D0D5DD] rounded-lg text-[#4A4F59] font-semibold hover:bg-[#F7F8FA] transition-colors">Back</button>
          <button onClick={handleNext} className="px-6 py-2.5 bg-[#00B8D9] text-white rounded-lg font-semibold hover:bg-[#00A3C1] transition-colors">Next</button>
        </div>
      </div>
    );
  }

  if (step === 'upload') {
    return (
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-[#1A1C21] tracking-tight mb-8">Upload Data</h1>
        <div
          className="bg-white border-2 border-dashed border-[#D0D5DD] rounded-xl p-12 text-center shadow-sm hover:border-[#00B8D9] transition-colors"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); setUploadedFile(e.dataTransfer.files[0]); }}
        >
          <p className="text-[#717784] mb-6 text-lg">Drag and drop your CSV file here or click to browse</p>
          <input type="file" accept=".csv" className="hidden" id="file-upload" ref={fileInputRef} onChange={(e) => setUploadedFile(e.target.files[0])} />
          <button
            onClick={() => fileInputRef.current.click()}
            className="bg-[#00B8D9] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#00A3C1] transition-colors"
          >
            Upload CSV
          </button>
          {uploadedFile && <p className="text-[#1A1C21] mt-4">Selected file: {uploadedFile.name}</p>}
        </div>
        <div className="flex justify-between mt-8">
          <button onClick={handleBack} className="px-6 py-2.5 bg-white border border-[#D0D5DD] rounded-lg text-[#4A4F59] font-semibold hover:bg-[#F7F8FA] transition-colors">Back</button>
          <button onClick={handleNext} className="px-6 py-2.5 bg-[#00B8D9] text-white rounded-lg font-semibold hover:bg-[#00A3C1] transition-colors">Next</button>
        </div>
      </div>
    );
  }

  if (step === 'review') {
    return (
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-[#1A1C21] tracking-tight mb-8">Review & Create Batch</h1>
        <div className="bg-white border border-[#EAECEF] rounded-xl p-6 shadow-sm">
          <p className="text-[#1A1C21] text-lg"><strong>Type:</strong> {selectedType}</p>
          <p className="text-[#1A1C21] text-lg"><strong>Data:</strong> {uploadedFile ? uploadedFile.name : 'No file uploaded'}</p>
        </div>
        <div className="flex justify-between mt-8">
          <button onClick={handleBack} className="px-6 py-2.5 bg-white border border-[#D0D5DD] rounded-lg text-[#4A4F59] font-semibold hover:bg-[#F7F8FA] transition-colors">Back</button>
          <button
            onClick={handleNext}
            disabled={!uploadedFile}
            className={`px-6 py-2.5 rounded-lg font-semibold transition-colors ${uploadedFile ? 'bg-[#00B8D9] text-white hover:bg-[#00A3C1]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  return <div>Invalid step</div>;
};

export default CreateBatchWizard;