import React, { useState } from 'react';
import { AlertCircle, ArrowRight, Check, CreditCard, KeyRound, QrCode, Truck } from 'lucide-react';

const DESTINATIONS = [
  { city: 'Bandung', province: 'Jawa Barat', district: 'Sukajadi', courier: 'JNE REG', cost: 12000, etd: '1-2 days' },
  { city: 'Surabaya', province: 'Jawa Timur', district: 'Wonokromo', courier: 'J&T EZ', cost: 18000, etd: '2-3 days' },
  { city: 'Medan', province: 'Sumatera Utara', district: 'Medan Baru', courier: 'SiCepat', cost: 34000, etd: '3-4 days' },
  { city: 'Denpasar', province: 'Bali', district: 'Denpasar Selatan', courier: 'JNE YES', cost: 26000, etd: '1-2 days' },
];

type WebhookStatus = 'idle' | 'pending' | 'settlement' | 'expire';

const STATUS_VIEW: Record<Exclude<WebhookStatus, 'idle'>, { label: string; cls: string }> = {
  settlement: { label: 'PAID AND READY', cls: 'border-ok/40 bg-ok/10 text-ok' },
  pending: { label: 'WAITING PAYMENT', cls: 'border-hl/50 bg-hl/15 text-hl-ink' },
  expire: { label: 'CANCELLED', cls: 'border-accent/40 bg-accent/10 text-accent-ink' },
};

const choice = (active: boolean) =>
  `rounded-theme border text-left transition-colors ${
    active
      ? 'border-[rgb(var(--c-hover-border))] bg-hover text-strong'
      : 'border-line bg-card text-dim hover:border-[rgb(var(--c-hover-border))]'
  }`;

export const PaymentLogisticsSimulator: React.FC = () => {
  const [selectedDest, setSelectedDest] = useState(DESTINATIONS[0]);
  const [selectedGateway, setSelectedGateway] = useState<'midtrans' | 'cashify'>('midtrans');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<WebhookStatus>('idle');

  const subtotal = 115000;
  const discount = promoApplied ? Math.round(subtotal * 0.15) : 0;
  const total = subtotal - discount + selectedDest.cost;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'PRAWIRA15') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try PRAWIRA15.');
      setPromoApplied(false);
    }
  };

  return (
    <div className="inset p-5 sm:p-6">
      <div className="mb-4 flex flex-col justify-between gap-2 border-b border-line pb-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-accent-ink" aria-hidden="true" />
          <h3 className="t-body font-semibold text-strong">Multi-gateway payment and RajaOngkir logistics</h3>
        </div>
        <span className="t-small text-mute">SHA-512 verification, dynamic tariffs</span>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Logistics */}
        <div className="space-y-3 rounded-theme border border-line bg-card p-4">
          <div className="t-small flex items-center gap-2 font-semibold text-strong">
            <Truck className="h-3.5 w-3.5 text-accent-ink" aria-hidden="true" />
            RajaOngkir Pro cascading lookup
          </div>

          <fieldset>
            <legend className="t-small mb-1.5 text-mute">Delivery destination</legend>
            <div className="space-y-1.5">
              {DESTINATIONS.map((dest) => (
                <button
                  key={dest.city}
                  type="button"
                  aria-pressed={selectedDest.city === dest.city}
                  onClick={() => setSelectedDest(dest)}
                  className={`${choice(selectedDest.city === dest.city)} flex w-full items-center justify-between gap-3 p-2.5`}
                >
                  <span>
                    <span className="t-small block font-semibold text-strong">
                      {dest.city}, {dest.province}
                    </span>
                    <span className="t-small mt-0.5 block text-mute">
                      {dest.district}, {dest.courier} ({dest.etd})
                    </span>
                  </span>
                  <span className="t-small num shrink-0 text-dim">Rp {dest.cost.toLocaleString('id-ID')}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <div className="border-t border-line pt-3">
            <label htmlFor="promo" className="t-small mb-1.5 block text-mute">
              Voucher engine (try PRAWIRA15)
            </label>
            <div className="flex gap-2">
              <input
                id="promo"
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="PRAWIRA15"
                className="field flex-1"
              />
              <button type="button" onClick={handleApplyPromo} className="btn btn-outline btn-sm">
                Apply
              </button>
            </div>
            <div role="status" aria-live="polite">
              {promoApplied && (
                <p className="t-small mt-1.5 flex items-center gap-1 text-ok">
                  <Check className="h-3 w-3" aria-hidden="true" />
                  15% discount applied (-Rp {discount.toLocaleString('id-ID')})
                </p>
              )}
              {promoError && (
                <p className="t-small mt-1.5 flex items-center gap-1 text-accent-ink">
                  <AlertCircle className="h-3 w-3" aria-hidden="true" />
                  {promoError}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Checkout + webhook */}
        <div className="flex flex-col justify-between rounded-theme border border-line bg-card p-4">
          <div>
            <div className="t-small flex items-center justify-between border-b border-line pb-2 font-semibold text-strong">
              <span>Checkout breakdown</span>
              <span className="num text-base text-accent-ink">Rp {total.toLocaleString('id-ID')}</span>
            </div>

            <fieldset className="border-b border-line py-3">
              <legend className="t-small mb-1.5 text-mute">Payment channel</legend>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  aria-pressed={selectedGateway === 'midtrans'}
                  onClick={() => setSelectedGateway('midtrans')}
                  className={`${choice(selectedGateway === 'midtrans')} t-small flex items-center justify-center gap-1.5 p-2 font-semibold`}
                >
                  <CreditCard className="h-3.5 w-3.5" aria-hidden="true" />
                  Midtrans Snap
                </button>
                <button
                  type="button"
                  aria-pressed={selectedGateway === 'cashify'}
                  onClick={() => setSelectedGateway('cashify')}
                  className={`${choice(selectedGateway === 'cashify')} t-small flex items-center justify-center gap-1.5 p-2 font-semibold`}
                >
                  <QrCode className="h-3.5 w-3.5" aria-hidden="true" />
                  Cashify QRIS
                </button>
              </div>
            </fieldset>

            <div className="t-small space-y-1.5 border-b border-line py-3 text-dim">
              <div className="flex justify-between">
                <span>Items subtotal</span>
                <span className="num text-body">Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-ok">
                  <span>Promo (15%)</span>
                  <span className="num">-Rp {discount.toLocaleString('id-ID')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping ({selectedDest.courier})</span>
                <span className="num text-body">Rp {selectedDest.cost.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <fieldset className="pt-3">
              <legend className="t-small mb-2 text-mute">Simulate {selectedGateway} webhook callback</legend>
              <div className="grid grid-cols-3 gap-2">
                {(['settlement', 'pending', 'expire'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setPaymentStatus(s)}
                    className={`t-small rounded-theme border px-2 py-2 text-center font-semibold transition-colors hover:brightness-95 ${STATUS_VIEW[s].cls}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <div role="status" aria-live="polite">
            {paymentStatus !== 'idle' && (
              <div className="t-small mt-4 rounded-theme border border-line bg-inset p-3">
                <div className="mb-1.5 flex items-center gap-1.5 text-body">
                  <KeyRound className="h-3.5 w-3.5 text-accent-ink" aria-hidden="true" />
                  SHA-512 signature validated (200 OK)
                </div>
                <div className="flex flex-wrap items-center gap-1.5 text-mute">
                  <span>Database state</span>
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  <span
                    className={`rounded-chip border px-1.5 py-0.5 text-[10px] font-bold ${STATUS_VIEW[paymentStatus].cls}`}
                  >
                    {STATUS_VIEW[paymentStatus].label}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
