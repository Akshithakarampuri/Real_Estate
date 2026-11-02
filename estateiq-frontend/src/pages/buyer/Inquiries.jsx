import React, { useState, useEffect } from 'react';
import { inquiryService } from '../../services/inquiryService';
import { Send, MessageSquare, Building2, User, Check, CheckCheck } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [activeInquiryId, setActiveInquiryId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const list = await inquiryService.getInquiries();
        if (isMounted) {
          setInquiries(list);
          if (list.length > 0) setActiveInquiryId(list[0].id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const activeInquiry = inquiries.find((i) => i.id === activeInquiryId) || inquiries[0];

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !activeInquiry) return;

    try {
      const updated = await inquiryService.replyInquiry(activeInquiry.id, replyText, 'buyer');
      setInquiries((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
      setReplyText('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Real-time Messaging Hub</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Buyer Inquiries & Chat
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Direct communication with verified listing agents and property owners
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-premium overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[600px]">
        {/* Left: Thread List */}
        <div className="md:col-span-4 border-r border-slate-200 flex flex-col">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Conversations ({inquiries.length})
            </h3>
          </div>

          <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
            {inquiries.map((inq) => {
              const active = inq.id === activeInquiryId;
              return (
                <button
                  key={inq.id}
                  onClick={() => setActiveInquiryId(inq.id)}
                  className={`w-full p-4 text-left transition-colors flex items-start gap-3 ${
                    active ? 'bg-brand-50/60 border-l-4 border-brand-600' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 font-bold text-xs">
                    {inq.buyerName?.charAt(0) || 'B'}
                  </div>
                  <div className="overflow-hidden flex-1">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{inq.propertyTitle}</h4>
                      <span className="text-[10px] text-slate-400">Recent</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{inq.lastMessage}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Chat View */}
        <div className="md:col-span-8 flex flex-col justify-between h-[600px] bg-slate-50/30">
          {activeInquiry ? (
            <>
              {/* Context Header */}
              <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{activeInquiry.propertyTitle}</h3>
                    <p className="text-[11px] text-slate-500">
                      Channel active with Listing Specialist • Fast Response Enabled
                    </p>
                  </div>
                </div>
              </div>

              {/* Message Bubbles */}
              <div className="p-6 overflow-y-auto flex-1 space-y-4">
                {activeInquiry.messages?.map((msg) => {
                  const isBuyer = msg.sender === 'buyer';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isBuyer ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-md p-4 rounded-2xl text-xs leading-relaxed shadow-subtle ${
                          isBuyer
                            ? 'bg-brand-600 text-white rounded-br-none'
                            : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1 px-1">
                        <span>{msg.time}</span>
                        {isBuyer && <CheckCheck className="w-3 h-3 text-brand-600" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reply Input Bar */}
              <form onSubmit={handleSendReply} className="p-4 bg-white border-t border-slate-200 flex gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your message to the agent..."
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
                <Button type="submit" variant="primary" icon={Send} className="px-5 text-xs">
                  Send
                </Button>
              </form>
            </>
          ) : (
            <div className="flex items-center justify-center flex-1 text-xs text-slate-400">
              Select an inquiry thread to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
