import React, { useState } from 'react';
import {
  Search,
  HelpCircle,
  MessageSquare,
  Book,
  Phone,
  Mail,
  ChevronDown,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const faqs = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      questions: [
        {
          q: 'How do I create my first call batch?',
          a: 'To create your first call batch, click the "Create Call Batch" button in the sidebar or dashboard. Follow the wizard steps to select your template, configure settings, and schedule your batch.'
        },
        {
          q: 'What is a call batch?',
          a: 'A call batch is a collection of phone numbers that will be called automatically using your selected IVR template. Batches can be scheduled, monitored, and managed from the dashboard.'
        }
      ]
    },
    {
      id: 'batch-management',
      title: 'Batch Management',
      questions: [
        {
          q: 'How do I stop a running batch?',
          a: 'Navigate to the dashboard and find your batch in the "In Queue" column. Click the "Stop" button and confirm the action. The batch will be stopped immediately.'
        },
        {
          q: 'Can I edit a batch after it\'s created?',
          a: 'Yes, draft batches can be edited. Click the "Edit" button on any draft batch in the dashboard to modify its settings, template, or phone list.'
        },
        {
          q: 'How do I review completed batches?',
          a: 'Completed batches appear in the "Review" column on the dashboard. Click "Review" to analyze call results, success rates, and generate reports.'
        }
      ]
    },
    {
      id: 'templates',
      title: 'Templates & IVR',
      questions: [
        {
          q: 'How do I create a custom IVR template?',
          a: 'Go to the Templates page and click "Create new template". Choose your template type and customize the call flow, messages, and responses.'
        },
        {
          q: 'What template types are available?',
          a: 'We support Claims IVR templates for insurance claims processing, with customizable voice responses and data collection options.'
        }
      ]
    },
    {
      id: 'settings',
      title: 'Settings & Configuration',
      questions: [
        {
          q: 'How do I add a phone connection?',
          a: 'Go to Settings > System Calls and click "Add connection". Enter your phone number details and configure the connection settings.'
        },
        {
          q: 'Can I change call hours?',
          a: 'Call hours are configured in Settings > Calls. You can set regular business hours and IVR availability (which is 24/7 by default).'
        }
      ]
    }
  ];

  const quickLinks = [
    { title: 'Contact Support', icon: <Phone size={20} />, action: 'Call us at 1-800-HELP-NOW' },
    { title: 'Email Support', icon: <Mail size={20} />, action: 'support@standardpractice.com' },
    { title: 'Documentation', icon: <Book size={20} />, action: 'View full documentation', external: true },
    { title: 'Video Tutorials', icon: <MessageSquare size={20} />, action: 'Watch tutorial videos', external: true }
  ];

  const filteredFaqs = faqs.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.questions.some(q =>
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="flex h-screen bg-[#F7F8FA] font-sans text-sm text-[#1A1C21]">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-[#EAECEF] flex flex-col p-5">
        <div className="mb-10">
          <h1 className="text-xl font-bold text-[#0D346C] tracking-tight">Bristol Healthcare Services</h1>
          <p className="text-[11px] text-[#717784] mt-1.5">Help Center</p>
        </div>

        <nav className="flex-1 space-y-1.5">
          <div className="text-xs font-semibold text-[#717784] uppercase tracking-wider mb-3">Topics</div>
          {faqs.map(section => (
            <button
              key={section.id}
              onClick={() => toggleSection(section.id)}
              className="flex items-center w-full px-4 py-2.5 text-left rounded-lg transition-all text-xs text-[#717784] hover:bg-[#F7F8FA]"
            >
              <HelpCircle size={16} className="mr-3 flex-shrink-0" />
              <span className="flex-1">{section.title}</span>
              {expandedSections[section.id] ?
                <ChevronDown size={14} className="flex-shrink-0" /> :
                <ChevronRight size={14} className="flex-shrink-0" />
              }
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-[#EAECEF] px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#1A1C21]">Help Center</h1>
              <p className="text-sm text-[#98A2B3] mt-1">Find answers and get support</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-6 relative">
            <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#98A2B3]" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#F7F8FA] border border-[#D0D5DD] rounded-lg text-sm placeholder-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#00B8D9] focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-8">
          {/* Quick Links */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-[#1A1C21] mb-4">Quick Support</h2>
            <div className="grid grid-cols-2 gap-4">
              {quickLinks.map((link, index) => (
                <div key={index} className="bg-white border border-[#EAECEF] rounded-xl p-4 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-[#F7F8FA] rounded-lg flex items-center justify-center text-[#00B8D9]">
                      {link.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#1A1C21]">{link.title}</h3>
                      <p className="text-xs text-[#98A2B3]">{link.action}</p>
                    </div>
                  </div>
                  {link.external && (
                    <div className="flex items-center text-xs text-[#00B8D9] font-semibold">
                      <ExternalLink size={12} className="mr-1" />
                      Learn more
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Sections */}
          <div className="space-y-6">
            {filteredFaqs.map(section => (
              <div key={section.id} className="bg-white border border-[#EAECEF] rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-[#F7F8FA] transition-colors"
                >
                  <h3 className="text-lg font-semibold text-[#1A1C21]">{section.title}</h3>
                  {expandedSections[section.id] ?
                    <ChevronDown size={20} className="text-[#98A2B3]" /> :
                    <ChevronRight size={20} className="text-[#98A2B3]" />
                  }
                </button>

                {expandedSections[section.id] && (
                  <div className="px-6 pb-6 space-y-4">
                    {section.questions.map((faq, index) => (
                      <div key={index} className="border-t border-[#F2F4F7] pt-4">
                        <h4 className="text-sm font-semibold text-[#1A1C21] mb-2">{faq.q}</h4>
                        <p className="text-sm text-[#717784] leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFaqs.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <HelpCircle size={48} className="mx-auto text-[#D0D5DD] mb-4" />
              <h3 className="text-lg font-semibold text-[#1A1C21] mb-2">No results found</h3>
              <p className="text-sm text-[#98A2B3]">Try adjusting your search terms or browse the topics above.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HelpCenter;