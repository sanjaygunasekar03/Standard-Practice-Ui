import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Star, Eye, Edit, MoreHorizontal, Plus, MessageSquare } from 'lucide-react';

const Templates = () => {
  const navigate = useNavigate();
  const [showCreateDropdown, setShowCreateDropdown] = useState(false);
  const [ivrOnly, setIvrOnly] = useState(false);
  const [sortBy, setSortBy] = useState('Most Relevant');

  const handleCreateTemplate = (templateType) => {
    // Navigate to template creation wizard - for now using batch wizard as template
    // In a real app, this would navigate to a dedicated template creation flow
    navigate('/batches/new/select-type');
    setShowCreateDropdown(false);
  };

  // Mock data with expanded templates
  const templates = [
    {
      id: 1,
      name: 'New Template - AC Apr 01, 2026 (6)',
      datapoints: '1-4 Datapoints',
      goal: 'Claim Status',
      isIvrOnly: true,
      createdBy: 'AC',
      date: 'Apr 1st, 2026',
      isStarred: true
    },
    {
      id: 2,
      name: '11.20 Claim Status - IVR Only Call',
      datapoints: '1-8 Datapoints',
      goal: 'Claim Status',
      isIvrOnly: true,
      createdBy: 'AC',
      date: 'Nov 20th, 2025',
      isStarred: false
    },
    {
      id: 3,
      name: 'Claim Status (NR) - Standard Template',
      datapoints: '3-6 Datapoints',
      goal: 'Claim Status',
      isIvrOnly: false,
      createdBy: 'BC',
      date: 'Nov 15th, 2025',
      isStarred: false
    },
    {
      id: 4,
      name: 'Bristol Onboarding Template 11.07',
      datapoints: '3-9 Datapoints',
      goal: 'Claim Status',
      isIvrOnly: false,
      createdBy: 'NK',
      date: 'Nov 7th, 2025',
      isStarred: true
    },
    {
      id: 5,
      name: 'Claim Status Log – 4 Questions',
      datapoints: '4-8 Datapoints',
      goal: 'Claim Status',
      isIvrOnly: true,
      createdBy: 'JD',
      date: 'Oct 28th, 2025',
      isStarred: false
    },
    {
      id: 6,
      name: 'Claim Status (NR) Only – 4 Steps',
      datapoints: '2-5 Datapoints',
      goal: 'Claim Status',
      isIvrOnly: false,
      createdBy: 'MS',
      date: 'Oct 20th, 2025',
      isStarred: false
    },
    {
      id: 7,
      name: 'Advanced Claims Processing Template',
      datapoints: '5-12 Datapoints',
      goal: 'Claim Status',
      isIvrOnly: true,
      createdBy: 'RL',
      date: 'Oct 15th, 2025',
      isStarred: false
    },
    {
      id: 8,
      name: 'Express Claims Verification',
      datapoints: '2-4 Datapoints',
      goal: 'Claim Status',
      isIvrOnly: false,
      createdBy: 'AC',
      date: 'Oct 10th, 2025',
      isStarred: false
    }
  ];

  const filteredTemplates = templates.filter(template => {
    if (ivrOnly && !template.isIvrOnly) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <h1 className="text-3xl font-extrabold text-[#1A1C21] tracking-tight">Edit Call Templates</h1>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-[#717784]">Not seeing your call type?</span>
            <button className="px-4 py-2 border border-[#D0D5DD] rounded-lg text-sm font-semibold hover:bg-[#F7F8FA] transition-colors">
              Request
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Sort By */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold text-[#4A4F59] uppercase tracking-wider">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-[#D0D5DD] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00B8D9] bg-white"
            >
              <option>Most Relevant</option>
              <option>Most Used</option>
              <option>A-Z</option>
              <option>Newest</option>
            </select>
          </div>

          {/* IVR Only Toggle */}
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={ivrOnly}
              onChange={(e) => setIvrOnly(e.target.checked)}
              className="rounded border-[#D0D5DD]"
            />
            <span className="text-sm text-[#4A4F59] font-medium">IVR Only</span>
          </label>

          {/* Create New Template Button */}
          <div className="relative">
            <button
              onClick={() => setShowCreateDropdown(!showCreateDropdown)}
              className="flex items-center px-6 py-3 bg-[#00B8D9] text-white rounded-lg font-semibold hover:bg-[#00A3C1] transition-colors"
            >
              <Plus size={18} className="mr-2" />
              Create new template
              <ChevronDown size={14} className="ml-2" />
            </button>

            {showCreateDropdown && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#EAECEF] rounded-xl shadow-lg z-50">
                <div className="py-2">
                  <button
                    onClick={() => handleCreateTemplate('claims')}
                    className="w-full text-left px-4 py-3 text-sm text-[#4A4F59] hover:bg-[#F7F8FA] transition-colors flex items-center"
                  >
                    <span className="w-3 h-3 rounded-full bg-[#F1EBFA] mr-3"></span>
                    Claims
                  </button>
                  <button
                    onClick={() => handleCreateTemplate('claims-ivr')}
                    className="w-full text-left px-4 py-3 text-sm text-[#4A4F59] hover:bg-[#F7F8FA] transition-colors flex items-center"
                  >
                    <span className="w-3 h-3 rounded-full bg-[#F1EBFA] mr-3"></span>
                    Claims (IVR)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category Section */}
      <div className="bg-white border border-[#EAECEF] rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 bg-[#F1EBFA] text-[#6929C4] rounded-full text-sm font-semibold">Claims</span>
            <span className="text-sm text-[#717784]">{filteredTemplates.length} templates</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-1 text-[#98A2B3] hover:text-[#717784]"><ChevronDown size={16} /></button>
            <span className="text-xs text-[#98A2B3]">1 call type total</span>
            <button className="p-1 text-[#98A2B3] hover:text-[#717784]"><ChevronDown size={16} /></button>
          </div>
        </div>

        {/* Template List */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="border border-[#EAECEF] rounded-xl p-6 hover:shadow-md transition-shadow bg-white">
              {/* Top Row: Title & Star */}
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-sm font-bold text-[#1A1C21] leading-tight flex-1">{template.name}</h3>
                <button className={`ml-2 ${template.isStarred ? 'text-yellow-500' : 'text-[#D0D5DD] hover:text-yellow-500'} transition-colors`}>
                  <Star size={16} fill={template.isStarred ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Middle Row: Technical Specs */}
              <div className="flex items-center space-x-6 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-[#717784]">{template.datapoints}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-[#4A4F59]">Goal:</span>
                  <span className="text-xs text-[#717784]">{template.goal}</span>
                </div>
                {template.isIvrOnly && (
                  <span className="px-2 py-1 bg-[#F1EBFA] text-[#6929C4] rounded text-xs font-medium">IVR Only</span>
                )}
                <button className="flex items-center space-x-1 text-[#00B8D9] hover:text-[#00A3C1] transition-colors text-xs">
                  <Eye size={14} />
                  <span>Preview</span>
                </button>
              </div>

              {/* Bottom Row: Metadata & Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-[#F7F8FA] flex items-center justify-center text-xs font-bold border border-[#EAECEF] text-[#4A4F59]">
                    {template.createdBy}
                  </div>
                  <span className="text-xs text-[#98A2B3]">{template.date}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Link
                    to={`/templates/edit/${template.id}`}
                    className="px-4 py-2 bg-[#00B8D9] text-white rounded-lg hover:bg-[#00A3C1] transition-colors font-semibold text-sm inline-block"
                  >
                    Edit
                  </Link>
                  <button className="p-2 border border-[#D0D5DD] rounded-lg text-[#717784] hover:bg-[#F7F8FA] transition-colors">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Templates;