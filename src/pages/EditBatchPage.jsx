import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Eye, EyeOff, MoreHorizontal, Check, Clock, Zap, Save, Copy, History, Trash2, HelpCircle, Edit, CheckCircle, Upload, Plus, Download } from 'lucide-react';

const EditBatchPage = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [batchTitle, setBatchTitle] = useState('New Batch - AC Apr 02, 2026 [2]');
  const [selectedTemplate, setSelectedTemplate] = useState(templateId);
  const [currentStep, setCurrentStep] = useState(1); // Start on Step 1

  const handleContinue = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
      setBatchTitle('New Batch - AC Apr 02, 2026 [3]');
    }
  };

  // Mock data for conditional logic
  const [formData, setFormData] = useState({
    'claim-status': {
      conditions: [
        {
          id: 'paid',
          name: 'Paid',
          visible: true,
          fields: [
            { id: 'transaction_check_number', name: 'Transaction/Check Number', visible: true, required: false },
            { id: 'amount_paid', name: 'Amount Paid', visible: true, required: false },
            { id: 'claim_paid_date', name: 'Claim Paid Date', visible: true, required: false },
            { id: 'patient_responsibility', name: 'Patient Responsibility', visible: true, required: false },
            { id: 'eft_number', name: 'EFT Number', visible: true, required: false }
          ]
        },
        {
          id: 'denied',
          name: 'Denied',
          visible: true,
          fields: [
            { id: 'denial_reason', name: 'Denial Reason', visible: true, required: false },
            { id: 'received_date', name: 'Received Date', visible: true, required: false },
            { id: 'claim_number', name: 'Claim Number', visible: true, required: false }
          ]
        },
        {
          id: 'in_progress',
          name: 'In Progress',
          visible: true,
          fields: [
            { id: 'expected_processing_time', name: 'Expected Processing Time', visible: true, required: false }
          ]
        }
      ]
    }
  });

  const templates = [
    { id: 'tpl_001', name: '11.20 Claim Status - IVR Only Call' }
  ];

  const toggleFieldVisibility = (conditionId, fieldId) => {
    setFormData(prev => ({
      ...prev,
      'claim-status': {
        ...prev['claim-status'],
        conditions: prev['claim-status'].conditions.map(condition =>
          condition.id === conditionId
            ? {
                ...condition,
                fields: condition.fields.map(field =>
                  field.id === fieldId
                    ? { ...field, visible: !field.visible }
                    : field
                )
              }
            : condition
        )
      }
    }));
  };

  const getTotalFields = () => {
    return formData['claim-status'].conditions.reduce((total, condition) => total + condition.fields.length, 0);
  };

  const getRequiredFields = () => {
    return 1; // Claim Status is always required
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Top Navigation */}
      <div className="bg-white border-b border-[#EAECEF] px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center text-[#717784] hover:text-[#1A1C21] transition-colors">
              <ChevronLeft size={20} className="mr-2" />
              Dashboard
            </Link>
            <span className="text-[#98A2B3]">›</span>
            <span className="text-[#1A1C21] font-medium">Call Batch</span>
          </div>
        </div>
        <div className="mt-4">
          <h1 className="text-2xl font-bold text-[#1A1C21]">Edit Call Batch</h1>
        </div>
      </div>

      {/* Horizontal Stepper */}
      <div className="bg-white border-b border-[#EAECEF] px-8 py-6">
        <div className="flex items-center justify-center space-x-8">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
              currentStep >= 1 ? 'bg-[#00B8D9]' : 'border-2 border-[#D0D5DD] text-[#98A2B3]'
            }`}>
              {currentStep > 1 ? <Check size={16} /> : 1}
            </div>
            <span className={`font-semibold ${currentStep >= 1 ? 'text-[#1A1C21]' : 'text-[#98A2B3]'}`}>
              Info to Collect
            </span>
          </div>
          <div className={`w-16 h-px ${currentStep > 1 ? 'bg-[#00B8D9]' : 'bg-[#EAECEF]'}`}></div>
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
              currentStep >= 2 ? 'bg-[#00B8D9]' : 'border-2 border-[#D0D5DD] text-[#98A2B3]'
            }`}>
              2
            </div>
            <span className={`font-semibold ${currentStep >= 2 ? 'text-[#1A1C21]' : 'text-[#98A2B3]'}`}>
              Upload Data
            </span>
          </div>
          <div className="w-16 h-px bg-[#EAECEF]"></div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 border-2 border-[#D0D5DD] rounded-full flex items-center justify-center text-[#98A2B3] font-bold">
              3
            </div>
            <span className="text-[#98A2B3]">Review & Schedule</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex max-w-7xl mx-auto px-8 py-8 space-x-8">
        {/* Left Sidebar */}
        <div className="w-80 space-y-6">
          {/* Batch Details Card */}
          <div className="bg-white border border-[#EAECEF] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-bold text-[#6929C4] bg-[#F1EBFA] px-3 py-1 rounded">Draft</span>
              <button className="text-[#98A2B3] hover:text-[#1A1C21]">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#4A4F59] mb-2 uppercase tracking-wider">
                  Batch Title
                </label>
                <input
                  type="text"
                  value={batchTitle}
                  onChange={(e) => setBatchTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00B8D9]"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#717784]">Call Type</span>
                  <span className="text-sm font-bold text-[#6929C4] bg-[#F1EBFA] px-2 py-1 rounded">Claims (IVR)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#717784]">Goal</span>
                  <span className="text-[#1A1C21] font-medium">Claim Status</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#717784]">To</span>
                  <span className="text-[#1A1C21] font-medium">Insurance</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#717784]">Regarding</span>
                  <span className="text-[#1A1C21] font-medium">Patient</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#717784]">Batch ID</span>
                  <span className="text-[#1A1C21] font-medium">B-1035</span>
                </div>
              </div>
            </div>
          </div>

          {/* Batch Activity Card */}
          <div className="bg-white border border-[#EAECEF] rounded-xl p-6">
            <h3 className="font-bold text-[#1A1C21] mb-4">Batch Activity</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#717784]">Status</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 border-2 border-dashed border-[#00B8D9] rounded-full"></div>
                  <span className="text-sm font-medium text-[#1A1C21]">Draft</span>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#717784]">Calls</span>
                <span className="text-[#1A1C21] font-medium">—</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#717784]">Scheduled</span>
                <span className="text-[#1A1C21] font-medium">Not scheduled</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#717784]">Batch Speed</span>
                <div className="flex items-center space-x-1">
                  <Zap size={14} className="text-[#00B8D9]" />
                  <span className="text-sm font-medium text-[#1A1C21]">Max</span>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#717784]">Created</span>
                <span className="text-[#1A1C21] font-medium">AC 4/2/2026 3:36 AM</span>
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="bg-white border border-[#EAECEF] rounded-xl p-6">
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-[#4A4F59] hover:bg-[#F7F8FA] rounded-lg transition-colors">
                <Save size={16} />
                <span>Save as new template</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-[#4A4F59] hover:bg-[#F7F8FA] rounded-lg transition-colors">
                <Copy size={16} />
                <span>Duplicate call batch</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-[#4A4F59] hover:bg-[#F7F8FA] rounded-lg transition-colors">
                <History size={16} />
                <span>View batch history</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 size={16} />
                <span>Delete call batch</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {currentStep === 1 ? (
            /* Info to Collect Step */
            <div className="bg-white border border-[#EAECEF] rounded-xl">
              <div className="p-8 border-b border-[#EAECEF]">
                <h2 className="text-xl font-bold text-[#1A1C21] mb-2">Collect info via IVR only</h2>
              </div>

              <div className="p-8">
                {/* Header & Template Selector */}
                <div className="mb-8">
                  <p className="text-sm text-[#717784] mb-6">
                    Review info to collect: Confirm information that needs to be retrieved, based on the selected template. <a href="#" className="text-[#00B8D9] hover:underline">Learn more</a>
                  </p>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <label className="text-sm font-bold text-[#4A4F59] uppercase tracking-wider">Template</label>
                      <div className="relative">
                        <select
                          value={selectedTemplate}
                          onChange={(e) => setSelectedTemplate(e.target.value)}
                          className="px-4 py-2 pr-8 border border-[#D0D5DD] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00B8D9] bg-white appearance-none"
                        >
                          {templates.map(template => (
                            <option key={template.id} value={template.id}>
                              {template.name}
                            </option>
                          ))}
                        </select>
                        <Edit size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#98A2B3]" />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-sm">
                      <CheckCircle size={16} className="text-[#00B8D9]" />
                      <span className="font-semibold text-[#1A1C21]">{getTotalFields()} info total / {getRequiredFields()} required</span>
                    </div>
                  </div>
                </div>

                {/* Primary Field Header */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-[#4A4F59] uppercase tracking-wider">Field</span>
                    <span className="text-sm font-bold text-[#1A1C21]">Claim Status</span>
                    <HelpCircle size={14} className="text-[#98A2B3]" />
                    <span className="text-red-500">*</span>
                  </div>
                </div>

                {/* Data Point Grouping */}
                {formData['claim-status'].conditions.map((condition) => (
                  <div key={condition.id} className="mb-6">
                    <h3 className="text-lg font-semibold text-[#1A1C21] mb-4">
                      If Claim Status is <span className="font-bold">{condition.name}</span>
                    </h3>

                    <div className="space-y-3 ml-4">
                      {condition.fields.map((field) => (
                        <div key={field.id} className="flex items-center justify-between py-2 px-4 bg-[#F7F8FA] rounded-lg">
                          <span className={`text-sm ${field.visible ? 'text-[#1A1C21]' : 'text-[#98A2B3] line-through'}`}>
                            {field.name}
                          </span>
                          <button
                            onClick={() => toggleFieldVisibility(condition.id, field.id)}
                            className={`p-1 rounded ${field.visible ? 'text-[#00B8D9]' : 'text-[#D0D5DD]'} hover:bg-white`}
                          >
                            {field.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Upload Data Step */
            <div className="bg-white border border-[#EAECEF] rounded-xl">
              <div className="p-8">
                {/* Header with Download Link */}
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm text-[#717784]">
                    All columns are required to proceed. Use the template below to prepare your data, or add calls manually.
                  </p>
                  <a href="#" className="text-[#00B8D9] hover:underline text-sm font-semibold flex items-center">
                    <Download size={16} className="mr-2" />
                    Download CSV Template
                  </a>
                </div>

                {/* Manual Entry Section */}
                <div className="mb-8">
                  <button className="flex items-center px-6 py-3 border-2 border-[#00B8D9] text-[#00B8D9] rounded-lg font-semibold hover:bg-[#00B8D9] hover:text-white transition-colors">
                    <Plus size={18} className="mr-2" />
                    Add a Call
                  </button>
                </div>

                {/* Bulk Upload Drop Zone */}
                <div className="border-2 border-dashed border-[#D0D5DD] rounded-lg p-12 text-center bg-[#F7F8FA]">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 bg-[#00B8D9] rounded-full flex items-center justify-center">
                      <Upload size={32} className="text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-[#1A1C21] mb-2">Drag & drop CSV file here</p>
                      <p className="text-sm text-[#717784] mb-4">
                        or click the button below to browse files
                      </p>
                      <button className="px-8 py-3 bg-[#00B8D9] text-white rounded-lg font-semibold hover:bg-[#00A3C1] transition-colors">
                        Upload CSV
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="mt-8 flex justify-between items-center">
            <button className="px-6 py-3 border border-[#D0D5DD] rounded-lg text-[#4A4F59] font-semibold hover:bg-[#F7F8FA] transition-colors">
              Save & Close
            </button>
            <button
              onClick={currentStep === 1 ? handleContinue : undefined}
              className={`px-6 py-3 rounded-lg font-semibold ${
                currentStep === 1
                  ? 'bg-[#00B8D9] text-white hover:bg-[#00A3C1] transition-colors'
                  : 'bg-[#98A2B3] text-white cursor-not-allowed'
              }`}
              disabled={currentStep !== 1}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBatchPage;