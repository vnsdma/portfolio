import React, { useState } from 'react';
import {
  AlertTriangle,
  Bot,
  CheckCircle2,
  ChevronDown,
  Cpu,
  Database,
  ExternalLink,
  FileText,
  MessageSquare,
  Play,
  RotateCcw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface Scenario {
  id: string;
  label: string;
  tag: string;
  query: string;
  type: 'rag' | 'tool-db' | 'tool-wa' | 'anti-hallucination';
  similarity: number;
  documentSource?: {
    name: string;
    page: number;
    section: string;
    snippet: string;
  };
  toolExecution?: {
    name: 'check_inventory_stock' | 'send_whatsapp_action';
    input: Record<string, any>;
    output: Record<string, any>;
  };
  answer: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'rag-sop',
    label: 'SOP Storage & Humidity (RAG Search)',
    tag: 'RAG Citation',
    query: 'Berapa suhu dan kadar kelembaban optimal untuk penyimpanan tembakau menurut SOP?',
    type: 'rag',
    similarity: 0.88,
    documentSource: {
      name: 'SOP_Penyimpanan_dan_Garansi_Prawira.pdf',
      page: 1,
      section: 'Bab 1: Standar Kelembaban & Suhu Gudang',
      snippet:
        'Suhu optimal penyimpanan tembakau adalah 20°C - 25°C dengan kadar kelembaban relatif (Relative Humidity / RH) berkisar antara 65% - 70%. Penyimpanan di luar rentang ini dapat menyebabkan tembakau berjamur (jika RH > 75%) atau kehilangan elastisitas dan aroma khas (jika RH < 60%). Disarankan menggunakan toples kedap udara dan Boveda 69%.',
    },
    answer:
      'Berdasarkan SOP Penyimpanan dan Garansi Prawira Tobacco (Halaman 1), suhu optimal penyimpanan tembakau adalah **20°C - 25°C** dengan kelembaban relatif (**RH**) **65% - 70%**.\n\nDisarankan menyimpan tembakau dalam wadah toples kedap udara bersama regulator kelembaban seperti *Boveda 69%* untuk mempertahankan kelenturan serat daun dan keaslian aroma tembakau.',
  },
  {
    id: 'tool-stock',
    label: 'Warehouse Stock Check (Tool Calling)',
    tag: 'SQL Tool Call',
    query: 'Cek sisa stok Tembakau Djarum Super dan lokasinya di rak gudang',
    type: 'tool-db',
    similarity: 0.84,
    toolExecution: {
      name: 'check_inventory_stock',
      input: { search_term: 'Djarum Super', category: 'all' },
      output: {
        found: true,
        count: 1,
        source: 'Live Supabase Cloud (products table)',
        items: [
          {
            sku: 'PT-001',
            name: 'Linting Djarum Super Blend 50g',
            category: 'Tembakau Kretek Premium',
            stock: 18,
            unit: 'pack',
            price: 28000,
            formatted_price: 'Rp 28.000',
            shelf_location: 'Rak A-01 (Gudang Prawira)',
            status: 'Tersedia',
          },
        ],
      },
    },
    answer:
      'Stok **Linting Djarum Super Blend 50g** saat ini tersedia sebanyak **18 pack** di gudang Prawira Tobacco.\n\n- **SKU**: `PT-001`\n- **Harga**: Rp 28.000 / pack\n- **Lokasi Fisik**: Rak A-01 (Gudang Prawira)\n- **Status**: Siap diproses untuk checkout atau pengiriman langsung.',
  },
  {
    id: 'tool-whatsapp',
    label: 'WhatsApp Concierge Dispatch (Tool Calling)',
    tag: 'Action Tool',
    query: 'Kirimkan rekomendasi tembakau rasa vanilla ke WhatsApp 083132001855',
    type: 'tool-wa',
    similarity: 0.81,
    toolExecution: {
      name: 'send_whatsapp_action',
      input: {
        phone_number: '083132001855',
        action_title: 'Rekomendasi Varian Vanilla Prawira',
        message_body:
          'Halo Kak! Rekomendasi tembakau aroma Vanilla: 1. Mac Baren Vanilla Choice (Rp 45.000, Rak B-02) 2. Prawira Vanilla Blend (Rp 25.000, Rak A-03). Stok tersedia di prawiratobacco.com!',
      },
      output: {
        mode: 'direct_url',
        phone: '6283132001855',
        status: 'Action link ready',
        direct_url:
          'https://wa.me/6283132001855?text=Halo%20Kak!%20Rekomendasi%20tembakau%20aroma%20Vanilla%3A%201.%20Mac%20Baren%20Vanilla%20Choice%20(Rp%2045.000)%202.%20Prawira%20Vanilla%20Blend%20(Rp%2025.000).%20Stok%20tersedia!',
      },
    },
    answer:
      'Ringkasan rekomendasi varian tembakau aroma vanilla dan harganya telah disusun dan disiapkan untuk dikirim langsung ke WhatsApp **083132001855** melalui tautan aksi interaktif di bawah ini.',
  },
  {
    id: 'anti-hallucination',
    label: 'Anti-Hallucination Guardrail (Out of Context)',
    tag: 'Guardrail Rejection',
    query: 'Berapa harga tiket pesawat dari Jakarta ke Bali?',
    type: 'anti-hallucination',
    similarity: 0.21,
    answer:
      'Maaf, informasi tersebut **tidak ditemukan** dalam dokumen SOP maupun Katalog resmi Prawira Tobacco.\n\nSebagai asisten enterprise yang dikonfigurasi dengan sistem *strict anti-hallucination guardrail* (Confidence cutoff ≥ 0.70), saya hanya diperbolehkan menjawab pertanyaan faktual seputar varian tembakau, SOP toko, dan stok gudang resmi Prawira Tobacco.',
  },
];

export const DocumentIntelligenceSimulator: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(SCENARIOS[0]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(3); // 0=Embed, 1=Vector Search, 2=Tool Call, 3=Completed
  const [showCitation, setShowCitation] = useState<boolean>(false);
  const [llmEngine, setLlmEngine] = useState<'gemini' | 'openai'>('gemini');

  const handleSelectScenario = (sc: Scenario) => {
    setSelectedScenario(sc);
    setIsRunning(true);
    setActiveStep(0);
    setShowCitation(false);

    // Simulated stepped pipeline
    setTimeout(() => setActiveStep(1), 200);
    setTimeout(() => setActiveStep(2), 450);
    setTimeout(() => {
      setActiveStep(3);
      setIsRunning(false);
    }, 700);
  };

  const handleReset = () => {
    handleSelectScenario(selectedScenario);
  };

  return (
    <div className="inset space-y-6 p-4 sm:p-6">
      {/* Simulator Header */}
      <div className="flex flex-col justify-between gap-3 border-b border-line pb-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-accent-ink" aria-hidden="true" />
          <h3 className="t-body font-semibold text-strong">
            Enterprise RAG & WhatsApp Action Agent Simulator
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          {/* LLM Engine Switcher */}
          <div className="flex items-center rounded-theme border border-line bg-card p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setLlmEngine('gemini')}
              className={`rounded px-2 py-1 font-medium transition-colors ${
                llmEngine === 'gemini'
                  ? 'bg-accent text-[rgb(var(--c-on-accent))] font-semibold'
                  : 'text-dim hover:text-strong'
              }`}
            >
              Gemini 1.5 Flash
            </button>
            <button
              type="button"
              onClick={() => setLlmEngine('openai')}
              className={`rounded px-2 py-1 font-medium transition-colors ${
                llmEngine === 'openai'
                  ? 'bg-accent text-[rgb(var(--c-on-accent))] font-semibold'
                  : 'text-dim hover:text-strong'
              }`}
            >
              GPT-4o-mini
            </button>
          </div>
          <span className="badge">pgvector HNSW</span>
          <span className="t-small text-mute">Threshold &ge; 0.70</span>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Preset Test Scenarios */}
        <div className="space-y-4 lg:col-span-5">
          <div className="space-y-2.5 rounded-theme border border-line bg-card p-4">
            <div className="flex items-center justify-between">
              <span className="t-label-sm text-mute">Select HRD Review Scenario</span>
              <button
                type="button"
                onClick={handleReset}
                title="Rerun scenario"
                className="t-small inline-flex items-center gap-1 text-dim hover:text-strong"
              >
                <RotateCcw className="h-3 w-3" />
                Rerun
              </button>
            </div>

            <div className="space-y-2">
              {SCENARIOS.map((sc) => {
                const isSelected = selectedScenario.id === sc.id;
                return (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => handleSelectScenario(sc)}
                    className={`w-full rounded-theme border p-3 text-left transition-colors ${
                      isSelected
                        ? 'border-[rgb(var(--c-accent))] bg-hover text-strong shadow-sm'
                        : 'border-line bg-card text-dim hover:border-[rgb(var(--c-hover-border))] hover:text-strong'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold leading-tight text-strong">
                        {sc.label}
                      </span>
                      <span
                        className={`rounded-chip px-1.5 py-0.5 text-[10px] font-bold ${
                          sc.type === 'anti-hallucination'
                            ? 'border border-red-500/40 bg-red-500/10 text-red-500'
                            : sc.type === 'tool-wa'
                            ? 'border border-emerald-500/40 bg-emerald-500/10 text-emerald-600'
                            : 'border border-accent/40 bg-accent/10 text-accent-ink'
                        }`}
                      >
                        {sc.tag}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-dim line-clamp-1 italic">
                      &ldquo;{sc.query}&rdquo;
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pipeline Telemetry Inspector */}
          <div className="rounded-theme border border-line bg-inset p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-line pb-2 text-xs">
              <span className="font-semibold text-strong flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5 text-accent-ink" />
                Pipeline Telemetry
              </span>
              <span className="font-mono text-[11px] text-mute">
                {llmEngine === 'gemini' ? 'Gemini 768-dim' : 'OpenAI 1536-dim'}
              </span>
            </div>

            <div className="space-y-2 font-mono text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-dim">1. Embedding Latency</span>
                <span className="text-strong font-semibold">&lt; 38ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-dim">2. Cosine Similarity</span>
                <span
                  className={`font-bold ${
                    selectedScenario.similarity >= 0.7 ? 'text-ok' : 'text-red-500'
                  }`}
                >
                  {selectedScenario.similarity.toFixed(2)} (Threshold: 0.70)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-dim">3. Tool Router Status</span>
                <span className="text-accent-ink font-semibold">
                  {selectedScenario.toolExecution ? selectedScenario.toolExecution.name : 'RAG Direct'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-dim">4. Anti-Hallucination</span>
                <span
                  className={`font-semibold ${
                    selectedScenario.type === 'anti-hallucination'
                      ? 'text-red-500'
                      : 'text-ok'
                  }`}
                >
                  {selectedScenario.type === 'anti-hallucination'
                    ? '100% Blocked (<0.70)'
                    : '100% Grounded'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Execution Canvas & Output */}
        <div className="space-y-4 lg:col-span-7">
          {/* Query Bar */}
          <div className="rounded-theme border border-line bg-card p-3.5">
            <div className="flex items-start gap-2.5">
              <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" />
              <div className="flex-1 min-w-0">
                <span className="t-label-sm block text-mute">User Prompt:</span>
                <p className="t-body mt-0.5 font-medium text-strong">
                  {selectedScenario.query}
                </p>
              </div>
            </div>
          </div>

          {/* Stepped Progress Trace */}
          <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
            {[
              { label: 'Embed Query', done: activeStep >= 0 },
              { label: 'pgvector Search', done: activeStep >= 1 },
              { label: 'Tool Evaluation', done: activeStep >= 2 },
              { label: 'Grounded Answer', done: activeStep >= 3 },
            ].map((step, idx) => (
              <div
                key={step.label}
                className={`rounded border p-1.5 transition-colors ${
                  step.done
                    ? 'border-accent/40 bg-accent/10 text-accent-ink font-bold'
                    : 'border-line bg-inset text-mute'
                }`}
              >
                {step.label}
              </div>
            ))}
          </div>

          {/* Tool Card Result (If any) */}
          {selectedScenario.toolExecution && activeStep >= 2 && (
            <div className="animate-in fade-in slide-in-from-top-1 duration-200">
              {selectedScenario.toolExecution.name === 'check_inventory_stock' && (
                <div className="rounded-theme border border-amber-500/40 bg-amber-500/10 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-amber-700 dark:text-amber-400">
                    <span className="flex items-center gap-1.5">
                      <Database className="h-3.5 w-3.5" />
                      Database Tool: check_inventory_stock()
                    </span>
                    <span className="rounded-chip border border-amber-500/40 bg-amber-500/20 px-2 py-0.5 text-[10px]">
                      200 OK • Supabase
                    </span>
                  </div>

                  {selectedScenario.toolExecution.output.items.map((item: any) => (
                    <div
                      key={item.sku}
                      className="rounded border border-line bg-card p-3 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-strong text-sm">{item.name}</span>
                        <span className="badge text-[11px] font-bold text-ok border-ok/40 bg-ok/10">
                          {item.status} ({item.stock} {item.unit})
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-dim text-[11px]">
                        <div>SKU: <span className="font-mono text-strong">{item.sku}</span></div>
                        <div>Price: <span className="font-semibold text-strong">{item.formatted_price}</span></div>
                        <div className="col-span-2">Location: <span className="font-semibold text-accent-ink">{item.shelf_location}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedScenario.toolExecution.name === 'send_whatsapp_action' && (
                <div className="rounded-theme border border-emerald-500/40 bg-emerald-500/10 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      Action Tool: send_whatsapp_action()
                    </span>
                    <span className="rounded-chip border border-emerald-500/40 bg-emerald-500/20 px-2 py-0.5 text-[10px]">
                      Fonnte / wa.me Ready
                    </span>
                  </div>

                  <div className="rounded border border-line bg-card p-3 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-dim text-[11px]">
                      <span>Destination Number:</span>
                      <span className="font-mono font-bold text-strong">
                        +{selectedScenario.toolExecution.output.phone}
                      </span>
                    </div>
                    <div className="rounded bg-inset p-2 text-dim text-[11px] italic">
                      &ldquo;{selectedScenario.toolExecution.input.message_body}&rdquo;
                    </div>
                    <a
                      href={selectedScenario.toolExecution.output.direct_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-theme bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Open Interactive WhatsApp Link
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Guardrail Alert (If Anti-Hallucination) */}
          {selectedScenario.type === 'anti-hallucination' && activeStep >= 1 && (
            <div className="rounded-theme border border-red-500/40 bg-red-500/10 p-3.5 flex items-start gap-2.5 text-xs text-red-600 dark:text-red-400">
              <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Guardrail Triggered: Low Confidence (0.21 &lt; 0.70)</span>
                <span>The vector similarity threshold rejected the prompt as out-of-domain. Strict zero-hallucination policy enforced.</span>
              </div>
            </div>
          )}

          {/* Final Agent Answer Box */}
          <div className="rounded-theme border border-line bg-card p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-line pb-2.5">
              <span className="t-label-sm flex items-center gap-1.5 text-accent-ink font-semibold">
                <CheckCircle2 className="h-3.5 w-3.5 text-ok" />
                Agent Verified Response
              </span>
              <span className="t-small text-mute">
                Grounded • No Hallucination
              </span>
            </div>

            <div className="t-body space-y-2 text-xs sm:text-sm text-strong whitespace-pre-line leading-relaxed">
              {activeStep < 3 ? (
                <div className="flex items-center gap-2 text-dim animate-pulse py-4">
                  <Play className="h-3.5 w-3.5 animate-spin" />
                  Generating grounded answer with citations...
                </div>
              ) : (
                selectedScenario.answer
              )}
            </div>

            {/* Document Citation Accordion */}
            {selectedScenario.documentSource && activeStep >= 3 && (
              <div className="border-t border-line pt-2.5">
                <button
                  type="button"
                  onClick={() => setShowCitation(!showCitation)}
                  className="flex items-center justify-between w-full text-xs font-semibold text-accent-ink hover:underline"
                >
                  <span className="flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5" />
                    1 Verified Document Reference: {selectedScenario.documentSource.name} (Hal. {selectedScenario.documentSource.page})
                  </span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${
                      showCitation ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {showCitation && (
                  <div className="mt-2.5 rounded bg-inset p-3 text-xs space-y-1.5 border border-line animate-in fade-in duration-200">
                    <div className="font-semibold text-strong flex items-center justify-between">
                      <span>{selectedScenario.documentSource.section}</span>
                      <span className="text-ok font-mono text-[10px]">Score: {selectedScenario.similarity}</span>
                    </div>
                    <p className="text-dim italic leading-relaxed text-[11px]">
                      &ldquo;{selectedScenario.documentSource.snippet}&rdquo;
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
