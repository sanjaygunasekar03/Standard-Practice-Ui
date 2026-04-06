import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Phone,
  Layers,
  FileText,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Plus,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  Clock,
  Circle,
  RefreshCw,
  History,
  StopCircle,
  Edit3,
  Zap,
  User,
  CheckCircle2,
  Loader2
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showRecentDropdown, setShowRecentDropdown] = useState(false);
  const [timeRange, setTimeRange] = useState('30d');
  const [showTimeFilter, setShowTimeFilter] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const timeRanges = {
    '24h': 'Last 24 Hours',
    '7d': 'Last 7 Days',
    '30d': 'Last 30 Days',
    '3m': 'Last 3 Months'
  };

  // Dynamic metrics data based on time range
  const getMetricsData = (range) => {
    const data = {
      '24h': [
        { title: "MEDICARE", phone: "+1 8552528782", growth: "8%", avg: "72%", count: "23" },
        { title: "HUMANA", phone: "+1 8004486262", growth: "15%", avg: "85%", count: "18" },
        { title: "BLUE CROSS", phone: "Blue Shield of Wyom...", growth: "0%", avg: "55%", count: "12" },
        { title: "CIGNA", phone: "+1 8002446224", growth: "-2%", avg: "68%", count: "15" }
      ],
      '7d': [
        { title: "MEDICARE", phone: "+1 8552528782", growth: "5%", avg: "70%", count: "89" },
        { title: "HUMANA", phone: "+1 8004486262", growth: "3%", avg: "88%", count: "67" },
        { title: "BLUE CROSS", phone: "Blue Shield of Wyom...", growth: "2%", avg: "52%", count: "34" },
        { title: "CIGNA", phone: "+1 8002446224", growth: "-5%", avg: "72%", count: "28" }
      ],
      '30d': [
        { title: "MEDICARE", phone: "+1 8552528782", growth: "12%", avg: "68%", count: "167" },
        { title: "HUMANA", phone: "+1 8004486262", growth: "1%", avg: "90%", count: "78" },
        { title: "BLUE CROSS", phone: "Blue Shield of Wyom...", growth: "0%", avg: "50%", count: "42" },
        { title: "CIGNA", phone: "+1 8002446224", growth: "-4%", avg: "70%", count: "40" }
      ],
      '3m': [
        { title: "MEDICARE", phone: "+1 8552528782", growth: "18%", avg: "65%", count: "487" },
        { title: "HUMANA", phone: "+1 8004486262", growth: "-1%", avg: "92%", count: "234" },
        { title: "BLUE CROSS", phone: "Blue Shield of Wyom...", growth: "8%", avg: "48%", count: "156" },
        { title: "CIGNA", phone: "+1 8002446224", growth: "-8%", avg: "75%", count: "98" }
      ]
    };
    return data[range] || data['30d'];
  };

  const recentlyViewedBatches = [
    {
      id: 1,
      name: "0401 Part1",
      category: "Claims (IVR)",
      status: "calling",
      calls: { current: 38, total: 495 },
      info: 0,
      date: "Apr 1st, 2026",
      speed: "Max",
      creator: "AC",
      createdAt: "4/1/2026"
    },
    {
      id: 2,
      name: "New Batch - AC Apr 02, 2026 [2]",
      category: "Claims (IVR)",
      status: "draft",
      calls: null,
      info: 38,
      date: "Apr 2nd, 2026",
      speed: "Max",
      creator: "AC",
      createdAt: "4/2/2026"
    },
    {
      id: 3,
      name: "New Batch - AC Apr 02, 2026 [1]",
      category: "Claims (IVR)",
      status: "draft",
      calls: null,
      info: 10,
      date: "Apr 2nd, 2026",
      speed: "Standard",
      creator: "AC",
      createdAt: "4/2/2026"
    }
  ];

  const handleStopBatch = (batchId) => {
    if (window.confirm(`Are you sure you want to stop batch "${batchId}"?`)) {
      // In real implementation, this would call an API to stop the batch
      alert(`Batch "${batchId}" has been stopped.`);
      // You could also update the UI state here to reflect the change
    }
  };

  const handleEditBatch = (batchId) => {
    // Navigate to edit batch page with the batch ID
    navigate(`/batches/edit/${batchId}`);
  };

  const handleReviewBatch = (batchId) => {
    // In real implementation, this would navigate to a review page
    alert(`Opening review for batch "${batchId}". In a full implementation, this would navigate to /batches/review/${batchId}`);
  };

  const handleRefresh = () => {
    // Simulate API call and update timestamp on success
    setTimeout(() => {
      setLastUpdated(new Date());
      // In real implementation, this would be after successful API response
    }, 500); // Simulate network delay
  };

  return (
    <div className="flex h-screen bg-[#F7F8FA] font-sans text-sm text-[#1A1C21]">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-[#EAECEF] flex flex-col p-5">
        <div className="mb-10">
          <h1 className="text-xl font-bold text-[#0D346C] tracking-tight">Bristol Healthcare Services</h1>
        </div>

        <nav className="flex-1 space-y-1.5">
          <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active to="/" />
          <NavItem icon={<Phone size={18} />} label="Calls" to="/search-calls" />
          <NavItem icon={<Layers size={18} />} label="Batches" to="/search-batches" />
          <NavItem icon={<FileText size={18} />} label="Templates" to="/templates" />
          <NavItem icon={<Users size={18} />} label="Contact Insights" to="/contact-insights" />
          <Link to="/batches/new/select-type" className="flex items-center w-full px-4 py-2.5 text-[#00B8D9] font-semibold hover:bg-[#E0F8FC] rounded-lg transition-colors mt-6 text-xs">
            <Plus size={18} className="mr-3" /> Create Call Batch
          </Link>
        </nav>

        <div className="pt-6 border-t border-[#F2F4F7] space-y-1.5">
          <NavItem icon={<Settings size={18} />} label="Settings" to="/settings" />
          <NavItem icon={<HelpCircle size={18} />} label="Help Center" to="/help" />
          <NavItem icon={<LogOut size={18} />} label="Log Out" to="/login" />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Utility Bar */}
        <div className="bg-[#EAECEF] text-[11px] text-[#717784] py-2 px-8 flex items-center justify-center space-x-6 border-b border-[#D0D5DD]">
          <span className="flex items-center"><Clock size={13} className="mr-1.5 text-[#717784]"/> Outside Call Hours</span>
          <span>Regular call hours: Mon-Fri, 11am-9pm EDT</span>
          <span className="text-[#D0D5DD]">|</span>
          <span>IVR call hours: 24/7</span>
          <span className="text-[#D0D5DD]">|</span>
          <span className="text-[#98A2B3] italic">Holidays may affect call hours.</span>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Header */}
          <div className="bg-white border-b border-[#EAECEF] px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-[#1A1C21]">Call Dashboard</h1>
                <span className="text-sm text-[#98A2B3]">
                  Updated {lastUpdated.toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}
                </span>
                <button
                  onClick={handleRefresh}
                  className="flex items-center text-[#00B8D9] hover:text-[#00A3C1] transition-colors text-sm font-semibold"
                >
                  <RefreshCw size={16} className="mr-2" />
                  Refresh
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <button
                    onClick={() => setShowRecentDropdown(!showRecentDropdown)}
                    className="flex items-center px-4 py-2.5 bg-white border border-[#D0D5DD] rounded-lg text-sm font-semibold hover:bg-[#F7F8FA] transition-colors"
                  >
                    <History size={16} className="mr-2 text-[#717784]" />
                    Recently Viewed Batches
                    <ChevronDown size={14} className="ml-2 text-[#98A2B3]" />
                  </button>

                  {showRecentDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-96 bg-white border border-[#EAECEF] rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto">
                      {recentlyViewedBatches.map((batch, index) => (
                        <div key={batch.id} className={index > 0 ? "border-t border-[#EAECEF]" : ""}>
                          <div className="p-4 hover:bg-[#F7F8FA] transition-colors">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-semibold text-[#1A1C21] truncate mb-1">
                                  {batch.name}
                                </h4>
                                <span className="text-xs font-bold text-[#6929C4] bg-[#F1EBFA] px-2 py-1 rounded">
                                  {batch.category}
                                </span>
                              </div>
                              <div className="flex items-center ml-3">
                                {batch.status === 'calling' ? (
                                  <div className="flex items-center text-xs text-[#00B8D9] font-semibold">
                                    <Phone size={14} className="mr-1" />
                                    Calling
                                  </div>
                                ) : (
                                  <div className="flex items-center text-xs text-[#717784]">
                                    <Loader2 size={14} className="mr-1" />
                                    Draft
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-4 text-xs text-[#717784]">
                                <div className="flex items-center">
                                  <CheckCircle2 size={14} className="mr-1 text-[#00B8D9]" />
                                  {batch.calls ? `${batch.calls.current} / ${batch.calls.total} Calls` : '0 / 0 Calls'}
                                </div>
                                <div className="flex items-center">
                                  <Circle size={14} className="mr-1 text-[#717784]" />
                                  {batch.info} Info
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3 text-xs text-[#717784]">
                                <span>{batch.date}</span>
                                <div className="flex items-center">
                                  <Zap size={12} className="mr-1 text-[#00B8D9]" />
                                  {batch.speed}
                                </div>
                                <div className="flex items-center">
                                  <div className="w-5 h-5 rounded-full bg-[#F7F8FA] border border-[#EAECEF] flex items-center justify-center text-xs font-bold text-[#4A4F59]">
                                    {batch.creator}
                                  </div>
                                  <span className="ml-1">{batch.createdAt}</span>
                                </div>
                              </div>

                              <div className="flex items-center space-x-2">
                                {batch.status === 'calling' ? (
                                  <button
                                    onClick={() => handleStopBatch(batch.id)}
                                    className="px-3 py-1.5 border border-red-200 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-50"
                                  >
                                    Stop
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleEditBatch(batch.id)}
                                    className="px-3 py-1.5 border border-[#00B8D9] text-[#00B8D9] rounded-lg text-xs font-semibold hover:bg-[#E0F8FC]"
                                  >
                                    Edit
                                  </button>
                                )}
                                <button className="p-1.5 border border-[#D0D5DD] rounded-lg text-[#717784] hover:bg-[#F7F8FA]">
                                  <MoreHorizontal size={14} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  to="/batches/new/select-type"
                  className="px-6 py-3 bg-[#00B8D9] text-white rounded-lg font-semibold hover:bg-[#00A3C1] transition-colors flex items-center"
                >
                  <Plus size={18} className="mr-2" />
                  Create Call Batch
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-8 py-8">
            {/* Top Contacts Section */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <h3 className="text-lg font-bold text-[#1A1C21]">Top Contacts</h3>
                  <div className="relative">
                    <button
                      onClick={() => setShowTimeFilter(!showTimeFilter)}
                      className="flex items-center px-3 py-1.5 bg-[#F7F8FA] border border-[#D0D5DD] rounded-full text-xs font-semibold text-[#4A4F59] hover:bg-[#EAECEF] transition-colors"
                    >
                      {timeRanges[timeRange]}
                      <ChevronDown size={12} className="ml-2" />
                    </button>

                    {showTimeFilter && (
                      <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-[#EAECEF] rounded-lg shadow-lg z-50">
                        {Object.entries(timeRanges).map(([key, label]) => (
                          <button
                            key={key}
                            onClick={() => {
                              setTimeRange(key);
                              setShowTimeFilter(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-xs hover:bg-[#F7F8FA] transition-colors ${
                              timeRange === key ? 'bg-[#E0F8FC] text-[#00B8D9] font-semibold' : 'text-[#4A4F59]'
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Metrics Cards */}
              <div className="grid grid-cols-4 gap-5">
                {getMetricsData(timeRange).map((metric, index) => (
                  <MetricCard
                    key={index}
                    title={metric.title}
                    phone={metric.phone}
                    growth={metric.growth}
                    avg={metric.avg}
                    count={metric.count}
                  />
                ))}
              </div>
            </div>

            {/* System Calls Panel */}
            <div className="bg-white border border-[#EAECEF] rounded-xl p-6 mb-10 shadow-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-[#F7F8FA] rounded-full flex items-center justify-center">
                    <Phone size={20} className="text-[#717784]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1A1C21]">System Calls</h3>
                    <p className="text-xs text-[#98A2B3]">No connections</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Link
                    to="/settings"
                    className="flex items-center space-x-2 px-4 py-2 border border-[#D0D5DD] rounded-lg text-xs font-semibold text-[#4A4F59] hover:bg-[#F7F8FA] transition-colors"
                  >
                    <Plus size={14} /> Add connection
                  </Link>
                  <Link
                    to="/settings"
                    className="p-2 border border-[#D0D5DD] rounded-lg text-[#717784] hover:bg-[#F7F8FA] transition-colors inline-block"
                  >
                    <Settings size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Kanban Columns */}
            <div className="grid grid-cols-4 gap-5 items-start">
              <Column title="Draft" count="12" viewAllPath="/search-batches?status=draft">
                <BatchCard id="draft-1" name="New Batch - AC Apr 01, 2026 [1]" status="Draft" date="Created 4/1/2026" user="AC" onEdit={handleEditBatch} />
                <BatchCard id="draft-2" name="New Batch - AC Apr 01, 2026 [2]" status="Draft" date="Created 4/1/2026" user="AC" onEdit={handleEditBatch} />
                <BatchCard id="draft-3" name="New Batch - AC Apr 01, 2026 [3]" status="Draft" date="Created 4/1/2026" user="AC" onEdit={handleEditBatch} />
              </Column>

              <Column title="In Queue" count="Today" viewAllPath="/search-batches?status=calling">
                <BatchCard id="calling-1" name="0401 Part1" status="Calling" date="Created 4/1/2026" user="AC" active stats="38 / 495 Calls" onStop={handleStopBatch} />
                <Link to="/search-batches?status=scheduled" className="w-full text-[11px] text-[#00A3C1] font-semibold py-5 hover:underline block text-center">View all scheduled batches</Link>
              </Column>

              <Column title="Review" count="14" viewAllPath="/search-batches?status=review">
                <BatchCard id="review-1" name="Comm Ins 740325" status="Review" date="Created 3/25/2026" user="AC" stats="106 / 130 Calls" onReview={handleReviewBatch} />
                <BatchCard id="review-2" name="MCR 74 0324" status="Review" date="Created 3/24/2026" user="AC" stats="65 / 74 Calls" onReview={handleReviewBatch} />
                <BatchCard id="review-3" name="74-03042026" status="Review" date="Created 3/4/2026" user="AC" stats="49 / 93 Calls" onReview={handleReviewBatch} />
              </Column>

              <Column title="Completed" count="0" viewAllPath="/search-batches?status=completed">
                <div className="flex flex-col items-center justify-center py-20 text-[#D0D5DD] text-center border border-[#EAECEF] bg-white rounded-xl">
                  <Phone size={60} className="mb-6 opacity-30 text-[#D0D5DD]" />
                  <p className="text-xs px-10 italic text-[#98A2B3]">No visible completed batches in the last 30 days</p>
                  <Link to="/batches/new/select-type" className="mt-6 text-xs font-bold text-[#00B8D9] border-2 border-[#00B8D9] px-6 py-2.5 rounded-full hover:bg-[#E0F8FC] transition-colors inline-block">+ Create call batch</Link>
                </div>
              </Column>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- Sub-components (Refined) ---

const NavItem = ({ icon, label, active = false, to }) => (
  <Link to={to} className={`flex items-center px-4 py-2.5 cursor-pointer rounded-lg transition-all text-xs ${active ? 'bg-[#EAECEF] font-bold text-[#1A1C21] border-l-4 border-[#0D346C] rounded-l-none' : 'text-[#717784] hover:bg-[#F7F8FA]'}`}>
    <span className={`mr-3.5 ${active ? 'text-[#0D346C]' : 'text-[#717784]'}`}>{icon}</span>
    {label}
  </Link>
);

const MetricCard = ({ title, phone, growth, avg, count }) => (
  <div className="bg-white p-4 rounded-xl border border-[#EAECEF] flex flex-col space-y-2 shadow-sm">
    <div className="flex justify-between items-start">
      <h4 className="text-[10px] font-bold text-[#717784] uppercase tracking-wider">{title} | {phone}</h4>
      <span className="text-[9px] font-bold text-[#6929C4] bg-[#F1EBFA] px-2 py-0.5 rounded">Claims (IVR)</span>
    </div>
    <div className="flex items-baseline space-x-2.5 pt-1">
      <span className={`text-xs font-bold flex items-center ${growth.includes('-') ? 'text-[#E02424]' : 'text-[#16A34A]'}`}>
        {growth} {growth.includes('-') ? '▼' : '▲'}
      </span>
      <span className="text-xs font-semibold text-[#4A4F59]">{avg} avg</span>
      <span className="text-xs text-[#98A2B3]">{count} calls</span>
    </div>
  </div>
);

const Column = ({ title, count, children, viewAllPath }) => (
  <div className="flex flex-col space-y-5">
    <div className="flex justify-between items-center bg-[#1A1C21] text-white px-4 py-3 rounded-t-xl text-xs font-bold">
      <div className="flex items-center">
        <Circle size={10} className="mr-2.5 text-white" />
        {title}
      </div>
      {viewAllPath ? (
        <Link to={viewAllPath} className="text-[11px] text-[#98A2B3] hover:text-white transition-colors">
          View all ({count})
        </Link>
      ) : (
        <span className="text-[11px] text-[#98A2B3]">View all ({count})</span>
      )}
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

const BatchCard = ({ id, name, status, date, user, active = false, stats, onEdit, onStop, onReview }) => {
  // Mock data for additional fields
  const batchData = {
    calls: stats ? { current: parseInt(stats.split(' / ')[0]), total: parseInt(stats.split(' / ')[1].split(' ')[0]) } : null,
    info: stats ? Math.floor(parseInt(stats.split(' / ')[0]) * 0.8) : 0, // Mock info count
    scheduledDate: status === 'Draft' ? 'Not scheduled' : 'Mar 31st, 2026',
    speed: 'Max'
  };

  return (
    <div className="bg-white border border-[#EAECEF] rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden group cursor-pointer">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <Circle size={18} className="text-[#D0D5DD] stroke-1 flex-shrink-0" />
          <span
            className="text-xs font-bold text-[#1A1C21] break-words leading-tight min-h-[2.4em] flex-1"
            title={name}
          >
            {name}
          </span>
        </div>
        <span className="text-[9px] font-semibold text-[#6929C4] bg-[#F1EBFA] px-2 py-1 rounded uppercase flex-shrink-0 ml-2">
          Claims (IVR)
        </span>
      </div>

      {/* Status & Progress Metrics */}
      <div className="space-y-3 mb-4">
        {/* Progress Rings for In Queue/Review */}
        {(status === 'Calling' || status === 'Review') && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Calls Progress Ring */}
              <div className="relative w-8 h-8">
                <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="#E5E7EB"
                    strokeWidth="3"
                    fill="none"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="#00B8D9"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={`${(batchData.calls.current / batchData.calls.total) * 88} 88`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-[#1A1C21]">{batchData.calls.current}</span>
                </div>
              </div>
              <div className="text-xs text-[#4A4F59]">
                <div className="font-semibold">{batchData.calls.current} / {batchData.calls.total}</div>
                <div className="text-[#717784]">Calls</div>
              </div>

              {/* Info Progress Ring */}
              <div className="relative w-8 h-8">
                <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="#E5E7EB"
                    strokeWidth="3"
                    fill="none"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    stroke="#6366F1"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={`${(batchData.info / batchData.calls.total) * 88} 88`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-[#1A1C21]">{batchData.info}</span>
                </div>
              </div>
              <div className="text-xs text-[#4A4F59]">
                <div className="font-semibold">{batchData.info}</div>
                <div className="text-[#717784]">Info</div>
              </div>
            </div>
          </div>
        )}

        {/* Status Label */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {status === 'Draft' && (
              <div className="flex items-center space-x-2 text-xs text-[#717784]">
                <div className="w-2 h-2 border-2 border-dashed border-[#717784] rounded-full"></div>
                <span>Draft</span>
              </div>
            )}
            {status === 'Calling' && (
              <div className="flex items-center space-x-2 text-xs text-[#00B8D9] font-semibold">
                <Phone size={14} />
                <span>Calling</span>
              </div>
            )}
            {status === 'Review' && (
              <div className="flex items-center space-x-2 text-xs text-[#00B8D9] font-semibold">
                <FileText size={14} />
                <span>Review</span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-3 text-xs text-[#717784]">
            <span>{batchData.scheduledDate}</span>
            <div className="flex items-center space-x-1">
              <Zap size={12} className="text-[#00B8D9]" />
              <span>{batchData.speed}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ownership & Identity + Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-[#F2F4F7]">
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-full bg-[#F7F8FA] flex items-center justify-center text-[11px] font-bold border border-[#EAECEF] text-[#4A4F59]">
            {user}
          </div>
          <span className="text-[11px] text-[#98A2B3]">Created {date.split('Created ')[1]}</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (active && onStop) onStop(id);
              else if (status === 'Review' && onReview) onReview(id);
              else if (onEdit) onEdit(id);
            }}
            className={`px-3 py-1.5 border rounded-lg text-[11px] font-semibold transition-colors ${
              active
                ? 'border-red-200 text-red-600 hover:bg-red-50'
                : 'border-[#00B8D9] text-[#00B8D9] hover:bg-[#E0F8FC]'
            }`}
          >
            {active ? 'Stop' : status === 'Review' ? 'Review' : 'Edit'}
          </button>
          <button className="p-1.5 border border-[#D0D5DD] rounded-lg text-[#717784] hover:bg-[#F7F8FA] transition-colors">
            <MoreHorizontal size={14} />
          </button>
          <ChevronRight size={16} className="text-[#D0D5DD] group-hover:text-[#717784] transition-colors" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;