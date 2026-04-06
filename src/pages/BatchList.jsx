import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, FileText, CheckCircle, Circle, Zap } from 'lucide-react';

const SearchBatches = () => {
  const [filterType, setFilterType] = useState('Batch ID');
  const [searchValue, setSearchValue] = useState('');
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Mock data - Expanded with more batches, Draft status, and time details
  const batches = [
    { createdOn: '2024-04-02 09:15:30', batchId: 'B-1037', callType: 'Claims IVR', title: 'New Batch - AC Apr 02, 2026 [3]', callDate: '2024-04-02 14:30:00', primaryInfo: '0/0', completedCalls: '0/0', status: 'Draft' },
    { createdOn: '2024-04-02 08:45:12', batchId: 'B-1038', callType: 'Claims IVR', title: 'New Batch - AC Apr 02, 2026 [2]', callDate: '2024-04-02 13:15:45', primaryInfo: '0/0', completedCalls: '0/0', status: 'Draft' },
    { createdOn: '2024-04-02 07:30:22', batchId: 'B-1039', callType: 'Claims IVR', title: 'New Batch - AC Apr 02, 2026 [1]', callDate: '2024-04-02 12:00:18', primaryInfo: '0/0', completedCalls: '0/0', status: 'Draft' },
    { createdOn: '2024-04-01 16:20:45', batchId: 'B-1036', callType: 'Claims IVR', title: '0401 Part1', callDate: '2024-04-01 10:30:15', primaryInfo: '38/495', completedCalls: '38/495', status: 'Calling' },
    { createdOn: '2024-03-31 11:45:33', batchId: 'B-1035', callType: 'Claims', title: 'March Claims Batch', callDate: '2024-03-31 09:15:22', primaryInfo: '67/67', completedCalls: '67/67', status: 'Review' },
    { createdOn: '2024-03-30 14:22:18', batchId: 'B-1034', callType: 'Claims IVR', title: 'Weekly Claims Update', callDate: '2024-03-30 08:45:30', primaryInfo: '134/134', completedCalls: '134/134', status: 'Completed' },
    { createdOn: '2024-03-29 17:30:55', batchId: 'B-1033', callType: 'Claims IVR', title: 'Emergency Claims', callDate: '2024-03-29 13:20:10', primaryInfo: '89/120', completedCalls: '89/120', status: 'Calling' },
    { createdOn: '2024-03-28 10:15:40', batchId: 'B-1032', callType: 'Claims', title: 'Monthly Reconciliation', callDate: '2024-03-28 11:30:25', primaryInfo: '45/45', completedCalls: '45/45', status: 'Review' },
    { createdOn: '2024-03-27 12:45:15', batchId: 'B-1031', callType: 'Claims IVR', title: 'Q1 Claims Audit', callDate: '2024-03-27 14:15:50', primaryInfo: '256/256', completedCalls: '256/256', status: 'Completed' },
    { createdOn: '2024-03-26 15:30:22', batchId: 'B-1030', callType: 'Claims IVR', title: 'Weekend Processing', callDate: '2024-03-26 16:45:35', primaryInfo: '12/78', completedCalls: '12/78', status: 'Calling' },
    { createdOn: '2024-03-25 09:20:18', batchId: 'B-1029', callType: 'Claims', title: 'Bulk Claims Update', callDate: '2024-03-25 10:30:40', primaryInfo: '0/0', completedCalls: '0/0', status: 'Draft' },
    { createdOn: '2024-03-24 13:45:55', batchId: 'B-1028', callType: 'Claims IVR', title: 'Insurance Verification', callDate: '2024-03-24 15:20:15', primaryInfo: '92/92', completedCalls: '92/92', status: 'Completed' },
    { createdOn: '2024-03-23 08:15:30', batchId: 'B-1027', callType: 'Claims IVR', title: 'Priority Claims', callDate: '2024-03-23 09:30:45', primaryInfo: '34/67', completedCalls: '34/67', status: 'Review' },
    { createdOn: '2024-03-22 11:30:20', batchId: 'B-1026', callType: 'Claims', title: 'Standard Processing', callDate: '2024-03-22 12:15:10', primaryInfo: '23/89', completedCalls: '23/89', status: 'Calling' },
    { createdOn: '2024-03-21 14:45:12', batchId: 'B-1025', callType: 'Claims IVR', title: 'Automated Batch 21', callDate: '2024-03-21 15:30:25', primaryInfo: '0/0', completedCalls: '0/0', status: 'Draft' },
    { createdOn: '2024-03-20 10:20:35', batchId: 'B-1024', callType: 'Claims IVR', title: 'Monthly Claims', callDate: '2024-03-20 11:45:50', primaryInfo: '145/145', completedCalls: '145/145', status: 'Completed' },
    { createdOn: '2024-03-19 16:15:40', batchId: 'B-1023', callType: 'Claims', title: 'Claims Follow-up', callDate: '2024-03-19 17:30:15', primaryInfo: '56/78', completedCalls: '56/78', status: 'Review' },
    { createdOn: '2024-03-18 07:45:55', batchId: 'B-1022', callType: 'Claims IVR', title: 'Express Claims', callDate: '2024-03-18 08:20:30', primaryInfo: '67/134', completedCalls: '67/134', status: 'Calling' },
    { createdOn: '2024-03-17 13:10:25', batchId: 'B-1021', callType: 'Claims IVR', title: 'New Template Test', callDate: '2024-03-17 14:25:40', primaryInfo: '0/0', completedCalls: '0/0', status: 'Draft' },
    { createdOn: '2024-03-16 18:30:15', batchId: 'B-1020', callType: 'Claims', title: 'Weekly Summary', callDate: '2024-03-16 19:45:20', primaryInfo: '89/89', completedCalls: '89/89', status: 'Completed' },
  ];

  // Filter mapping
  const filterFieldMap = {
    'Batch ID': 'batchId',
    'Title': 'title',
    'Status': 'status'
  };

  const filteredBatches = batches.filter(batch => {
    if (!searchValue) return true;
    const field = filterFieldMap[filterType];
    const value = batch[field] || '';
    return value.toLowerCase().includes(searchValue.toLowerCase());
  });

  const getStatusDisplay = (status) => {
    switch (status) {
      case 'Draft':
        return (
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 border-2 border-dashed border-[#717784] rounded-full flex items-center justify-center">
              <Circle size={8} className="text-[#717784]" />
            </div>
            <span className="text-xs text-[#717784]">Draft</span>
          </div>
        );
      case 'Calling':
        return (
          <div className="flex items-center space-x-2">
            <Phone size={16} className="text-[#00B8D9]" />
            <span className="text-xs text-[#00B8D9] font-medium">Calling</span>
          </div>
        );
      case 'Review':
        return (
          <div className="flex items-center space-x-2">
            <FileText size={16} className="text-[#717784]" />
            <span className="text-xs text-[#717784] font-medium">Review</span>
          </div>
        );
      case 'Completed':
        return (
          <div className="flex items-center space-x-2">
            <CheckCircle size={16} className="text-[#717784]" />
            <span className="text-xs text-[#717784] font-medium">Completed</span>
          </div>
        );
      default:
        return <span className="text-xs text-[#717784]">{status}</span>;
    }
  };

  const getActionButton = (batch) => {
    switch (batch.status) {
      case 'Draft':
        return (
          <button className="px-3 py-1.5 border border-[#00B8D9] text-[#00B8D9] rounded-lg text-xs font-semibold hover:bg-[#E0F8FC] transition-colors">
            Edit
          </button>
        );
      case 'Calling':
        return (
          <button className="px-3 py-1.5 border border-red-200 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-50 transition-colors">
            Stop
          </button>
        );
      case 'Review':
        return (
          <button className="px-3 py-1.5 border border-[#00B8D9] text-[#00B8D9] rounded-lg text-xs font-semibold hover:bg-[#E0F8FC] transition-colors">
            Review
          </button>
        );
      default:
        return null;
    }
  };

  // Select All functionality
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedBatches([]);
      setSelectAll(false);
    } else {
      setSelectedBatches(filteredBatches.map(batch => batch.batchId));
      setSelectAll(true);
    }
  };

  const handleBatchSelect = (batchId) => {
    if (selectedBatches.includes(batchId)) {
      setSelectedBatches(selectedBatches.filter(id => id !== batchId));
    } else {
      setSelectedBatches([...selectedBatches, batchId]);
    }
  };

  // Update selectAll state when selectedBatches changes
  const isAllSelected = filteredBatches.length > 0 && selectedBatches.length === filteredBatches.length;
  const isIndeterminate = selectedBatches.length > 0 && selectedBatches.length < filteredBatches.length;

  // Update selectAll state based on current selections
  useEffect(() => {
    if (isAllSelected) {
      setSelectAll(true);
    } else if (selectedBatches.length === 0) {
      setSelectAll(false);
    }
  }, [isAllSelected, selectedBatches.length]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1A1C21] tracking-tight">Search Batches</h1>
          <p className="text-[#98A2B3] mt-2">{filteredBatches.length} batches found</p>
        </div>
        <Link to="/batches/new/select-type" className="px-6 py-2.5 bg-[#00B8D9] text-white rounded-lg text-sm font-semibold hover:bg-[#00A3C1] transition-colors self-start">
          View System Calls
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-[#EAECEF] rounded-xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 mb-6">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2.5 border border-[#D0D5DD] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00B8D9] bg-white"
          >
            <option value="Batch ID">Batch ID</option>
            <option value="Title">Title</option>
            <option value="Status">Status</option>
          </select>
          <input
            type="text"
            placeholder={`Search by ${filterType}`}
            className="flex-1 px-4 py-2.5 border border-[#D0D5DD] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00B8D9] bg-white"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="px-6 py-2.5 bg-[#00B8D9] text-white rounded-lg text-sm font-semibold hover:bg-[#00A3C1] transition-colors">Filter</button>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <button
            onClick={handleSelectAll}
            className="px-4 py-2 border border-[#D0D5DD] rounded-lg text-sm font-medium hover:bg-[#F7F8FA] transition-colors"
          >
            {selectAll ? 'Deselect All' : 'Select All'}
          </button>
          <span className="text-sm text-[#98A2B3]">1-{filteredBatches.length} of {filteredBatches.length}</span>
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
                    checked={isAllSelected}
                    ref={(el) => el && (el.indeterminate = isIndeterminate)}
                    onChange={handleSelectAll}
                    className="rounded"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#717784] uppercase tracking-wider">Created On</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#717784] uppercase tracking-wider">Batch ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#717784] uppercase tracking-wider">CallType/Goal</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#717784] uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#717784] uppercase tracking-wider">Call Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#717784] uppercase tracking-wider">Calls</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#717784] uppercase tracking-wider">Completed Calls</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#717784] uppercase tracking-wider">Batch Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2F4F7]">
              {filteredBatches.map((batch, index) => (
                <tr key={batch.batchId} className="hover:bg-[#F7F8FA] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedBatches.includes(batch.batchId)}
                      onChange={() => handleBatchSelect(batch.batchId)}
                      className="rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1A1C21]">{batch.createdOn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#1A1C21]">{batch.batchId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#4A4F59]">
                    <span className="px-2 py-1 bg-[#F1EBFA] text-[#6929C4] rounded text-xs font-medium">Claims (IVR)</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1A1C21]">{batch.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1A1C21]">{batch.callDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1A1C21]">{batch.completedCalls}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1A1C21]">{batch.completedCalls}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusDisplay(batch.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SearchBatches;