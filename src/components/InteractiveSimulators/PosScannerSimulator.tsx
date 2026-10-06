import React, { useState } from 'react';
import { ArrowRight, Camera, CheckCircle2, RotateCcw, ShieldCheck, ShoppingBag } from 'lucide-react';

interface ScannedProduct {
  id: number;
  name: string;
  price: number;
  qty: number;
  code: string;
}

const CATALOG_SAMPLES = [
  { id: 101, name: 'Prawira Virginia Blend 50g', price: 35000, code: 'PROD:101' },
  { id: 102, name: 'Natural Clove Flavoring 30ml', price: 22000, code: 'PROD:102' },
  { id: 103, name: 'Premium Rolling Paper (Gold)', price: 15000, code: 'PROD:103' },
  { id: 104, name: 'Cellulose Filter Tips (100pcs)', price: 18000, code: 'PROD:104' },
];

export const PosScannerSimulator: React.FC = () => {
  const [cart, setCart] = useState<ScannedProduct[]>([]);
  const [lastScanned, setLastScanned] = useState<string | null>(null);
  const [scanLatency, setScanLatency] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [checkoutComplete, setCheckoutComplete] = useState<boolean>(false);

  const simulateScan = (product: (typeof CATALOG_SAMPLES)[0]) => {
    setIsProcessing(true);
    const start = performance.now();

    setTimeout(() => {
      const elapsed = Math.round(performance.now() - start + 110);
      setScanLatency(elapsed);
      setLastScanned(product.name);

      setCart((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          return prev.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
        }
        return [...prev, { ...product, qty: 1 }];
      });

      setIsProcessing(false);
    }, 160);
  };

  const clearCart = () => {
    setCart([]);
    setLastScanned(null);
    setCheckoutComplete(false);
  };

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const itemCount = cart.reduce((a, b) => a + b.qty, 0);

  return (
    <div className="inset p-5 sm:p-6">
      <div className="mb-4 flex flex-col justify-between gap-2 border-b border-line pb-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <Camera className="h-4 w-4 text-accent-ink" aria-hidden="true" />
          <h3 className="t-body font-semibold text-strong">Continuous QR cashier simulator</h3>
        </div>
        <div className="t-small flex items-center gap-2 text-dim">
          <span className="dot animate-pulse text-ok" aria-hidden="true" />
          Camera stream active, non-blocking
        </div>
      </div>

      <p className="t-small mb-4 max-w-prose text-dim">
        Pick any item to simulate pointing a camera at its QR code. The cart fills without modal
        dialogs and without the video stream restarting.
      </p>

      <div className="mb-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {CATALOG_SAMPLES.map((prod) => (
          <button
            key={prod.id}
            type="button"
            onClick={() => simulateScan(prod)}
            disabled={isProcessing}
            className="row-alt group flex items-center justify-between gap-3 rounded-theme border border-line bg-card p-3 text-left transition-colors hover:border-[rgb(var(--c-hover-border))] disabled:opacity-60"
          >
            <span>
              <span className="t-small block font-semibold text-strong">{prod.name}</span>
              <span className="t-small mt-0.5 block text-mute">
                {prod.code}, Rp {prod.price.toLocaleString('id-ID')}
              </span>
            </span>
            <span className="badge shrink-0">Scan QR</span>
          </button>
        ))}
      </div>

      <div className="rounded-theme border border-line bg-card p-4">
        <div className="t-small flex items-center justify-between gap-3 border-b border-line pb-3 text-dim">
          <span>Active cart buffer ({itemCount} items)</span>
          {lastScanned && (
            <span className="flex items-center gap-1 text-ok" role="status">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
              Scanned in {scanLatency}ms
            </span>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="t-small flex flex-col items-center gap-2 py-6 text-center text-mute">
            <ShoppingBag className="h-6 w-6 opacity-40" aria-hidden="true" />
            <span>Cart buffer is empty. Pick a product above to scan it.</span>
          </div>
        ) : (
          <ul className="my-2 max-h-40 divide-y divide-line overflow-y-auto pr-1">
            {cart.map((item) => (
              <li key={item.id} className="t-small flex items-center justify-between gap-3 py-2">
                <span>
                  <span className="font-medium text-strong">{item.name}</span>
                  <span className="ml-2 text-mute">x{item.qty}</span>
                </span>
                <span className="num text-dim">Rp {(item.price * item.qty).toLocaleString('id-ID')}</span>
              </li>
            ))}
          </ul>
        )}

        {cart.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3">
            <div className="t-small font-semibold text-strong">
              Total <span className="num ml-1 text-base text-accent-ink">Rp {totalAmount.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={clearCart} className="btn btn-subtle btn-sm">
                <RotateCcw className="h-3 w-3" aria-hidden="true" />
                Reset
              </button>
              <button type="button" onClick={() => setCheckoutComplete(true)} className="btn btn-primary btn-sm">
                Commit transaction
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        {checkoutComplete && (
          <div
            role="status"
            className="t-small mt-3 flex items-start gap-2 rounded-theme border border-ok/40 bg-ok/10 p-3 text-ok"
          >
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-semibold">Transaction committed</p>
              <p className="mt-0.5 opacity-90">
                Atomic database update: inventory decremented in Supabase and the receipt logged in the POS
                ledger.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
