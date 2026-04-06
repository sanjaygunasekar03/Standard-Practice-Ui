import { useState } from 'react';

const ContactInsights = () => {
  const [activeTab, setActiveTab] = useState('Success');
  const [contactFilter, setContactFilter] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('All Batches');
  const [timeFilter, setTimeFilter] = useState('Last 30');

  // Available batches for selection
  const availableBatches = [
    'All Batches',
    'New Batch - AC Apr 02, 2026 [3]',
    'New Batch - AC Apr 02, 2026 [2]',
    'New Batch - AC Apr 02, 2026 [1]',
    '0401 Part1',
    'March Claims Batch'
  ];

  // Mock data for charts and table - filtered by batch and time
  const getFilteredData = () => {
    let baseData = [
      {
        contactId: 'MEDICAID-12345',
        callType: 'Claims Status',
        goal: 'Claim Status',
        contactStatus: 'No Answer',
        calls: 40,
        lastCall: '03/20/26',
        successPercent: 80,
        policyNumber: 'POL-789012',
        claimNumber: 'CLM-345678',
        batch: 'New Batch - AC Apr 02, 2026 [3]'
      },
      {
        contactId: 'BCBS-67890',
        callType: 'Claims Status',
        goal: 'Claim Status',
        contactStatus: 'Completed',
        calls: 25,
        lastCall: '03/19/26',
        successPercent: 95,
        policyNumber: 'POL-456789',
        claimNumber: 'CLM-567890',
        batch: 'New Batch - AC Apr 02, 2026 [2]'
      },
      {
        contactId: 'UNITED-11111',
        callType: 'Claims Status',
        goal: 'Claim Status',
        contactStatus: 'In Progress',
        calls: 18,
        lastCall: '03/18/26',
        successPercent: 70,
        policyNumber: 'POL-123456',
        claimNumber: 'CLM-234567',
        batch: '0401 Part1'
      },
      {
        contactId: 'HUMANA-22222',
        callType: 'Claims Status',
        goal: 'Claim Status',
        contactStatus: 'Pending',
        calls: 32,
        lastCall: '03/17/26',
        successPercent: 65,
        policyNumber: 'POL-789123',
        claimNumber: 'CLM-891234',
        batch: 'March Claims Batch'
      }
    ];

    // Filter by batch
    if (selectedBatch !== 'All Batches') {
      baseData = baseData.filter(item => item.batch === selectedBatch);
    }

    // Filter by time (simplified - in real app would filter by date)
    if (timeFilter === 'Last 30') {
      // Keep all data for Last 30 days
    } else if (timeFilter === 'Last 7') {
      // Filter to show only recent entries
      baseData = baseData.slice(0, 2);
    }

    return baseData;
  };

  const contactsData = getFilteredData();

  // Donut chart component for App Success Rate
  const DonutChart = ({ completed, submitted, size = 120 }) => {
    const total = completed + submitted;
    const completedAngle = (completed / total) * 360;
    const submittedAngle = (submitted / total) * 360;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={(size - 20) / 2}
            stroke="#f3f4f6"
            strokeWidth="12"
            fill="none"
          />
          {/* Completed segment (green) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={(size - 20) / 2}
            stroke="#10b981"
            strokeWidth="12"
            fill="none"
            strokeDasharray={`${(completedAngle / 360) * 2 * Math.PI * ((size - 20) / 2)} ${2 * Math.PI * ((size - 20) / 2)}`}
            strokeLinecap="round"
          />
          {/* Submitted segment (orange) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={(size - 20) / 2}
            stroke="#f59e0b"
            strokeWidth="12"
            fill="none"
            strokeDasharray={`${(submittedAngle / 360) * 2 * Math.PI * ((size - 20) / 2)} ${2 * Math.PI * ((size - 20) / 2)}`}
            strokeDashoffset={`-${(completedAngle / 360) * 2 * Math.PI * ((size - 20) / 2)}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{Math.round((completed / total) * 100)}%</div>
            <div className="text-xs text-gray-500">Success</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-[#1A1C21] tracking-tight">Contact Insights</h1>
        <div className="flex items-center space-x-4">
          {/* Batch Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold text-[#4A4F59] uppercase tracking-wider">Batch:</span>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="px-3 py-2 border border-[#D0D5DD] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00B8D9] bg-white"
            >
              {availableBatches.map(batch => (
                <option key={batch} value={batch}>{batch}</option>
              ))}
            </select>
          </div>

          {/* Time Range Buttons */}
          <div className="flex bg-white border border-[#EAECEF] rounded-lg p-1">
            <button
              onClick={() => setTimeFilter('Last 7')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                timeFilter === 'Last 7'
                  ? 'bg-[#00B8D9] text-white'
                  : 'text-[#717784] hover:bg-[#F7F8FA]'
              }`}
            >
              Last 7
            </button>
            <button
              onClick={() => setTimeFilter('Last 30')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                timeFilter === 'Last 30'
                  ? 'bg-[#00B8D9] text-white'
                  : 'text-[#717784] hover:bg-[#F7F8FA]'
              }`}
            >
              Last 30
            </button>
          </div>
        </div>
      </div>

      {/* Three Separate Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Submitted Chart */}
        <div className="bg-white border border-[#EAECEF] rounded-xl p-6">
          <h3 className="text-lg font-bold text-[#1A1C21] mb-4">Submitted</h3>
          <div className="h-64">
            <svg width="100%" height="100%" viewBox="0 0 400 250" className="overflow-visible">
              <defs>
                <pattern id="grid1" width="30" height="25" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 25" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid1)" />

              {/* Y-axis labels */}
              <text x="10" y="30" className="text-xs fill-[#717784]" textAnchor="start">100%</text>
              <text x="10" y="80" className="text-xs fill-[#717784]" textAnchor="start">75%</text>
              <text x="10" y="130" className="text-xs fill-[#717784]" textAnchor="start">50%</text>
              <text x="10" y="180" className="text-xs fill-[#717784]" textAnchor="start">25%</text>
              <text x="10" y="230" className="text-xs fill-[#717784]" textAnchor="start">0%</text>

              {Array.from({ length: 31 }, (_, i) => {
                const height = Math.max(10, 80 - (i * 1.5));
                return (
                  <rect
                    key={i}
                    x={40 + (i * 10)}
                    y={220 - height}
                    width="6"
                    height={height}
                    fill="#f97316"
                    rx="2"
                    ry="2"
                  />
                );
              })}

              {/* X-axis date labels */}
              <text x="70" y="245" className="text-xs fill-[#717784]" textAnchor="middle">Mar 1</text>
              <text x="170" y="245" className="text-xs fill-[#717784]" textAnchor="middle">Mar 15</text>
              <text x="270" y="245" className="text-xs fill-[#717784]" textAnchor="middle">Mar 31</text>
            </svg>
          </div>
          <div className="flex items-center justify-center mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#f97316] rounded-full"></div>
              <span className="text-sm text-[#717784]">Submitted Claims</span>
            </div>
          </div>
        </div>

        {/* Submitted/Required Chart */}
        <div className="bg-white border border-[#EAECEF] rounded-xl p-6">
          <h3 className="text-lg font-bold text-[#1A1C21] mb-4">Submitted/Required</h3>
          <div className="h-64">
            <svg width="100%" height="100%" viewBox="0 0 400 250" className="overflow-visible">
              <defs>
                <pattern id="grid2" width="30" height="25" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 25" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid2)" />

              {/* Y-axis labels */}
              <text x="10" y="30" className="text-xs fill-[#717784]" textAnchor="start">100%</text>
              <text x="10" y="80" className="text-xs fill-[#717784]" textAnchor="start">75%</text>
              <text x="10" y="130" className="text-xs fill-[#717784]" textAnchor="start">50%</text>
              <text x="10" y="180" className="text-xs fill-[#717784]" textAnchor="start">25%</text>
              <text x="10" y="230" className="text-xs fill-[#717784]" textAnchor="start">0%</text>

              {Array.from({ length: 31 }, (_, i) => {
                const height = Math.max(10, 60 - (i * 1));
                return (
                  <rect
                    key={i}
                    x={40 + (i * 10)}
                    y={220 - height}
                    width="6"
                    height={height}
                    fill="#eab308"
                    rx="2"
                    ry="2"
                  />
                );
              })}

              {/* X-axis date labels */}
              <text x="70" y="245" className="text-xs fill-[#717784]" textAnchor="middle">Mar 1</text>
              <text x="170" y="245" className="text-xs fill-[#717784]" textAnchor="middle">Mar 15</text>
              <text x="270" y="245" className="text-xs fill-[#717784]" textAnchor="middle">Mar 31</text>
            </svg>
          </div>
          <div className="flex items-center justify-center mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#eab308] rounded-full"></div>
              <span className="text-sm text-[#717784]">Pending Action</span>
            </div>
          </div>
        </div>

        {/* Completed Chart */}
        <div className="bg-white border border-[#EAECEF] rounded-xl p-6">
          <h3 className="text-lg font-bold text-[#1A1C21] mb-4">Completed</h3>
          <div className="h-64">
            <svg width="100%" height="100%" viewBox="0 0 400 250" className="overflow-visible">
              <defs>
                <pattern id="grid3" width="30" height="25" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 25" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid3)" />

              {/* Y-axis labels */}
              <text x="10" y="30" className="text-xs fill-[#717784]" textAnchor="start">100%</text>
              <text x="10" y="80" className="text-xs fill-[#717784]" textAnchor="start">75%</text>
              <text x="10" y="130" className="text-xs fill-[#717784]" textAnchor="start">50%</text>
              <text x="10" y="180" className="text-xs fill-[#717784]" textAnchor="start">25%</text>
              <text x="10" y="230" className="text-xs fill-[#717784]" textAnchor="start">0%</text>

              {Array.from({ length: 31 }, (_, i) => {
                const height = Math.min(150, 30 + (i * 3));
                return (
                  <rect
                    key={i}
                    x={40 + (i * 10)}
                    y={220 - height}
                    width="6"
                    height={height}
                    fill="#22c55e"
                    rx="2"
                    ry="2"
                  />
                );
              })}

              {/* X-axis date labels */}
              <text x="70" y="245" className="text-xs fill-[#717784]" textAnchor="middle">Mar 1</text>
              <text x="170" y="245" className="text-xs fill-[#717784]" textAnchor="middle">Mar 15</text>
              <text x="270" y="245" className="text-xs fill-[#717784]" textAnchor="middle">Mar 31</text>
            </svg>
          </div>
          <div className="flex items-center justify-center mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#22c55e] rounded-full"></div>
              <span className="text-sm text-[#717784]">Resolved Claims</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white border border-[#EAECEF] rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-[#4A4F59] uppercase tracking-wider">Contact #:</span>
              <select
                value={contactFilter}
                onChange={(e) => setContactFilter(e.target.value)}
                className="px-3 py-2 border border-[#D0D5DD] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00B8D9] bg-white"
              >
                <option value="">All Contacts</option>
                {contactsData.map(contact => (
                  <option key={contact.contactId} value={contact.contactId}>
                    {contact.contactId}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className="px-4 py-2 border border-[#D0D5DD] rounded-lg text-sm font-semibold hover:bg-[#F7F8FA] transition-colors">
            Reset filters
          </button>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white border border-[#EAECEF] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-[#F7F8FA]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#717784] uppercase tracking-wider">Contact #</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#717784] uppercase tracking-wider">Call Type</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#717784] uppercase tracking-wider">Goal</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#717784] uppercase tracking-wider">Contact Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#717784] uppercase tracking-wider">Calls</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#717784] uppercase tracking-wider">Last Call</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#717784] uppercase tracking-wider">Success %</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#717784] uppercase tracking-wider">Policy #</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#717784] uppercase tracking-wider">Claim #</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2F4F7]">
              {contactsData
                .filter(contact => !contactFilter || contact.contactId === contactFilter)
                .map((contact, index) => (
                  <tr key={contact.contactId} className="hover:bg-[#F7F8FA] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#1A1C21]">{contact.contactId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4A4F59]">
                      <span className="px-2 py-1 bg-[#F1EBFA] text-[#6929C4] rounded text-xs font-medium">{contact.callType}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1A1C21]">{contact.goal}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1A1C21]">{contact.contactStatus}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1A1C21]">{contact.calls}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1A1C21]">{contact.lastCall}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1A1C21]">{contact.successPercent}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1A1C21]">{contact.policyNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1A1C21]">{contact.claimNumber}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContactInsights;