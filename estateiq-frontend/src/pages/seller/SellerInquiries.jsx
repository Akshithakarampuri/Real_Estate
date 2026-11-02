import React, { useState, useEffect } from 'react';
import { inquiryService } from '../../services/inquiryService';
import { useToast } from '../../context/ToastContext';
import { MessageSquare, Check, Calendar, Send, User } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const SellerInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeInquiry, setActiveInquiry] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const { success } = useToast();

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const list = await inquiryService.getInquiries();
        if (isMounted) {
          setInquiries(list);
          if (list.length > 0) setActiveInquiry(list[0]);
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

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyMessage.trim() || !activeInquiry) return;

    await inquiryService.replyInquiry(activeInquiry.id, replyMessage, 'seller');
    const updated = {
      ...activeInquiry,
      messages: [
        ...activeInquiry.messages,
        { id: `m-${Date.now()}`, sender: 'seller', text: replyMessage, time: 'Just now' },
      ],
      lastMessage: replyMessage,
    };
    setInquiries((prev) => prev.map((i) => (i.id === activeInquiry.id ? updated : i)));
    setActiveInquiry(updated);
    setReplyMessage('');
    success('Reply delivered to buyer.');
  };

  const markContacted = (id) => {
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: 'Contacted' } : i))
    );
    success('Marked as contacted.');
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Inquiry Studio</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Buyer Inquiries & Leads
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Respond directly to verified buyer inquiries on your properties
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[550px]">
        {/* Thread List */}
        <div className="md:col-span-5 border-r border-slate-200 divide-y divide-slate-100 overflow-y-auto">
          {inquiries.map((inq) => {
            const isSelected = activeInquiry?.id === inq.id;
            return (
              <div
                key={inq.id}
                onClick={() => setActiveInquiry(inq)}
                className={`p-4 cursor-pointer transition-colors ${
                  isSelected ? 'bg-brand-50/60 border-l-4 border-brand-600' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-bold text-slate-900">{inq.buyerName}</span>
                  <span className="text-[10px] text-slate-400">
                    {inq.status || 'New'}
                  </span>
                </div>
                <div className="text-xs font-semibold text-brand-700 truncate">{inq.propertyTitle}</div>
                <p className="text-xs text-slate-500 truncate mt-1">{inq.lastMessage}</p>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markContacted(inq.id);
                    }}
                    className="text-[10px] font-bold text-brand-700 bg-white border border-brand-200 px-2 py-0.5 rounded-lg hover:bg-brand-50"
                  >
                    Mark Contacted
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chat / Reply Pane */}
        <div className="md:col-span-7 flex flex-col justify-between p-6 bg-slate-50/30">
          {activeInquiry ? (
            <>
              <div>
                <div className="pb-4 mb-4 border-b border-slate-200">
                  <h3 className="text-base font-bold text-slate-900">{activeInquiry.buyerName}</h3>
                  <div className="text-xs text-slate-500">
                    Inquiry on: <strong>{activeInquiry.propertyTitle}</strong>
                  </div>
                </div>

                <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
                  {activeInquiry.messages?.map((m) => (
                    <div
                      key={m.id}
                      className={`p-3.5 rounded-2xl text-xs max-w-sm ${
                        m.sender === 'seller'
                          ? 'ml-auto bg-brand-600 text-white rounded-br-none'
                          : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                      }`}
                    >
                      {m.text}
                      <span className="block text-[9px] opacity-70 mt-1">{m.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleReply} className="pt-4 mt-4 border-t border-slate-200 flex gap-2">
                <input
                  type="text"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type message to buyer..."
                  className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
                <Button type="submit" variant="primary" icon={Send} className="text-xs px-4">
                  Reply
                </Button>
              </form>
            </>
          ) : (
            <div className="flex items-center justify-center flex-1 text-xs text-slate-400">
              Select an inquiry to view conversation
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
