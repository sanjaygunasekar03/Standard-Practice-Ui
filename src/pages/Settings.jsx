import { useState } from 'react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');

  const tabs = [
    { id: 'account', label: 'Account' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'calls', label: 'Calls' },
    { id: 'system-calls', label: 'System Calls' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <h1 className="text-3xl font-extrabold text-[#1A1C21] tracking-tight mb-8">Settings</h1>

      {/* Horizontal Sub-navigation */}
      <div className="border-b border-[#EAECEF] mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-2 border-b-2 font-semibold text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-[#00B8D9] text-[#00B8D9]'
                  : 'border-transparent text-[#717784] hover:text-[#1A1C21] hover:border-[#D0D5DD]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Account Tab Content */}
      {activeTab === 'account' && (
        <div className="space-y-8">
          {/* Top Row - User Information & Call Configuration */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* User Information Card */}
            <div className="bg-white border border-[#EAECEF] rounded-xl p-8">
              <h2 className="text-xl font-bold text-[#1A1C21] mb-6">User Information</h2>

              {/* Profile Picture */}
              <div className="flex items-center space-x-6 mb-6">
                <div className="w-20 h-20 bg-[#F7F8FA] rounded-full flex items-center justify-center border-2 border-[#EAECEF]">
                  <span className="text-2xl font-bold text-[#4A4F59]">AC</span>
                </div>
                <button className="text-[#00B8D9] hover:text-[#00A3C1] font-medium transition-colors">
                  Add Photo
                </button>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-[#4A4F59] mb-2">First Name</label>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    className="w-full px-4 py-3 border border-[#D0D5DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B8D9] bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4A4F59] mb-2">Last Name</label>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    className="w-full px-4 py-3 border border-[#D0D5DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B8D9] bg-white"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-[#4A4F59] mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-[#D0D5DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B8D9] bg-white"
                />
              </div>

              {/* Organization */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-[#4A4F59] mb-2">Organization</label>
                <input
                  type="text"
                  placeholder="Enter your organization"
                  className="w-full px-4 py-3 border border-[#D0D5DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B8D9] bg-white"
                />
              </div>

              {/* Time Zone */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#4A4F59] mb-2">Time Zone</label>
                <div className="flex space-x-4">
                  <select
                    className="flex-1 px-4 py-3 border border-[#D0D5DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B8D9] bg-white"
                  >
                    <option value="">Select your time zone</option>
                    <option value="America/New_York">America/New_York</option>
                    <option value="America/Chicago">America/Chicago</option>
                    <option value="America/Los_Angeles">America/Los_Angeles</option>
                  </select>
                  <button className="px-4 py-3 bg-[#00B8D9] text-white rounded-lg hover:bg-[#00A3C1] transition-colors font-medium whitespace-nowrap">
                    Find My Time Zone
                  </button>
                </div>
              </div>

              {/* Save Changes */}
              <button className="w-full px-6 py-3 bg-[#00B8D9] text-white rounded-lg hover:bg-[#00A3C1] transition-colors font-semibold">
                Save Changes
              </button>
            </div>

            {/* Call Configuration Card */}
            <div className="bg-white border border-[#EAECEF] rounded-xl p-8">
              <h2 className="text-xl font-bold text-[#1A1C21] mb-6">Call Configuration</h2>

              {/* Call Hours */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-[#4A4F59] uppercase tracking-wider mb-3">Call Hours</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#717784]">Regular Calls:</span>
                    <span className="text-sm text-[#1A1C21] font-medium">Mon-Fri, 11:00 AM – 9:00 PM EDT</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#717784]">IVR Only:</span>
                    <span className="text-sm text-[#1A1C21] font-medium">24/7</span>
                  </div>
                </div>
              </div>

              {/* Available Call Types */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-[#4A4F59] uppercase tracking-wider mb-3">Available Call Types</h3>
                <div className="flex space-x-3">
                  <span className="px-3 py-1 bg-[#F1EBFA] text-[#6929C4] rounded-full text-sm font-medium">Claims</span>
                  <span className="px-3 py-1 bg-[#F1EBFA] text-[#6929C4] rounded-full text-sm font-medium">Claims (IVR)</span>
                </div>
              </div>

              {/* Available Call Lines */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#4A4F59] uppercase tracking-wider">Available Call Lines</span>
                  <span className="text-sm text-[#1A1C21] font-medium">1 line</span>
                </div>
                <button className="mt-2 text-[#00B8D9] hover:text-[#00A3C1] font-medium transition-colors text-sm">
                  Add lines
                </button>
              </div>

              {/* Smart Review */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#4A4F59] uppercase tracking-wider">Smart Review</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">Enabled</span>
                </div>
                <p className="text-xs text-[#717784] mt-1">AI-assisted data verification</p>
              </div>

              {/* Outbound Numbers */}
              <div>
                <h3 className="text-sm font-bold text-[#4A4F59] uppercase tracking-wider mb-2">Outbound Numbers</h3>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-[#1A1C21] font-medium">562-365-2392</span>
                  <span className="text-xs text-[#717784]">(appears on recipient caller ID)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row - Account Changes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-[#EAECEF] rounded-xl p-8">
              <h2 className="text-xl font-bold text-[#1A1C21] mb-6">Account Changes</h2>

              {/* Change Password */}
              <div className="mb-6">
                <button className="w-full px-6 py-3 border border-[#00B8D9] text-[#00B8D9] rounded-lg hover:bg-[#00B8D9] hover:text-white transition-colors font-semibold">
                  Change Password
                </button>
                <p className="text-xs text-[#717784] mt-2">Send password reset link to your email</p>
              </div>

              {/* Delete Account */}
              <div>
                <button className="w-full px-6 py-3 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-semibold">
                  Delete Account
                </button>
                <p className="text-xs text-[#717784] mt-2">Permanently delete your account</p>
              </div>
            </div>

            {/* Empty columns for layout balance */}
            <div></div>
            <div></div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-8">
          {/* Main Section Title */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#1A1C21]">Email Notifications</h2>
            <span className="text-sm text-[#717784]">(MEST)</span>
          </div>

          {/* Toggle Options */}
          <div className="space-y-6">
            {/* Batch Updates */}
            <div className="flex items-center justify-between p-6 bg-[#F7F8FA] rounded-lg border border-[#EAECEF]">
              <div className="flex-1">
                <h3 className="font-semibold text-[#1A1C21] mb-1">Batch Updates (Immediate)</h3>
                <p className="text-sm text-[#717784] mb-2">Receive email updates for batch completions</p>
                <p className="text-xs text-[#98A2B3]">Calling does not include System Calls when batches finish</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00B8D9]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00B8D9]"></div>
              </label>
            </div>

            {/* Batch Review */}
            <div className="flex items-center justify-between p-6 bg-[#F7F8FA] rounded-lg border border-[#EAECEF]">
              <div className="flex-1">
                <h3 className="font-semibold text-[#1A1C21] mb-1">Batch Review</h3>
                <p className="text-sm text-[#717784]">Get notified when batches enter review status</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00B8D9]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00B8D9]"></div>
              </label>
            </div>

            {/* Batch Completed */}
            <div className="flex items-center justify-between p-6 bg-[#F7F8FA] rounded-lg border border-[#EAECEF]">
              <div className="flex-1">
                <h3 className="font-semibold text-[#1A1C21] mb-1">Batch Completed</h3>
                <p className="text-sm text-[#717784] mb-2">Receive notifications for fully processed batches</p>
                <p className="text-xs text-[#98A2B3]">Daily reports for completed batches</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00B8D9]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00B8D9]"></div>
              </label>
            </div>

            {/* Call Reports */}
            <div className="p-6 bg-[#F7F8FA] rounded-lg border border-[#EAECEF] space-y-4">
              <div>
                <h3 className="font-semibold text-[#1A1C21] mb-1">Call Reports (Daily/Weekly)</h3>
                <p className="text-sm text-[#717784]">Get reports on call activities and performance</p>
              </div>

              {/* Daily Reports Toggle */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <h4 className="font-medium text-[#1A1C21] text-sm">Daily Reports</h4>
                  <p className="text-xs text-[#717784]">Reports sent at 3pm (weekdays)</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00B8D9]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00B8D9]"></div>
                </label>
              </div>

              {/* Weekly Reports Toggle */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <h4 className="font-medium text-[#1A1C21] text-sm">Weekly Reports</h4>
                  <p className="text-xs text-[#717784]">Reports sent every Friday for all System Calls</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00B8D9]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00B8D9]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Footer Notes */}
          <div className="text-sm text-[#717784] bg-[#F7F8FA] p-4 rounded-lg border border-[#EAECEF]">
            <p>Receive a report calls made at 3pm (weekdays) or Friday System Calls, includes Daily/Weekly reports.</p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-[#EAECEF]">
            <button className="text-[#717784] hover:text-[#1A1C21] font-medium transition-colors">
              Turn off all notifications
            </button>
            <button className="px-6 py-3 bg-[#00B8D9] text-white rounded-lg hover:bg-[#00A3C1] transition-colors font-semibold">
              Save changes
            </button>
          </div>
        </div>
      )}

      {/* Calls Tab */}
      {activeTab === 'calls' && (
        <div className="max-w-2xl">
          <div className="bg-white border border-[#EAECEF] rounded-xl shadow-sm p-8">
            {/* Section Title and Helper Text */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#1A1C21] mb-2">Default Batch Speed</h2>
              <p className="text-[#717784]">
                Choose how fast outbound calls should be placed. Slower speeds help avoid overwhelming smaller providers with too many calls.
              </p>
            </div>

            {/* Speed Options */}
            <div className="space-y-4 mb-8">
              {/* Max Speed */}
              <label className="flex items-center space-x-4 p-4 rounded-lg border border-[#EAECEF] cursor-pointer hover:bg-[#F7F8FA] transition-colors">
                <input
                  type="radio"
                  name="batchSpeed"
                  value="max"
                  defaultChecked
                  className="w-4 h-4 text-[#00B8D9] focus:ring-[#00B8D9]"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-[#1A1C21]">Max Speed</span>
                    <span className="text-xs text-[#717784]">⚡</span>
                  </div>
                  <p className="text-sm text-[#717784] mt-1">As fast as possible</p>
                </div>
              </label>

              {/* Low Speed */}
              <label className="flex items-center space-x-4 p-4 rounded-lg border border-[#EAECEF] cursor-pointer hover:bg-[#F7F8FA] transition-colors">
                <input
                  type="radio"
                  name="batchSpeed"
                  value="low"
                  className="w-4 h-4 text-[#00B8D9] focus:ring-[#00B8D9]"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-[#1A1C21]">Low Speed</span>
                    <span className="text-xs text-[#717784]">🐌</span>
                  </div>
                  <p className="text-sm text-[#717784] mt-1">One concurrent call per contact # every 90 minutes</p>
                </div>
              </label>

              {/* Custom Speed */}
              <label className="flex items-center space-x-4 p-4 rounded-lg border border-[#EAECEF] cursor-pointer hover:bg-[#F7F8FA] transition-colors">
                <input
                  type="radio"
                  name="batchSpeed"
                  value="custom"
                  className="w-4 h-4 text-[#00B8D9] focus:ring-[#00B8D9]"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-[#1A1C21]">Custom Speed</span>
                    <span className="text-xs text-[#717784]">⚙️</span>
                  </div>
                  <p className="text-sm text-[#717784] mt-1">One concurrent call per contact # every custom interval</p>
                </div>
              </label>
            </div>

            {/* Save Changes Button */}
            <div className="flex justify-start">
              <button className="px-6 py-3 bg-[#00B8D9] text-white rounded-lg hover:bg-[#00A3C1] transition-colors font-semibold">
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* System Calls Tab */}
      {activeTab === 'system-calls' && (
        <div className="space-y-8">
          {/* Subtitle Banner */}
          <div className="bg-[#F7F8FA] border border-[#EAECEF] rounded-lg p-4">
            <p className="text-[#717784] text-center">
              All system calls programmed via SFTP, API, or EHR connection
            </p>
          </div>

          {/* Connection Cards */}
          <div className="space-y-6">
            {/* SFTP Card */}
            <div className="bg-white border border-[#EAECEF] rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#1A1C21]">SFTP</h3>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                  Not Connected
                </span>
              </div>
              <div className="flex justify-start">
                <button className="flex items-center space-x-2 text-[#00B8D9] hover:text-[#00A3C1] font-medium transition-colors">
                  <span className="text-lg">+</span>
                  <span>Add Connection</span>
                </button>
              </div>
            </div>

            {/* API Card */}
            <div className="bg-white border border-[#EAECEF] rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#1A1C21]">API</h3>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                  Not Connected
                </span>
              </div>
              <div className="mb-4">
                <p className="text-sm text-[#717784] mb-2">
                  Learn what data to send and what responses to expect.
                </p>
                <button className="text-[#00B8D9] hover:text-[#00A3C1] font-medium transition-colors">
                  View Docs
                </button>
              </div>
              <div className="flex justify-start">
                <button className="flex items-center space-x-2 text-[#00B8D9] hover:text-[#00A3C1] font-medium transition-colors">
                  <span className="text-lg">+</span>
                  <span>Add Connection</span>
                </button>
              </div>
            </div>

            {/* EHR Card */}
            <div className="bg-white border border-[#EAECEF] rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#1A1C21]">EHR</h3>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                  Not Connected
                </span>
              </div>
              <div className="flex justify-start">
                <button className="flex items-center space-x-2 text-[#00B8D9] hover:text-[#00A3C1] font-medium transition-colors">
                  <span className="text-lg">+</span>
                  <span>Add Connection</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;