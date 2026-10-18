import React, { useState } from 'react';
import { ArrowRight, Bot, Check, CheckCircle2, Copy, Cpu, KeyRound, QrCode, RefreshCw, Send, ShieldCheck, Smartphone, Terminal as TerminalIcon } from 'lucide-react';

interface NotificationSource {
  id: string;
  name: string;
  app: string;
  sampleSender: string;
  badgeTone: string;
  formatText: (amount: number, sender: string) => string;
}

const SOURCES: NotificationSource[] = [
  {
    id: 'gopay',
    name: 'GoPay Merchant',
    app: 'com.gojek.merchant',
    sampleSender: 'Budi Santoso',
    badgeTone: 'border-ok/30 bg-ok/10 text-ok',
    formatText: (amount, sender) => `Pembayaran Rp ${amount.toLocaleString('id-ID')} dari ${sender} berhasil diterima`,
  },
  {
    id: 'bca',
    name: 'BCA Mobile (m-BCA)',
    app: 'com.bca.mobile',
    sampleSender: 'PT KARYA MAKMUR',
    badgeTone: 'border-accent/30 bg-accent/10 text-accent-ink',
    formatText: (amount, sender) => `Transaksi QRIS Masuk Rp ${amount.toLocaleString('id-ID')} dari ${sender}`,
  },
  {
    id: 'shopeepay',
    name: 'ShopeePay Merchant',
    app: 'com.shopee.merchant',
    sampleSender: 'Siti Rahma',
    badgeTone: 'border-hl/40 bg-hl/15 text-hl-ink',
    formatText: (amount, sender) => `ShopeePay: Dana Rp ${amount.toLocaleString('id-ID')} masuk dari ${sender}`,
  },
  {
    id: 'ovo',
    name: 'OVO Merchant',
    app: 'com.ovo.merchant',
    sampleSender: 'Hendro Wijaya',
    badgeTone: 'border-line bg-inset text-strong',
    formatText: (amount, sender) => `OVO: Pembayaran sebesar Rp ${amount.toLocaleString('id-ID')} telah berhasil`,
  },
];

type RelayState = 'idle' | 'generating' | 'waiting_payment' | 'reconciling' | 'completed';

export const QrisRelaySimulator: React.FC = () => {
  const [baseAmount, setBaseAmount] = useState<number>(50000);
  const [selectedSource, setSelectedSource] = useState<NotificationSource>(SOURCES[0]);
  const [relayState, setRelayState] = useState<RelayState>('idle');
  const [reconcileLatency, setReconcileLatency] = useState<number>(42);
  const [activeTab, setActiveTab] = useState<'flow' | 'payload'>('flow');

  const uniqueCode = 1;
  const finalAmount = baseAmount + uniqueCode;
  const invoiceNumber = 'INV-20261018-4821';
  const crc16Hex = '4A1E';
  const dynamicQrisPayload = `00020101021226590014ID.LINKAJA.WWW0118936009110021008000520454115303360540${finalAmount.toString().length}${finalAmount}5802ID5914RADARPAY STORE6007BANDUNG62070703A016304${crc16Hex}`;

  const handleGenerateQris = () => {
    setRelayState('generating');
    setTimeout(() => {
      setRelayState('waiting_payment');
    }, 350);
  };

  const handleSimulatePayment = () => {
    if (relayState !== 'waiting_payment') return;
    setRelayState('reconciling');
    const start = performance.now();

    setTimeout(() => {
      const elapsed = Math.round(performance.now() - start + 28);
      setReconcileLatency(elapsed);
      setRelayState('completed');
    }, 420);
  };

  const handleReset = () => {
    setRelayState('idle');
  };

  return (
    <div className="inset p-4 sm:p-6 space-y-6">
      {/* Simulator Header */}
      <div className="flex flex-col justify-between gap-2 border-b border-line pb-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <QrCode className="h-4 w-4 text-accent-ink" aria-hidden="true" />
          <h3 className="t-body font-semibold text-strong">
            Dynamic QRIS EMVCo & Android Notification Relay Engine
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="badge">CRC-16 EMVCo</span>
          <span className="t-small text-mute">Sub-80ms Atomic Match</span>
        </div>
      </div>

      {/* Main Grid: Controls & Visual Flow */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Interactive Controls */}
        <div className="space-y-5 lg:col-span-5">
          {/* Step 1: Amount Selection */}
          <div className="space-y-3 rounded-theme border border-line bg-card p-4">
            <div className="flex items-center justify-between">
              <span className="t-label-sm text-mute">1. Order Base Nominal</span>
              <span className="num text-xs font-semibold text-accent-ink">+Rp 1 unique code</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[25000, 50000, 100000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  disabled={relayState === 'waiting_payment' || relayState === 'reconciling'}
                  onClick={() => {
                    setBaseAmount(amt);
                    if (relayState === 'completed') setRelayState('idle');
                  }}
                  className={`rounded-theme border px-3 py-2 text-center text-xs font-semibold transition-colors ${
                    baseAmount === amt
                      ? 'border-[rgb(var(--c-accent))] bg-[rgb(var(--c-accent))] text-[rgb(var(--c-on-accent))]'
                      : 'border-line bg-inset text-body hover:border-[rgb(var(--c-hover-border))]'
                  }`}
                >
                  Rp {amt.toLocaleString('id-ID')}
                </button>
              ))}
            </div>

            <div className="inset p-3 flex items-baseline justify-between">
              <span className="t-small text-dim">Total Reconcilable:</span>
              <span className="num text-base font-bold text-strong">
                Rp {finalAmount.toLocaleString('id-ID')}
              </span>
            </div>

            {relayState === 'idle' && (
              <button
                type="button"
                onClick={handleGenerateQris}
                className="btn btn-primary w-full btn-sm font-semibold"
              >
                <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
                Generate Dynamic QRIS
              </button>
            )}
          </div>

          {/* Step 2: Android Interception Source */}
          <div className="space-y-3 rounded-theme border border-line bg-card p-4">
            <div className="flex items-center justify-between">
              <span className="t-label-sm text-mute">2. Android Notification Source</span>
              <span className="inline-flex items-center gap-1 text-[11px] text-ok">
                <span className="h-1.5 w-1.5 rounded-full bg-ok animate-pulse" />
                Service Active
              </span>
            </div>

            <div className="space-y-1.5">
              {SOURCES.map((source) => (
                <button
                  key={source.id}
                  type="button"
                  disabled={relayState === 'reconciling'}
                  onClick={() => setSelectedSource(source)}
                  className={`w-full rounded-theme border px-3 py-2 text-left transition-colors flex items-center justify-between ${
                    selectedSource.id === source.id
                      ? 'border-[rgb(var(--c-hover-border))] bg-hover text-strong'
                      : 'border-line bg-inset text-dim hover:border-[rgb(var(--c-hover-border))]'
                  }`}
                >
                  <span className="text-xs font-medium">{source.name}</span>
                  <span className="font-mono text-[10px] text-mute">{source.app}</span>
                </button>
              ))}
            </div>

            {/* Trigger Button */}
            {relayState === 'waiting_payment' && (
              <button
                type="button"
                onClick={handleSimulatePayment}
                className="btn btn-primary w-full btn-sm animate-pulse font-semibold"
              >
                <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
                Simulate Push Notification
              </button>
            )}

            {relayState === 'completed' && (
              <button
                type="button"
                onClick={handleReset}
                className="btn btn-outline w-full btn-sm"
              >
                <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                Simulate New Transaction
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Execution Canvas */}
        <div className="space-y-4 lg:col-span-7">
          {/* Status Bar */}
          <div className="flex items-center justify-between rounded-theme border border-line bg-card px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="t-small text-dim">Order Status:</span>
              <span
                className={`badge ${
                  relayState === 'completed'
                    ? 'border-ok/40 bg-ok/10 text-ok'
                    : relayState === 'reconciling'
                    ? 'border-hl/40 bg-hl/15 text-hl-ink'
                    : relayState === 'waiting_payment'
                    ? 'border-accent/40 bg-accent/10 text-accent-ink'
                    : 'border-line text-mute'
                }`}
              >
                {relayState === 'completed'
                  ? 'PAID & RECONCILED'
                  : relayState === 'reconciling'
                  ? 'RECONCILING...'
                  : relayState === 'waiting_payment'
                  ? 'AWAITING SCAN'
                  : 'READY'}
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-dim">
              <span>{invoiceNumber}</span>
              {relayState === 'completed' && (
                <span className="text-ok font-bold">({reconcileLatency}ms)</span>
              )}
            </div>
          </div>

          {/* Interactive Screen: QR Canvas or Simulation Pipeline */}
          <div className="rounded-theme border border-term-line bg-term-bg p-4 sm:p-5 text-term-fg font-mono text-xs space-y-4 min-h-[310px] flex flex-col justify-between">
            {relayState === 'idle' && (
              <div className="my-auto text-center space-y-3 py-8">
                <QrCode className="mx-auto h-12 w-12 text-term-dim stroke-[1.5]" />
                <p className="text-term-dim text-xs max-w-sm mx-auto">
                  Select a nominal and click <strong className="text-term-accent">Generate Dynamic QRIS</strong> to watch the EMVCo Tag 01 mutation, Tag 54 nominal injection, and CRC-16 calculation.
                </p>
              </div>
            )}

            {relayState === 'waiting_payment' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-term-line pb-2">
                  <span className="text-term-accent font-semibold">// DYNAMIC EMVCo QRIS GENERATED</span>
                  <span className="text-term-hl font-bold">CRC: {crc16Hex}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  {/* Stylized QR Code Visualizer */}
                  <div className="sm:col-span-5 bg-white p-3 rounded flex flex-col items-center justify-center text-slate-900">
                    <div className="w-28 h-28 border-2 border-slate-900 p-1 flex flex-col justify-between">
                      <div className="flex justify-between">
                        <div className="w-7 h-7 bg-slate-900 border-2 border-white" />
                        <div className="w-7 h-7 bg-slate-900 border-2 border-white" />
                      </div>
                      <div className="text-center font-bold text-[10px] tracking-widest text-slate-700">
                        QRIS
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="w-7 h-7 bg-slate-900 border-2 border-white" />
                        <div className="w-4 h-4 bg-slate-900" />
                      </div>
                    </div>
                    <span className="mt-1.5 font-bold text-slate-800 text-[11px]">
                      Rp {finalAmount.toLocaleString('id-ID')}
                    </span>
                  </div>

                  {/* Tag Decomposition */}
                  <div className="sm:col-span-7 space-y-1.5 text-[11px]">
                    <div className="flex justify-between text-term-dim">
                      <span>Tag 01 (Initiation):</span>
                      <span className="text-term-ok">12 (Dynamic)</span>
                    </div>
                    <div className="flex justify-between text-term-dim">
                      <span>Tag 53 (Currency):</span>
                      <span className="text-term-fg">360 (IDR)</span>
                    </div>
                    <div className="flex justify-between text-term-dim">
                      <span>Tag 54 (Amount):</span>
                      <span className="text-term-hl font-bold">{finalAmount}</span>
                    </div>
                    <div className="flex justify-between text-term-dim">
                      <span>Tag 58 (Country):</span>
                      <span className="text-term-fg">ID</span>
                    </div>
                    <div className="flex justify-between text-term-dim">
                      <span>Tag 63 (Checksum):</span>
                      <span className="text-term-accent font-bold">6304{crc16Hex}</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Device Notification Prompt */}
                <div className="rounded border border-term-line bg-term-bg/80 p-3 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-term-dim text-[11px]">
                    <Smartphone className="h-3 w-3 text-term-accent" />
                    <span>Android Listener Waiting for Push Event...</span>
                  </div>
                  <p className="text-term-fg">
                    Expected text: &ldquo;{selectedSource.formatText(finalAmount, selectedSource.sampleSender)}&rdquo;
                  </p>
                </div>
              </div>
            )}

            {(relayState === 'reconciling' || relayState === 'completed') && (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-term-line pb-2">
                  <span className="text-term-ok font-semibold">// RECONCILIATION & DISPATCH PIPELINE</span>
                  <span className="text-term-hl font-bold">{reconcileLatency}ms</span>
                </div>

                <div className="space-y-1.5 text-[11px]">
                  <div className="flex items-start gap-2 text-term-ok">
                    <Check className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    <span>[Android Service] Notification intercepted from {selectedSource.name}</span>
                  </div>
                  <div className="flex items-start gap-2 text-term-ok">
                    <Check className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    <span>[Deduplication] SHA-256 hash verified & stored in local SQLite outbox</span>
                  </div>
                  <div className="flex items-start gap-2 text-term-ok">
                    <Check className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    <span>[Regex Parser] Extracted nominal: Rp {finalAmount.toLocaleString('id-ID')} from {selectedSource.sampleSender}</span>
                  </div>
                  <div className="flex items-start gap-2 text-term-ok">
                    <Check className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    <span>[Drizzle PostgreSQL] Matched pending order {invoiceNumber} atomically</span>
                  </div>
                  <div className="flex items-start gap-2 text-term-accent">
                    <KeyRound className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    <span>[HMAC-SHA256] Webhook signed & dispatched (X-QRIS-Signature verified)</span>
                  </div>
                  <div className="flex items-start gap-2 text-term-hl">
                    <Bot className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    <span>[Telegram Bot] Real-time payment alert pushed to merchant channel</span>
                  </div>
                </div>

                {/* Webhook Payload Summary Box */}
                <div className="mt-2 rounded border border-term-line bg-black/40 p-2.5 font-mono text-[10px] space-y-1 text-term-dim">
                  <span className="text-term-fg font-semibold">POST /api/webhook/qris</span>
                  <div>{`{"event":"payment.success","invoice":"${invoiceNumber}","amount":${finalAmount},"source":"${selectedSource.id}","status":"PAID"}`}</div>
                </div>
              </div>
            )}

            {/* Bottom Terminal Indicator */}
            <div className="flex items-center justify-between text-[11px] text-term-dim border-t border-term-line pt-2">
              <span>RadarPay Autonomous Gateway</span>
              <span>Fastify 5 &bull; Drizzle ORM &bull; Kotlin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
