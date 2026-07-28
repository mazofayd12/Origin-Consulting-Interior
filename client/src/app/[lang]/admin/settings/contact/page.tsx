'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { Share2, Globe, Phone, Mail, MapPin } from 'lucide-react';
import axios from 'axios';

export default function ContactInfoSettingsPage() {
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [contact, setContact] = useState({
    email: 'info@origin-consulting.com',
    phoneDubai: '+971 4 800 67444',
    phoneRiyadh: '+966 11 400 9900',
    whatsappNumber: '971480067444',
    addressDubai: 'Dubai Marina Plaza, Suite 2804, Dubai, UAE',
    addressRiyadh: 'King Fahd Road, KAFD Tower 12, Riyadh, KSA',
    googleMapsEmbed: 'https://maps.google.com/?q=Dubai+Marina+Plaza',
  });

  const [social, setSocial] = useState({
    facebook: 'https://facebook.com/origindesigneg',
    instagram: 'https://instagram.com/origindesigneg',
    linkedin: 'https://linkedin.com/company/origindesigneg',
    twitter: 'https://twitter.com/origindesigneg',
    youtube: 'https://youtube.com/@origindesigneg',
    tiktok: 'https://tiktok.com/@origindesigneg',
    behance: 'https://behance.net/origindesigneg',
  });

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await axios.get('/api/settings');
        if (res.data?.contact) {
          setContact((prev) => ({ ...prev, ...res.data.contact }));
        }
        if (res.data?.social) {
          setSocial((prev) => ({ ...prev, ...res.data.social }));
        }
      } catch (err) {
        console.error('Failed to fetch contact settings', err);
      }
    }
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('/api/settings', { contact, social });
      setSuccess('Contact info & Social Media links updated and saved to Database!');
      setTimeout(() => setSuccess(''), 4000);
    } catch (err: any) {
      setError('Failed to save settings: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl space-y-8">
        <div className="border-b border-neutral-800 pb-6">
          <h1 className="text-3xl font-extrabold text-white">
            Contact Info & Social Media (معلومات الاتصال وروابط التواصل)
          </h1>
          <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">
            Phone hotlines, WhatsApp, email, office addresses, and social media channels synced with Database
          </p>
        </div>

        {success && <Alert type="success" message={success} />}
        {error && <Alert type="danger" message={error} />}

        <form onSubmit={handleSave} className="space-y-8">
          {/* Section 1: Contact Details & Hotlines */}
          <div className="glass-panel p-6 rounded-lg border border-brand-gold/30 space-y-6">
            <h2 className="text-lg font-bold text-amber-400 flex items-center gap-2 border-b border-neutral-800 pb-3">
              <Phone className="w-5 h-5 text-amber-400" />
              <span>Official Contact Info & Branch Hotlines (معلومات الاتصال وأرقام الهواتف)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Official Email Address (البريد الإلكتروني)"
                type="email"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                required
              />
              <Input
                label="WhatsApp Hotline (Without +)"
                value={contact.whatsappNumber}
                onChange={(e) => setContact({ ...contact, whatsappNumber: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Dubai Hotline (رقم دبي)"
                value={contact.phoneDubai}
                onChange={(e) => setContact({ ...contact, phoneDubai: e.target.value })}
                required
              />
              <Input
                label="Riyadh Hotline (رقم الرياض)"
                value={contact.phoneRiyadh}
                onChange={(e) => setContact({ ...contact, phoneRiyadh: e.target.value })}
                required
              />
            </div>

            <Input
              label="Dubai Office Address (عنوان دبي)"
              value={contact.addressDubai}
              onChange={(e) => setContact({ ...contact, addressDubai: e.target.value })}
              required
            />
            <Input
              label="Riyadh Office Address (عنوان الرياض)"
              value={contact.addressRiyadh}
              onChange={(e) => setContact({ ...contact, addressRiyadh: e.target.value })}
              required
            />
            <Input
              label="Google Maps Embed URL (رابط الخريطة)"
              value={contact.googleMapsEmbed}
              onChange={(e) => setContact({ ...contact, googleMapsEmbed: e.target.value })}
            />
          </div>

          {/* Section 2: Social Media Links */}
          <div className="glass-panel p-6 rounded-lg border border-brand-gold/30 space-y-6">
            <h2 className="text-lg font-bold text-amber-400 flex items-center gap-2 border-b border-neutral-800 pb-3">
              <Share2 className="w-5 h-5 text-amber-400" />
              <span>Social Media Channels (روابط صفحات التواصل الاجتماعي)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Instagram URL (رابط انستجرام)"
                value={social.instagram}
                onChange={(e) => setSocial({ ...social, instagram: e.target.value })}
                placeholder="https://instagram.com/your-page"
              />
              <Input
                label="Facebook URL (رابط فيسبوك)"
                value={social.facebook}
                onChange={(e) => setSocial({ ...social, facebook: e.target.value })}
                placeholder="https://facebook.com/your-page"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="LinkedIn URL (رابط لينكد إن)"
                value={social.linkedin}
                onChange={(e) => setSocial({ ...social, linkedin: e.target.value })}
                placeholder="https://linkedin.com/company/your-page"
              />
              <Input
                label="Twitter / X URL (رابط تويتر / إكس)"
                value={social.twitter}
                onChange={(e) => setSocial({ ...social, twitter: e.target.value })}
                placeholder="https://x.com/your-page"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="YouTube Channel (رابط يوتيوب)"
                value={social.youtube}
                onChange={(e) => setSocial({ ...social, youtube: e.target.value })}
                placeholder="https://youtube.com/@channel"
              />
              <Input
                label="TikTok Profile (رابط تيك توك)"
                value={social.tiktok}
                onChange={(e) => setSocial({ ...social, tiktok: e.target.value })}
                placeholder="https://tiktok.com/@account"
              />
              <Input
                label="Behance Portfolio (رابط بيهانس)"
                value={social.behance}
                onChange={(e) => setSocial({ ...social, behance: e.target.value })}
                placeholder="https://behance.net/account"
              />
            </div>
          </div>

          <Button type="submit" variant="gold" size="lg" className="w-full" isLoading={loading}>
            Save All Settings to Database (حفظ كافة التغييرات)
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
}
