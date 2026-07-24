'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';

export default function ContactInfoSettingsPage() {
  const [success, setSuccess] = useState(false);
  const [contact, setContact] = useState({
    email: 'info@origin-consulting.com',
    phoneDubai: '+971 4 800 67444',
    phoneRiyadh: '+966 11 400 9900',
    whatsappNumber: '971480067444',
    addressDubai: 'Dubai Marina Plaza, Suite 2804, Dubai, UAE',
    addressRiyadh: 'King Fahd Road, KAFD Tower 12, Riyadh, KSA',
    googleMapsEmbed: 'https://maps.google.com/?q=Dubai+Marina+Plaza',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl space-y-8">
        <div className="border-b border-neutral-800 pb-6">
          <h1 className="text-3xl font-extrabold text-white">Contact Info Settings (معلومات الاتصال والفروع)</h1>
          <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Phone hotlines, WhatsApp numbers, branch addresses, and Google Maps embed</p>
        </div>

        {success && <Alert type="success" message="Contact info settings updated successfully!" />}

        <form onSubmit={handleSave} className="glass-panel p-8 rounded-lg border border-brand-gold/30 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Official Email Address" type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} required />
            <Input label="WhatsApp Hotline (Without +)" value={contact.whatsappNumber} onChange={(e) => setContact({ ...contact, whatsappNumber: e.target.value })} required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Dubai Hotline" value={contact.phoneDubai} onChange={(e) => setContact({ ...contact, phoneDubai: e.target.value })} required />
            <Input label="Riyadh Hotline" value={contact.phoneRiyadh} onChange={(e) => setContact({ ...contact, phoneRiyadh: e.target.value })} required />
          </div>

          <Input label="Dubai Office Address" value={contact.addressDubai} onChange={(e) => setContact({ ...contact, addressDubai: e.target.value })} required />
          <Input label="Riyadh Office Address" value={contact.addressRiyadh} onChange={(e) => setContact({ ...contact, addressRiyadh: e.target.value })} required />
          <Input label="Google Maps Embed URL" value={contact.googleMapsEmbed} onChange={(e) => setContact({ ...contact, googleMapsEmbed: e.target.value })} />

          <Button type="submit" variant="gold" size="lg" className="w-full mt-4">Save Contact Info</Button>
        </form>
      </div>
    </AdminLayout>
  );
}
