import React, { useState, useEffect } from 'react';
import { agentService } from '../../services/agentService';
import { useToast } from '../../context/ToastContext';
import { LEAD_STAGES } from '../../utils/constants';
import {
  Users,
  PlusCircle,
  Search,
  Phone,
  Mail,
  MoreVertical,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  X,
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';

export const AgentClientsCRM = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const { success, error } = useToast();

  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    interest: '',
    notes: '',
    stage: 'NEW',
  });

  const stages = ['NEW', 'CONTACTED', 'VISITED', 'NEGOTIATION', 'CLOSED'];

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const list = await agentService.getClients();
        if (isMounted) setLeads(list);
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

  const handleStageChange = async (leadId, nextStage) => {
    try {
      await agentService.updateClientStatus(leadId, nextStage);
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, stage: nextStage } : l))
      );
      success(`Lead moved to ${nextStage}!`);
    } catch (err) {
      error('Failed to update stage.');
    }
  };

  const handleCreateLead = async (e) => {
    e.preventDefault();
    if (!newLead.name || !newLead.phone) {
      error('Please provide name and phone.');
      return;
    }
    try {
      const created = await agentService.createClient(newLead);
      setLeads((prev) => [created, ...prev]);
      setAddModalOpen(false);
      setNewLead({
        name: '',
        email: '',
        phone: '',
        budget: '',
        interest: '',
        notes: '',
        stage: 'NEW',
      });
      success('New client lead added to CRM!');
    } catch (err) {
      error('Could not create lead.');
    }
  };

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.interest.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header & Add Client CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>Interactive Deal Board</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Client CRM Kanban Pipeline
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Progress leads across stages: NEW → CONTACTED → VISITED → NEGOTIATION → CLOSED
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leads..."
              className="rounded-xl border border-slate-200 pl-9 pr-3 py-2 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <Button
            onClick={() => setAddModalOpen(true)}
            variant="primary"
            icon={PlusCircle}
            className="text-xs px-4 py-2 font-bold"
          >
            Add Client
          </Button>
        </div>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {stages.map((stageKey) => {
          const stageConfig = LEAD_STAGES[stageKey] || { label: stageKey, color: 'bg-slate-100 text-slate-800' };
          const stageLeads = filteredLeads.filter((l) => l.stage === stageKey);

          return (
            <div
              key={stageKey}
              className="bg-slate-100/70 rounded-2xl p-3 flex flex-col min-h-[500px] border border-slate-200/80 space-y-3"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between px-1">
                <span className={`text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full border ${stageConfig.color}`}>
                  {stageConfig.label}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {stageLeads.length}
                </span>
              </div>

              {/* Cards in Column */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                {stageLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-subtle hover:shadow-premium transition-all space-y-2.5"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xs font-black text-slate-900">{lead.name}</h4>
                        <div className="text-[10px] text-brand-700 font-extrabold">{lead.budget}</div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                        {lead.score}% Int
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg font-medium">
                      🎯 {lead.interest}
                    </div>

                    {lead.notes && (
                      <p className="text-[10px] text-slate-500 italic line-clamp-2">
                        "{lead.notes}"
                      </p>
                    )}

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span className="truncate max-w-[90px]">{lead.phone}</span>
                      </div>

                      {/* Move Stage Shortcut */}
                      {stageKey !== 'CLOSED' && (
                        <button
                          onClick={() => {
                            const nextIdx = stages.indexOf(stageKey) + 1;
                            if (nextIdx < stages.length) {
                              handleStageChange(lead.id, stages[nextIdx]);
                            }
                          }}
                          className="flex items-center gap-0.5 text-xs font-bold text-brand-600 hover:text-brand-700 hover:underline"
                          title="Advance to next pipeline stage"
                        >
                          <span>Advance</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Client Modal */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add New Client Lead"
        subtitle="Register prospective buyer and set target budget"
      >
        <form onSubmit={handleCreateLead} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Client Name *</label>
            <input
              type="text"
              required
              value={newLead.name}
              onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
              placeholder="e.g. Siddhartha Sengupta"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone *</label>
              <input
                type="text"
                required
                value={newLead.phone}
                onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                placeholder="+91 98200 11223"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email</label>
              <input
                type="email"
                value={newLead.email}
                onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                placeholder="client@corp.in"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Budget</label>
              <input
                type="text"
                value={newLead.budget}
                onChange={(e) => setNewLead({ ...newLead, budget: e.target.value })}
                placeholder="e.g. ₹2.5 Cr - ₹3.5 Cr"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Initial Stage</label>
              <select
                value={newLead.stage}
                onChange={(e) => setNewLead({ ...newLead, stage: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs bg-white"
              >
                {stages.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Property Interest</label>
            <input
              type="text"
              value={newLead.interest}
              onChange={(e) => setNewLead({ ...newLead, interest: e.target.value })}
              placeholder="e.g. 4BHK Penthouse in Worli"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Meeting Notes</label>
            <textarea
              rows={2}
              value={newLead.notes}
              onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
              placeholder="Prefers high-rise with sea view."
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3 border-t">
            <Button type="button" variant="secondary" onClick={() => setAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add to Kanban
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
