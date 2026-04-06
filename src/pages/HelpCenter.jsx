import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  HelpCircle,
  MessageSquare,
  Book,
  Phone,
  Mail,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Send,
  Bot,
  User,
  X,
  Minimize2
} from 'lucide-react';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState({});
  const [showChatbot, setShowChatbot] = useState(false);
  const getRandomGreeting = () => {
    const greetings = [
      'Hi! I\'m your help assistant. How can I help you today?',
      'Hello! I\'m here to help with any questions about our platform.',
      'Welcome! Ask me anything about batches, templates, or settings.',
      'Hi there! I\'m your AI assistant. What can I help you with today?'
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  };

  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: getRandomGreeting(),
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState([]);
  const chatMessagesRef = useRef(null);

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Chatbot functions
  const findBestAnswer = (query) => {
    const lowerQuery = query.toLowerCase();
    let bestMatch = null;
    let bestScore = 0;

    // Search through all FAQ questions and answers
    faqs.forEach(section => {
      section.questions.forEach(faq => {
        const questionScore = getSimilarityScore(lowerQuery, faq.q.toLowerCase());
        const answerScore = getSimilarityScore(lowerQuery, faq.a.toLowerCase());

        const maxScore = Math.max(questionScore, answerScore);

        if (maxScore > bestScore && maxScore > 0.2) { // Minimum threshold
          bestScore = maxScore;
          bestMatch = {
            question: faq.q,
            answer: faq.a,
            section: section.title
          };
        }
      });
    });

    return bestMatch;
  };

  const getSimilarityScore = (str1, str2) => {
    // Normalize strings
    const normalize = (str) => str.toLowerCase().replace(/[^\w\s]/g, '').trim();
    const s1 = normalize(str1);
    const s2 = normalize(str2);

    if (s1 === s2) return 1;

    const words1 = s1.split(/\s+/).filter(word => word.length > 2); // Filter out short words
    const words2 = s2.split(/\s+/).filter(word => word.length > 2);

    if (words1.length === 0 || words2.length === 0) return 0;

    let matches = 0;
    let totalWords = new Set([...words1, ...words2]).size;

    // Exact word matches
    words1.forEach(word => {
      if (words2.includes(word)) {
        matches += 2; // Higher weight for exact matches
      }
    });

    // Partial matches (one word contains another)
    words1.forEach(word => {
      words2.forEach(w => {
        if (word !== w && (word.includes(w) || w.includes(word)) && word.length > 3 && w.length > 3) {
          matches += 1;
        }
      });
    });

    // Check for common bigrams (two-word phrases)
    const getBigrams = (words) => {
      const bigrams = [];
      for (let i = 0; i < words.length - 1; i++) {
        bigrams.push(words[i] + ' ' + words[i + 1]);
      }
      return bigrams;
    };

    const bigrams1 = getBigrams(words1);
    const bigrams2 = getBigrams(words2);

    bigrams1.forEach(bigram => {
      if (bigrams2.includes(bigram)) {
        matches += 3; // Even higher weight for phrase matches
        totalWords += 2; // Adjust total for bigram weight
      }
    });

    return matches / totalWords;
  };

  const generateIntelligentResponse = (query, context = []) => {
    const lowerQuery = query.toLowerCase();

    // Handle conversational phrases
    if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey')) {
      return 'Hello! How can I assist you with our platform today?';
    }

    if (lowerQuery.includes('thank') || lowerQuery.includes('thanks')) {
      return 'You\'re welcome! Is there anything else I can help you with?';
    }

    if (lowerQuery.includes('bye') || lowerQuery.includes('goodbye')) {
      return 'Goodbye! Feel free to come back anytime if you have more questions.';
    }

    if (lowerQuery.includes('help') && query.split(' ').length < 3) {
      return 'I\'m here to help! You can ask me about:\n\n• Creating and managing call batches\n• Designing IVR templates\n• Configuring system settings\n• Troubleshooting issues\n• General platform features\n\nWhat specific topic would you like to know more about?';
    }

    // Check for follow-up questions based on context
    if (context.length > 0) {
      const lastTopic = context[context.length - 1];
      if (lowerQuery.includes('more') || lowerQuery.includes('tell me') || lowerQuery.includes('explain')) {
        if (lastTopic.includes('batch')) {
          return 'Here\'s more information about batches:\n\n• Batches are collections of phone numbers called automatically\n• You can schedule them for specific times\n• Monitor progress in real-time on the dashboard\n• Review results after completion\n\nWould you like to know how to create one?';
        }
        if (lastTopic.includes('template')) {
          return 'More about templates:\n\n• Templates define the IVR conversation flow\n• Include custom questions and responses\n• Support conditional logic based on answers\n• Can be reused for multiple batches\n\nWant help creating a custom template?';
        }
      }
    }

    // Keywords and their associated responses
    const keywordResponses = {
      // Batch-related keywords
      'batch': {
        'create': 'To create a new call batch, go to the dashboard and click "Create Call Batch". Follow the wizard to select a template, upload your data, and configure settings.',
        'edit': 'You can edit draft batches from the dashboard. Click the "Edit" button on any draft batch to modify its settings.',
        'stop': 'To stop a running batch, find it in the "In Queue" column on the dashboard and click the "Stop" button.',
        'delete': 'To delete a batch, click the "More options" button on the batch card and select "Delete call batch".',
        'status': 'Batch statuses include: Draft (not started), Calling (in progress), Review (completed), and Completed (fully processed).'
      },
      // Template-related keywords
      'template': {
        'create': 'Navigate to the Templates page and click "Create new template" to build custom IVR flows.',
        'ivr': 'IVR templates control automated voice responses and data collection during calls.',
        'custom': 'Custom templates allow you to design unique call flows with specific questions and responses.'
      },
      // Settings-related keywords
      'setting': {
        'phone': 'To add a phone connection, go to Settings > System Calls and click "Add connection".',
        'hour': 'Call hours are configured in Settings > Calls. You can set business hours and IVR availability.',
        'notification': 'Configure email notifications in Settings > Notifications to get updates on batch completions.'
      },
      // Support-related keywords
      'support': 'For additional help, you can contact our support team at support@standardpractice.com or call 1-800-HELP-NOW.',
      'help': 'I\'m here to help! You can ask me about batches, templates, settings, or general platform features.',
      'contact': 'Reach out to our support team via email at support@standardpractice.com or call 1-800-HELP-NOW.',
      // General platform keywords
      'login': 'If you\'re having login issues, try clearing your browser cache or contact support for password reset assistance.',
      'password': 'For password reset, click "Forgot Password" on the login page or contact support@standardpractice.com.',
      'account': 'Account-related questions can be handled by our support team at support@standardpractice.com.',
      'billing': 'For billing inquiries, please contact our billing department at billing@standardpractice.com.',
      'pricing': 'Pricing information and plan details are available on our website or by contacting sales@sales.com.'
    };

    // Check for keyword matches
    for (const [category, responses] of Object.entries(keywordResponses)) {
      if (lowerQuery.includes(category)) {
        for (const [subKeyword, response] of Object.entries(responses)) {
          if (lowerQuery.includes(subKeyword)) {
            return response;
          }
        }
        // Return first response in category if no specific match
        return Object.values(responses)[0];
      }
    }

    // Fallback to FAQ search
    const bestMatch = findBestAnswer(query);
    if (bestMatch) {
      return `Based on your question "${query}", here's what I found:\n\n**${bestMatch.question}**\n\n${bestMatch.answer}\n\n*From: ${bestMatch.section}*`;
    }

    // Enhanced fallback responses based on question type
    if (lowerQuery.includes('how') || lowerQuery.includes('what') || lowerQuery.includes('where') || lowerQuery.includes('when')) {
      return `That's a great question about "${query}". Let me help you find the right information:\n\n• Check our FAQ sections above for detailed answers\n• Browse the help topics in the sidebar\n• Contact our support team for personalized assistance\n\nYou can also try asking about specific features like "batches", "templates", or "settings"!`;
    }

    if (lowerQuery.includes('can') || lowerQuery.includes('able')) {
      return `Regarding your question "${query}", here are some capabilities of our platform:\n\n• Create and manage automated call batches\n• Design custom IVR templates\n• Upload and process contact lists\n• Monitor call progress and results\n• Configure system settings and notifications\n\nFor specific feature questions, try asking about "batches", "templates", or "settings"!`;
    }

    // Default fallback
    return `I understand you're asking about "${query}". While I don't have a specific answer ready, here are some helpful resources:\n\n• Browse our FAQ sections above\n• Check the help topics in the sidebar\n• Contact support at support@standardpractice.com\n• Call us at 1-800-HELP-NOW\n\nTry asking about specific topics like batches, templates, or settings for more detailed help!`;
  };

  const sendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Update conversation context
    setConversationContext(prev => [...prev, userMessage.content.toLowerCase()]);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: generateIntelligentResponse(userMessage.content, conversationContext),
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, botResponse]);
      setConversationContext(prev => [...prev, 'response']); // Mark that a response was given
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

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
    { title: 'Chat with Assistant', icon: <Bot size={20} />, action: 'Get instant help', chat: true },
    { title: 'Contact Support', icon: <Phone size={20} />, action: 'Call us at 1-800-HELP-NOW' },
    { title: 'Email Support', icon: <Mail size={20} />, action: 'support@standardpractice.com' },
    { title: 'Documentation', icon: <Book size={20} />, action: 'View full documentation', external: true }
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
                <div
                  key={index}
                  onClick={link.chat ? () => setShowChatbot(true) : undefined}
                  className={`bg-white border border-[#EAECEF] rounded-xl p-4 hover:shadow-md transition-all duration-200 ${
                    link.chat ? 'cursor-pointer' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      link.chat ? 'bg-[#00B8D9] text-white' : 'bg-[#F7F8FA] text-[#00B8D9]'
                    }`}>
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
                  {link.chat && (
                    <div className="flex items-center text-xs text-[#00B8D9] font-semibold">
                      <MessageSquare size={12} className="mr-1" />
                      Start chat
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

      {/* Chatbot Widget */}
      {!showChatbot && (
        <button
          onClick={() => setShowChatbot(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-[#00B8D9] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#00A3C1] transition-colors z-50"
        >
          <MessageSquare size={24} />
        </button>
      )}

      {showChatbot && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white border border-[#EAECEF] rounded-xl shadow-2xl z-50 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#EAECEF] bg-[#00B8D9] text-white rounded-t-xl">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div>
                <h3 className="font-semibold">Help Assistant</h3>
                <p className="text-xs opacity-90">Ask me anything!</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setShowChatbot(false)}
                className="w-6 h-6 hover:bg-white hover:bg-opacity-20 rounded flex items-center justify-center transition-colors"
              >
                <Minimize2 size={14} />
              </button>
              <button
                onClick={() => setShowChatbot(false)}
                className="w-6 h-6 hover:bg-white hover:bg-opacity-20 rounded flex items-center justify-center transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div
            ref={chatMessagesRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {chatMessages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 ${
                    message.type === 'user'
                      ? 'bg-[#00B8D9] text-white'
                      : 'bg-[#F7F8FA] text-[#1A1C21]'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    {message.type === 'bot' ? (
                      <Bot size={14} className="text-[#00B8D9]" />
                    ) : (
                      <User size={14} />
                    )}
                    <span className="text-xs opacity-70">
                      {message.type === 'bot' ? 'Assistant' : 'You'}
                    </span>
                  </div>
                  <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  <div className="text-xs opacity-50 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#F7F8FA] rounded-lg px-3 py-2">
                  <div className="flex items-center space-x-2 mb-1">
                    <Bot size={14} className="text-[#00B8D9]" />
                    <span className="text-xs opacity-70">Assistant</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-[#00B8D9] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#00B8D9] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-[#00B8D9] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-[#EAECEF]">
            <div className="flex space-x-2">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question..."
                className="flex-1 px-3 py-2 border border-[#D0D5DD] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00B8D9] focus:border-transparent"
                disabled={isTyping}
              />
              <button
                onClick={sendMessage}
                disabled={!currentMessage.trim() || isTyping}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  currentMessage.trim() && !isTyping
                    ? 'bg-[#00B8D9] text-white hover:bg-[#00A3C1]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-xs text-[#98A2B3] mt-2">
              Press Enter to send • Ask about batches, templates, settings, etc.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpCenter;