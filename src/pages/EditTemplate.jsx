import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Eye, EyeOff, MoreHorizontal, Check, Clock, Zap, Save, Copy, History, Trash2, HelpCircle, Edit, CheckCircle, Plus, Settings, Edit3, X } from 'lucide-react';

const EditTemplate = () => {
  const { templateId } = useParams();

  // Mock template data
  const templateData = {
    id: templateId,
    name: 'New Template - AC Apr 01, 2026 (6)',
    goal: 'Claim Status',
    intro: 'Hello, I\'m calling to check the status of a claim for Bristol Healthcare Services.',
    createdBy: 'Alvin Cortez',
    createdAt: 'Apr 1st, 2026',
    isIvrOnly: true
  };

  const [templateName, setTemplateName] = useState(templateData.name);
  const [goal, setGoal] = useState('[Claim Status] Verify the status of a claim');
  const [intro, setIntro] = useState(templateData.intro);

  // Conditional logic data
  const [conditions, setConditions] = useState([
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
  ]);

  const [editingField, setEditingField] = useState(null);
  const [newFieldName, setNewFieldName] = useState('');

  const toggleFieldVisibility = (conditionId, fieldId) => {
    setConditions(conditions.map(condition =>
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
    ));
  };

  const deleteField = (conditionId, fieldId) => {
    setConditions(conditions.map(condition =>
      condition.id === conditionId
        ? {
            ...condition,
            fields: condition.fields.filter(field => field.id !== fieldId)
          }
        : condition
    ));
  };

  const startEditingField = (conditionId, fieldId, currentName) => {
    setEditingField({ conditionId, fieldId });
    setNewFieldName(currentName);
  };

  const saveFieldEdit = () => {
    if (!editingField || !newFieldName.trim()) return;

    setConditions(conditions.map(condition =>
      condition.id === editingField.conditionId
        ? {
            ...condition,
            fields: condition.fields.map(field =>
              field.id === editingField.fieldId
                ? { ...field, name: newFieldName.trim() }
                : field
            )
          }
        : condition
    ));

    setEditingField(null);
    setNewFieldName('');
  };

  const cancelFieldEdit = () => {
    setEditingField(null);
    setNewFieldName('');
  };

  const addNewField = (conditionId) => {
    const newFieldId = `field_${Date.now()}`;
    const newField = {
      id: newFieldId,
      name: 'New Field',
      visible: true,
      required: false
    };

    setConditions(conditions.map(condition =>
      condition.id === conditionId
        ? {
            ...condition,
            fields: [...condition.fields, newField]
          }
        : condition
    ));

    // Start editing the new field immediately
    setTimeout(() => {
      startEditingField(conditionId, newFieldId, 'New Field');
    }, 100);
  };

  const getTotalFields = () => {
    return conditions.reduce((total, condition) => total + condition.fields.length, 0);
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
            <Link to="/templates" className="flex items-center text-[#717784] hover:text-[#1A1C21] transition-colors">
              <ChevronLeft size={20} className="mr-2" />
              Templates
            </Link>
            <span className="text-[#98A2B3]">›</span>
            <span className="text-[#1A1C21] font-medium">Edit Template</span>
          </div>
        </div>
        <div className="mt-4">
          <h1 className="text-2xl font-bold text-[#1A1C21]">Edit Template</h1>
        </div>
      </div>

      <div className="flex max-w-7xl mx-auto px-8 py-8 space-x-8">
        {/* Left Sidebar */}
        <div className="w-80 space-y-6">
          {/* Template Details Card */}
          <div className="bg-white border border-[#EAECEF] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-bold text-[#6929C4] bg-[#F1EBFA] px-3 py-1 rounded">Template</span>
              <button className="text-[#98A2B3] hover:text-[#1A1C21]">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Template Name */}
              <div>
                <label className="block text-xs font-bold text-[#4A4F59] mb-2 uppercase tracking-wider">
                  Template Name
                </label>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D0D5DD] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00B8D9]"
                />
              </div>

              {/* Core Fields */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#717784]">Call type</span>
                  <span className="text-sm font-bold text-[#6929C4] bg-[#F1EBFA] px-2 py-1 rounded">Claims(IVR)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#717784]">Goal type</span>
                  <span className="text-sm text-[#1A1C21] font-medium">Claim status</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#717784]">To</span>
                  <span className="text-sm text-[#1A1C21] font-medium">Insurance</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#717784]">Regarding</span>
                  <span className="text-sm text-[#1A1C21] font-medium">Patient</span>
                </div>
              </div>

              {/* Timestamp */}
              <div className="pt-4 border-t border-[#EAECEF]">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#717784]">Created</span>
                  <span className="text-sm text-[#1A1C21] font-medium">AC 4/1/26 4:23 AM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Template Actions */}
          <div className="bg-white border border-[#EAECEF] rounded-xl p-6">
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-[#4A4F59] hover:bg-[#F7F8FA] rounded-lg transition-colors">
                <Copy size={16} />
                <span>Duplicate template</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 size={16} />
                <span>Delete template</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 space-y-8">
          {/* Goal & Intro Section */}
          <div className="bg-white border border-[#EAECEF] rounded-xl p-8">
            <h2 className="text-xl font-bold text-[#1A1C21] mb-6">Goal & Intro</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#4A4F59] mb-3 uppercase tracking-wider">
                  Goal
                </label>
                <textarea
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full px-4 py-3 border border-[#D0D5DD] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00B8D9] resize-none"
                  rows={3}
                  placeholder="Define the specific objective of this template..."
                />
                <p className="text-xs text-[#717784] mt-2">Describe what this template is designed to accomplish.</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#4A4F59] mb-3 uppercase tracking-wider">
                  Initial Agent Statement
                </label>
                <textarea
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                  className="w-full px-4 py-3 border border-[#D0D5DD] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00B8D9] resize-none"
                  rows={3}
                  placeholder="What should the AI say when the call connects..."
                />
                <p className="text-xs text-[#717784] mt-2">The opening statement that begins the conversation.</p>
              </div>
            </div>
          </div>

          {/* IVR Only Banner */}
          <div className="bg-[#E0F8FC] border border-[#00B8D9] rounded-xl p-4 mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#00B8D9] rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🎯</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#00B8D9]">Collect info via IVR only</h3>
                <p className="text-xs text-[#00B8D9]">This template is designed for automated IVR systems</p>
              </div>
            </div>
          </div>

          {/* Conditional Logic Section */}
          <div className="bg-white border border-[#EAECEF] rounded-xl">
            <div className="p-8 border-b border-[#EAECEF]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#1A1C21]">Info to Collect</h2>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle size={16} className="text-[#00B8D9]" />
                  <span className="font-semibold text-[#1A1C21]">{getTotalFields()} info total / {getRequiredFields()} required</span>
                </div>
              </div>
              <p className="text-sm text-[#717784] mt-2">
                Define different conversation paths based on call outcomes. The AI will adapt its questions depending on the claim status.
              </p>
            </div>

            <div className="p-8">
              {/* Primary Field Header */}
              <div className="mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-[#4A4F59] uppercase tracking-wider">Primary Field</span>
                  <span className="text-sm font-bold text-[#1A1C21]">Claim Status</span>
                  <HelpCircle size={14} className="text-[#98A2B3]" />
                  <span className="text-red-500">*</span>
                </div>
              </div>

              {/* Conditional Branches */}
              {conditions.map((condition) => (
                <div key={condition.id} className="mb-8">
                  <h3 className="text-lg font-semibold text-[#1A1C21] mb-4">
                    If Claim Status is <span className="font-bold">{condition.name}</span>
                  </h3>

                  <div className="space-y-3 ml-4">
                    {condition.fields.map((field) => (
                      <div key={field.id} className="flex items-center justify-between py-3 px-4 bg-[#F7F8FA] rounded-lg">
                        {editingField && editingField.conditionId === condition.id && editingField.fieldId === field.id ? (
                          <div className="flex items-center space-x-2 flex-1">
                            <input
                              type="text"
                              value={newFieldName}
                              onChange={(e) => setNewFieldName(e.target.value)}
                              className="flex-1 px-2 py-1 border border-[#00B8D9] rounded text-sm focus:outline-none"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') saveFieldEdit();
                                if (e.key === 'Escape') cancelFieldEdit();
                              }}
                            />
                            <button
                              onClick={saveFieldEdit}
                              className="p-1 text-green-600 hover:bg-white rounded"
                            >
                              <Check size={14} />
                            </button>
                            <button
                              onClick={cancelFieldEdit}
                              className="p-1 text-red-600 hover:bg-white rounded"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <span className={`text-sm ${field.visible ? 'text-[#1A1C21]' : 'text-[#98A2B3] line-through'}`}>
                              {field.name}
                            </span>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => startEditingField(condition.id, field.id, field.name)}
                                className="p-1 text-[#00B8D9] hover:bg-white rounded"
                              >
                                <Edit3 size={14} />
                              </button>
                              <button
                                onClick={() => toggleFieldVisibility(condition.id, field.id)}
                                className={`p-1 rounded ${field.visible ? 'text-[#00B8D9]' : 'text-[#D0D5DD]'} hover:bg-white`}
                              >
                                {field.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                              </button>
                              <button
                                onClick={() => deleteField(condition.id, field.id)}
                                className="p-1 text-red-600 hover:bg-white rounded"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={() => addNewField(condition.id)}
                      className="flex items-center space-x-2 text-[#00B8D9] hover:text-[#00A3C1] transition-colors text-sm ml-4"
                    >
                      <Plus size={14} />
                      <span>Add field</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-between items-center">
            <button className="px-6 py-3 border border-[#D0D5DD] rounded-lg text-[#4A4F59] font-semibold hover:bg-[#F7F8FA] transition-colors">
              Cancel
            </button>
            <div className="flex space-x-3">
              <button className="px-6 py-3 border border-[#00B8D9] text-[#00B8D9] rounded-lg font-semibold hover:bg-[#E0F8FC] transition-colors">
                Save Draft
              </button>
              <button
                className="px-6 py-3 bg-[#D0D5DD] text-[#98A2B3] rounded-lg font-semibold cursor-not-allowed"
                disabled
              >
                Save template
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTemplate;