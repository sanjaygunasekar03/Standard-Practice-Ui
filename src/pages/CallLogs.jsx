import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

const SearchCalls = () => {
  const [filterType, setFilterType] = useState('callId');
  const [searchValue, setSearchValue] = useState('');
  const [hoveredRow, setHoveredRow] = useState(null);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0, arrowPosition: 'left' });
  const tooltipTimeoutRef = useRef(null);

  // Filter type mapping to match data properties
  const filterMapping = {
    'callId': 'callId',
    'contact': 'callRegarding',
    'call title': 'callTitle',
    'insurance': 'callTo',
    'patient': 'callRegarding',
    'practice': 'practiceName'
  };

  // Handle individual checkbox selection
  const handleRowSelect = (callId) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(callId)) {
      newSelected.delete(callId);
    } else {
      newSelected.add(callId);
    }
    setSelectedRows(newSelected);
  };

  // Handle select all functionality
  const handleSelectAll = () => {
    if (selectedRows.size === filteredLogs.length) {
      // Deselect all
      setSelectedRows(new Set());
    } else {
      // Select all filtered logs
      setSelectedRows(new Set(filteredLogs.map(log => log.callId)));
    }
  };

  // Handle filter application (though real-time filtering is already working)
  const handleFilter = () => {
    // The filtering is already real-time, but this could trigger additional logic
    console.log('Applying filter:', filterType, searchValue);
  };

  // Enhanced positioning with collision detection
  const calculateTooltipPosition = (triggerRect) => {
    const tooltipWidth = 340; // max-w-[340px]
    const tooltipHeight = 200; // estimated height
    const arrowSize = 6;
    const margin = 10;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;

    // Default: position below the trigger element
    let x = triggerRect.left + triggerRect.width / 2;
    let y = triggerRect.bottom + scrollY + margin;
    let arrowPosition = 'top';

    // Check if there's enough space below
    if (y + tooltipHeight > viewportHeight + scrollY) {
      // Not enough space below, position above
      y = triggerRect.top + scrollY - tooltipHeight - margin;
      arrowPosition = 'bottom';
    }

    // Center horizontally on the trigger element
    x = Math.max(margin, Math.min(x, viewportWidth - tooltipWidth - margin));

    // If tooltip would go off-screen horizontally, adjust
    if (x + tooltipWidth > viewportWidth) {
      x = viewportWidth - tooltipWidth - margin;
    }
    if (x < margin) {
      x = margin;
    }

    return { x, y, arrowPosition };
  };

  // Portal component for rendering tooltip outside table boundaries
  const TooltipPortal = ({ children, isVisible }) => {
    return isVisible ? createPortal(children, document.body) : null;
  };

  // Mock data
  const callLogs = [
    {
      callDate: '2024-04-01',
      createdOn: '2024-04-01 10:30',
      callId: 'C-4475',
      callType: 'Claims IVR',
      callTitle: 'Medicare Claim Status',
      callTo: 'Medicare',
      callRegarding: 'Browning, Glenn',
      practiceName: 'ABC Clinic',
      primaryInfo: 'Denied',
      info: '$0 paid',
      status: 'Review'
    },
    {
      callDate: '2024-03-30',
      createdOn: '2024-03-30 14:15',
      callId: 'C-4474',
      callType: 'Claims IVR',
      callTitle: 'UnitedHealthcare Status',
      callTo: 'UnitedHealthcare',
      callRegarding: 'Brown, Cynthia',
      practiceName: 'XYZ Hospital',
      primaryInfo: 'Paid',
      info: '$150.00',
      status: 'Completed'
    },
  ];

  const filteredLogs = callLogs.filter(log => {
    if (!searchValue) return true;
    const propertyKey = filterMapping[filterType] || filterType;
    const value = log[propertyKey] || '';
    return value.toLowerCase().includes(searchValue.toLowerCase());
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/20';
      case 'Review': return 'bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20';
      case 'Calling': return 'bg-[#00B8D9]/10 text-[#00B8D9] border border-[#00B8D9]/20';
      default: return 'bg-[#D0D5DD]/50 text-[#717784] border border-[#D0D5DD]';
    }
  };

  const getReviewTooltip = (log) => {
    const isCompleted = log.status === 'Completed';

    const getArrowStyle = () => {
      switch (tooltipPosition.arrowPosition) {
        case 'left':
          return 'absolute left-[-6px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-6 border-transparent border-r-gray-800';
        case 'right':
          return 'absolute right-[-6px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-gray-800';
        case 'top':
          return 'absolute top-[-6px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-6 border-transparent border-b-gray-800';
        case 'bottom':
          return 'absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-gray-800';
        default:
          return 'absolute left-[-6px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-6 border-transparent border-r-gray-800';
      }
    };

    return (
      <TooltipPortal isVisible={true}>
        <div
          className="fixed bg-[#1a1a1a] backdrop-blur-md text-white p-4 rounded-lg shadow-2xl z-50 max-w-[340px] border border-white/10"
          style={{
            top: `${tooltipPosition.y}px`,
            left: `${tooltipPosition.x}px`,
            transform: 'translateX(-50%)', // Always center horizontally
            pointerEvents: 'none'
          }}
        >
          {/* Header */}
          <div className="flex items-center mb-3">
            <span className="text-yellow-400 mr-2 text-lg">⚡</span>
            <span className="font-bold text-white">AI-powered summary</span>
          </div>

          {/* Summary */}
          <p className="text-sm mb-3 leading-relaxed text-gray-200">
            Called {log.callTo} for patient {log.callRegarding}
          </p>

          {/* Bullet Points - Different content based on status */}
          <ul className="text-xs space-y-1 mb-3 text-gray-300">
            {isCompleted ? (
              <>
                <li>• Successfully obtained claim status information</li>
                <li>• Patient details verified and recorded</li>
                <li>• Call completed with all required data captured</li>
              </>
            ) : (
              <>
                <li>• Missing call reference and claim numbers</li>
                <li>• Call transferred, agent couldn't provide SSN</li>
                <li>• No status obtained</li>
              </>
            )}
          </ul>

          {/* Footer - Different message based on status */}
          <p className="text-xs text-gray-400">
            {isCompleted
              ? "Call completed successfully with all data captured"
              : "Next steps: Verify patient details and retry call"
            }
          </p>

          {/* Arrow */}
          <div className={getArrowStyle()}></div>
        </div>
      </TooltipPortal>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-[#1A1C21] tracking-tight">Search Calls</h1>
        <p className="text-[#98A2B3] mt-2">1,378 calls found</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-[#EAECEF] rounded-xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 mb-6">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2.5 border border-[#D0D5DD] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00B8D9] bg-white"
          >
            <option value="callId">Call ID</option>
            <option value="contact">Contact</option>
            <option value="call title">Call Title</option>
            <option value="insurance">Insurance</option>
            <option value="patient">Patient</option>
            <option value="practice">Practice</option>
          </select>
          <input
            type="text"
            placeholder={`Search by ${filterType.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
            className="flex-1 px-4 py-2.5 border border-[#D0D5DD] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00B8D9] bg-white"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            onClick={handleFilter}
            className="px-6 py-2.5 bg-[#00B8D9] text-white rounded-lg text-sm font-semibold hover:bg-[#00A3C1] transition-colors"
          >
            Filter
          </button>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <button
            onClick={handleSelectAll}
            className="px-4 py-2 border border-[#D0D5DD] rounded-lg text-sm font-medium hover:bg-[#F7F8FA] transition-colors"
          >
            {selectedRows.size === filteredLogs.length && filteredLogs.length > 0 ? 'Deselect All' : 'Select All'}
          </button>
          <span className="text-sm text-[#98A2B3]">{selectedRows.size} of {filteredLogs.length} selected</span>
        </div>
      </div>

      {/* Data Grid */}
      <div className="bg-white border border-[#EAECEF] rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-[#F7F8FA]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#717784] uppercase tracking-wider">
                  <input
                    type="checkbox"
                    className="rounded"
                    checked={selectedRows.size === filteredLogs.length && filteredLogs.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#717784] uppercase tracking-wider">Call Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#717784] uppercase tracking-wider">Created On</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#717784] uppercase tracking-wider">Call ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#717784] uppercase tracking-wider">Call Type/Goal</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#717784] uppercase tracking-wider">Call Title</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#717784] uppercase tracking-wider">Call To</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#717784] uppercase tracking-wider">Call Regarding</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#717784] uppercase tracking-wider">Practice Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#717784] uppercase tracking-wider">Primary Info</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#717784] uppercase tracking-wider">Info</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#717784] uppercase tracking-wider">Call Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2F4F7]">
              {filteredLogs.map((log, index) => (
                <tr key={log.callId} className="hover:bg-[#F7F8FA] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="rounded"
                      checked={selectedRows.has(log.callId)}
                      onChange={() => handleRowSelect(log.callId)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1A1C21]">{log.callDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1A1C21]">{log.createdOn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#1A1C21]">{log.callId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4A4F59]">
                    <span className="px-2 py-1 bg-[#F1EBFA] text-[#6929C4] rounded text-xs font-medium">Claims (IVR)</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1A1C21]">{log.callTitle}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1A1C21]">{log.callTo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1A1C21]">{log.callRegarding}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1A1C21]">{log.practiceName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1A1C21]">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      log.primaryInfo === 'Paid' ? 'bg-[#16A34A]/10 text-[#16A34A]' :
                      log.primaryInfo === 'Denied' ? 'bg-[#E02424]/10 text-[#E02424]' :
                      'bg-[#D0D5DD]/50 text-[#717784]'
                    }`}>
                      {log.primaryInfo}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1A1C21]">{log.info}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)} cursor-pointer`}
                      onMouseEnter={(e) => {
                        if (log.status === 'Review' || log.status === 'Completed') {
                          // Add delay to prevent flickering
                          tooltipTimeoutRef.current = setTimeout(() => {
                            setHoveredRow(index);
                            // Position tooltip in a highly visible area - right side of viewport
                            const viewportWidth = window.innerWidth;
                            const viewportHeight = window.innerHeight;

                            // Position on the right side of the viewport for maximum visibility
                            const tooltipWidth = 340;
                            const tooltipHeight = 200;

                            let x = viewportWidth - tooltipWidth - 20; // Right side with margin
                            let y = window.scrollY + 100; // Fixed position from top of visible area
                            let arrowPosition = 'left';

                            // Center vertically in the visible area
                            const centerY = window.scrollY + viewportHeight / 2;
                            y = Math.max(window.scrollY + 20, Math.min(centerY - tooltipHeight / 2, window.scrollY + viewportHeight - tooltipHeight - 20));

                            setTooltipPosition({ x, y, arrowPosition });
                          }, 200);
                        }
                      }}
                      onMouseLeave={() => {
                        if (tooltipTimeoutRef.current) {
                          clearTimeout(tooltipTimeoutRef.current);
                        }
                        setHoveredRow(null);
                      }}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Tooltip - Rendered via Portal */}
      {hoveredRow !== null && (filteredLogs[hoveredRow]?.status === 'Review' || filteredLogs[hoveredRow]?.status === 'Completed') && getReviewTooltip(filteredLogs[hoveredRow])}
    </div>
  );
};

export default SearchCalls;